import Link from "next/link";
import { loginAction } from "@/app/actions/auth";

type PageProps = {
  searchParams: Promise<{ callbackUrl?: string; registered?: string; error?: string }>;
};

export const metadata = { title: "Ingresar" };

export default async function LoginPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? "/alumno";

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <h1 className="text-2xl font-bold text-[#1a3568]">Ingresar</h1>
      <p className="mt-2 text-sm text-slate-600">
        Acceso para alumnos y docentes de viktorclases.
      </p>
      {params.registered && (
        <p className="mt-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800">
          Cuenta creada. Iniciá sesión.
        </p>
      )}
      {params.error === "credentials" && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          Email o contraseña incorrectos.
        </p>
      )}
      <form action={loginAction} className="mt-8 space-y-4">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
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
            placeholder="alumno@viktorclases.com"
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
            required
            minLength={6}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-[#1a3568] py-3 text-sm font-semibold text-white hover:bg-[#142a54]"
        >
          Entrar
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600">
        ¿No tenés cuenta?{" "}
        <Link href="/registro" className="font-semibold text-[#1a3568] hover:underline">
          Registrate
        </Link>
      </p>
      <p className="mt-4 rounded-lg bg-[#eef1f6] p-3 text-xs text-slate-600">
        Demo (sin planilla): <strong>alumno@viktorclases.com</strong> o{" "}
        <strong>viktor@viktorclases.com</strong> · <strong>viktor123</strong>
      </p>
    </div>
  );
}
