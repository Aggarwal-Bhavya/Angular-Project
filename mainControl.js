var myApp = angular.module('myApp', ['ngRoute']);
// API Info
const API_ID = 'db8705b8';
const API_KEY = '043e07074ec20dde5fbbf071e255bda4';


// MAIN CONTROLLER
myApp.controller('mainControl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    //loading data from json in menu
    $scope.menuItems = [];
    $http.get('data/menu.json').then(function (res) {
        // console.log('success!');
        $scope.menuItems = res.data;
        // console.log(res.data);
    });

    $scope.favouriteItems = [];
    $http.get('data/favourites.json').then(function (res) {
        console.log('success!');
        $scope.favouriteItems = res.data;
        console.log(res.data);
    });

    $scope.searchedData = [];
    // searchQuery = $scope.search;
    // $scope.search = 'Pizza';
    $scope.$watch('search', function () {
        fetch();
    });

    function fetch() {
        $http.get("https://api.edamam.com/search?q=" + $scope.search + "&app_id=db8705b8&app_key=043e07074ec20dde5fbbf071e255bda4&from=0&to=25")
            .then(function (response) {
                // console.log(response.data);
                $scope.searchedData = response.data.hits;
                console.log($scope.searchedData);
            })
    }

    $scope.myFunction = function (val) {
        return val.category === category;
    }

    $scope.logout = function () {
        localStorage.setItem('code', 'logout');
        $window.location.href = "/login-signup/login.html"
    }
}]);


// SHOPPING CART
myApp.controller('shoppingCartControl', ['$scope', '$rootScope', '$window', function ($scope, $rootScope, $window) {
    // console.log(getLocalStorage.getUsers());
    // console.log($rootScope.currUser)
    $scope.users = JSON.parse(localStorage.getItem('users'));
    $scope.currUser = localStorage.getItem('currUser');

    $scope.matchedUser = $scope.users.filter((person) => {
        return person.email == $scope.currUser || person.username == $scope.currUser;
    })[0];
    console.log($scope.matchedUser);

    $scope.basket = $scope.matchedUser.basket;
    $scope.itemsInBasket = localStorage.getItem('basket');
    console.log($scope.itemsInBasket);
    $scope.generateItems = () => {
        if ($scope.basket.length !== 0) {
            // itemsInBasket = $scope.menuItems.filter((item) => {
            //     return item.id === $scope.basket.id;
            // })
            // $scope.matchedUser[0].basket = itemsInBasket;
        } else {
            console.log('Empty cart');
            // let someHtmlVar = '<h3>Your cart is empty</h3>';
            // $scope.label = $sce.trustAsHtml(someHtmlVar);

        }
    }

    $scope.generateItems();

    $scope.increment = function(id) {
        $scope.search = $scope.basket.find((item) => item.id === id);

        if($scope.search === undefined) {
            $scope.basket.push({
                id: id,
                quantity: 1
            });
        } else {
            $scope.search.quantity += 1;
        }
        localStorage.setItem("basket", JSON.stringify($scope.basket));
        console.log($scope.basket);
    }
}]);



// ROUTES
myApp.config([
    '$routeProvider', 
    function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'mainControl'
        })
        .when('/recipes', {
            templateUrl: 'views/recipes.html',
            controller: 'mainControl'
        })
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
            templateUrl: 'views/logout.html',
            controller: 'mainControl'
        })
        .when('/cart', {
            templateUrl: 'views/cart.html',
            controller: 'shoppingCartControl'
        })
        .otherwise({
            redirectTo: '/home'
        })
}]);