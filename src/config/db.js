const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://emi_3054:emiliano3054@backend.qjhyczn.mongodb.net/ecommerce?appName=Backend'


const connectDB = async () => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log('MongoDb connected')
    }
    catch(error){
        console.error(`Error connection ${error.message}`);
        process.exit(1)
    }
}

module.exports = {connectDB};