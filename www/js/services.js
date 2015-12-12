angular.module('tradeApp')

.service("UserSrvc", function($http, CONF_VARS){

  this.user = {};

  this.doLogin = (data) => {
    return $http.post(CONF_VARS.API_URL + '/users/login',data)
      .then((resp) => { this.user = resp.data })
  }

  this.doRegister = (data) => {
    return $http.post(CONF_VARS.API_URL + '/users/register', data)
  }

})
