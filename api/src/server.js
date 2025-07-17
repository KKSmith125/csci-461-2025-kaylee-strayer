require('dotenv').config();

const express = require('express');

const app = express();
app.use(express.json());

const clientRoutes = require('./routes/clientRoutes');
app.use('/api/clients', clientRoutes);

const reasonRoutes = require('./routes/reasonRoutes');
app.use('/api/reasons', reasonRoutes);

const trainerRoutes = require('./routes/trainerRoutes');
app.use('/api/trainers', trainerRoutes);

const sessionRoutes = require('./routes/sessionRoutes');
app.use('/api/sessions', sessionRoutes);

const listener = app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server listening at ${listener.address().address}:${listener.address().port}`);
});