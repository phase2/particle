const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const glob = require('glob');
const _ = require('lodash');

// Pattern Lab Config
const namespaceOptions = {
  configFile: './tools/pattern-lab/config/config.yml',
  themeFile: './patternlab.info.yml',
  twigNamespaces: {
    addToDrupalThemeFile: true,
    sets: [
      {
        namespace: 'base',
        paths: ['source/_patterns/00-base'],
      }, {
        namespace: 'atoms',
        paths: ['source/_patterns/01-atoms'],
      }, {
        namespace: 'molecules',
        paths: ['source/_patterns/02-molecules'],
      }, {
        namespace: 'organisms',
        paths: ['source/_patterns/03-organisms'],
      }, {
        namespace: 'templates',
        paths: ['source/_patterns/04-templates'],
      }, {
        namespace: 'pages',
        paths: ['source/_patterns/05-pages'],
      },
    ],
  },
};

const plRoot = path.join(namespaceOptions.configFile, '../..');

/**
 * Get the correct folder structure for each pattern.
 * @param workingDir
 * @returns {{}}
 */
function getTwigNamespaceConfig(workingDir) {
  const localWorkingDir = workingDir || process.cwd();
  const twigNamespaceConfig = {};
  namespaceOptions.twigNamespaces.sets.forEach((namespaceSet) => {
    const pathArray = namespaceSet.paths.map((pathBase) => {
      const results = glob.sync(path.join(pathBase, '**/*.twig')).map(pathItem => (
        path.relative(localWorkingDir, path.dirname(pathItem))
      ));
      results.unshift(path.relative(localWorkingDir, pathBase));
      return results;
    });
    twigNamespaceConfig[namespaceSet.namespace] = {
      paths: _.uniq(_.flatMap(pathArray)),
    };
  });
  return twigNamespaceConfig;
}

/**
 * Writes the twig pattern namespacing to the Drupal theme's .info file.
 */
function addTwigNamespaceConfigToDrupal(done) {
  const twigNamespaceConfig = getTwigNamespaceConfig(path.dirname(namespaceOptions.themeFile));

  const drupalThemeFile = yaml.safeLoad(fs.readFileSync(namespaceOptions.themeFile, 'utf8'));

  Object.assign(drupalThemeFile['component-libraries'], twigNamespaceConfig);
  const newThemeFile = yaml.safeDump(drupalThemeFile);
  fs.writeFileSync(namespaceOptions.themeFile, newThemeFile, 'utf8');

  console.log('add twig namespaces to drupal theme .info.yml');
  done();
}

/**
 * Writes the twig pattern namespacing to Pattern Lab's config.yml.
 */
function addTwigNamespaceConfigToPl(done) {
  const twigNamespaceConfig = getTwigNamespaceConfig(plRoot);

  const plConfig = yaml.safeLoad(fs.readFileSync(namespaceOptions.configFile, 'utf8'));

  if (!plConfig.plugins) {
    Object.assign(plConfig, {
      plugins: {
        twigNamespaces: { enabled: true, namespaces: {} },
      },
    });
  } else if (!plConfig.plugins.twigNamespaces) {
    Object.assign(plConfig.plugins, {
      twigNamespaces: { enabled: true, namespaces: {} },
    });
  } else if (!plConfig.plugins.twigNamespaces.namespaces) {
    plConfig.plugins.twigNamespaces.namespaces = {};
  }

  Object.assign(plConfig.plugins.twigNamespaces.namespaces, twigNamespaceConfig);
  const newConfigFile = yaml.safeDump(plConfig);
  fs.writeFileSync(namespaceOptions.configFile, newConfigFile, 'utf8');

  console.log('add twig namespaces to pl config.yml');
  done();
}

/**
 * Gulp task for auto-namespacing.
 */
module.exports = {
  twigNamespaces: (gulp) => {
    gulp.task('twig-namespaces', (done) => {
      addTwigNamespaceConfigToPl(() => {
        if (namespaceOptions.twigNamespaces.addToDrupalThemeFile) {
          addTwigNamespaceConfigToDrupal(done);
        }
        done();
      });
    });
  },
  namespaceOptions,
};
