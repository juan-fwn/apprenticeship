const { readdir } = require("fs/promises");
const fs = require("fs");

const regExp = new RegExp(process.argv.slice(2));

const showFilesRegExp = (path, isDirectoryBool = false) => {
  try {
    readdir(path).then((files) => {
      files.forEach((file) => {
        const stats =
          fs.existsSync(isDirectoryBool ? `${path}/${file}` : file) &&
          fs.statSync(isDirectoryBool ? `${path}/${file}` : file);
        if (!stats) return;
        if (stats.isFile() && regExp.test(file)) {
          console.log(file);
        }
        if (stats.isDirectory()) {
          showFilesRegExp(isDirectoryBool ? `${path}/${file}` : file, true);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

showFilesRegExp(__dirname);