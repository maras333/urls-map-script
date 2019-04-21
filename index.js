const csvtojson = require("csvtojson");
const csv = require("fast-csv");
const utils = require("./utils");
const { excludeNativeUrls } = require("./logic");

const args = process.argv.slice(2);
const urls = args[0];
const mapping = args[1];
const excludedUrls = args[2] || undefined;

const main = async () => {
  try {
    // converting csv with mappings to json object
    let mappingsJson = await utils.parseMappingsToJsonObject(mapping, {
      delimiter: ";"
    });
    // reading urls data from files and write it to variable
    await utils.readDataFromFiles(urls, excludedUrls, urlsArrays => {
      const finalUrls = excludeNativeUrls(
        urlsArrays.urlsArray,
        urlsArrays.excludedUrlsArray
      );
      console.log(finalUrls.length);
    });
  } catch (e) {
    console.log(e);
  }
};

main();
