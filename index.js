const csvtojson = require("csvtojson");
const {
  parseMappingsToJsonObject,
  readDataFromFiles,
  writeRedirectionsToFile
} = require("./utils");
const { excludeNativeUrls, redirectUrls } = require("./logic");

const args = process.argv.slice(2);
const urls = args[0];
const mapping = args[1];
const excludedUrls = args[2] || undefined;

const main = async () => {
  try {
    // converting csv with mappings to json object
    let mappingsJson = await parseMappingsToJsonObject(mapping, {
      delimiter: ";"
    });
    // reading urls data from files and write it to variable
    let urlsArrays = await readDataFromFiles(urls, excludedUrls);

    let finalUrls = await excludeNativeUrls(
      urlsArrays.urlsArray,
      urlsArrays.excludedUrlsArray
    );
    let newUrls = await redirectUrls(finalUrls, mappingsJson);
    // writing to file redirections.csv
    await writeRedirectionsToFile(newUrls);
  } catch (e) {
    console.log(e);
  }
};

main();
