const fs = require('fs');

// 0`ID`, 
// 1`Created_At`, 
// 2`City`, 
// 3`Observed_Time`, 
// 4`Date_Time`, 
// 5`Last_Observed_Time`, 
// 6`City_Name`, 
// 7`Temperature`, 
// 8`Pressure`, 
// 9`Wind_Speed`, 
// 10`Wind_Direction`, 
// 11`Abbreviated_Wind_Direction`, 
// 12`Relative_Humidity`, 
// 13`Cloud_Coverage`, 
// 14`Precipitation`, 
// 15`Snow`, 
// 16`Direct_Normal_Solar_Irradiance`, 
// 17`Solar_Radiation`


fs.readFile('sqldump.txt', 'utf-8',  (err, data)=>{
	if(err){throw err}
	const lyst = data.split('\n');
	//console.log(lyst[0])
	const resp = []
	for(const l of lyst){
		if(l.length === 0){continue}
		if(l.includes('INSERT INTO `data` ')){continue}
		
		const temp = l.split(',')
		temp.forEach((t, index) =>{
			temp[index] = t.replace('(','').replace(')', '').replaceAll("\'", "").replace(';', '').trim()
		})
		
		resp.push({
			_created_at: temp[1],
			city: temp[6],
			observed_time: temp[3],
			observed_time_unix : temp[5],
			temperature: temp[7],
			pressure: temp[8],
			wind_speed: temp[9],
			wind_direction: temp[10],
			abbreviated_wind_direction: temp[11],
			relative_humidity: temp[12],
			cloud_coverage: temp[13],
			precipitation: temp[14],
			snow: temp[15],
			direct_normal_solar_irradiance: temp[16],
			solar_radiation: temp[17]

		})
	}

	fs.writeFile('seedData1.js', `module.exports=${JSON.stringify(resp)}`, (err)=>{
		if(err){console.log(err)}else{console.log('done')}
	})
})

