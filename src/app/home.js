angular
  .module('app')
  .component('home', {
    templateUrl: 'app/home.html',
    controller() {
      this.hello = 'Hello World!';
    }
  });
