require('dotenv').config();
const axios = require('axios');
const { Dog, Temperament } = require('../db');
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
      weight_min: parseInt(d.weight.metric.slice(0, 2).trim()),
      weight_max: parseInt(d.weight.metric.slice(4).trim()),
      height_min: parseInt(d.height.metric.slice(0, 2).trim()),
      height_max: parseInt(d.height.metric.slice(4).trim()),
      reference_image_id: d.image.url,
      origin: d.origin,
    };
  });

  return apiInfo;
};

const getDBDog = async () => {
  var dogsDB = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });
  //console.log(dogsDB);
  return dogsDB;
};

const getAllDogs = async (name) => {
  if (name) {
    name = name.replace(/['"]+/g, '');
    //console.log(name);
    const apiInfo = await getApiInfo();
    const DBinfo = await getDBDog();
    const allDogs = apiInfo.concat(DBinfo);
    const dogData = allDogs.filter((d) =>
      d.name.toLowerCase().includes(name.toLowerCase())
    );
    //console.log(dogData);
    // const laconchadetumadre = dogName.map((data) => {
    //   data.reference_image_id = data.image.url;
    // });
    // console.log(laconchadetumadre);
    return dogData;
  } else {
    const apiInfo = await getApiInfo();
    const DBinfo = await getDBDog();
    const allDogs = apiInfo.concat(DBinfo);
    //console.log(DBinfo);
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
      weight_min: parseInt(d.weight.metric.slice(0, 2).trim()),
      weight_max: parseInt(d.weight.metric.slice(4).trim()),
      height_min: parseInt(d.height.metric.slice(0, 2).trim()),
      height_max: parseInt(d.height.metric.slice(4).trim()),
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
  const objectTemps = cleanTemps.map((temp) => {
    return {
      name: temp,
    };
  });
  return objectTemps;
};

module.exports = {
  getAllDogs,
  getDogById,
  getTemperament,
  getDBDog,
};
