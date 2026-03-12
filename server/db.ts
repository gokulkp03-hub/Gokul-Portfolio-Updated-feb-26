import { prisma } from "./prisma-db";

export async function getDb() {
  return prisma;
}

export async function upsertUser(user: {
  openId: string;
  name?: string | null;
  email?: string | null;
  loginMethod?: string | null;
  role?: string;
  lastSignedIn?: Date;
}): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  try {
    const data: any = {
      openId: user.openId,
      name: user.name,
      email: user.email,
      loginMethod: user.loginMethod,
      role: user.role,
      lastSignedIn: user.lastSignedIn || new Date(),
    };

    await prisma.user.upsert({
      where: { openId: user.openId },
      update: data,
      create: data,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  return prisma.user.findUnique({
    where: { openId },
  });
}
