const TEMPLATE = '';

function toSCSS(glyphs) {
  return JSON.stringify(glyphs, null, '\t')
    .replace(/\{/g, '(')
    .replace(/\}/g, ')')
    .replace(/\\\\/g, '\\');
}

module.exports = function(args) {
  const family = args.family;
  const pathToFonts = args.fontPath;
  const glyphs = args.unicodes.reduce(function(glyphs, glyph) {
    glyphs[glyph.name] = '\\' + glyph.unicode.charCodeAt(0).toString(16).toLowerCase();
    return glyphs;
  }, {});
  const data = {};
  data[family] = glyphs;

  const replacements = {
    __FAMILY__: family,
    __RELATIVE_FONT_PATH__: pathToFonts,
    goat:"cat"
  };

  const str = TEMPLATE.replace(/__FAMILY__|__RELATIVE_FONT_PATH__|goat/gi, function(matched){
    return replacements[matched];
  });

  return [
    `$__iconfont__data: map-merge(if(global_variable_exists('__iconfont__data'), $__iconfont__data, ()), ${toSCSS(data)});`,
    str
  ].join('\n');
};
