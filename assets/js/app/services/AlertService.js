ClioApp.factory('AlertService', [function(){

  var alerts = [];

  return {
    clear: function () {
      // clear all alerts
      alerts = [];
    },
    add: function (type, text) {
      alerts.push({type:type, text:text});
      // add an alert
    },
    get: function(type, text) {
      //get list of all alerts
      return alerts
    },
    remove: function(idx) {
      //remove an alert by index
      alerts.splice(idx, 1)
    }
  }
}]);