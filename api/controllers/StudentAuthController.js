module.exports = {

  //POST /api/studentAuth
  studentLogin: function(req, res) {
    Student.findOne({email: req.body.email}).then(function(student) {
      if(student) {
            req.session.studentUser = student;
            res.send({
              result: true,
              user: student
            })
      } else {
        res.send({
          result: false,
          error: 'Unkown User.'
        })
      }

    })

  },
  //GET /api/studentAuth
  studentCheck: function(req, res) {
    res.send({studentUser:req.session.studentUser || false})
  },

  //DELETE /api/studentAuth
  studentLogout: function(req, res) {
    delete req.session.studentUser;
    res.send({result: true})
  }
};