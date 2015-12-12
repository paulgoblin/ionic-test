angular.module('tradeApp')
.constant( "CONF_VARS", {
  API_URL: "http://localhost:5000",
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
    UserSrvc.doLogin($scope.loginData)
      .then(
        () => {
          $scope.closeLogin();
          $state.go('app.playlists');
        },
        () => {
          $scope.errMessage = "Incorrect username/password";
          $scope.badLoginHUD();
        }
      )
    console.log('Doing login', $scope.loginData);
  };

  $scope.doRegister = () => {
    console.log('Doing login', $scope.loginData);
  };

  $scope.badLoginHUD = () => {
    $scope.loginErr = true;
    setTimeout(() => {
      $scope.loginErr = false;
      $scope.$apply();
    }, 3000);
  }

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
