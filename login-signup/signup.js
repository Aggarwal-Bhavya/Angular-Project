// // var myApp = angular.module('myApp', ['ngRoute']);

// // myApp.run(function($rootScope) {
// //     $rootScope.intendedUser = {};
// // })

// app.controller('signupFormController', ['$scope', '$window','getLocalStorage', function ($scope, $window, getLocalStorage) {
//     $scope.showPassword = false;
//     $scope.checkPassword = false;
//     $scope.loginPassword = false;
//     //ON-SUBMIT ACTION FOR SIGNUP BUTTON
//     $scope.register = function () {
//         // console.log('Welcome');
//         $window.location.href = 'login.html';
//     }

//     //TOGGLE EYE FEATURE FOR VIEWING PASSWORDS
//     $scope.toggleShowPassword = function () {
//         $scope.showPassword = !$scope.showPassword;
//     }
//     $scope.toggleShowPassword2 = function () {
//         $scope.checkPassword = !$scope.checkPassword;
//     }
//     $scope.toggleShowPassword3 = function () {
//         $scope.loginPassword = !$scope.loginPassword;
//     }

//     //FUNCTION TO RETURN BOOLEAN FOR MATCHING PASSWORD WITH CONFIRM PASSWORD ENTRIES
//     $scope.check = function () {
//         // console.log($scope.password);
//         // console.log($scope.confirmPassword);
//         return $scope.password == $scope.confirmPassword;
//     }

//     $scope.users = getLocalStorage.getUsers();
//     $scope.addUser = function () {
//         $scope.user = {
//             'username': $scope.username,
//             'email': $scope.email,
//             'phone': $scope.phone,
//             'password': $scope.password,
//             'confirmPassword': $scope.confirmPassword, 
//             'basket': []
//         };
//         if ($scope.users.some((person) => {
//             return person.email == $scope.email || person.username == $scope.username;
//         })) {
//             alert('This email id or username is already in use!')
            
//         } else {
//             $scope.users.push($scope.user);
//             getLocalStorage.updateUsers($scope.users);
//             $scope.username = '';
//             $scope.email = '';
//             $scope.phone = '';
//             $scope.password = '';
//             $scope.confirmPassword = '';
//             alert('User signed up successfully! Please login now!')
//             $scope.register();
//         }
//     }

//     $scope.findUser = function() {
//         if($scope.users.some((person) => {
//             return (person.email == $scope.loginUsername || person.username == $scope.loginUsername) && person.password == $scope.loginCredentials
//         })) {
//             console.log('user found');
//             // console.log($scope.users)
//             alert('User logged in successfully!');
//             localStorage.setItem('code', 'secret');
//             localStorage.setItem('currUser', $scope.loginUsername);
//             $window.location.href = '../index.html';
//             // $scope.currUser = users.filter((user) => {
//             //     return (user.email == $scope.loginUsername || user.username == $scope.loginUsername) && user.password == $scope.loginCredentials
//             // })[0];
//             // console.log($scope.currUser);
//         } else {
//             alert('Login failed! Please retry!')
//         }
//     }
// }]);

// app.factory('getLocalStorage', function () {
//     var userList = {};
//     return {
//         list: userList,
//         updateUsers: function (usersArr) {
//             if (window.localStorage && usersArr) {
//                 //adding data to local storage
//                 localStorage.setItem("users", angular.toJson(usersArr));
//             }
//             userList = usersArr;
//         },
//         getUsers: function () {
//             //get data from local storage
//             userList = angular.fromJson(localStorage.getItem("users"));
//             return userList ? userList : [];
//         }
//     };
// });