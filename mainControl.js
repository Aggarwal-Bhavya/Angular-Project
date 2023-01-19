var app = angular.module('myApp', ['ngRoute']);
// API Info
// const API_ID = 'db8705b8';
// const API_KEY = '043e07074ec20dde5fbbf071e255bda4';

// login/signup start
// var myApp = angular.module('myApp', ['ngRoute']);

// myApp.run(function($rootScope) {
//     $rootScope.intendedUser = {};
// })

// HOME CONTROLLER
app.controller('homeControl', [
    '$scope',
    '$location',
    '$http',
    function ($scope, $location, $http) {
        var check = localStorage.getItem('code');
        if (check == 'secret') {
        } else {
            $location.path('/');
        }
        $scope.logout = () => {
            // console.log('njrgjknrejkvn');
            localStorage.setItem('code', 'logout');
            $location.path('/');
        };
        $scope.menuItems = [];
        $http.get('data/menu.json').then(function (res) {
            // console.log('success!');
            $scope.menuItems = res.data;
            // console.log(res.data);
        });
        $scope.myFunction = function (val) {
            return val.category === category;
        }
    },
]);

//ABOUT CONTROLLLER
app.controller('aboutControl', [
    '$scope',
    '$location',
    function ($scope, $location) {
        var check = localStorage.getItem('code');
        if (check == 'secret') {
        } else {
            $location.path('/');
        }
        $scope.logout = function () {
            localStorage.setItem('code', 'logout');
            $location.path('/');
        };
    },
]);

//FAVOURITES CONTROLLER
app.controller('favouritesControl', [
    '$scope',
    '$location',
    '$http',
    function ($scope, $location, $http) {
        var check = localStorage.getItem('code');
        if (check == 'secret') {
        } else {
            $location.path('/');
        }
        $scope.logout = function () {
            localStorage.setItem('code', 'logout');
            $location.path('/');
        };
        $scope.favouriteItems = [];
        $http.get('data/favourites.json').then(function (res) {
            // console.log('success!');
            $scope.favouriteItems = res.data;
            // console.log(res.data);
        });
    },
]);

//CART CONTROLLER
app.controller('cartControl', [
    '$scope',
    '$location',
    function ($scope, $location) {
        var check = localStorage.getItem('code');
        if (check == 'secret') {
        } else {
            $location.path('/');
        }
        $scope.logout = function () {
            localStorage.setItem('code', 'logout');
            $location.path('/');
        };
    },
]);

// KNOW-MORE CONTROLLER
app.controller('knowMoreControl', [
    '$scope',
    '$location',
    function ($scope, $location) {
        var check = localStorage.getItem('code');
        if (check == 'secret') {
        } else {
            $location.path('/');
        }
        $scope.logout = function () {
            localStorage.setItem('code', 'logout');
            $location.path('/');
        };
    },
]);

//RECIPES CONTROLLER
app.controller('recipesControl', [
    '$scope',
    '$location',
    '$http',
    function ($scope, $location, $http) {
        var check = localStorage.getItem('code');
        if (check == 'secret') {
        } else {
            $location.path('/');
        }
        $scope.logout = function () {
            localStorage.setItem('code', 'logout');
            $location.path('/');
        };
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
                    // console.log($scope.searchedData);
                })
        }
    },
]);


