//const SOURCE_PATH = process.env.NODE_ENV === 'production' ? 'dist' : 'src';
const SOURCE_PATH = 'src';
const MIGRATION_PATH = '/migration'

module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'node-backend',
  password: 'password',
  database: 'backend-db',
  entities: [
    "src/entity/**/*.js"
  ],
  migrationsRun: true,
  synchronize: true,
  dropSchema: false,
  logging: true,
  migrationsTableName: "migrations",
  migrations: [`${SOURCE_PATH}${MIGRATION_PATH}/**/*{.ts,.js}`],
  cli: {
    migrationsDir: `${SOURCE_PATH}${MIGRATION_PATH}`,
  },
};