module.exports = {
  // https://github.com/dylang/grunt-notify
  build: {
    options: {
      message: 'Build Complete'
    }
  },
  done: {
    options: {
      message: 'Done!'
    }
  },
  deploy: {
    options: {
      message: 'Deployed Files'
    }
  }
};
