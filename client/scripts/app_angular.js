var myTaskApp = angular.module('myTaskApp', []);

myTaskApp.controller("TaskController", ['$scope', '$http', function($scope, $http){

    $scope.getTasks = function(){
        //GET
        $http.get('/api/todos').then(function(response){
            console.log(response);
            $scope.taskData = response.data;
            console.log($scope.taskData);
        });
    };

    $scope.getTasks();

}]);