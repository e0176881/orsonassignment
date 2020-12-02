module.exports = {
  HOST: "govtech.clb6lncxxr3e.us-east-1.rds.amazonaws.com",
  USER: "admin",
  PASSWORD: "11111111",
  DB: "testdb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
