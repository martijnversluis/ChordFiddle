const path = require('path');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mergeJSON = require('handlebars-webpack-plugin/utils/mergeJSON');

const projectData = mergeJSON(path.join(__dirname, '{config,example_chord_pro_sheet,package}.json'));

module.exports = {
  resolve: {
    alias: {
      handlebars: 'handlebars/dist/handlebars.js',
    },
  },
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HandlebarsPlugin({
      entry: path.join(process.cwd(), 'src', '*.hbs'),
      output: path.join(process.cwd(), '[name].html'),
      data: projectData,
      helpers: {
        eq: (one, other) => one === other,
        upperCaseFirst: (string) => `${string[0].toUpperCase()}${string.substring(1)}`,
      },
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
};
