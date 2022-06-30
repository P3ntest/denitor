import {
  DataTypes,
  Database,
  Model,
  PostgresConnector,
} from "https://deno.land/x/denodb/mod.ts";

import "https://deno.land/x/dotenv/load.ts";

const connection = new PostgresConnector({
  host: Deno.env.get("DB_HOST")!,
  username: Deno.env.get("DB_USER")!,
  password: Deno.env.get("DB_PASSWORD")!,
  database: Deno.env.get("DB_NAME")!,
});

const db = new Database(connection);

export class Application extends Model {
  static table = "apps";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    token: DataTypes.STRING,
  };
}

db.link([Application]);

await db.sync();
