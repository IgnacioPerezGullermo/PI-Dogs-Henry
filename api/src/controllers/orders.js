var info = [
  {
    id: 59,
    name: 'Brittany',
    bred_for: 'Pointing, retrieving',
    breed_group: 'Sporting',
    temperament: 'Agile, Adaptable, Quick, Intelligent, Attentive, Happy',
    life_span: '12 - 14 years',
    weight_min: 14,
    weight_max: 20,
    height_min: 44,
    height_max: 52,
    reference_image_id: 'https://cdn2.thedogapi.com/images/HJWZZxc4X.jpg',
    createdIn: 'DogAPI',
  },
  {
    id: 61,
    name: 'Bull Terrier',
    bred_for: 'Bull baiting, Fighting',
    breed_group: 'Terrier',
    temperament: 'Trainable, Protective, Sweet-Tempered, Keen, Active',
    life_span: '10 - 12 years',
    weight_min: 23,
    weight_max: 32,
    height_min: 53,
    height_max: 56,
    reference_image_id: 'https://cdn2.thedogapi.com/images/VSraIEQGd.jpg',
    createdIn: 'DogAPI',
  },
  {
    id: 62,
    name: 'Bull Terrier (Miniature)',
    bred_for: "An elegant man's fashion statement",
    temperament:
      'Trainable, Protective, Sweet-Tempered, Keen, Active, Territorial',
    life_span: '11 – 14 years',
    weight_min: 11,
    weight_max: 15,
    height_min: 25,
    height_max: 36,
    reference_image_id: 'https://cdn2.thedogapi.com/images/BkKZWlcVX.jpg',
    createdIn: 'DogAPI',
  },
  {
    id: 64,
    name: 'Bullmastiff',
    bred_for: 'Estate guardian',
    breed_group: 'Working',
    temperament:
      'Docile, Reliable, Devoted, Alert, Loyal, Reserved, Loving, Protective, Powerful, Calm, Courageous',
    life_span: '8 - 12 years',
    weight_min: 45,
    weight_max: 59,
    height_min: 61,
    height_max: 69,
    reference_image_id: 'https://cdn2.thedogapi.com/images/r1ifZl5E7.jpg',
    createdIn: 'DogAPI',
  },
  {
    id: 65,
    name: 'Cairn Terrier',
    bred_for: 'Bolting of otter, foxes, other vermin',
    breed_group: 'Terrier',
    temperament: 'Hardy, Fearless, Assertive, Gay, Intelligent, Active',
    life_span: '14 - 15 years',
    weight_min: 6,
    weight_max: 6,
    height_min: 23,
    height_max: 25,
    reference_image_id: 'https://cdn2.thedogapi.com/images/Sk7Qbg9E7.jpg',
    createdIn: 'DogAPI',
  },
  {
    id: 67,
    name: 'Cane Corso',
    bred_for: 'Companion, guard dog, and hunter',
    breed_group: 'Working',
    temperament: 'Trainable, Reserved, Stable, Quiet, Even Tempered, Calm',
    life_span: '10 - 11 years',
    weight_min: 40,
    weight_max: 54,
    height_min: 60,
    height_max: 70,
    reference_image_id: 'https://cdn2.thedogapi.com/images/r15m-lc4m.jpg',
    createdIn: 'DogAPI',
  },
  {
    id: '2d23f952-38d9-462b-b4bd-038598a6c066',
    name: 'Canichazo',
    bred_for: 'Being anoying',
    breed_group: 'Toy',
    temperament: 'Independent, Dutiful, Curious',
    life_span: '10 - 12 years',
    weight_min: 50,
    weight_max: 70,
    height_min: 10,
    height_max: 12,
    reference_image_id:
      'https://t1.ea.ltmcdn.com/es/posts/2/9/6/como_educar_a_un_caniche_25692_orig.jpg',
    origin: 'Germany',
    createdInDB: true,
  },
  {
    id: '8e3c67ad-ebf2-42aa-8dbe-4f5485baf6e1',
    name: 'Canichazo',
    bred_for: 'Being Black',
    breed_group: 'Toy',
    temperament: 'Playful, Dutiful',
    life_span: '10 - 15 years',
    weight_min: 50,
    weight_max: 80,
    height_min: 10,
    height_max: 12,
    reference_image_id: 'https://static.dw.com/image/60584047_303.jpg',
    origin: 'Argentina',
    createdInDB: true,
  },
];
const orderFunction = async (order, arr) => {
  switch (order) {
    case 'Alfabetic':
      arr.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      return arr;
    case 'AlfabeticRe':
      arr.sort(function (a, b) {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
      //console.log(allDogs);
      return arr;
    case 'WeightMin':
      arr.sort(function (a, b) {
        return a.weight_min - b.weight_min;
      });
      //console.log(allDogs);
      return arr;
    case 'WeightMax':
      arr.sort(function (a, b) {
        return b.weight_min - a.weight_min;
      });
      //console.log(allDogs);
      return arr;
    default:
      console.log('Aclare el ordenamiento');
  }
};
const filterFunction = async (temp, arr) => {
  let filteredArray = arr.filter((dog) => dog.temperaments.includes(temp));
  return filteredArray;
};
const filterDogs = (termino, array) => {
  return array.filter((el) => el.temperament.includes(termino));
};

module.exports = { orderFunction, filterFunction, filterDogs };
