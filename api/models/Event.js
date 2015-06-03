/**
* Event.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title: {
      type: 'string'
    },
    text: {
      type: 'text'
    },
    startYear: {
      type: 'date'
    },
    endYear: {
      type: 'date'
    },
    medium: {
      type: 'string'
    },
    timeline: {
      model: "Timeline"
    }
  }
};

