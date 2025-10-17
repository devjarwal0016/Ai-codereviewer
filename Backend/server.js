require('dotenv').config()
const app = require('./src/app.js')

const port = 3000;

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})