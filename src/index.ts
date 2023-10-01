import express, {Application, Request, Response } from "express";
import Database from "./config/database";
const helmet = require("helmet");

class App{
    public app: Application

    constructor(){
        this.app = express()
        this.databaseSync()
        this.plugins()
        this.routes()
    }

    protected plugins(): void {
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    protected databaseSync(): void {
        const db = new Database()
        db.sequelize?.sync();

    }

    protected routes(): void{
        this.app.get( "/", ( req: Request, res: Response ) => {
            res.send( "Hello world!" );
        } );
    }
}

const port = 3000;
const app = new App().app

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );