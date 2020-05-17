"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var app_1 = __importDefault(require("./app"));
var posts_controller_1 = __importDefault(require("./posts/posts.controller"));
var validateEnv_1 = __importDefault(require("./utils/validateEnv"));
validateEnv_1.default();
var app = new app_1.default([
    new posts_controller_1.default(),
]);
app.listen();
