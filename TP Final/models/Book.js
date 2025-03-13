const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est obligatoire'],
    minlength: [3, 'Le titre doit contenir au moins 3 caractères']
  },
  author: {
    type: String,
    required: [true, 'L\'auteur est obligatoire'],
    minlength: [3, 'Le nom de l\'auteur doit contenir au moins 3 caractères']
  },
  publicationYear: {
    type: Number,
    required: [true, 'L\'année de publication est obligatoire']
  },
  summary: {
    type: String,
    maxlength: [500, 'Le résumé ne doit pas dépasser 500 caractères']
  }
});

module.exports = mongoose.model('Book', bookSchema);
