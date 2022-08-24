/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('mensajes',table=>{
      table.increments('id').primary();
      table.string ('mail',255).notNullable();
      table.string('date').notNullable();
      table.string('mensaje').notNullable();
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('mensajes');
  };