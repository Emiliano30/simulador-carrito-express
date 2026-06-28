const fs = require('fs/promises');
const path = require('path');



const paths = {
    configPath:path.join(__dirname, '../','data'),
    pathPublic:path.join(__dirname, '../../', 'public'),
    pathViews:path.join(__dirname, '../', 'views'),
    pathUpload:path.join(__dirname, '../../', 'uploads')
}

module.exports = {paths};

