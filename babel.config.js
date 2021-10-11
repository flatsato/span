module.exports = function (api) {
  api.cache(false);

  const presets = [
    [
      "@babel/preset-env",
      {
        modules: false,
      },
    ],
  ];
  const plugins = [
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: {
          version: 3,
          proposals: true,
        }
      },
    ],
  ];
  const env = {
    test: {
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              node: "current",
            },
          },
        ],
      ],
    },
  };

  return {
    presets,
    plugins,
    env,
    compact: false,
  };
};