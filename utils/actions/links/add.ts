"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function addLink(formData: FormData) {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  const slug = formData.get("slug") as string;
  const url = formData.get("url") as string;
  
  if (!slug || !url) {
    throw new Error("Slug and URL are required");
  }

  const res = await prisma.link.create({
    data: {
      slug: slug || String(Math.random().toString(36).substring(2, 15)),
      url,
      userId: session.user.id as string,
    },
  });

  if (res) {
    console.log("Link added successfully:", res);
    return;
  } else {
    console.error("Failed to add link");
    throw new Error("Failed to add link");
  }
}