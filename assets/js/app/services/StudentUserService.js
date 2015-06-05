ClioApp.factory('StudentUserService', ['$http', 'AlertService', function($http, AlertService) {



  return {

    studentLogin: function(email, callback) {

      var self = this;

      $http.post('/api/studentAuth', {email: email})
      .success(function(data) {
        console.log(data.user)
        if(data && data.user) {
          console.log('predefinition', data.user)
          self.currentStudentUser = data.user;
          console.log('posttttttttttifinition', self.currentStudentUser)
          AlertService.add('success', 'User has logged in')
        } else {
          self.currentStudentUser = false;
        }
        callback(null, data);
      })
      .error(function(err) {
        callback(err);
      })
    },

    studentCheck: function(callback) {
      console.log("student login firing")
      var self = this;

      $http.get('/api/studentAuth')
      .success(function(data) {
        if(data && data.user) {
          self.currentStudentUser = data.user;
        } else {
          self.currentStudentUser = false;
        }
        callback(null, data);

      })
      .error(function(err) {
        callback(err);
      })
    },

    studentLogout: function(callback) {
      this.currentUser = false;

      $http.delete('/api/studentAuth')
      .success(function(data) {
        callback(null, data);
        AlertService.add('info', 'User has logged out')
      })
      .error(function(err) {
        callback(err);
      });
    }
  }

}])