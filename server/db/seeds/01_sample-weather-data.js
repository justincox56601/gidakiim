//const sampleData = require('../seedData');
const sampleData = require('../seedData1');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('weather').del();

  const parsedData = sampleData.map((data)=>{
	return {
		//keep this if I need to revert to old version
		// _created_at: data.Created_At,
		// city: data.City_Name,
		// observed_time: data.Observed_Time,
		// observed_time_unix : data.Last_Observed_Time,
		// temperature: data.Temperature,
		// pressure: data.Pressure,
		// wind_speed: data.Wind_Speed,
		// wind_direction: data.Wind_Direction,
		// abbreviated_wind_direction: data.Abbreviated_Wind_Direction,
		// relative_humidity: data.Relative_Humidity,
		// cloud_coverage: data.Cloud_Coverage,
		// precipitation: data.Precipitation,
		// snow: data.Snow,
		// direct_normal_solar_irradiance: data.Direct_Normal_Solar_Irradiance,
		// solar_radiation: data.Solar_Radiation

		_created_at: data._created_at,
		city: data.city,
		observed_time: data.observed_time,
		observed_time_unix : data.observed_time_unix,
		temperature: data.temperature ?? null,
		pressure: data.pressure ?? null,
		wind_speed: data.wind_speed ?? null,
		wind_direction: data.wind_direction ?? null,
		abbreviated_wind_direction: data.abbreviated_wind_direction ?? null,
		relative_humidity: data.relative_humidity ?? null,
		cloud_coverage: data.cloud_coverage ?? null,
		precipitation: data.precipitation ?? null,
		snow: data.snow ?? null,
		direct_normal_solar_irradiance: data.direct_normal_solar_irradiance ?? null,
		solar_radiation: data.solar_radiation ?? null
	}
  })

  while(parsedData.length > 0){
	batch = parsedData.splice(0, 10000)
	await knex('weather').insert(batch)
  }
//   await knex('weather').insert(sampleData.map((data)=>{
// 	return {
// 		//keep this if I need to revert to old version
// 		// _created_at: data.Created_At,
// 		// city: data.City_Name,
// 		// observed_time: data.Observed_Time,
// 		// observed_time_unix : data.Last_Observed_Time,
// 		// temperature: data.Temperature,
// 		// pressure: data.Pressure,
// 		// wind_speed: data.Wind_Speed,
// 		// wind_direction: data.Wind_Direction,
// 		// abbreviated_wind_direction: data.Abbreviated_Wind_Direction,
// 		// relative_humidity: data.Relative_Humidity,
// 		// cloud_coverage: data.Cloud_Coverage,
// 		// precipitation: data.Precipitation,
// 		// snow: data.Snow,
// 		// direct_normal_solar_irradiance: data.Direct_Normal_Solar_Irradiance,
// 		// solar_radiation: data.Solar_Radiation

// 		_created_at: data._created_at,
// 		city: data.city,
// 		observed_time: data.observed_time,
// 		observed_time_unix : data.observed_time_unix,
// 		temperature: data.temperature ?? null,
// 		pressure: data.pressure ?? null,
// 		wind_speed: data.wind_speed ?? null,
// 		wind_direction: data.wind_direction ?? null,
// 		abbreviated_wind_direction: data.abbreviated_wind_direction ?? null,
// 		relative_humidity: data.relative_humidity ?? null,
// 		cloud_coverage: data.cloud_coverage ?? null,
// 		precipitation: data.precipitation ?? null,
// 		snow: data.snow ?? null,
// 		direct_normal_solar_irradiance: data.direct_normal_solar_irradiance ?? null,
// 		solar_radiation: data.solar_radiation ?? null
// 	}
//   }));
};
