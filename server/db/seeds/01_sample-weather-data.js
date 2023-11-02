const sampleData = require('../seedData');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('weather').del();
  await knex('weather').insert(sampleData.map((data)=>{
	return {
		_created_at: data.Created_At,
		city: data.City_Name,
		observed_time: data.Observed_Time,
		observed_time_unix : data.Last_Observed_Time,
		temperature: data.Temperature,
		pressure: data.Pressure,
		wind_speed: data.Wind_Speed,
		wind_direction: data.Wind_Direction,
		abbreviated_wind_direction: data.Abbreviated_Wind_Direction,
		relative_humidity: data.Relative_Humidity,
		cloud_coverage: data.Cloud_Coverage,
		precipitation: data.Precipitation,
		snow: data.Snow,
		direct_normal_solar_irradiance: data.Direct_Normal_Solar_Irradiance,
		solar_radiation: data.Solar_Radiation
	}
  }));
};
