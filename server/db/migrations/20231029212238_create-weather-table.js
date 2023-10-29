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
	table.integer('observed_time_ms').notNullable();
	table.decimal('temperature', 5, 2);
	table.decimal('pressure', 5, 2);
	table.decimal('wind_speed', 12, 6);
	table.decimal('wind_direction', 5, 2);
	table.string('abbreviated_wind_direction', 3);
	table.decimal('relative_humidity', 5, 2);
	table.decimal('cloud_coverage', 5, 2);
	table.decimal('precipitation', 5, 2);
	table.decimal('snow', 5, 2);
	table.decimal('direct_normal_solar_irradiance', 5, 2);
	table.decimal('solar_radiation', 5, 2);
  }); 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTable('weather');
};
