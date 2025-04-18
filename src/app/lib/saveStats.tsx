import prisma from "../lib/prisma";
export const saveStats = async (stats: Stats) => {
  "use server";
  const stat = await prisma.stats.create({ data: stats });
};