app.controller('signupFormController', ['$scope', '$window', 'getLocalStorage', '$location', function ($scope, $window, getLocalStorage, $location) {
    $scope.showPassword = false;
    $scope.checkPassword = false;
    $scope.loginPassword = false;
    //ON-SUBMIT ACTION FOR SIGNUP BUTTON
    $scope.register = function () {
        // console.log('Welcome');
        $window.location.href = '/index.html#!/';
    }

    //TOGGLE EYE FEATURE FOR VIEWING PASSWORDS
    $scope.toggleShowPassword = function () {
        $scope.showPassword = !$scope.showPassword;
    }
    $scope.toggleShowPassword2 = function () {
        $scope.checkPassword = !$scope.checkPassword;
    }
    $scope.toggleShowPassword3 = function () {
        $scope.loginPassword = !$scope.loginPassword;
    }

    //FUNCTION TO RETURN BOOLEAN FOR MATCHING PASSWORD WITH CONFIRM PASSWORD ENTRIES
    $scope.check = function () {
        // console.log($scope.password);
        // console.log($scope.confirmPassword);
        return $scope.password == $scope.confirmPassword;
    }

    $scope.users = getLocalStorage.getUsers();
    $scope.addUser = function () {
        $scope.user = {
            'username': $scope.username,
            'email': $scope.email,
            'phone': $scope.phone,
            'password': $scope.password,
            'confirmPassword': $scope.confirmPassword,
            'basket': []
        };
        if ($scope.users.some((person) => {
            return person.email == $scope.email || person.username == $scope.username;
        })) {
            alert('This email id or username is already in use!')

        } else {
            $scope.users.push($scope.user);
            getLocalStorage.updateUsers($scope.users);
            $scope.username = '';
            $scope.email = '';
            $scope.phone = '';
            $scope.password = '';
            $scope.confirmPassword = '';
            alert('User signed up successfully! Please login now!')
            $scope.register();
            // $location.path('/');
        }
    }

    $scope.findUser = function () {
        if ($scope.users.some((person) => {
            return (person.email == $scope.loginUsername || person.username == $scope.loginUsername) && person.password == $scope.loginCredentials
        })) {
            console.log('user found');
            // console.log($scope.users)
            alert('User logged in successfully!');
            localStorage.setItem('code', 'secret');
            localStorage.setItem('currUser', $scope.loginUsername);
            $location.path('/home')
            // $scope.currUser = users.filter((user) => {
            //     return (user.email == $scope.loginUsername || user.username == $scope.loginUsername) && user.password == $scope.loginCredentials
            // })[0];
            // console.log($scope.currUser);
        } else {
            alert('Login failed! Please retry!')
        }
    }
}]);

app.factory('getLocalStorage', function () {
    var userList = {};
    return {
        list: userList,
        updateUsers: function (usersArr) {
            if (window.localStorage && usersArr) {
                //adding data to local storage
                localStorage.setItem("users", angular.toJson(usersArr));
            }
            userList = usersArr;
        },
        getUsers: function () {
            //get data from local storage
            userList = angular.fromJson(localStorage.getItem("users"));
            return userList ? userList : [];
        }
    };
});
// end


// MAIN CONTROLLER
// app.controller('mainControl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
//     //loading data from json in menu
//     // $scope.menuItems = [];
//     // $http.get('data/menu.json').then(function (res) {
//     //     // console.log('success!');
//     //     $scope.menuItems = res.data;
//     //     // console.log(res.data);
//     // });

//     // $scope.favouriteItems = [];
//     // $http.get('data/favourites.json').then(function (res) {
//     //     // console.log('success!');
//     //     $scope.favouriteItems = res.data;
//     //     // console.log(res.data);
//     // });

//     // $scope.searchedData = [];
//     // // searchQuery = $scope.search;
//     // // $scope.search = 'Pizza';
//     // $scope.$watch('search', function () {
//     //     fetch();
//     // });

//     // function fetch() {
//     //     $http.get("https://api.edamam.com/search?q=" + $scope.search + "&app_id=db8705b8&app_key=043e07074ec20dde5fbbf071e255bda4&from=0&to=25")
//     //         .then(function (response) {
//     //             // console.log(response.data);
//     //             $scope.searchedData = response.data.hits;
//     //             // console.log($scope.searchedData);
//     //         })
//     // }

//     // $scope.myFunction = function (val) {
//     //     return val.category === category;
//     // }

//     // $scope.logout = function () {
//     //     localStorage.setItem('code', 'logout');
//     //     $window.location.href = "/login-signup/login.html"
//     // }
// }]);


// SHOPPING CART
app.controller('shoppingCartControl', ['$scope', '$window', function ($scope, $window) {
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

    $scope.increment = function (id) {
        $scope.search = $scope.basket.find((item) => item.id === id);

        if ($scope.search === undefined) {
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
app.config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when(
                '/', {
                templateUrl: 'login-signup/login.html',
                controller: 'signupFormController'
            }
            )
            .when(
                '/register', {
                templateUrl: 'login-signup/signup.html',
                controller: 'signupFormController'
            }
            )
            .when(
                '/home', {
                templateUrl: 'views/home.html',
                controller: 'homeControl'
            }
            )
            .when(
                '/recipes', 
                {
                templateUrl: 'views/recipes.html',
                controller: 'recipesControl'
            }
            )
            .when(
                '/favourites', {
                templateUrl: 'views/favourites.html',
                controller: 'favouritesControl'
            }
            )
            .when(
                '/about', {
                templateUrl: 'views/about.html',
                controller: 'aboutControl'
            }
            )
            .when(
                '/know-more', {
                templateUrl: 'views/know-more.html',
                controller: 'knowMoreControl'
            }
            )
            .when(
                '/cart', {
                templateUrl: 'views/cart.html',
                controller: 'cartControl'
            }
            )
            .otherwise({
                redirectTo: '/home'
            })
    }]);