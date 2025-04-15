const path = require('path');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const mergeJSON = require('handlebars-webpack-plugin/utils/mergeJSON');
const exampleChordProSheet = require('./example_chord_pro_sheet');

const projectData = mergeJSON(path.join(__dirname, '{config,package}.json'));

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
      output: path.join(path.resolve(__dirname, 'dist'), '[name].html'),
      partials: [
        path.join(process.cwd(), 'src', 'templates', '*.hbs'),
      ],
      data: {
        ...projectData,
        example_chord_pro_sheet: exampleChordProSheet,
        bundlePath: 'bundle.js',
      },
      helpers: {
        eq: (one, other) => one === other,
        upperCaseFirst: (string) => `${string[0].toUpperCase()}${string.substring(1)}`,
        partialPath: ({ type }) => `templates/${type}`,
        attributeKey: (parent, key) => [parent, key].filter((k) => k).join('.'),
        or: (...items) => items.find((item) => item),
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
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
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
