angular
  .module('app')
  .factory('dummyProgramCategories', makedummyProgramCategories);

function makedummyProgramCategories() {
    let dummyProgramCategories = {};

    dummyProgramCategories.categories = [
        {
            title: 'Housing',
            id: 'housing'
        },
        {
            title: 'Health',
            id: 'health'
        }
    ];

    return dummyProgramCategories;
}
