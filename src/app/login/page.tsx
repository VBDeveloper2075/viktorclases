import Link from "next/link";
import { loginAction } from "@/app/actions/auth";

type PageProps = {
  searchParams: Promise<{ callbackUrl?: string; registered?: string }>;
};

export const metadata = { title: "Ingresar" };

export default async function LoginPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? "/alumno";

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <h1 className="text-2xl font-bold text-[#1a3568]">Ingresar</h1>
      <p className="mt-2 text-sm text-slate-600">
        Modo demo: el botón te lleva al panel sin validar credenciales.
      </p>
      {params.registered && (
        <p className="mt-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800">
          Registro demo completado. Podés entrar.
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
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
            placeholder="opcional en demo"
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
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
            placeholder="opcional en demo"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-[#1a3568] py-3 text-sm font-semibold text-white hover:bg-[#142a54]"
        >
          Entrar al panel
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600">
        <Link href="/registro" className="font-semibold text-[#1a3568] hover:underline">
          Registro demo
        </Link>
      </p>
    </div>
  );
}
