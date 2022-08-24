require ("dotenv").config();

const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
const DATABASE_PORT = process.env.DATABASE_PORT || "3306";
const DATABASE_USER = process.env.DATABASE_USER || "root";
const DATABASE_NAME = process.env.DATABASE_NAME || "BaseDatosProductos";

const knexConfig={
    client: 'mysql',
    connection:{
       host: DATABASE_HOST,
       port: DATABASE_PORT,
       user: DATABASE_USER,
       database: DATABASE_NAME,
    },
    migrations:{
        tableName: 'knex_migrations',
        directory: './migrations'
    },
    seeds:{
        tableName:'knex_seeds',
        directory: './knex/seeds'
    }
}

module.exports = knexConfig;