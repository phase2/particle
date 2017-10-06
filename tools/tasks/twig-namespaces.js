const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const glob = require('glob');

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
 * Flatten Array
 * @param arrayOfArrays {Array[]}
 * @returns {Array}
 */
function flattenArray(arrayOfArrays) {
  return [].concat.apply([], arrayOfArrays);
}

/**
 * Make an array unique by removing duplicate entries.
 * @param item {Array}
 * @returns {Array}
 */
function uniqueArray(item) {
  const u = {};
  const newArray = [];
  for (let i = 0, l = item.length; i < l; ++i) {
    if (!{}.hasOwnProperty.call(u, item[i])) {
      newArray.push(item[i]);
      u[item[i]] = 1;
    }
  }
  return newArray;
}

/**
 * Get the correct folder structure for each pattern.
 * @param workingDir
 * @returns {{}}
 */
function getTwigNamespaceConfig(workingDir) {
  workingDir = workingDir || process.cwd();
  const twigNamespaceConfig = {};
  namespaceOptions.twigNamespaces.sets.forEach((namespaceSet) => {
    const pathArray = namespaceSet.paths.map((pathBase) => {
      const results = glob.sync(path.join(pathBase, '**/*.twig')).map((pathItem) => {
        return path.relative(workingDir, path.dirname(pathItem));
      });
      results.unshift(path.relative(workingDir, pathBase));
      return results;
    });
    twigNamespaceConfig[namespaceSet.namespace] = {
      paths: uniqueArray(flattenArray(pathArray)),
    };
  });
  return twigNamespaceConfig;
}

/**
 * Writes the twig pattern namespacing to the Drupal theme's .info file.
 */
function addTwigNamespaceConfigToDrupal(done) {
  const twigNamespaceConfig = getTwigNamespaceConfig(path.dirname(namespaceOptions.themeFile));

  let drupalThemeFile = yaml.safeLoad(
    fs.readFileSync(namespaceOptions.themeFile, 'utf8')
  );

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

  let plConfig = yaml.safeLoad(
    fs.readFileSync(namespaceOptions.configFile, 'utf8')
  );

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
  twigNamespaces: function(gulp) {
    gulp.task('twig-namespaces', (done) => {
      addTwigNamespaceConfigToPl(() => {
        if (namespaceOptions.twigNamespaces.addToDrupalThemeFile) {
          addTwigNamespaceConfigToDrupal(done);
        }
        done();
      });
    });
  },
  namespaceOptions
};