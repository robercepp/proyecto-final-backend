const fs = require("fs");
const logger = require('./utils/logger.js')

async function fileChecker(file) {
  if (!fs.existsSync(file)) {
    try {
      await fs.promises.writeFile(file, "[]");
    } catch (error) {
      logger.error("error!: ", error);
    }
  }
}

//verificación temporal de tipo de usuario
var userLogged = 0;

module.exports = {fileChecker, userLogged };
