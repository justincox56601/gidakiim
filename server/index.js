const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const v1 = require('./v1')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/v1', v1)

app.listen(port, ()=>{
	console.log(`server listening on port ${port}`)
});



