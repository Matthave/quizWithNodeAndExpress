const express = require('express'); // Framework import
const app = express(); //Ascription server create by induction Express()
const path = require('path');
const gameRoutes = require('./routes/game');

app.listen(3000, () => {
    console.log('Server is listening at http://localhost.3000/')
});

app.use(express.static( // MiddleWare do Plików Statycznych
    path.join(__dirname, 'public')
)); // Obsługa plików statycznych z folderu Public

gameRoutes(app);