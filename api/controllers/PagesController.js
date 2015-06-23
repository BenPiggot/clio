/**
 * PagesController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

// Render index.ejs page for angular views
module.exports = {
  index: function(req, res) {
    res.view('pages/index')
  }
};

