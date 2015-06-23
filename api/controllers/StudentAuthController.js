module.exports = {

  // login function for student users
  studentLogin: function(req, res) {
    Student.findOne({email: req.body.email}).then(function(student) {
      if(student) {
            req.session.studentUser = student;
            console.log(req.session.studentUser)
            res.send({
              result: true,
              user: student
            })
      } else {
        res.send({
          result: false,
          error: 'Unknown User.'
        })
      }

    })

  },
  // get student user login information
  studentCheck: function(req, res) {
    res.send({studentUser:req.session.studentUser || false})
  },

  //logout function for student users
  studentLogout: function(req, res) {
    delete req.session.studentUser;
    console.log("It happened!!!!")
    res.send({result: true})
  }
};