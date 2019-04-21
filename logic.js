module.exports = {
  excludeNativeUrls: (urlsArr, excludedUrlsArr) => {
    const filteredUrls = urlsArr.filter(url => {
      url = "https://".concat(url);
      return excludedUrlsArr.indexOf(url) < 0;
    });
    return filteredUrls;
  },

  redirectUrls: (urls, mappings) => {
    // 1. take first url
    // 2. find matching to RegEx
    // 3. replace old url with new one
    // 4. create file with new replacings
    const https = 'https://'
    let redirections = [];
    for (let url of urls) {
      let urlStr, newUrl;
      for (let mapping of mappings) {
        if (url.includes(mapping.old)) {
          newUrl = url
            .replace(new RegExp(mapping.old, "g"), mapping.new)
            .replace(new RegExp("moto.onet.pl", "g"), "auto-swiat.pl");
          urlStr = https + url + ";" + https + newUrl + "/301";
          redirections.push(urlStr);
        }
      }
    }
    return redirections;
  }
};
