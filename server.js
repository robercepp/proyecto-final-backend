//variables de entorno
require("dotenv").config();

//librerías necesarias
const express = require("express");
const app = express();
const server = require("http").createServer(app);
var io = require("socket.io")(server);
require("./utils/socketService.js")(io);
const flash = require("express-flash");
const cluster = require("cluster");
const logger = require("./utils/logger.js");
const { iniciarServidorMongo } = require("./utils/dababase.Connector.js");
const yargs = require("yargs/yargs")(process.argv.slice(2));

//sesiones
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

//conexion a mongoDb
const userModel = require("./models/user.Model.js");
//class
const userHandler = require("./daos/userMongoDb.js");
const usr = new userHandler(userModel);

//engine handlebars
const { engine } = require("express-handlebars");
app.engine("hbs", engine({ defaultLayout: false }));
app.set("view engine", "hbs");

//Uso de Pug
app.set("views", "./views");
app.set("view engine", "pug");
app.set("view engine", "ejs");

//middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGOURL,
      mongoOptions: advancedOptions,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: parseInt(process.env.COOKIE_EXPIRATION_TIME),
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//passport
const initializePassport = require("./config/passport.js");
initializePassport(
  passport,
  (email) => usr.getByMail(email),
  (id) => usr.getById(id)
);

//servidor
const iniciarServidor = async () => {
  iniciarServidorMongo();
  const servidor = server.listen(PORT, () => {
    logger.info(
      `Servidor Express iniciado en modo ${mode} escuchando en el puerto ${
        server.address().port
      } - Proceso N°: ${process.pid} - tipo de ejecución: ${run} `
    );
  });
  servidor.on("error", (error) => logger.error(`Error en servidor ${error}`));
};

//opciones de servidor (yargs)
const { PORT, mode, run } = yargs
  .alias({
    p: "PORT",
    m: "mode",
    r: "run",
  })
  .default({
    PORT: process.env.PORT || 8080,
    mode: process.env.mode || "FORK",
    run: process.env.run || "prod",
  }).argv;
module.exports = { run };

if (mode == "CLUSTER") {
  if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    logger.info(`Proceso Maestro: ${process.pid}`);
    cluster.on("exit", (worker, code, signal) => {
      logger.info(`el worker ${worker.process.pid} se ha cerrado`);
    });
  } else {
    iniciarServidor();
  }
} else {
  iniciarServidor();
}

const usuariosRuta = require("./routes/usuarios.js");
const productosRuta = require("./routes/productos.js");
const carritoRuta = require("./routes/carrito.js");
const mainRuta = require("./routes/main.js");
const main = require("./controllers/main.js");
const ordenesRuta = require("./routes/orden.js");

//rutas api
app.use("/api/productos", productosRuta);
app.use("/api/carrito", carritoRuta);
app.use("/api/usuarios", usuariosRuta);
app.use("/api/orden", ordenesRuta);
//rutas principales
app.use("/", mainRuta);

// default
app.get("*", main.notFound);
