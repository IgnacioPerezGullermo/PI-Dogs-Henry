const { getTemperament } = require('./index');
const { Temperament } = require('../db');

const getTemps = async (req, res) => {
  const temps = await getTemperament();
  temps
    ? res.status(200).json(temps)
    : res.status(500).json({ error: 'No temps found' });
};

module.exports = { getTemps };
