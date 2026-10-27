# viktorclases

Plataforma Jamstack (Next.js) para clases de apoyo a ingreso universitario: landing pública, catálogo de cursos, grilla de horarios, apuntes/videos y paneles para alumnos y docentes.

## Stack

- **Next.js 16** (App Router) + **Tailwind CSS**
- **Prisma** + **SQLite** (desarrollo; migrar a PostgreSQL en producción)
- **Auth.js (NextAuth v5)** con roles `STUDENT` y `TEACHER`

## Inicio rápido

```bash
npm install
cp .env.example .env   # en Windows: copy .env.example .env
npm run db:setup       # crea DB y datos demo
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

### Usuarios demo (contraseña `viktor123`)

| Rol    | Email                    |
|--------|--------------------------|
| Alumno | alumno@viktorclases.com  |
| Profe  | viktor@viktorclases.com  |

## Configuración

En `.env`:

- `WHATSAPP_NUMBER` / `NEXT_PUBLIC_WHATSAPP_NUMBER` — número con código país (sin +)
- `NEXT_PUBLIC_YOUTUBE_CHANNEL` — URL del canal
- `AUTH_SECRET` — secreto para sesiones (generar uno nuevo en producción)

## Funcionalidades

- Landing con identidad navy/amarillo, CTA y grid de cursos (captura mockup)
- WhatsApp con mensaje prellenado por curso
- Grilla de horarios con colores por docente (planilla actual)
- Foto/perfil del profe en cada curso
- Login y registro (alumno / profe)
- Panel alumno: materiales del curso inscripto
- Panel profe: publicar apuntes y videos (URL)

## Escalado futuro

- Pagos / packs on-demand (clases grabadas)
- Subida de archivos a S3 o Vercel Blob
- PostgreSQL + despliegue en Vercel
- Inscripciones automáticas y admin

## Scripts

- `npm run db:push` — sincronizar schema
- `npm run db:seed` — recargar datos demo
- `npm run build` — build de producción
