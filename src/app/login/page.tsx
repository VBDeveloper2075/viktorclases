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
      <h1 className="heading-display text-2xl text-brand-dark">Ingresar</h1>
      <p className="mt-2 text-sm text-brand-muted">
        Modo demo: el botón te lleva al panel sin validar credenciales.
      </p>
      {params.registered && (
        <p className="mt-4 rounded-lg bg-brand-lime/20 px-3 py-2 text-sm text-brand-green">
          Registro demo completado. Podés entrar.
        </p>
      )}
      <form action={loginAction} className="mt-8 space-y-4">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div>
          <label htmlFor="email" className="text-sm font-medium text-brand-dark">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-lime/40"
            placeholder="opcional en demo"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-brand-dark">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-lime/40"
            placeholder="opcional en demo"
          />
        </div>
        <button type="submit" className="btn-brand w-full py-3 text-sm">
          Entrar al panel
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-brand-muted">
        <Link href="/registro" className="font-semibold text-brand-green hover:underline">
          Registro demo
        </Link>
      </p>
    </div>
  );
}
