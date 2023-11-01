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
		req.knex.distinct().from('weather').pluck('city').then((data)=>{
		res.status(200).json(req.utilityService.getFormattedResponse(data))
	})
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
		.then(results =>{
			return res.status(200).json(req.utilityService.getFormattedResponse(results))
		})
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
		.column(['_id', '_created_at', 'city', ...dataPoints])
		.from('weather')
		.whereIn('city', cities)
		.andWhere('observed_time', '>=', startDate)
		.andWhere('observed_time', '<=', endDate)
		.then(results =>{
			return res.status(200).json(req.utilityService.getFormattedResponse(results))
		})
	}catch(error){
		return res.status(500).json({error: error})
	}
});

module.exports = router;