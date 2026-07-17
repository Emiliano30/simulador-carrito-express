require('dotenv').config()
const {server} = require('./src/app');
const {connectDB} = require('./src/config/db');
const PORT = process.env.PORT || 3000;


async function startServer() {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
})
}

startServer();
