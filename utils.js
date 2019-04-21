const csvtojson = require("csvtojson");
const fs = require("fs");
const csv = require("fast-csv");
const Promise = require("bluebird");

module.exports = {
  parseMappingsToJsonObject: async (mappingsData, options = {}) => {
    try {
      let mappingsJson = await csvtojson({ ...options }).fromFile(
        `${mappingsData}`
      );
      return Promise.resolve(mappingsJson);
    } catch (e) {
      console.log(e);
    }
  },

  readDataFromFiles: async (urlsData, excludedUrlsData = undefined) => {
    return new Promise((resolve, reject) => {
      try {
        const urlsReadStream = fs.createReadStream(`${urlsData}`);
        const excludesReadStream = excludedUrlsData
          ? fs.createReadStream(`${excludedUrlsData}`)
          : undefined;
        let urlsArray = [];
        let excludedUrlsArray = [];

        csv
          .fromStream(urlsReadStream, { delimiter: ";", rowDelimiter: "\n" })
          .transform(data => {
            urlsArray.push(data[0]);
          })
          .on("data", data => {})
          .on("end", () => {
            // end executing while there is no excluded urls
            if (!excludedUrlsData) {
              resolve({ urlsArray, excludedUrlsArray });
              return;
            }
            csv
              .fromStream(excludesReadStream, {
                headers: [, , , , , "tk_tb_pub_data.last_url", , , , , ,],
                delimiter: ";",
                rowDelimiter: "\n"
              })
              .transform(data => {
                excludedUrlsArray.push(data["tk_tb_pub_data.last_url"]);
              })
              .on("data", data => {})
              .on("end", () => {
                resolve({ urlsArray, excludedUrlsArray });
                return;
              });
          });
      } catch (e) {
        console.log(e);
      }
    });
  },
  writeRedirectionsToFile: async redirectionsArr => {
    try {
      csv
        .writeToPath("redirections.csv", redirectionsArr, {
          headers: false,
          delimiter: ";"
        })
        .on("finish", function() {
          console.log("done!");
        });
    } catch (e) {
      console.log(e);
    }
  }
};
