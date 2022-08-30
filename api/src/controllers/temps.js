const { getTemperament } = require('./index');
const { Temperament } = require('../db');

const getTemps = async (req, res) => {
  //Uso la funcion que trae todos los Temps presentes en la Dog API
  const temps = await getTemperament();
  //Mapeo todos los temps para inyectarles el modelo....
  temps.forEach((temp) => {
    //Y crearlos en la DB
    Temperament.findOrCreate({
      where: {
        name: temp.name,
      },
    });
  });
  //Traigo todos los temps recien creados para devolverlos
  const allTemps = await Temperament.findAll();
  allTemps
    ? res.status(200).json(allTemps)
    : res.status(500).json({ error: 'No temps found' });
};

module.exports = { getTemps };
