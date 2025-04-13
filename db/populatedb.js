const { Client } = require("pg");
require("dotenv").config();

const SQL = `
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR( 255 ) UNIQUE,
    password VARCHAR( 255 ),
    firstname VARCHAR( 255 ),
    lastname VARCHAR( 255 ),
    membership_status BOOLEAN,
    admin BOOLEAN
    );

    CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR( 255 ),
    date TIMESTAMP WITH TIME ZONE,
    text TEXT,
    author_id INTEGER,
    FOREIGN KEY (author_id) REFERENCES users(id)
    );
`;

async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await client.end();
  }
}

main();
