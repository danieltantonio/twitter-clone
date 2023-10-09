import Pool from "pg-pool";

export const pool = new Pool({
    database: "postgres",
    connectionString: process.env.SUPABASE_CONNECTION_STRING,
    allowExitOnIdle: true,
    port: 6534
})