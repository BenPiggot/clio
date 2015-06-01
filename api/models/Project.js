/**
* Project.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
   name: {
    type: 'string',
    required: true,
   },
   description: {
    type: 'text',
    required: true
   },
   user: {
      model: 'User'
    },
    student: {
      collection: 'Student',
      via: 'project'
    },
    maps: {
      collection: 'Map',
      via: 'project'
    },
    timelines: {
      collection: 'Timeline',
      via: 'project'
    }
  }
};

