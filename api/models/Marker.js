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

  }

};

