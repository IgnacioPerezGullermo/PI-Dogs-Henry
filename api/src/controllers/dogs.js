const { getAllDogs, getDogById, getDBDog } = require('./index');
const { Dog, Temperament } = require('../db');

const getAll = async (req, res) => {
  const { name } = req.query;
  const { page } = req.query;
  const { limit } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  //console.log(typeof name);
  try {
    if (name) {
      const result = {};
      const searchedDog = await getAllDogs(name);
      result.results = searchedDog;
      //onsole.log(searchedDog[0]);
      searchedDog.length
        ? res.status(200).json(result)
        : res.status(404).json({ error: 'Name not found' });
    } else if (page != undefined) {
      const allDogs = await getAllDogs();
      const result = {};
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
      const allDogs = await getAllDogs();
      allDogs.length
        ? res.status(200).json(allDogs)
        : res.status(404).send('No data');
    }
  } catch (error) {
    res.status(404).send('error');
  }
};

const getDogId = async (req, res) => {
  const { id } = req.params;
  //console.log(i);
  const allDogs = await getAllDogs();
  const dbDogs = await getDBDog();
  const formatDBDogs = dbDogs.map((d) => {
    //console.log(d.dataValues.temperaments);
    let temps = d.dataValues.temperaments;
    let tempString = [];
    temps.map((tem) => {
      tempString.push(tem.name);
    });
    console.log(tempString);
    return {
      id: d.dataValues.id,
      name: d.dataValues.name,
      bred_for: d.dataValues.bred_for,
      breed_group: d.dataValues.breed_group,
      temperaments: tempString.join(', '),
      life_span: d.dataValues.life_span,
      weight_min: d.dataValues.weight_min,
      weight_max: d.dataValues.weight_min,
      height_min: d.dataValues.weight_min,
      height_max: d.dataValues.weight_min,
      reference_image_id: d.dataValues.reference_image_id,
      origin: d.dataValues.origin,
    };
  });
  const dogById = allDogs.find((d) => d.id === parseInt(id));
  const dogDBById = formatDBDogs.find((d) => d.id === id);
  //console.log(id);
  //console.log(dbDogs);
  if (!dogDBById) {
    dogById
      ? res.status(200).json(dogById)
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
