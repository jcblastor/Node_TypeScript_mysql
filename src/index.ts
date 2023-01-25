import MySQL from "./mysql/mysql";
import router from "./router/router";
import Server from "./server/server";

const server = Server.init(3000);
server.app.use(router);

// llamado a la instancia de mysql
// MySQL.instance;

server.start( () => console.log('Servidor corriendo en el puerto 3000') );