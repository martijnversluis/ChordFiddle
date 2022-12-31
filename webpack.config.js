const path = require('path');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const mergeJSON = require('handlebars-webpack-plugin/utils/mergeJSON');

const projectData = mergeJSON(path.join(__dirname, '{config,package}.json'));
const exampleChordProSheet = require('./example_chord_pro_sheet');

module.exports = (env) => ({
  resolve: {
    alias: {
      handlebars: 'handlebars/dist/handlebars.js',
    },
  },
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new HandlebarsPlugin({
      entry: path.join(process.cwd(), 'src', '*.hbs'),
      output: path.join(process.cwd(), '[name].html'),
      data: {
        ...projectData,
        example_chord_pro_sheet: exampleChordProSheet,
        bundlePath: `${env.production ? 'dist/' : ''}bundle.js`,
      },
      helpers: {
        eq: (one, other) => one === other,
        upperCaseFirst: (string) => `${string[0].toUpperCase()}${string.substring(1)}`,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: __dirname,
    },
    compress: true,
    port: 9000,
  },
});
