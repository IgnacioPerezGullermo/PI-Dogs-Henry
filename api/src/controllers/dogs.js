const { getAllDogs, getDogById, getDBDog } = require('./index');
const { Dog, Temperament } = require('../db');

const getAll = async (req, res) => {
  const { name } = req.query;
  const { page } = req.query;
  const { limit } = req.query;
  const { order } = req.query;
  const { filterDB } = req.query;
  const { filterTemps } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  //console.log(typeof name);
  try {
    // Obtencion de perros por nombre
    if (name) {
      const result = {};
      const allDogs = await getAllDogs(name);
      // Set de Informacion del paginado
      const totalPages = Math.ceil(allDogs.length / limit);
      const totalPagesArray = [];
      for (var i = 0; i < totalPages; i++) {
        totalPagesArray.push({ page: i + 1 });
      }
      result.page = {
        total: totalPagesArray,
      };
      if (endIndex < allDogs.length) {
        result.next = {
          page: parseInt(page) + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        result.previous = {
          page: parseInt(page) - 1,
          limit: limit,
        };
      }
      //Extraigo los 8 que voy a mostrar
      result.results = allDogs.slice(startIndex, endIndex);
      allDogs
        ? res.status(200).json(result)
        : res.status(404).json({ error: 'Name not found' });
    } else if (page != undefined) {
      // Busqueda con parametros de ordenamiento y filtrado
      if (order && filterDB) {
        if (!filterTemps) {
          let allDogs = await getAllDogs(false, order, filterDB);
          // Set de Informacion del paginado
          const totalPages = Math.ceil(allDogs.length / limit);
          const totalPagesArray = [];
          for (var i = 0; i < totalPages; i++) {
            totalPagesArray.push({ page: i + 1 });
          }
          const result = {};
          result.page = {
            total: totalPagesArray,
          };
          if (endIndex < allDogs.length) {
            result.next = {
              page: parseInt(page) + 1,
              limit: limit,
            };
          }
          if (startIndex > 0) {
            result.previous = {
              page: parseInt(page) - 1,
              limit: limit,
            };
          }
          //Extraigo los 8 que voy a mostrar
          result.results = allDogs.slice(startIndex, endIndex);

          result.results.length
            ? res.status(200).json(result)
            : res.status(404).send('No data');
        } else {
          // Filtrado por temperamento
          let allDogs = await getAllDogs(false, order, filterDB);
          console.log(allDogs.length);
          // Encuentra aquellos que posean el temperamento buscado
          allDogs = allDogs.filter((dog) => {
            if (typeof dog.temperament === 'string') {
              return dog.temperament.includes(filterTemps);
            }
          });
          // Set de informacion de paginado
          const totalPages = Math.ceil(allDogs.length / limit);
          const totalPagesArray = [];
          for (var i = 0; i < totalPages; i++) {
            totalPagesArray.push({ page: i + 1 });
          }
          const result = {};
          result.page = {
            total: totalPagesArray,
          };
          if (endIndex < allDogs.length) {
            result.next = {
              page: parseInt(page) + 1,
              limit: limit,
            };
          }
          if (startIndex > 0) {
            result.previous = {
              page: parseInt(page) - 1,
              limit: limit,
            };
          }
          //Extraigo los 8 que voy a mostrar
          result.results = allDogs.slice(startIndex, endIndex);

          result.results.length
            ? res.status(200).json(result)
            : res.status(404).send('No data');
        }
      } else {
        //Caso en que no se suministre parametros
        const allDogs = await getAllDogs(false, 'Alfabetic');
        const totalPages = Math.ceil(allDogs.length / limit);
        const totalPagesArray = [];
        for (var i = 0; i < totalPages; i++) {
          totalPagesArray.push({ page: i + 1 });
        }
        const result = {};
        result.page = {
          total: totalPagesArray,
        };
        if (endIndex < allDogs.length) {
          result.next = {
            page: parseInt(page) + 1,
            limit: limit,
          };
        }
        if (startIndex > 0) {
          result.previous = {
            page: parseInt(page) - 1,
            limit: limit,
          };
        }
        result.results = allDogs.slice(startIndex, endIndex);
        result.results.length
          ? res.status(200).json(result)
          : res.status(404).send('No data');
      }
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const getDogId = async (req, res) => {
  const { id } = req.params;
  //Perro solicitado de la API
  const apiDog = await getDogById(id);
  //Perros provenientes de mi DB
  const dbDogs = await getDBDog();
  //Filtro los perros por el param id
  const dogDBById = dbDogs.find((d) => d.id === id);
  // Si no encontro por id, significa que el id no UUDIV, es decir que viene de Dog API
  if (!dogDBById) {
    apiDog
      ? res.status(200).json(apiDog)
      : res.status(404).send('Dog not found');
  } else {
    //Envio el perro de la DB con id encontrado.
    dogDBById
      ? res.status(200).json(dogDBById)
      : res.status(404).send('Dog not found');
  }
};

const postDog = async (req, res) => {
  var {
    name,
    life_span,
    origin,
    reference_image_id,
    bred_for,
    breed_group,
    weight_min,
    weight_max,
    height_min,
    height_max,
    temps,
  } = req.body;
  if (
    name &&
    height_min &&
    height_max &&
    weight_min &&
    weight_max &&
    temps &&
    life_span &&
    origin &&
    reference_image_id &&
    bred_for &&
    breed_group
  ) {
    // Crea el perro en base al modelo creado, y la data del req.body
    const createDog = await Dog.create({
      name: name,
      origin: origin,
      reference_image_id:
        reference_image_id || 'https://dog.ceo/api/breeds/image/random',
      bred_for: bred_for,
      breed_group: breed_group,
      height_min: parseInt(height_min),
      height_max: parseInt(height_max),
      weight_min: parseInt(weight_min),
      weight_max: parseInt(weight_max),
      life_span: life_span,
    });
    temps.map(async (el) => {
      const findTemp = await Temperament.findAll({
        where: { name: el },
      });
      createDog.addTemperament(findTemp);
    });
    res.status(200).send(createDog);
  } else {
    res.status(404).send('Data needed to proceed is missing');
  }
};

module.exports = { getAll, getDogId, postDog };
