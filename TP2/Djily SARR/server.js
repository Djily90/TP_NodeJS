const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const PORT = 3000;
let users = [
    { id: 1, name: 'Alice Dupont', email: 'alice@example.com' },
    { id: 2, name: 'Bob Martin', email: 'bob@example.com' }
];

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

// Récupération de la liste des utilisateurs
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Récupération d'un utilisateur par son id
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    user ? res.json(user) : res.status(404).send('Utilisateur non trouvé');
});

// Création d'un utilisateur
app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Modification d'un utilisateur
app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('Utilisateur non trouvé');
    
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    res.json(user);
});

// Suppression d'un utilisateur
app.delete('/api/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Utilisateur non trouvé');
    
    users.splice(index, 1);
    res.status(204).send();
});


// Intégration avec API externe en utilisant axios
app.get('/api/users/:id/details', async (req, res) => {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${req.params.id}`);
        res.json({
            localData: users.find(u => u.id === parseInt(req.params.id)),
            externalData: response.data
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur de récupération des données externes' });
    }
});
