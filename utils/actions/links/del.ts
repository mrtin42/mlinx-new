"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function delLink(formData: FormData) {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  
  const slug = formData.get("slug") as string;
  
  if (!slug) {
    throw new Error("Slug is required");
  }

  const res = await prisma.link.deleteMany({
    where: {
      slug,
      userId: session.user.id as string,
    },
  });

  if (res.count > 0) {
    console.log("Link deleted successfully:", res);
    return;
  } else {
    console.error("Failed to delete link or link not found");
    throw new Error("Failed to delete link or link not found");
  }
}