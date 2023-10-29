const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(port, ()=>{
	console.log(`server listening on port ${port}`)
});

app.get('/cities', (req, res)=>{
	res.status(200).json({
		cities: ['Bemidji', 'Casslake', 'Big Fork']
	})
})