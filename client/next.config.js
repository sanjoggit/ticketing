// Below webpack config is useful if you are working on a large project and are having issues with webpack not detecting changes to your source code in a timely manner. By increasing the polling frequency, you can ensure that webpack is able to detect changes and rebuild the project as soon as possible.
module.exports = {
	webpack: (config) => {
	  config.watchOptions.poll = 300;
	  return config;
	},
  };