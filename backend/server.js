const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors({
    origin : ['http://localhost:3000'],
    credentials:true
}));


app.use('/run' , require('./routes/runFile'));

app.listen(PORT , () => {
    console.log(`server is running at ${PORT}`);
})