import { prisma } from "@/prisma";
import Link from "./link";

export default async function Links({
  id
}: {
  id: string;
}) {
  const userLinks = await prisma.link.findMany({
    where: {
      userId: id
    },
    orderBy: {
      updatedAt: "desc"
    }
  });

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl p-4 ">
      <div className="w-full">
        {userLinks.length > 0 ? (
          userLinks.map((link) => (
            <Link link={link} key={link.id} />
          ))
        ) : (
          <p className="text-gray-500">No links found.</p>
        )}
      </div>
    </div>
  );
}