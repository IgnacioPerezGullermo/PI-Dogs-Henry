const { getAllDogs, getDogById, getDBDog } = require('./index');
const { Dog, Temperament } = require('../db');
const { filterFunction, filterDogs } = require('./orders');

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
    if (name) {
      const result = {};

      const allDogs = await getAllDogs(name);
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
      //onsole.log(searchedDog[0]);
      console.log(allDogs.slice(startIndex, endIndex));
      result.results = allDogs.slice(startIndex, endIndex);
      allDogs
        ? res.status(200).json(result)
        : res.status(404).json({ error: 'Name not found' });
    } else if (page != undefined) {
      if (order && filterDB) {
        if (!filterTemps) {
          let allDogs = await getAllDogs(false, order, filterDB);
          //console.log(allDogs);
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
        } else {
          let allDogs = await getAllDogs(false, order, filterDB);
          console.log(allDogs.length);
          allDogs = allDogs.filter((dog) => {
            if (typeof dog.temperament === 'string') {
              return dog.temperament.includes(filterTemps);
            }
          });

          // allDogs.map((dog) => {
          //   //console.log(dog.temperament);
          //   if (dog.temperament.indexOf('Active')) {
          //     return filteredDogs.push(dog);
          //   }
          // }); //Error
          console.log(allDogs);
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
      } else {
        const allDogs = await getAllDogs(false, 'Alfabetic');
        const totalPages = Math.ceil(allDogs.length / limit);
        const totalPagesArray = [];
        for (var i = 0; i < totalPages; i++) {
          totalPagesArray.push({ page: i + 1 });
        }
        //onsole.log(totalPagesArray);
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
    } else {
      const allDogs = await getAllDogs();
      allDogs.length
        ? res.status(200).json(allDogs)
        : res.status(404).send('No data');
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const getDogId = async (req, res) => {
  const { id } = req.params;
  //console.log(i);
  const apiDog = await getDogById(id);
  const dbDogs = await getDBDog();
  //console.log(allDogs);
  // const dogById = allDogs.find((d) => d.id === parseInt(id));
  const dogDBById = dbDogs.find((d) => d.id === id);
  console.log(apiDog);
  //console.log(id);
  //console.log(dbDogs);
  if (!dogDBById) {
    apiDog
      ? res.status(200).json(apiDog)
      : res.status(404).send('Dog not found');
  } else {
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
    // takes that data for the new dog
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
