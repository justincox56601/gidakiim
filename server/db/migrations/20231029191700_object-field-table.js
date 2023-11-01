/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema.createTable('object_field', (table)=>{
		table.increments('_id');
		table.dateTime('_created_at').notNullable().defaultTo(knex.fn.now());
		table.dateTime('_modified_at').notNullable().defaultTo(knex.fn.now());
		table.integer('fk_object__id').notNullable().unsigned();
		table.string('field_name').notNullable();
		table.string('field_type').notNullable();
		table.string('description');
		table.foreign('fk_object__id').references('object._id');
	});
	
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	knex.schema.dropTable('object_field');
};
