/**
 * Accepts the result of require.context() to add it all to our great big
 * components object with keys that are the name of components, i.e.
 *
 *   // 01-atoms/vue-widget/index.js
 *   export const name = 'vue-widget';
 *
 * results in:
 *
 *   components['vue-widget'] = {name: 'vue-widget', enable() {}, disable() {}}
 *
 * @param context
 */
function importAll(context) {
  return context.keys().reduce((accumulator, componentPath) => {
    // "require" the component
    const component = context(componentPath);
    // Add a key to the components object that is the component's name, and a
    // value that is full component.
    // WARNING: this presumes unique component names *across the design system*
    return Object.assign(accumulator, { [component.name]: component });
  }, {});
}

module.exports = importAll;
