// Initial project config override. As needed bubble up to core config,

// File can also be directly imported from ./packages/prettier-config/index.json
module.exports = {
  ...require('@phase2/prettier-config-particle'),
  semi: false,
}
