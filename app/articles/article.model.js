const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    description: String,
    shortDescription: String,
    imagesUrls: Array,
    location: String,
    createdAt: Date
  },
  {
    timestamps: { createdAt: 'createdAt' }
  });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;