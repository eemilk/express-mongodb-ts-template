"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = __importStar(require("body-parser"));
var express = __importStar(require("express"));
var mongoose = require("mongoose");
var App = /** @class */ (function () {
    function App(controllers) {
        this.app = express.default();
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeController(controllers);
    }
    App.prototype.listen = function () {
        this.app.listen(process.env.PORT, function () {
            console.log("App listening on the port " + process.env.PORT);
        });
    };
    App.prototype.initializeMiddlewares = function () {
        this.app.use(bodyParser.json());
    };
    App.prototype.initializeController = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.app.use('/', controller.router);
        });
    };
    App.prototype.connectToTheDatabase = function () {
        try {
            var _a = process.env, DBUSER = _a.DBUSER, DBPASS = _a.DBPASS, DBPATH = _a.DBPATH;
            mongoose.connect("mongodb+srv://" + DBUSER + ":" + DBPASS + DBPATH);
        }
        catch (error) {
            console.log(error);
        }
    };
    return App;
}());
exports.default = App;
