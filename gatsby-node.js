const path = require('path');

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig();
  const originalSvgRule = config.module.rules.find(
    (rule) => rule.test && rule.test.toString().includes('|svg'),
  );
  let newRuleTest = originalSvgRule.test.toString().replace('|svg|', '|');
  newRuleTest = newRuleTest.substring(1, newRuleTest.length - 1);
  originalSvgRule.test = new RegExp(newRuleTest);
  const newSvgRule = {
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: {
              removeViewBox: false,
            },
          },
        },
      },
      'url-loader',
    ],
  };
  config.module.rules.push(newSvgRule);
  actions.replaceWebpackConfig(config);
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@images': path.resolve(__dirname, 'src/images'),
      },
    },
  });
};
