require('dotenv').config();
const axios = require('axios');
const { Dog } = require('../db');
const apiKey = process.env.API_KEY;

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`
  );
  const apiInfo = await apiUrl.data.map((d) => {
    return {
      id: d.id,
      name: d.name,
      bred_for: d.bred_for,
      breed_group: d.breed_group,
      temperament: d.temperament,
      life_span: d.life_span,
      height: d.height,
      weight: d.weight,
      reference_image_id: d.reference_image_id,
      origin: d.origin,
    };
  });

  return apiInfo;
};

const getAllDogs = async (name) => {
  if (name) {
    name = name.replace(/['"]+/g, '');
    console.log(name);
    const dogName = await axios
      .get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
      .catch((error) => {
        return res.status(500).send('errr');
      });
    return dogName.data;
  } else {
    const apiInfo = await getApiInfo();
    const allDogs = [...apiInfo];
    return allDogs;
  }
};

const getDogById = async (id) => {
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`
  );
  const apiInfo = await apiUrl.data.map((d) => {
    return {
      id: d.id,
      name: d.name,
      bred_for: d.bred_for,
      breed_group: d.breed_group,
      temperament: d.temperament,
      life_span: d.life_span,
      height: d.height,
      weight: d.weight,
      reference_image_id: d.reference_image_id,
      origin: d.origin,
    };
  });
  const dogById = apiInfo.filter((e) => e.id === parseInt(id));
  return dogById;
};

function formatTemper(text) {
  let temperaments = [];
  temperaments.push(text.split(' '));
  return temperaments;
}
const getTemperament = async () => {
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`
  );
  let sepTemps = [];
  let temperament = [];
  const apiInfo = await apiUrl.data.map((d) => {
    let temperamentosNuevos = d.temperament;
    temperament.push(temperamentosNuevos);
  });
  const temperamentos = new Set(temperament);
  const temps = [...temperamentos];
  temps.forEach((element) => {
    if (element !== undefined) {
      let fraccDePractica = element;
      fraccDePractica = fraccDePractica.split(', ');
      //fraccDePractica = formatTemper(fraccDePractica);
      fraccDePractica.forEach((element) => {
        sepTemps.push(element);
      });
    }
  });
  const cleaningTemps = new Set(sepTemps);
  const cleanTemps = [...cleaningTemps];
  return cleanTemps;
};

module.exports = {
  getAllDogs,
  getDogById,
  getTemperament,
};
