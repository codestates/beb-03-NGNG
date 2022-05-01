// module.exports = {
//   type: "mysql",
//   host: "localhost",
//   port: 3306,
//   username: process.env.DATABASE_ID,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   synchronize: true,
//   logging: true,
//   entities: [
//     process.env.NODE_ENV === "production"
//       ? "build/typeorm/entity/*{.ts,.js}"
//       : "typeorm/entity/*{.ts,.js}",
//   ],
//   migrations: ["typeorm/migration/**/*{.ts,.js}"],
//   subscribers: ["typeorm/subscriber/**/*{.ts,.js}"],
//   cli: {
//     entitiesDir: "typeorm/entity",
//     migrationsDir: "typeorm/migration",
//     subscribersDir: "typeorm/subscriber",
//   },
// };

module.exports = [
  {
    name: "default",
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DATABASE_ID,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: process.env.NODE_ENV !== "production",
    logging: process.env.NODE_ENV !== "production",
    entities: [
      process.env.NODE_ENV === "production"
        ? "build/typeorm/entity/*{.ts,.js}"
        : "typeorm/entity/*{.ts,.js}",
    ],
    migrations: ["typeorm/migration/**/*{.ts,.js}"],
    subscribers: ["typeorm/subscriber/**/*{.ts,.js}"],
    cli: {
      entitiesDir: "typeorm/entity",
      migrationsDir: "typeorm/migration",
      subscribersDir: "typeorm/subscriber",
    },
  },
  {
    name: process.env.DATABASE_DEMON_NAME,
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DATABASE_ID,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DEMON_NAME,
    entities: [
      process.env.NODE_ENV === "production"
        ? "build/typeorm/entity/demon/*{.ts,.js}"
        : "typeorm/entity/demon/*{.ts,.js}",
    ],
  },
];
// [
//   {
//     name: "test",
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "root",
//     password: "",
//     database: "typeorm-test",
//     synchronize: true,
//     logging: false,
//     dropSchema: true,
//     entities: ["src/entity/*.ts"],
//     subscribers: ["src/migration/*.ts"],
//     migrations: ["src/migration/*.ts"],
//   },
//   // {
//   //   name: "production",
//   //   type: "mysql",
//   //   host: '',
//   //   port: '',
//   //   username: '',
//   //   password: '',
//   //   database: '',
//   //   synchronize: false,
//   //   logging: true,
//   //   entities: ["dist/entity/*.js"],
//   //   subscribers: ["dist/migration/*.js"],
//   //   migrations: ["dist/migration/*.js"],
//   //   migrationsTableName: "migrations",
//   //   cli: {
//   //     entitiesDir: "src/entity",
//   //     migrationsDir: "src/migration",
//   //     subscribersDir: "src/subscriber",
//   //   },
//   // },
// ];
