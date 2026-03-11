const mongoose = require('mongoose');
const express = require('express');
const router= express().router;
const Category = require('../models/Category');
const post = require('../models/post');


router.get('/',async(req,res)=>{
    try {
        const posts = await post.find()
        res.json(posts);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

router.get('/:id', async(req,res)=>{
    try {
        let id = req.params.id;
        const Post = await post.findById(id);
        if(!Post){
           return res.status(404).json({message:"Post Not Found!"});
        }
        res.status(200).json(Post);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

router.post('/',async (req,res)=>{
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

router.put('/:id',async (req,res)=>{
try{
   const id = req.params.id;
   const Post = await post.findById(id);
   if(!Post){
    return res.status(404).json({message:"id not found"})
   }
   Post.title = req.body.title || Post.title;
   Post.content = req.body.content || Post.content;
   Post.category = req.body.category || Post.category;
   Post.author = req.body.author || Post.author;
   Post.image = req.body.image || Post.image;
   Post.updatedAt = Date.now();

   const updatedPost = await Post.save();
   res.status(201).json(updatedPost);
}
catch(error){
res.status(400).json({error:error.message});
}
})

router.delete('/:id',async(req,res)=>{
   try{
   const id = req.params.id;
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

