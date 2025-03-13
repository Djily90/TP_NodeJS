const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
 
// Afficher la liste des livres
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.render("books/list", { books });
  } catch (error) {
    console.error("Erreur lors de la récupération des livres :", error);
    res.status(500).send("Erreur serveur");
  }
});
 
// Afficher le formulaire de création d'un livre
router.get("/new", (req, res) => {
  res.render("books/create");
});
 
// Ajouter un nouveau livre
router.post("/", async (req, res) => {
  try {
    await Book.create(req.body);
    res.redirect("/books");
  } catch (error) {
    console.error("Erreur lors de l'ajout du livre :", error);
    res.status(400).send("Erreur de validation");
  }
});
 
// Afficher les détails d'un livre
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Livre non trouvé");
    res.render("books/details", { book });
  } catch (error) {
    console.error("Erreur lors de la récupération du livre :", error);
    res.status(500).send("Erreur serveur");
  }
});
 
// Afficher le formulaire de modification d'un livre
router.get("/:id/edit", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Livre non trouvé");
    res.render("books/edit", { book });
  } catch (error) {
    console.error("Erreur lors de la récupération du livre :", error);
    res.status(500).send("Erreur serveur");
  }
});
 
// Modifier un livre existant
router.put("/:id", async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
    res.redirect("/books");
  } catch (error) {
    console.error("Erreur lors de la mise à jour du livre :", error);
    res.status(400).send("Erreur de validation");
  }
});
 
// Supprimer un livre
router.delete("/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect("/books");
  } catch (error) {
    console.error("Erreur lors de la suppression du livre :", error);
    res.status(500).send("Erreur serveur");
  }
});
 
module.exports = router;