export default function (app) {
  // index page
  app.get('*', index);
};

function index(req, res, next) {
  res.render('index');
}
