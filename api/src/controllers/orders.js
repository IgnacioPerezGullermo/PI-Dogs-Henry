// Funciones para ordenar
const orderFunction = async (order, arr) => {
  switch (order) {
    case 'Alfabetic':
      // Alfabetico A-Z
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
      //Alfabetico Z-A
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
      // Peso mas pequeño
      arr.sort(function (a, b) {
        return a.weight_min - b.weight_min;
      });
      //console.log(allDogs);
      return arr;
    case 'WeightMax':
      //Pero mas grande
      arr.sort(function (a, b) {
        return b.weight_min - a.weight_min;
      });
      //console.log(allDogs);
      return arr;
    default:
      console.log('Aclare el ordenamiento');
  }
};

module.exports = { orderFunction };
