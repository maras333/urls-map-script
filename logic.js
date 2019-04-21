module.exports = {
  excludeNativeUrls: (urlsArr, excludedUrlsArr) => {
    const filteredUrls = urlsArr.filter(url => {
      url = "https://".concat(url);
      return excludedUrlsArr.indexOf(url) < 0;
    });
    return filteredUrls;
  }
};
