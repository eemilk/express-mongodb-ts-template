import * as mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    author: String,
    name: String,
    created_at: Date,
    description: String,
})

const postModel = mongoose.model('Post', postSchema)

export default postModel