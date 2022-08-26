const validateName = /^[a-z]+$/i;
const validateNum = /^\d+$/;
const validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;

const validate = (input) => {
  let errors = {};
  if (!validateName.test(input.name) || input.name.length < 3) {
    errors.name = 'Name required.';
  } else if (!validateNum.test(input.hp) || parseInt(input.hp) < 1) {
    errors.hp = 'Number required. Higher than one';
  } else if (!validateUrl.test(input.img)) {
    errors.img = 'URL required';
  }

  return errors;
};

const valuesSubmit = (input) => {
  let values = {};
  if (input.name.length > 3) {
    values.name = input.name;
  }
  if (input.hp > 1) {
    values.hp = input.hp;
  }
  if (input.attack > 1) {
    values.attack = input.attack;
  }
  if (input.defense > 1) {
    values.defense = input.defense;
  }
  if (input.speed > 1) {
    values.speed = input.speed;
  }
  if (input.height > 1) {
    values.height = input.height;
  }
  if (input.weight > 1) {
    values.weight = input.weight;
  }
  if (input.img !== '') {
    values.img = input.img;
  }
  values.types = input.types;

  return values;
};

module.exports = { validate, valuesSubmit };
