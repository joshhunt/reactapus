module.exports = function(loaders) {
  loadersArr = [];

  for (var loaderName in loaders) {
    loaderSettings = loaders[loaderName];
    thisLoader = loaderName;

    loaderSettingsArr = [];

    for (var settingsName in loaderSettings) {
      settingsValue = loaderSettings[settingsName];
      loaderSettingsArr.push(settingsName + '=' + settingsValue)
    }

    if (loaderSettingsArr.length) {
      var loaderSettingsStr = loaderSettingsArr.join('&');
      thisLoader = thisLoader + '?' + loaderSettingsStr
    }

    loadersArr.push(thisLoader)
  }

  return loadersArr.join('!')
}