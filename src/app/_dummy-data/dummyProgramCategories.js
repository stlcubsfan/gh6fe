angular
  .module('app')
  .factory('dummyProgramCategories', makedummyProgramCategories);

function makedummyProgramCategories() {
    let dummyProgramCategories = {};

    dummyProgramCategories.categories = [
      {
          title: 'Careers',
          id: 'careers'
      },
      {
          title: 'Education',
          id: 'education'
      },
      {
            title: 'Housing',
            id: 'housing'
        },
        {
            title: 'Health',
            id: 'health'
        },
        {
            title: 'Meals',
            id: 'meals'
        }
    ];

    return dummyProgramCategories;
}
