const routes = require('express').Router();

routes.get('/', (req, res, next) => {
    res.render('index', {title: 'YunCode'});
});

module.exports = routes;