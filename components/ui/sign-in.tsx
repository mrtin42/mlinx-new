import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirect: true, redirectTo: "/" });
        // todo: when dashboard is ready, redirect to dashboard
      }}
    >
      <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
        Sign in with GitHub
      </button>
    </form>
  );
}