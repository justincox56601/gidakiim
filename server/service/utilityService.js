module.exports = {
	getFormattedResponse(data){ 
		return {
			meta:{
				totalNumberOfRecords: data.length
			},
			data: data
		}
	}
}