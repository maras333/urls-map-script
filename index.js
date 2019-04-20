const fs = require("fs");
const split2 = require("split2");
const utils = require("./utils");
const { parse, transform, stringify } = require("csv");
const csvtojson = require("csvtojson");
const csv = require("fast-csv");
const args = process.argv.slice(2);

const urls = args[0];
const mapping = args[1];
const excludedUrls = args[2] || undefined;
// let urlsArray = [];
// let excludedUrlsArray = [];
const main = async () => {
  try {
    // converting csv with mappings to json object
    let mappingsJson = await utils.parseMappingsToJsonObject(mapping, {
      delimiter: ";"
    });
    // reading urls data from files and write it to variable
    await utils.readDataFromFiles(urls, excludedUrls, (urlsArrays) => {
      console.log(mappingsJson);
      console.log(urlsArrays);
    });
  } catch (e) {
    console.log(e);
  }
};

main();