var geocoder = require('geocoder');

/**
* Map.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    country: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    zoom: {
      type: 'integer'
    },
    theme: {
      type: 'string'
    },
    latitude: {
      type: 'float'
    },
    longitude: {
      type: 'float'
    },
    project: {
      model: "Project"
    },
    markers: {
      collection: 'Marker',
      via: 'map'
    }
  },
  beforeCreate: function(map, callback) {
    if (map.city) {
      geocoder.geocode(map.city, function(err,data) {
        if (err) { callback(err,null) }
        map.latitude = data.results[0].geometry.location.lat;
        map.longitude = data.results[0].geometry.location.lng;
        callback(null,map);
      })
    } else {
        geocoder.geocode(map.country, function(err,data) {
        if (err) { callback(err,null) }
        map.latitude = data.results[0].geometry.location.lat;
        map.longitude = data.results[0].geometry.location.lng;
        callback(null,map);
      })
   }
  }
};

