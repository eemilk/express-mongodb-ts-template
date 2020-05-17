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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var posts_model_1 = __importDefault(require("./posts.model"));
var PostsController = /** @class */ (function () {
    function PostsController() {
        var _this = this;
        this.path = '/posts';
        this.router = express.Router();
        this.post = posts_model_1.default;
        this.getAllPosts = function (req, res) {
            _this.post.find()
                .then(function (posts) {
                res.status(200).send(posts);
            })
                .catch(function (err) {
                res.status(500).send(err);
            });
        };
        this.getPostById = function (req, res) {
            var id = req.params.id;
            _this.post.findById(id)
                .then(function (post) {
                res.status(200).send(post);
            })
                .catch(function (err) {
                res.status(500).send(err);
            });
        };
        this.modifyPost = function (req, res) {
            var id = req.params.id;
            var postData = req.body;
            _this.post.findByIdAndUpdate(id, postData, { new: true })
                .then(function (savedPost) {
                res.status(200).send(savedPost);
            })
                .catch(function (err) {
                res.status(500).send(err);
            });
        };
        this.createPost = function (req, res) {
            var postData = req.body;
            var createdPost = new _this.post(postData);
            createdPost.save()
                .then(function (savedPost) {
                res.status(200).send(savedPost);
            })
                .catch(function (err) {
                res.status(500).send(err);
            });
        };
        this.deletePost = function (req, res) {
            var id = req.params.id;
            _this.post.findByIdAndDelete(id)
                .then(function (succesResponse) {
                if (succesResponse) {
                    res.status(200).send();
                }
                else {
                    res.status(404).send();
                }
            })
                .catch(function (err) {
                res.status(500).send(err);
            });
        };
        this.initializeRoutes();
    }
    PostsController.prototype.initializeRoutes = function () {
        this.router.get(this.path, this.getAllPosts);
        this.router.get(this.path + "/:id", this.getPostById);
        this.router.patch(this.path + "/:id", this.modifyPost);
        this.router.delete(this.path + "/:id", this.deletePost);
        this.router.post(this.path, this.createPost);
    };
    return PostsController;
}());
exports.default = PostsController;
