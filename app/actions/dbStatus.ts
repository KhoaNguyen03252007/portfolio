"use server";

import { checkDatabaseConnection } from "@/db";

export async function getDatabaseStatusAction() {
  return await checkDatabaseConnection();
}
