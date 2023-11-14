const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const api = require('./api')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api', api)

app.listen(port, ()=>{
	console.log(`server listening on port ${port}`)
});



