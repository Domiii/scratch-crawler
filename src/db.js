const db = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'|'sqlite'|'postgres'|'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  storage: 'path/to/database.sqlite'
}).sequelize
.authenticate()
.then(err => {
  console.log('Connection has been established successfully.');
  return sequelize;
});

export default db;