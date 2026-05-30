const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const post = require('../models/post');
const { requireAuth } = require('../middleware/auth');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

router.get('/',async(req,res)=>{
    try {
        const posts = await post.find().populate('category').sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

router.get('/:id', async(req,res)=>{
    try {
        let id = req.params.id;
        if (!isValidObjectId(id)) {
           return res.status(400).json({message:"Invalid post id"});
        }
        const Post = await post.findById(id).populate('category');
        if(!Post){
           return res.status(404).json({message:"Post Not Found!"});
        }
        res.status(200).json(Post);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

router.post('/', requireAuth, async (req,res)=>{
    if (!isValidObjectId(req.body.category)) {
        return res.status(400).json({message:"Invalid category id"});
    }

    const newPost = new post({
        title : req.body.title,
        content:req.body.content,
        category:req.body.category,
        author:req.body.author,
        image:req.body.image
    });
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
         res.status(400).json({message:error.message});
    }
});

router.put('/:id', requireAuth, async (req,res)=>{
try{
   const id = req.params.id;
   if (!isValidObjectId(id)) {
    return res.status(400).json({message:"Invalid post id"});
   }
   const Post = await post.findById(id);
   if(!Post){
    return res.status(404).json({message:"id not found"})
   }
   Post.title = req.body.title || Post.title;
   Post.content = req.body.content || Post.content;
   if (req.body.category) {
    if (!isValidObjectId(req.body.category)) {
     return res.status(400).json({message:"Invalid category id"});
    }
    Post.category = req.body.category;
   }
   Post.author = req.body.author || Post.author;
   Post.image = req.body.image || Post.image;

   const updatedPost = await Post.save();
   res.status(200).json(updatedPost);
}
catch(error){
res.status(400).json({error:error.message});
}
})

router.delete('/:id', requireAuth, async(req,res)=>{
   try{
   const id = req.params.id;
   if (!isValidObjectId(id)) {
       return res.status(400).json({message:"Invalid post id"});
   }
   const Post = await post.findById(id);
   if(!Post){
       return res.status(404).json({message:"not found"});
   }
   await post.findByIdAndDelete(id);
   res.json({message:"Post Deleted Successfully"});
   }
   catch(error){
    res.status(500).json({message:error.message});
   }
});

module.exports = router;

