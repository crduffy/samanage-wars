angular.module('assassins').controller('BodyCtrl', function($scope, $http) {
    var apiGet = function(endpoint, success, fail) {
        $http({method: 'GET', url: '/api/v1/'+endpoint+'.json'}).success(success).error(fail);
    }

    apiGet('employees', function(data, status, headers, config) {
        $scope.employees = data;
        // load killed and exposed
        apiGet('killed', function(data) {
            $scope.killed = data;
        }, function() {})
        apiGet('exposed', function(data) {
            $scope.exposed = data;
        }, function() {})
    }, function(data, status, headers, config) {
        console.log('failed');
    });

    $scope.killed = [];
    $scope.exposed = [];
    $scope.employees = {};

    $scope.lastUpdated = new Date();
});