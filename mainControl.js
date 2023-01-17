var myApp = angular.module('myApp', ['ngRoute']);
// API Info
const API_ID = 'db8705b8';
const API_KEY = '043e07074ec20dde5fbbf071e255bda4';


myApp.controller('mainControl', ['$scope', '$http', function($scope, $http) {
    //loading data from json in menu
    $scope.menuItems = [];
    $http.get('data/menu.json').then(function(res) {
        // console.log('success!');
        $scope.menuItems =  res.data;
        // console.log(res.data);
    });

    $scope.favouriteItems = [];
    $http.get('data/favourites.json').then(function(res) {
        console.log('success!');
        $scope.favouriteItems = res.data;
        console.log(res.data);
    });

    $scope.searchedData = [];
    // searchQuery = $scope.search;
    // $scope.search = 'Pizza';
    $scope.$watch('search', function() {
        fetch();
    });

    function fetch() {
        $http.get("https://api.edamam.com/search?q=" + $scope.search + "&app_id=db8705b8&app_key=043e07074ec20dde5fbbf071e255bda4&from=0&to=25")
        .then(function(response) {
            // console.log(response.data);
            $scope.searchedData = response.data.hits;
            console.log($scope.searchedData);
        })
    }

    $scope.myFunction = function(val) {
        return val.category === category;
    }
}]);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'mainControl'
        })
        // .when('/recipes', {
        //     templateUrl: 'views/recipes.html',
        //     controller: 'mainControl'
        // })
        .when('/favourites', {
            templateUrl: 'views/favourites.html', 
            controller: 'mainControl'
        })
        .when('/about', {
            templateUrl: 'views/about.html'
        })
        .when('/know-more', {
            templateUrl: 'views/know-more.html'
        })
        .when('/logout', {
            templateUrl: 'views/logout.html'
        })
        .otherwise({
            redirectTo: '/home'
        })
}]);