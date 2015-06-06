var geocoder = require('geocoder');

/**
* Marker.js
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
    address: {
      type: 'string'
    },
     latitude: {
      type: 'float'
    },
    longitude: {
      type: 'float'
    },
    text: {
      type: 'text'
    },
    image: {
      type: 'string'
    },
    map: {
      model: "Map"
    }

  },
  beforeCreate: function(marker, callback) {
    if (marker.address) {
      geocoder.geocode(marker.address, function(err,data) {
        if (err) { callback(err,null) }
        marker.latitude = data.results[0].geometry.location.lat;
        marker.longitude = data.results[0].geometry.location.lng;
        callback(null,marker);
      })
    }
   else if (marker.city) {
      geocoder.geocode(marker.city, function(err,data) {
        if (err) { callback(err,null) }
        marker.latitude = data.results[0].geometry.location.lat;
        marker.longitude = data.results[0].geometry.location.lng;
        callback(null,marker);
      })
    }
    else if (marker.country) {
      geocoder.geocode(marker.country, function(err,data) {
        if (err) { callback(err,null) }
        marker.latitude = data.results[0].geometry.location.lat;
        marker.longitude = data.results[0].geometry.location.lng;
        callback(null,marker);
      })
    }
  }
}

