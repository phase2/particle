<?php

/**
 * Code based on `Drupal\Core\Template\TwigNodeTrans` and `Drupal\Core\Template\TwigTransTokenParser` from Drupal 8 core.
 */

// these files are loaded three times and we can't re-set a class
if (!class_exists("Project_trans_Node")) {

  class Project_trans_Node extends Twig_Node {

    /**
     * {@inheritdoc}
     */
    public function __construct(\Twig_Node $body, \Twig_Node $plural = NULL, \Twig_Node_Expression $count = NULL, \Twig_Node_Expression $options = NULL, $lineno, $tag = NULL) {
      parent::__construct(array(
        'count' => $count,
        'body' => $body,
        'plural' => $plural,
        'options' => $options,
      ), array(), $lineno, $tag);
    }

    /**
     * {@inheritdoc}
     */
    public function compile(\Twig_Compiler $compiler) {
      $compiler->addDebugInfo($this);

      $options = $this->getNode('options');

      list($singular, $tokens) = $this->compileString($this->getNode('body'));

      $compiler->write('echo ');

      // Write the singular text parameter.
      $compiler->subcompile($singular);

      // End writing.
      $compiler->raw(";\n");
    }

    /**
     * Extracts the text and tokens for the "trans" tag.
     *
     * @param \Twig_Node $body
     *   The node to compile.
     *
     * @return array
     *   Returns an array containing the two following parameters:
     *   - string $text
     *       The extracted text.
     *   - array $tokens
     *       The extracted tokens as new \Twig_Node_Expression_Name instances.
     */
    protected function compileString(\Twig_Node $body) {
      if ($body instanceof \Twig_Node_Expression_Name || $body instanceof \Twig_Node_Expression_Constant || $body instanceof \Twig_Node_Expression_TempName) {
        return array($body, array());
      }

      $tokens = array();
      if (count($body)) {
        $text = '';

        foreach ($body as $node) {
          if (get_class($node) === 'Twig_Node' && $node->getNode(0) instanceof \Twig_Node_SetTemp) {
            $node = $node->getNode(1);
          }

          if ($node instanceof \Twig_Node_Print) {
            $n = $node->getNode('expr');
            while ($n instanceof \Twig_Node_Expression_Filter) {
              $n = $n->getNode('node');
            }

            $args = $n;

            // Support TwigExtension->renderVar() function in chain.
            if ($args instanceof \Twig_Node_Expression_Function) {
              $args = $n->getNode('arguments')->getNode(0);
            }

            // Detect if a token implements one of the filters reserved for
            // modifying the prefix of a token. The default prefix used for
            // translations is "@". This escapes the printed token and makes them
            // safe for templates.
            // @see TwigExtension::getFilters()
            $argPrefix = '@';
            while ($args instanceof \Twig_Node_Expression_Filter) {
              switch ($args->getNode('filter')->getAttribute('value')) {
                case 'placeholder':
                  $argPrefix = '%';
                  break;
              }
              $args = $args->getNode('node');
            }
            if ($args instanceof \Twig_Node_Expression_GetAttr) {
              $argName = array();
              // Reuse the incoming expression.
              $expr = $args;
              // Assemble a valid argument name by walking through the expression.
              $argName[] = $args->getNode('attribute')->getAttribute('value');
              while ($args->hasNode('node')) {
                $args = $args->getNode('node');
                if ($args instanceof \Twig_Node_Expression_Name) {
                  $argName[] = $args->getAttribute('name');
                }
                else {
                  $argName[] = $args->getNode('attribute')->getAttribute('value');
                }
              }
              $argName = array_reverse($argName);
              $argName = implode('.', $argName);
            }
            else {
              $argName = $n->getAttribute('name');
              if (!is_null($args)) {
                $argName = $args->getAttribute('name');
              }
              $expr = new \Twig_Node_Expression_Name($argName, $n->getLine());
            }
            $placeholder = sprintf('%s%s', $argPrefix, $argName);
            $text .= $placeholder;
            $expr->setAttribute('placeholder', $placeholder);
            $tokens[] = $expr;
          }
          else {
            $text .= $node->getAttribute('data');
          }
        }
      }
      else {
        $text = $body->getAttribute('data');
      }

      return array(new \Twig_Node(array(new \Twig_Node_Expression_Constant(trim($text), $body->getLine()))), $tokens);
    }

  }

}

// these files are loaded three times and we can't re-set a class
if (!class_exists("Project_trans_TokenParser")) {

  class Project_trans_TokenParser extends Twig_TokenParser {

    /**
     * {@inheritdoc}
     */
    public function parse(Twig_Token $token) {
      $lineno = $token->getLine();
      $stream = $this->parser->getStream();
      $body = NULL;
      $options = NULL;
      $count = NULL;
      $plural = NULL;

      if (!$stream->test(\Twig_Token::BLOCK_END_TYPE) && $stream->test(\Twig_Token::STRING_TYPE)) {
        $body = $this->parser->getExpressionParser()->parseExpression();
      }
      if (!$stream->test(\Twig_Token::BLOCK_END_TYPE) && $stream->test(\Twig_Token::NAME_TYPE, 'with')) {
        $stream->next();
        $options = $this->parser->getExpressionParser()->parseExpression();
      }
      if (!$body) {
        $stream->expect(\Twig_Token::BLOCK_END_TYPE);
        $body = $this->parser->subparse(array($this, 'decideForFork'));
        if ('plural' === $stream->next()->getValue()) {
          $count = $this->parser->getExpressionParser()->parseExpression();
          $stream->expect(\Twig_Token::BLOCK_END_TYPE);
          $plural = $this->parser->subparse(array($this, 'decideForEnd'), TRUE);
        }
      }

      $stream->expect(\Twig_Token::BLOCK_END_TYPE);

      $this->checkTransString($body, $lineno);

      $node = new Project_trans_Node($body, $plural, $count, $options, $lineno, $this->getTag());

      return $node;
    }

    /**
     * Detect a 'plural' switch or the end of a 'trans' tag.
     */
    public function decideForFork($token) {
      return $token->test(array('plural', 'endtrans'));
    }

    /**
     * Detect the end of a 'trans' tag.
     */
    public function decideForEnd($token) {
      return $token->test('endtrans');
    }

    /**
     * {@inheritdoc}
     */
    public function getTag() {
      return 'trans';
    }

    /**
     * Ensure that any nodes that are parsed are only of allowed types.
     *
     * @param \Twig_Node $body
     *   The expression to check.
     * @param integer $lineno
     *   The source line.
     *
     * @throws \Twig_Error_Syntax
     */
    protected function checkTransString(\Twig_Node $body, $lineno) {
      foreach ($body as $node) {
        if (
          $node instanceof \Twig_Node_Text
          ||
          ($node instanceof \Twig_Node_Print && $node->getNode('expr') instanceof \Twig_Node_Expression_Name)
          ||
          ($node instanceof \Twig_Node_Print && $node->getNode('expr') instanceof \Twig_Node_Expression_GetAttr)
          ||
          ($node instanceof \Twig_Node_Print && $node->getNode('expr') instanceof \Twig_Node_Expression_Filter)
        ) {
          continue;
        }
        throw new \Twig_Error_Syntax(sprintf('The text to be translated with "trans" can only contain references to simple variables'), $lineno);
      }
    }

  }

}
