/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  const roles = [
    { id: 1, name: "admin" },
    { id: 2, name: "user" }
  ];

  for (const role of roles) {
    const existingRole = await knex("roles")
      .where({ id: role.id })
      .first();
    
    if (!existingRole) {
      await knex("roles").insert(role);
    }
  }
};
