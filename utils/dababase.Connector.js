const mongoose = require('mongoose')
const logger = require ('./logger.js')

  const iniciarServidorMongo = async () =>{
    try{
        mongoose.set("strictQuery", false);
        mongoose
   .connect(process.env.MONGOURL, {useNewUrlParser: true})
   .then(() => {
    logger.info(`Conexión con MongoDbAtlas exitosa`)
    })
  } catch (error) {
    logger.error(error)
  }
}

module.exports = {iniciarServidorMongo}