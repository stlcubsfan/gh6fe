angular
  .module('app')
  .component('app', {
    templateUrl: 'app/home.html',
    controller() {
      this.hello = 'Hello World!';
    }
  });
