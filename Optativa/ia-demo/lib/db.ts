import * as pg from "pg";
import { toSql } from "pgvector/pg";

// Singleton Pool to reuse connections across route handlers.
let pool: pg.Pool | null = null;

export const getPool = () => {
  if (!pool) {
    const connectionString = process.env.POSTGRES_URL;
    if (!connectionString) {
      throw new Error("Falta POSTGRES_URL en variables de entorno.");
    }
    pool = new pg.Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }
  return pool;
};

// Helper to serialize an embedding array to the vector format Postgres expects.
export const toVectorParam = (values: number[]) => toSql(values);
