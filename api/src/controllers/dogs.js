const { getAllDogs, getDogById } = require('./index');
const { Dog } = require('../db');

const getAll = async (req, res) => {
  const { name } = req.query;
  //console.log(typeof name);
  try {
    if (name) {
      const searchedDog = await getAllDogs(name);
      //onsole.log(searchedDog[0]);
      searchedDog.length
        ? res.status(200).json(searchedDog)
        : res.status(404).json({ error: 'Name not found' });
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
  const dogById = await getDogById(id);
  console.log(typeof id);
  dogById.length
    ? res.status(200).json(dogById)
    : res.status(404).send('Dog not found');
};

module.exports = { getAll, getDogId };
