# viktorclases

Plataforma Jamstack (Next.js) para clases de apoyo a ingreso universitario. Los datos viven en **Google Sheets** (sin base de datos).

## Stack

- Next.js 16 + Tailwind CSS
- Auth.js (usuarios leídos de la pestaña **Usuarios**)
- Google Sheets API (lectura con API key; escritura opcional con cuenta de servicio)

## Inicio rápido

```bash
npm install
cp .env.example .env
npm run dev
```

Sin `GOOGLE_SHEETS_ID` la app usa **datos demo** embebidos (misma grilla y cursos de ejemplo).

### Login demo (sin planilla)

| Rol    | Email                    | Contraseña  |
|--------|--------------------------|-------------|
| Alumno | alumno@viktorclases.com  | viktor123   |
| Profe  | viktor@viktorclases.com  | viktor123   |

## Estructura de la planilla

Cada pestaña con **fila 1 = encabezados** (minúsculas o aliases en español):

| Pestaña        | Columnas principales |
|----------------|----------------------|
| **Profes**     | slug, name, color, photoUrl, bio |
| **Cursos**     | slug, title, subtitle, description, modality, priceLabel, icon, teacherSlug, featured |
| **Horarios**   | courseSlug, date (YYYY-MM-DD), topic, timeSlot, teacherSlug, isHoliday |
| **Materiales** | courseSlug, topic, title, type (APUNTE/VIDEO), url, published, teacherSlug |
| **Testimonios**| name, course, text, rating, visible |
| **Usuarios**   | email, password, name, role (STUDENT/TEACHER), teacherSlug |
| **Inscripciones** | email, courseSlug |

Compartí la planilla como **lectura pública** o restringida según prefieras; la API key solo necesita permiso de lectura.

## Escritura desde la web

Para que registro y panel profe agreguen filas automáticamente:

1. Cuenta de servicio en Google Cloud con Sheets API
2. Compartir la planilla con el email de la cuenta (Editor)
3. Variables `GOOGLE_SERVICE_ACCOUNT_EMAIL` y `GOOGLE_PRIVATE_KEY` en `.env`

Si no están configuradas, podés editar la planilla a mano y la web se actualiza al refrescar (cache ~60 s).

## Scripts

- `npm run dev` — desarrollo
- `npm run build` — producción
