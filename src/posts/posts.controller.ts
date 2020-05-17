import * as express from 'express'
import Controller from '../interfaces/controller.interface'
import Post from './posts.interface'
import postModel from './posts.model'

class PostsController implements Controller {
    public path = '/posts'
    public router = express.Router()
    private post = postModel
    
    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.get(this.path, this.getAllPosts)
        this.router.get(`${this.path}/:id`, this.getPostById);
        this.router.patch(`${this.path}/:id`, this.modifyPost)
        this.router.delete(`${this.path}/:id`, this.deletePost)
        this.router.post(this.path, this.createPost)
    }

    private getAllPosts = (req: express.Request, res: express.Response) => {
        this.post.find()
            .then((posts: any) => {
                res.status(200).send(posts)
            })
            .catch((err: any) => {
                res.status(500).send(err)
            })
    }

    private getPostById = (req: express.Request, res: express.Response) => {
        const id = req.params.id
        this.post.findById(id)
            .then((post: any) => {
                res.status(200).send(post)
            })
            .catch((err: any) => {
                res.status(500).send(err)
            })
    }

    private modifyPost = (req: express.Request, res: express.Response) => {
        const id = req.params.id
        const postData: Post = req.body
        this.post.findByIdAndUpdate(id, postData, { new: true })
            .then((savedPost: any) => {
                res.status(200).send(savedPost)
            })
            .catch((err: any) => {
                res.status(500).send(err)
            })
    }

    private createPost = (req: express.Request, res: express.Response) => {
        const postData: Post = req.body
        const createdPost = new this.post(postData)
        createdPost.save()
            .then((savedPost: any) => {
                res.status(200).send(savedPost)
            })
            .catch((err: any) => {
                res.status(500).send(err)
            })
    }

    private deletePost = (req: express.Request, res: express.Response) => {
        const id = req.params.id
        this.post.findByIdAndDelete(id)
            .then((succesResponse: any) => {
                if(succesResponse) {
                    res.status(200).send()
                } else {
                    res.status(404).send()
                }
            })
            .catch((err: any) => {
                res.status(500).send(err)
            })
    }
}

export default PostsController