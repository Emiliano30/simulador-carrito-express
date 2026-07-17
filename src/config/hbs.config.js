const handlebars = require('express-handlebars');
const helpers = require('../helpers/hbs.helper')

function setupHandlebars(app) {
    app.engine('hbs', handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'main',
        helpers
    }));
    
    app.set('view engine', 'hbs');
}

module.exports = setupHandlebars;