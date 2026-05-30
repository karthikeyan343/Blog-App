const mongoose = require('mongoose');
const categories = require('../categories.json');
const posts = require('../posts.json');
const Category = require('../models/Category');
const Post = require('../models/post');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern_app';

const seedDatabase = async () => {
  await mongoose.connect(MONGO_URI);

  await Post.deleteMany({});
  await Category.deleteMany({});

  const insertedCategories = await Category.insertMany(categories);
  const categoryByName = insertedCategories.reduce((map, category) => {
    map[category.name] = category._id;
    return map;
  }, {});

  const normalizedPosts = posts.map((post) => {
    const categoryId = categoryByName[post.category];

    if (!categoryId) {
      throw new Error(`Unknown category "${post.category}" for post "${post.title}"`);
    }

    return {
      ...post,
      category: categoryId,
    };
  });

  await Post.insertMany(normalizedPosts);
  console.log(`Seeded ${insertedCategories.length} categories and ${normalizedPosts.length} posts.`);
};

seedDatabase()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
