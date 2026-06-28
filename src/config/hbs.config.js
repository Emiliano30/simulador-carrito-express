const handlebars = require('express-handlebars');

function setupHandlebars(app) {
    app.engine('hbs', handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'main'
    }));
    
    app.set('view engine', 'hbs');
}

module.exports = setupHandlebars;