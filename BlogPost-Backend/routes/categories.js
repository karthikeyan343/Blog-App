const express = require('express');
const router= express().router;
const Category = require('../models/Category');
const post = require('../models/post');

router.get('/',async (req,res)=>{
    try {
        const categories = await Category.find();
        res.json(categories)
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

router.get('/:id', async(req,res)=>{
    try {
        let id = req.params.id;
        const categories = await Category.findById(id);
        if(!categories){
           return res.status(404).json({message:"Post Not Found!"});
        }
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

router.post('/',async (req,res)=>{
    const newCategories = new Category({
       name : req.body.name,
       slug : req.body.slug,
       description : req.body.description
    });
    try {
        await newCategories.save();
        res.status(201).json(newCategories);
    } catch (error) {
         res.status(400).json({message:error.message});
    }
});

router.put('/:id',async (req,res)=>{
try{
   const id = req.params.id;
   const category = await Category.findById(id);
   if(!category){
    return res.status(404).json({message:"id not found"})
   }
       category.name = req.body.name || category.name;
       category.slug = req.body.slug  ||  category.slug;
       category.description = req.body.description || category.description;
       category.updatedAt = Date.now();

   const updatedCategory = await category.save();
   res.status(201).json(updatedCategory);
}
catch(error){
res.status(400).json({error:error.message});
}});

router.delete('/:id',async(req,res)=>{
   try{
   const id = req.params.id;
   const categories = await Category.findById(id);
   if(!categories){
       return res.status(404).json({message:"not found"});
   }
   await Category.findByIdAndDelete(id);
   res.json({message:"Post Deleted Successfully"});
   }
   catch(error){
    res.status(500).json({message:error.message});
   }
});

// fetch post by category id
router.get('/category/:categoryId',async (req,res)=>{
    try{
     const CategoryId = req.params.categoryId;
     const CategoryExists = Category.find(CategoryId);
     if(!CategoryExists){
        res.status(400).json({message:"Invalid Id"});
     }

     const posts = await post.find({category:CategoryId}).populate('category');
     res.status(200).json(posts);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})


module.exports = router;