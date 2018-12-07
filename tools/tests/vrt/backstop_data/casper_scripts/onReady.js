module.exports = (casper, scenario, vp) => {
  casper.evaluate(() => {
    // Your web-app is now loaded. Edit here to simulate user interacions or other state changes.
  });
  console.log(`onReady.js has run for: ${vp.name}`);
};
