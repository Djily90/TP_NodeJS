require("dotenv").config(); // Charger les variables d'environnement
const express = require("express");
const connectDB = require("./config/database");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");
 
const app = express();
 
const bookRoutes = require("./routes/bookRoutes");
 
// Connexion à MongoDB
connectDB();
 
// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/books", bookRoutes);
 
// Configuration du moteur de vue EJS
app.set("view engine", "ejs");
 
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.render('index');
});
 
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
 