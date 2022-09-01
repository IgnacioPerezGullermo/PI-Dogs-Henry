require('dotenv').config();
const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { orderFunction } = require('./orders');
const apiKey = process.env.API_KEY;

const getApiInfo = async () => {
  // Traigo toda la info de la Dog API
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`
  );
  // Hago un mapeo para ajustar la info a mis necesidades
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
  // Traigo todos los datos de DB sobre perros
  var dogsDB = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });
  // Hago un mapeo para ajustar la info a mis necesidades
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
  return formatDogsDb;
};

const getAllDogs = async (name, order, filterDB) => {
  if (name) {
    // Si tiene parametro name...
    name = name.replace(/['"]+/g, '');
    //console.log(name);
    const apiInfo = await getApiInfo();
    const DBinfo = await getDBDog();
    const allDogs = apiInfo.concat(DBinfo);
    // Buscaremos en todos los datos aquellos que incluyan el string enviado
    const dogData = allDogs.filter((d) =>
      d.name.toLowerCase().includes(name.toLowerCase())
    );
    return dogData;
  } else if (order && filterDB) {
    // Enviamos la info filtrada por la fuente de la info
    if (filterDB === 'DogAPI') {
      // Aca entregaremos toda la info de Dog API
      const allDogs = await getApiInfo();
      // Enviamos los datos a la funcion de ordenamiento
      const orderedDogs = orderFunction(order, allDogs);
      return orderedDogs;
    }
    if (filterDB === 'UserDB') {
      // Aca entregaremos toda la info de la DB
      const allDogs = await getDBDog();
      // Enviamos los datos a la funcion de ordenamiento
      const orderedDogs = orderFunction(order, allDogs);
      return orderedDogs;
    } else if (filterDB === 'All') {
      // Este es el caso en que no haya filtro aplicado
      const apiInfo = await getApiInfo();
      const DBinfo = await getDBDog();
      const allDogs = apiInfo.concat(DBinfo);
      // Enviamos los datos a la funcion de ordenamiento
      const orderedDogs = orderFunction(order, allDogs);
      return orderedDogs;
    }
  } else if (!name && !order && !filterDB) {
    const apiInfo = await getApiInfo();
    const DBinfo = await getDBDog();
    const allDogs = apiInfo.concat(DBinfo);
    return allDogs;
  }
};

const getDogById = async (id) => {
  const apiUrl = await getApiInfo();
  // Traigo toda la data de la Dog API y le aplico filtro para extraer el detalle
  const dogById = apiUrl.filter((e) => e.id === parseInt(id));
  return dogById[0];
};

const getTemperament = async () => {
  //Traigo la info de la Dog API
  const apiUrl = await getApiInfo();
  let sepTemps = [];
  let temperament = [];
  //Mapeo para extraer todos los temperamentos de la API y los meto en un array
  const apiInfo = await apiUrl.map((d) => {
    let temperamentosNuevos = d.temperament;
    temperament.push(temperamentosNuevos);
  });
  //Limpio todos los repetidos con un Set
  const temperamentos = new Set(temperament);
  const temps = [...temperamentos];
  //Entro en cada objeto del array, para crear un nuevo array de todos los temps
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
  // Extraigo los repetidos nuevamente
  const cleaningTemps = new Set(sepTemps);
  const cleanTemps = [...cleaningTemps];
  //Creo objeto con key=value para la creacion de los Temps en la DB
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
