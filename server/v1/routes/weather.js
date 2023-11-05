const {Router} = require('express');
const {
	matchedData,
	query,
	validationResult
} = require('express-validator');
const knex = require('../../db/knex');
const UtilityService = require('../../service/utilityService');

const router = Router();

//dependency injection
router.use((req, res, next)=>{
	req.knex = knex;
	req.utilityService = UtilityService;
	next()
})

router.get('/cities', (req, res)=>{
	try {
		req.knex.distinct().from('weather').pluck('city')
		.then((data)=> req.utilityService.getFormattedResponse(req.knex, 'weather', data))
		.then(resp => res.status(200).json(resp))
	} catch (error) {
		res.sendStatus(500).json({error: error})
	}
})

router.get('/datapoints', (req, res)=>{
	try {
		req.knex
		.column('field_name')
		.from('object_field')
		.leftJoin('object', 'fk_object__id', 'object._id')
		.where('object.name', '=', 'weather')
		.andWhere('field_type', 'IN', ['decimal'])
		.then(results => req.utilityService.getFormattedResponse(req.knex, 'weather', results))
		.then(results => res.status(200).json(results))
	} catch (error) {
		res.sendStatus(500).json({error: error})
	}
})

/**
 * @params - dataPoints(Array),
 * @params - cities(Array)
 * @params - startDate(date),
 * @params - endDate(date),
 */
router.get('/data', [
	query('dataPoints').notEmpty().escape().customSanitizer((value) =>value.split(',')),
	query('cities').notEmpty().escape().customSanitizer((value) =>value.split(',')),
	query('startDate').notEmpty(),
	query('endDate').notEmpty(),
], (req, res)=>{
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.status(500).json({errors: errors.array()})
	}

	const {dataPoints, cities, startDate, endDate} = matchedData(req)
	
	try{
		req.knex
		.column(['_id', '_created_at', 'city', 'observed_time', 'observed_time_unix', ...dataPoints]) //probably need to add observed time to this
		.from('weather')
		.whereIn('city', cities)
		.andWhere('observed_time', '>=', startDate)
		.andWhere('observed_time', '<=', endDate)
		.then((results)=>{
			return req.utilityService.getFormattedResponse(req.knex, 'weather', results)
		})
		.then(results =>{
			return res.status(200).json(results)
		})
	}catch(error){
		return res.status(500).json({error: error})
	}
});

const _getMeta = (knex, data) => {
	return {
		meta:{
			totalNumberOfRecords: data.length,
			fields:[
				{
					name: 'temperature',
					desciption: 'this is a description'
				}
			],
			dataCollectionStatement: 'this is a statement of where all the data was collected from'
		},
		data: data
	}
}

module.exports = router;