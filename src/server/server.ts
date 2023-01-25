import express = require('express');
import path = require('path');

export default class Server {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.port = port;
    this.app = express();
  }

  static init(port: number): Server {
    return new Server( port );
  }

  private publicFolder(): void {
    const publicPath: string = path.resolve(__dirname, '../public');
    this.app.use(express.static(publicPath));
  }

  start(cb: () => void ) {
    this.app.listen(this.port, cb);
    this.publicFolder();
  }
}

