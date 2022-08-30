require('dotenv').config();
const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { orderFunction, filterDogs } = require('./orders');
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
      createdIn: 'DogAPI',
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
  let formatDogsDb = dogsDB.map((dog) => {
    let tempsString = [];
    dog.temperaments.map((temp) => {
      tempsString.push(temp.name);
    });

    return {
      id: dog.id,
      name: dog.name,
      bred_for: dog.bred_for,
      breed_group: dog.breed_group,
      temperament: tempsString.join(', '),
      life_span: dog.life_span,
      weight_min: dog.weight_min,
      weight_max: dog.weight_max,
      height_min: dog.height_min,
      height_max: dog.height_max,
      reference_image_id: dog.reference_image_id,
      origin: dog.origin,
      createdInDB: dog.createdInDB,
    };
  });
  //console.log(dogsDB);
  return formatDogsDb;
};

const getAllDogs = async (name, order, filterDB) => {
  if (name) {
    name = name.replace(/['"]+/g, '');
    //console.log(name);
    const apiInfo = await getApiInfo();
    const DBinfo = await getDBDog();
    const allDogs = apiInfo.concat(DBinfo);
    const dogData = allDogs.filter((d) =>
      d.name.toLowerCase().includes(name.toLowerCase())
    );
    return dogData;
  } else {
    if (filterDB === 'DogAPI') {
      const allDogs = await getApiInfo();
      const orderedDogs = orderFunction(order, allDogs);
      return orderedDogs;
      //const filtered = filterFunction(filterTemps, allDogs);
    }
    if (filterDB === 'UserDB') {
      const allDogs = await getDBDog();
      const orderedDogs = orderFunction(order, allDogs);
      return orderedDogs;
      //const filtered = filterFunction(filterTemps, allDogs);
    } else if (filterDB === 'All') {
      const apiInfo = await getApiInfo();
      const DBinfo = await getDBDog();
      const allDogs = apiInfo.concat(DBinfo);
      //allDogs = filterDogs('Active', allDogs); //Error
      const orderedDogs = orderFunction(order, allDogs);
      return orderedDogs;
      //const filtered = filterFunction(filterTemps, allDogs);
      //console.log(filtered);
    }
    //console.log(DBinfo);
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
      reference_image_id: d.image.url,
      origin: d.origin,
    };
  });
  const dogById = apiInfo.filter((e) => e.id === parseInt(id));
  //console.log(dogById);
  return dogById[0];
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
