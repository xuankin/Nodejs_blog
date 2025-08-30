const Course = require("../models/Course");

class MeController {
  //[GET]/me/stored/courses
  show(req, res, next) {
    Course.find({})
      .lean()
      .then((courses) => res.render("me/stored-Courses", { courses }))
      .catch(next);
  }
}

module.exports = new MeController();
