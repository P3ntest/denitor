import {
  DataTypes,
  Database,
  Model,
  PostgresConnector,
} from "https://deno.land/x/denodb/mod.ts";

const connection = new PostgresConnector({
  host: Deno.env.get("DB_HOST")!,
  username: Deno.env.get("DB_USER")!,
  password: Deno.env.get("DB_PASSWORD")!,
  database: Deno.env.get("DB_NAME")!,
});

const db = new Database(connection);

export class Todo extends Model {
  static table = "todos";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  };
}

db.link([Todo]);

await db.sync({ drop: true });
