module.exports = {
	async getFormattedResponse(knex, tableName, data){
		const fields = Object.keys(data[0])

		return knex
		.select('of.field_name', 'of.description')
		.from('object_field AS of')
		.leftJoin('object AS o', 'of.fk_object__id', '=', 'o._id')
		.whereIn('of.field_name', fields)
		.andWhere('o.name', '=', tableName)
		.then((results)=>{
			return {
				meta:{
					totalNumberOfRecords: data.length,
					fields:results.map(el => {
						return {
							name: el.field_name,
							description: el.description
						}
					}),
					dataCollectionStatement: 'Data sources include METAR reporting stations, data from the NOAA Meteorological Assimilation Data Ingest System (MADIS), and the RTMA.'
				},
				data: data
			}
		})

		return 
	}
}