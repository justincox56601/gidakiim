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
					dataCollectionStatement: 'This is a statement of where all the data was collected from.  Will need to be updated to show NOAA sources'
				},
				data: data
			}
		})

		return 
	}
}