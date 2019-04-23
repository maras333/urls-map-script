module.exports = {
  excludeNativeUrls: (urlsArr, excludedUrlsArr) => {
    const filteredUrls = urlsArr.filter(url => {
      url = "https://".concat(url);
      return excludedUrlsArr.indexOf(url) < 0;
    });
    return filteredUrls;
  },
  // logic to process redirections
  redirectUrls: (urls, mappings) => {
    const https = "https://";
    const www = "www.";
    const redirect301 = "301";
    let redirections = [["old_url", "new_url", "code"]];
    for (let url of urls) {
      let urlStrOld, urlStrNew, newUrl;
      let mapped = false;
      for (let mapping of mappings) {
        let tempArr = [];
        if (url.includes("moto.onet.pl/" + mapping.old)) {
          newUrl = url
            .replace(new RegExp(mapping.old + ".*", "g"), mapping.new)
            .replace(new RegExp("moto.onet.pl", "g"), "auto-swiat.pl");
          urlStrOld = `${www}${url}`;
          urlStrNew = `${https}${www}${newUrl}`;
          tempArr.push(urlStrOld, urlStrNew, redirect301);
          redirections.push(tempArr);
          mapped = true;
          break;
        }
      }
      if (!mapped) {
        urlStrOld = `${www}${url}`;
        urlStrNew = `${https}${www}auto-swiat.pl`;
        redirections.push([urlStrOld, urlStrNew, redirect301]);
      }
    }
    return redirections;
  }
};
