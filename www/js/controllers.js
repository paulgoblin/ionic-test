angular.module('tradeApp')
.constant( "CONF_VARS", {
  API_URL: "https://agile-falls-1424.herokuapp.com",
})
.controller('AppCtrl', function($scope, $ionicModal, $timeout, UserSrvc, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  // $scope.$on('$ionicView.enter', function(e) {
  // });

  // Form data for the login modal
  $scope.loginData = {};
  $scope.isRegistering = false;

  $scope.toggleReg = () => {
    console.log("toggle reg");
    $scope.isRegistering = !$scope.isRegistering
  }

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.modal.show();
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log("DO LOGIN");

    UserSrvc.doLogin($scope.loginData)
      .then(
        () => {
          $scope.loginData = {};
          $scope.closeLogin();
          $state.go('app.home');
        },
        () => {
          $scope.badLoginHUD("Incorrect username/password");
        }
      )
  };

  $scope.doRegister = () => {
    console.log("DO REGISTER");
    if ( !$scope.loginData.username ||
         !$scope.loginData.password ||
         !$scope.loginData.confirmPassword) {
           $scope.badLoginHUD("Must fill all fields");
         }
    if ( $scope.loginData.password !== $scope.loginData.password ){
      $scope.badLoginHUD("Passwords must match");
    }
    UserSrvc.doRegister($scope.loginData)
      .then(
        (resp) => {
          $scope.badLoginHUD("Congrats! You can login now");
          $scope.isRegistering = false;
        },
        () => {
          $scope.badLoginHUD("Username already taken!");
        }
      )
  };

  $scope.badLoginHUD = (message) => {
    $scope.errMessage = message
    $scope.loginErr = true;
    setTimeout(() => {
      $scope.loginErr = false;
      $scope.$apply();
    }, 3000);
  }

})

.controller('homeCtrl', function($scope, UserSrvc) {
  UserSrvc.getUsers

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
