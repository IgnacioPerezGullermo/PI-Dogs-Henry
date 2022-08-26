const { getTemperament } = require('./index');
const { Temperament } = require('../db');

const getTemps = async (req, res) => {
  const temps = await getTemperament();
  temps.forEach((temp) => {
    Temperament.findOrCreate({
      where: {
        name: temp.name,
      },
    });
  });
  const allTemps = await Temperament.findAll();
  allTemps
    ? res.status(200).json(allTemps)
    : res.status(500).json({ error: 'No temps found' });
};

module.exports = { getTemps };
