import Link from "next/link";
import { registerAction } from "@/app/actions/auth";

export const metadata = { title: "Registro" };

export default function RegistroPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <h1 className="heading-display text-2xl text-brand-dark">Crear cuenta</h1>
      <p className="mt-2 text-sm text-brand-muted">
        Registro desactivado; este formulario solo redirige al login en modo demo.
      </p>
      <form action={registerAction} className="mt-8 space-y-4">
        <input
          name="name"
          placeholder="Nombre"
          className="w-full rounded-xl border border-black/10 px-3 py-2"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-black/10 px-3 py-2"
        />
        <button type="submit" className="btn-brand w-full py-3 text-sm">
          Continuar (demo)
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-brand-muted">
        <Link href="/login" className="font-semibold text-brand-green hover:underline">
          Ingresar
        </Link>
      </p>
    </div>
  );
}
