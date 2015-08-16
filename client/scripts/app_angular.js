var myTaskApp = angular.module('myTaskApp', []);

myTaskApp.controller("TaskController", ['$scope', '$http', function($scope, $http){
    $scope.note= {};

    $scope.getTasks = function(){
        //GET
        $http.get('/api/gettasks').then(function(response){
            $scope.taskData = response.data;
        });
    };

    $scope.addTask = function(note){
        //POST
        $http.post('/api/addtask', note).then($scope.getTasks());
    };

    $scope.updateTask = function(task){
        //PUT
        $http.put('/api/updatetask/'+task.id, task).then($scope.getTasks());
    };

    $scope.deleteTask = function(task){
        //DELETE
        $http.delete('/api/deletetask/'+task.id).then($scope.getTasks());
    };
    $scope.getTasks();

}]);