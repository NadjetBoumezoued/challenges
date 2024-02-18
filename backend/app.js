// app.js

const express = require('express');
const bodyParser = require('body-parser');
const vachesRoutes = require('./routes/vacheRoute');
const examRoutes = require('./routes/examRoute');
const naissRoutes = require('./routes/naissRoute');
const prodRoutes = require('./routes/productionRoute');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
// Utilisation des routes pour les vaches
app.use('/api', vachesRoutes);
app.use('/api', examRoutes);
app.use('/api', naissRoutes);
app.use('/api', prodRoutes);
// Middleware de gestion des erreurs
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
