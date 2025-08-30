class NewsController {
  // [GET] /news
  index(req, res) {
    res.render("news");
  }
  show() {
    res.send("show");
  }
}

module.exports = new NewsController();
