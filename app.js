const express = require('express');
const app = express();
const certificateRoutes = require('./routes/certificateRoutes');
const apiRoutes = require('./routes/apiRoutes');

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/certificate', certificateRoutes);
app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
