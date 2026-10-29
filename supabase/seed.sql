-- Datos iniciales (después de schema.sql)

insert into public.teachers (slug, name, color, photo_url, bio) values
  ('viktor', 'Viktor', '#7b2cbf', '/teachers/viktor.svg', 'Docente de matemática — ingreso universitario.'),
  ('pablo', 'Pablo', '#2563eb', '/teachers/pablo.svg', 'Geometría y funciones para CBC y UTN.'),
  ('fabrizio', 'Fabrizio', '#dc2626', '/teachers/fabrizio.svg', 'Trigonometría y temas de estática.'),
  ('sylvina', 'Sylvina', '#22d3ee', '/teachers/sylvina.svg', 'Álgebra y sistemas lineales.'),
  ('sergio', 'Sergio', '#f59e0b', '/teachers/sergio.svg', 'Polinomios y repaso integral.')
on conflict (slug) do nothing;

insert into public.courses (slug, title, subtitle, description, modality, price_label, icon, teacher_id, featured)
select 'analisis-1', 'Análisis Matemático 1', 'Parciales y finales',
  'Curso integral para UTN, CBC y UBA XXI.', 'Virtual y presencial', 'Consultar precio', 'calculator', t.id, true
from public.teachers t where t.slug = 'viktor'
on conflict (slug) do nothing;

insert into public.materials (course_id, teacher_id, topic, title, kind, url)
select c.id, t.id, 'Conjuntos Numéricos', 'Apunte — Conjuntos', 'apunte', '/materiales/apunte-conjuntos.pdf'
from public.courses c, public.teachers t where c.slug = 'analisis-1' and t.slug = 'viktor';

insert into public.materials (course_id, teacher_id, topic, title, kind, url)
select c.id, t.id, 'Conjuntos Numéricos', 'Clase — Límites intro', 'video', 'https://www.youtube.com/embed/dQw4w9WgXcQ'
from public.courses c, public.teachers t where c.slug = 'analisis-1' and t.slug = 'viktor';

insert into public.materials (course_id, teacher_id, topic, title, kind, url)
select c.id, t.id, 'Polinomios', 'Guía de ejercicios — Factorización', 'ejercitacion', 'https://example.com/ejercicios-polinomios.pdf'
from public.courses c, public.teachers t where c.slug = 'analisis-1' and t.slug = 'sergio';

insert into public.testimonials (name, course_label, body, rating) values
  ('Lucía M.', 'Análisis 1 — UTN', 'Aprobé el parcial gracias a las clases de Viktor.', 5),
  ('Tomás R.', 'Álgebra — CBC', 'La grilla me organizó la semana.', 5);
