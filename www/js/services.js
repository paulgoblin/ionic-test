angular.module('tradeApp')

.service("UserSrvc", function($http, CONF_VARS){

  this.doLogin = (data) => {
    return $http.post(CONF_VARS.API_URL + '/users/login',data)
      .then((resp) => {console.log(resp,'got response');},
      () => {console.log('fail?');})
  }

})
