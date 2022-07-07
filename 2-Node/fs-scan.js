const fs = require("fs");

const regExp = new RegExp(process.argv[2]);

const showFilesRegExp = (path) => {
  const fileNames = fs.readdirSync(path);

  fileNames.forEach((file) => {
    const stats = fs.statSync(`${path}/${file}`);

    if (stats.isFile() && regExp.test(file)) {
      console.log(file);
    }
    if (stats.isDirectory()) {
      showFilesRegExp(`${path}/${file}`);
    }
  });
};

showFilesRegExp(__dirname);
