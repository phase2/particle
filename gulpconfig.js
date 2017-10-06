module.exports = {
  css: {
    enabled: true,
    src: [
      // 'scss/**/*.scss',
      // 'source/_patterns/**/*.scss',
      // 'source/styleguide/*.scss',
    ],
    dest: 'dest/',
    flattenDestOutput: true,
    lint: {
      enabled: true,
      failOnError: true,
      // in addition to linting `css.src`, this is added.
      extraSrc: [],
    },
    // additional debugging info in comment of the output CSS - only use when necessary
    sourceComments: false,
    sourceMapEmbed: false,
    // tell the compiler whether you want 'expanded' or 'compressed' output code
    outputStyle: 'expanded',
    // https://github.com/ai/browserslist#queries
    autoPrefixerBrowsers: [
      'last 2 versions',
      'IE >= 10',
    ],
    includePaths: [
      './node_modules',
    ],
  },
  js: {
    enabled: true,
    src: [
      'js/**/*.js',
      'source/_patterns/**/*.js',
    ],
    dest: 'dest/',
    destName: 'script.js',
    sourceMapEmbed: false,
    uglify: false,
    babel: true,
    eslint: {
      enabled: true,
      src: [
        'js/**/*.js',
        'source/_patterns/**/*.js',
        '.*.js',
        '*.js',
      ],
    },
  },
  patternLab: {
    enabled: true,
    configFile: 'tools/pattern-lab/config/config.yml',
    watchedExtensions: [
      'twig',
      'json',
      'yaml',
      'yml',
      'md',
      'jpg',
      'jpeg',
      'png',
    ],
  },
  // https://github.com/nfroidure/gulp-iconfont
  icons: {
    enabled: true,
    src: 'source/icons/src/*.svg',
    dest: 'dest/',
    fontPathPrefix: '',
    classNamePrefix: 'icon',
    autohint: false,
    normalize: true,
    templates: {
      enabled: true,
      css: {
        src: 'source/icons/templates/_icons-settings.scss',
        dest: 'source/_patterns/01-atoms/images/',
      },
      demo: {
        src: 'source/icons/templates/icons.twig',
        dest: 'source/_patterns/01-atoms/images/',
      },
    },
    formats: [
      'ttf',
      'eot',
      'woff',
      'svg',
    ],
  },
  browserSync: {
    enabled: false,
    port: 3050,
    watchFiles: [],
    // enable when full CMS is set up
    // domain: 'mysite.dev',
    baseDir: './',
    startPath: 'pattern-lab/public/',
    openBrowserAtStart: false,
    // requires above to be true; allows non-default browser to open
    browser: [
      'Google Chrome',
    ],
    // Tunnel the Browsersync server through a random Public URL
    // -> http://randomstring23232.localtunnel.me
    tunnel: false,
    reloadDelay: 50,
    reloadDebounce: 750,
    rewriteRules: [],
  },
  drupal: {
    enabled: false,
    themeFile: 'patternlab.info.yml',
    // when these files change
    watch: [
      'templates/**',
      '*.theme',
    ],
    // run this command
    command: 'drush cache-rebuild',
    // in this directory
    dir: './',
  },
};
