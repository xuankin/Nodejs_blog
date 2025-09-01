const Course = require("../models/Course");

class MeController {
  // [GET] /me/stored/courses
  show(req, res, next) {
    let courseQuery = Course.find({}).lean();

    if ("_sort" in req.query) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      });
    }
    Promise.all([
      courseQuery,
      Course.countDocumentsWithDeleted({ deleted: true }),
    ])
      .then(([courses, deletedCount]) => {
        res.render("me/stored-courses", {
          courses,
          deletedCount, // truyền ra view để dùng
        });
      })
      .catch(next);
  }

  // [GET] /me/trash/courses
  trashCourse(req, res, next) {
    Course.findWithDeleted({ deleted: true })
      .lean()
      .then((courses) => res.render("me/trash-courses", { courses }))
      .catch(next);
  }
}

module.exports = new MeController();
