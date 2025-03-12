const express = require('express');
const app = express();
const PORT = 3000;

// Utilisation de EJS comme moteur de template
app.set('view engine', 'ejs');

// Dossier pour les fichiers statiques (CSS, images, etc.)
app.use(express.static('public'));

const { events } = require('./data');

// Route pour la page d'accueil qui affiche tous les événements
app.get('/', (req, res) => {
    res.render('pages/index', { events: events });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
