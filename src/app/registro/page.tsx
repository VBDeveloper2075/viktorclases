import Link from "next/link";
import { registerAction } from "@/app/actions/auth";

export const metadata = { title: "Registro" };

type PageProps = { searchParams: Promise<{ error?: string }> };

export default async function RegistroPage({ searchParams }: PageProps) {
  const params = await searchParams;
  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <h1 className="text-2xl font-bold text-[#1a3568]">Crear cuenta</h1>
      <p className="mt-2 text-sm text-slate-600">
        Alumnos acceden a materiales inscriptos. Docentes pueden publicar apuntes
        y videos.
      </p>
      {params.error === "exists" && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          Ya existe una cuenta con ese email.
        </p>
      )}
      {params.error === "invalid" && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          Revisá los datos (contraseña mínimo 6 caracteres).
        </p>
      )}
      <form action={registerAction} className="mt-8 space-y-4">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-slate-700">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            minLength={6}
            required
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="role" className="text-sm font-medium text-slate-700">
            Soy
          </label>
          <select
            id="role"
            name="role"
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
            defaultValue="STUDENT"
          >
            <option value="STUDENT">Alumno/a</option>
            <option value="TEACHER">Profe / docente</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-[#f5c518] py-3 text-sm font-bold text-[#1a3568]"
        >
          Registrarme
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600">
        ¿Ya tenés cuenta?{" "}
        <Link href="/login" className="font-semibold text-[#1a3568] hover:underline">
          Ingresar
        </Link>
      </p>
    </div>
  );
}
