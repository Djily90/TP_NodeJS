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
