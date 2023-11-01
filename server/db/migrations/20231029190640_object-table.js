/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema.createTable('object', (table)=>{
		table.increments('_id');
		table.dateTime('_created_at').notNullable().defaultTo(knex.fn.now());
		table.dateTime('_modified_at').notNullable().defaultTo(knex.fn.now());
		table.string('name').notNullable().unique();
		table.string('description');
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	knex.schema.dropTable('object');
};
