const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const Console = require("../helpers/console.js");
const { dbConnection } = require("../database/config.js");

const console = new Console("Server");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/v1/auth",
      users: "/api/v1/users",
    };
    
    // Conectar a base de datos
    this.conectarDB();
    
    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }
  
  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());
    
    // Directorio Público
    this.app.use(express.static("public"));

    // Fileupload - Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.users, require("../v1/routes/userRoutes.js"));
    this.app.use(this.paths.auth, require("../v1/routes/authRoutes.js"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.success(`Servidor corriendo en puerto ${this.port}`);
    });
  }
}

module.exports = Server;
