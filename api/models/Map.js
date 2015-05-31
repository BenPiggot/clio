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
    marker: {
      collection: 'Marker',
      via: 'map'
    }
  }
};

