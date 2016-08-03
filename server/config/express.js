import express from "express";
import path from "path";

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.resolve('public')));
app.use(express.static(path.resolve('dist')));

app.use((err, req, res, next) => {
   res.json({ error: err }).end();
});

export default app;
