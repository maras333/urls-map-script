module.exports = {
  excludeNativeUrls: (urlsArr, excludedUrlsArr) => {
    const filteredUrls = urlsArr.filter(url => {
      url = "https://".concat(url);
      return excludedUrlsArr.indexOf(url) < 0;
    });
    return filteredUrls;
  },
  // logic to redirections
  redirectUrls: (urls, mappings) => {
    const https = "https://";
    let redirections = [];
    for (let url of urls) {
      let urlStrOld, urlStrNew, newUrl;
      for (let mapping of mappings) {
        let tempArr = [];
        if (url.includes(mapping.old)) {
          newUrl = url
            .replace(new RegExp(mapping.old + ".*", "g"), mapping.new)
            .replace(new RegExp("moto.onet.pl", "g"), "auto-swiat.pl");
          urlStrOld = https + url;
          urlStrNew = https + newUrl + "/301";
          tempArr.push(urlStrOld, urlStrNew);
          redirections.push(tempArr);
        }
      }
    }
    return redirections;
  }
};
