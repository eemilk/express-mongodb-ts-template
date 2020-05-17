import * as bodyParser from 'body-parser'
import * as express from 'express'
import mongoose = require('mongoose')
import Controller from './interfaces/controller.interface'

class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express.default()
        
        this.connectToTheDatabase()
        this.initializeMiddlewares()
        this.initializeController(controllers)
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`)
        })
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json())
    }

    private initializeController(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router)
        })
    }

    private connectToTheDatabase() {
        const {
            DBUSER,
            DBPASS,
            DBPATH,
        } = process.env
        mongoose.connect(`mongodb+srv://${DBUSER}:${DBPASS}${DBPATH}`)
    }
}

export default App