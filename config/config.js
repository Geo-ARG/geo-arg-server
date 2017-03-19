module.exports =
{
  "development": {
    "username": "kaioo",
    "password": null,
    "database": "geo_arg_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "kaioo",
    "password": null,
    "database": "geo_arg_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.RDS_USERNAME || '',
    "password": process.env.RDS_PASSWORD || '',
    "database": process.env.RDS_DB_NAME || "geo_arg_production",
    "host": process.env.RDS_HOSTNAME || '',
    "port": process.env.RDS_PORT || '5432',
    "dialect": "postgres"
  }
}
