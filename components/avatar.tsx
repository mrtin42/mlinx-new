import { auth, signOut } from "@/auth"
import SignIn from "@/components/ui/sign-in"

 
export default async function NavSession() {
  const session = await auth()
 
  if (!session?.user) return (
    <SignIn />
  )
 
  return (
    <div className="flex items-center space-x-2">
      <a href="/dashboard" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
        Dashboard
      </a>
      <img src={session.user.image as string} alt="User Avatar" className="w-10 h-10 rounded-full" />
    </div>
  )
}