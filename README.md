# viktorclases

Frontend Next.js para clases de ingreso universitario.

## Modo actual: demo estático (Vercel)

- **Sin middleware Edge** (evita errores de módulos en Vercel).
- **Sin Google Sheets ni Supabase** en runtime: todos los datos vienen de `src/lib/data/demo.ts`.
- Login/registro redirigen sin validar (solo para navegar el UI).

```bash
npm install
npm run dev
npm run build
```

## Deploy en Vercel

1. Conectar el repositorio en Vercel.
2. Framework preset: **Next.js**.
3. No hace falta configurar variables obligatorias (opcional: `NEXT_PUBLIC_YOUTUBE_CHANNEL`).
4. Deploy.

Más adelante se reconectará base de datos / Sheets fuera del middleware Edge.
