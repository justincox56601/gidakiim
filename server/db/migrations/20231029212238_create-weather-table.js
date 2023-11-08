/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('weather', (table)=>{
	table.increments('_id');
	table.dateTime('_created_at').notNullable().defaultTo(knex.fn.now());
	table.dateTime('_modified_at').notNullable().defaultTo(knex.fn.now());
	table.string('city').notNullable();
	table.dateTime('observed_time').notNullable();
	table.integer('observed_time_unix').notNullable();
	table.decimal('temperature', 13, 2);
	table.decimal('pressure', 13, 2);
	table.decimal('wind_speed', 13, 6);
	table.decimal('wind_direction', 13, 2);
	table.string('abbreviated_wind_direction', 3);
	table.decimal('relative_humidity', 13, 2);
	table.decimal('cloud_coverage', 13, 2);
	table.decimal('precipitation', 13, 2);
	table.decimal('snow', 13, 2);
	table.decimal('direct_normal_solar_irradiance', 13, 2);
	table.decimal('solar_radiation', 13, 2);
  }).then(()=>{
	return knex('object').insert({
		name: 'weather',
		description: 'Primary table holding weather data'
	})
  }).then(()=>{
	return knex.select('_id').from('object').where('name', '=', 'weather')
  }).then((resp)=>{
	const objectId = resp[0]._id
	return knex('object_field').insert([
		{fk_object__id: objectId, field_name: 'city', field_type: 'string', description: 'The city where the measurement was taken'},
		{fk_object__id: objectId, field_name: 'observed_time', field_type: 'dateTime', description: 'Timestamp of when the measurement was taken'},
		{fk_object__id: objectId, field_name: 'observed_time_unix', field_type: 'integer', description: 'Unix timestamp representation of when the measurement was taken'},
		{fk_object__id: objectId, field_name: 'temperature', field_type: 'decimal', description: 'Temperature measured in degrees Celsius'},
		{fk_object__id: objectId, field_name: 'pressure', field_type: 'decimal', description: 'Atmospheric pressure measured in millibars'},
		{fk_object__id: objectId, field_name: 'wind_speed', field_type: 'decimal', description: 'Wind speed measured in meters per second'},
		{fk_object__id: objectId, field_name: 'wind_direction', field_type: 'decimal', description: 'Wind direction measured in degrees'},
		{fk_object__id: objectId, field_name: 'abbreviated_wind_direction', field_type: 'string', description: 'Wind direction using cardinal directions'},
		{fk_object__id: objectId, field_name: 'relative_humidity', field_type: 'decimal', description: 'Relative humidity measured as a percentage'},
		{fk_object__id: objectId, field_name: 'cloud_coverage', field_type: 'decimal', description: 'Cloud coverage measured as a percentage'},
		{fk_object__id: objectId, field_name: 'precipitation', field_type: 'decimal', description: 'Liquid equivalent precipitation rate measured in millimeters per hour'},
		{fk_object__id: objectId, field_name: 'snow', field_type: 'decimal', description: 'Snow fall measured in millimeters per hour'},
		{fk_object__id: objectId, field_name: 'direct_normal_solar_irradiance', field_type: 'decimal', description: 'Direct normal solar irradiance measured in Watts per meter squared [Clear Sky]'},
		{fk_object__id: objectId, field_name: 'solar_radiation', field_type: 'decimal', description: 'Estimated Solar Radiation measured in Watts per meter squared'},
	])
  }); 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	knex.select('_id').from('object').where('name', '=', 'weather')
	.then((resp)=>{
		const objectId = resp[0]._id
		knex.delete().from('object_field').where('fk_object__id', '=', objectId)
		return objectId
	})
	.then((objectId)=>{
		knex.delete().from('object').where('_id', '=', objectId)
	})
	.then(()=>{
		knex.schema.dropTable('weather')
	});
};