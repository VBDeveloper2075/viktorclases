import Link from "next/link";
import { registerAction } from "@/app/actions/auth";

export const metadata = { title: "Registro" };

export default function RegistroPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <h1 className="text-2xl font-bold text-[#1a3568]">Crear cuenta</h1>
      <p className="mt-2 text-sm text-slate-600">
        Registro desactivado; este formulario solo redirige al login en modo demo.
      </p>
      <form action={registerAction} className="mt-8 space-y-4">
        <input
          name="name"
          placeholder="Nombre"
          className="w-full rounded-xl border border-slate-300 px-3 py-2"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-slate-300 px-3 py-2"
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-[#f5c518] py-3 text-sm font-bold text-[#1a3568]"
        >
          Continuar (demo)
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600">
        <Link href="/login" className="font-semibold text-[#1a3568] hover:underline">
          Ingresar
        </Link>
      </p>
    </div>
  );
}
