const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const knex = require('./db/knex');
const UtilityService = require('./service/utilityService');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//dependency injection
app.use((req, res, next)=>{
	req.knex = knex;
	req.utilityService = UtilityService;
	next()
})

app.listen(port, ()=>{
	console.log(`server listening on port ${port}`)
});

app.get('/cities', (req, res)=>{
	try {
		req.knex.distinct().from('weather').pluck('city').then((data)=>{
		res.status(200).json(req.utilityService.getFormattedResponse(data))
	})
	} catch (error) {
		res.sendStatus(500)
	}
	
})

