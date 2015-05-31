/**
* Timeline.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title: {
      type: 'string'
    },
    description: {
      type: 'text'
    },
    startYear: {
      type: 'date'
    },
    endYear: {
      type: 'date'
    },
    project: {
      model: 'Project'
    },
    event: {
      collection: 'Event',
      via: 'timeline'
    }
  }
};

