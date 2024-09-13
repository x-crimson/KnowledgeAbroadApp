//module.exports = function(api) {
//  api.cache(true);
//  return {
//    presets: ['babel-preset-expo'],
//  };
//};
//module.exports = function(api) {
//  api.cache(true);
//  return {
//    presets: ['babel-preset-expo'],
//    plugins: ['react-native-reanimated/plugin'], // Ensure this line is included for react-native-reanimated
//  };
//};
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      blacklist: null,
      whitelist: null,
      safe: false,
      allowUndefined: true
    }]
  ],
};
