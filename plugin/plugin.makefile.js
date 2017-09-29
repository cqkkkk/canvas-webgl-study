const fs = require("fs");
const path = require("path");
let dealtemplate = (filename, compilation) =>
  new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, "./template.html"), (err, string) => {
      if (err) reject(err);
      string = string.toString();
      string = string.replace(/{{url}}/, filename);
      compilation.assets[`${filename.replace(/\.js/, ".html")}`] = {
        source: () => string,
        size: () => string.length
      };
      resolve("success makefile");
    });
  });
module.exports = dealtemplate;
