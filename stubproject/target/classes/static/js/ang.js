angular.module("app", []).config(function ($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}).controller("home", function ($http, $location) {
    var self = this;
    $http.get("/user").success(function (data) {
        self.auth = data.userAuthentication;
        self.user = data.userAuthentication.details.name;
        self.authenticated = true;
        console.log(data.userAuthentication)
        $http.get("/user/"+self.auth.details.id+"/things").success(function (data) {
                var data = JSON.parse(data).things;
                self.things = data;
        })
    }).error(function () {
        self.user = "N/A";
        self.authenticated = false;
    });
    self.logout = function () {
        $http.post('logout', {}).success(function () {
            self.authenticated = false;
            $location.path("/");
        }).error(function (data) {
            console.log("Logout failed")
            self.authenticated = false;
        });
    };
});