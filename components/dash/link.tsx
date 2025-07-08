import { delLink } from "@/utils/actions/links/del";

export default function Link({
  link
}: {
  link: {
    id: string;
    slug: string;
    url: string;
    clicks: number;
    createdAt?: string;
    updatedAt?: string;
  };
}) {
  return (
    <div key={link.id} className="flex flex-row items-center justify-between mb-4 p-4 border bg-white rounded-lg shadow-md">
      <div className="flex flex-col w-3/4">
        <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/${link.slug}`} className="text-xl font-bold">{process.env.NEXT_PUBLIC_BASE_URL}/{link.slug}</a>
        <p>&rarr; {link.url}</p>
      </div>
      <div className="flex flex-row justify-end w-1/4 space-x-2">
        <div className=" flex flex-col items-center justify-center p-2 bg-gray-100 rounded-lg border border-gray-300">
          <p className="text-sm text-gray-600">
            Clicks: <span className="font-semibold">{link.clicks}</span>
          </p>
        </div>
        <form action={delLink}>
          <button type="submit" className="p-2 bg-red-700 text-red-100 rounded-lg border border-red-300">
            <input type="hidden" name="slug" value={link.slug} />
            X
          </button>
        </form>
      </div>
    </div>
  )
}