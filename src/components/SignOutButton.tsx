import { signOutAction } from "@/app/actions/auth";

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="rounded-full bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20"
      >
        Salir
      </button>
    </form>
  );
}
