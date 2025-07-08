import { auth } from "@/auth";
import { redirect } from "next/navigation";
import * as Drawer from "@/components/ui/drawer";
import { Suspense } from "react";
import Links from "./links";
import Required from "../text/required";
import { prisma } from "@/prisma";
import { addLink } from "@/utils/actions/links/add";
import { SubmitButton } from "../forms/submit";

export default async function Dashboard() {
  const session = await auth();

  if (!session || !session.user) {
    // middleware logic should prevent this from being reached, but
    // just to be safe, we can handle it here regardless
    return redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center h-max px-4">
      <h1 className="text-3xl font-bold mb">{session.user.name}'s Dashboard</h1>
      <p className="text-lg mb-4">Email address: {session.user.email}.</p>
      <div className="flex flex-col items-center justify-center w-full max-w-5xl p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between w-full mb-4">
          <h2 className="text-2xl font-semibold mb-4">Your Links</h2>
          <div className="flex flex-col md:flex-row items-center not-md:space-y-2 md:space-x-2">
            {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full md:w-auto">
              Add
            </button> */}
            <Drawer.Drawer>
              <Drawer.DrawerTrigger className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full md:w-auto">
                +
              </Drawer.DrawerTrigger>
              <Drawer.DrawerContent className="flex flex-col items-center justify-center">
                <Drawer.DrawerHeader>
                  <Drawer.DrawerTitle>Add a new link</Drawer.DrawerTitle>
                </Drawer.DrawerHeader>
                  {/* Form to add a new link */}
                  <form
                    className="w-full space-y-4 p-4 md:max-w-1/2"
                    action={addLink}

                  >
                    <div className="w-full self-center">
                      <label className="block text-sm font-medium text-gray-700">Slug</label>
                      <input
                        name="slug"
                        type="text"
                        placeholder="Randomly generated if left blank"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">URL <Required /></label>
                      <input
                        name="url"
                        type="url"
                        placeholder="https://example.com"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
              <SubmitButton className="w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 px-4 py-2">
                Add Link
              </SubmitButton>
                  </form>
                <Drawer.DrawerFooter>
                  <Drawer.DrawerClose className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                    Close
                  </Drawer.DrawerClose>
                </Drawer.DrawerFooter>
              </Drawer.DrawerContent>
            </Drawer.Drawer>
            <form className="flex items-center">
              <input
                type="text"
                placeholder="Search links..."
                className="px-4 py-2 border rounded-l-lg focus:outline-none focus:ring focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 border border-blue-500 hover:border-blue-600"
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <Suspense fallback={
          <div className="flex items-center justify-center h-64 animate-pulse">
            <p className="text-gray-500">Loading links...</p>
          </div>
        }>
          <Links id={session.user.id as string} />
        </Suspense>
      </div>
    </div>

  );
}