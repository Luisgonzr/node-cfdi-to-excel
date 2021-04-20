import express from 'express';
import cors from 'cors';

import viewsRoutes from '../routes/views'
import excelfileRoutes from '../routes/excelfile';




export class Server {

    private app: express.Application;
    private port: string;
    private apiPaths = {
        excelfile: '/api/excelfile'
    }



    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middleware();
        this.routes();
    }

    middleware(){
        // CORS
        this.app.use(cors());
        // Body parser
        this.app.use(express.json());
        // Public folder
        this.app.use(express.static('public'));
    }

    async dbConnection(){
        /*try {
            await db.authenticate();
            console.log('Database online');
        } catch (error) {
            throw new Error(error);
            
        }*/
    }

    routes(){
        this.app.use('/', viewsRoutes);
        this.app.use(this.apiPaths.excelfile, excelfileRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ' + this.port);
        });
    }

}