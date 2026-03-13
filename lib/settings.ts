import prisma from "./db";

export async function getJournalSettings() {
  try {
    const records = await prisma.journalSetting.findMany();
    const settings: Record<string, string> = {};
    for (const record of records) {
      settings[record.key] = record.value;
    }
    return settings;
  } catch (error) {
    console.error("Failed to fetch journal settings:", error);
    return {};
  }
}
