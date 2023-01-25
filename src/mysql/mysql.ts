import mysql = require('mysql');

export default class MySQL {
  private static _instance: MySQL;

  cnn: mysql.Connection;
  conectado: boolean = false;

  constructor() {
    console.log('clase inicializada');

    this.cnn = mysql.createConnection({
      host: 'localhost',
      user: 'blastor',
      password: '123456',
      database: 'node_db',
    });

    this.conectarDB();
  }

  public static get instance(): MySQL {
    return this._instance || ( this._instance = new this() );
  }

  static ejecutarQuery(query: string, cb: Function ) {
    this.instance.cnn.query(query, (err: mysql.MysqlError, results: Object[], fields: mysql.FieldInfo) => {
      if (err) {
        console.log('Error en query');
        console.log(err);
        
        return cb(err);
      }

      if( results.length === 0 ) return cb('El registro solicitado no existe.');

      cb(null, results);


    })
  }

  private conectarDB(): void {
    this.cnn.connect( (err: mysql.MysqlError) => {
      if (err) {
        console.log(err);
        return;
      }

      this.conectado = true;
      console.log('base de datos online!');
    })
  }

}
