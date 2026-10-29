-- Ejecutar en el SQL Editor de Supabase (proyecto viktorclases)

create type public.user_role as enum ('student', 'teacher', 'admin');
create type public.material_kind as enum ('video', 'apunte', 'ejercitacion');

create table public.teachers (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  color text not null default '#2563eb',
  photo_url text default '/teachers/default.svg',
  bio text,
  created_at timestamptz default now()
);

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text not null default '',
  description text not null default '',
  modality text not null default '',
  price_label text,
  icon text not null default 'calculator',
  teacher_id uuid references public.teachers (id) on delete set null,
  featured boolean not null default true,
  created_at timestamptz default now()
);

create table public.schedule_entries (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  teacher_id uuid references public.teachers (id) on delete set null,
  entry_date date not null,
  topic text not null,
  time_slot text not null default '—',
  is_holiday boolean not null default false,
  created_at timestamptz default now()
);

create table public.materials (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses (id) on delete cascade,
  teacher_id uuid not null references public.teachers (id) on delete cascade,
  topic text not null default '',
  title text not null,
  kind public.material_kind not null,
  url text not null,
  published boolean not null default true,
  created_at timestamptz default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  course_label text not null,
  body text not null,
  rating int not null default 5 check (rating between 1 and 5),
  visible boolean not null default true,
  created_at timestamptz default now()
);

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text not null,
  role public.user_role not null default 'student',
  teacher_id uuid references public.teachers (id) on delete set null,
  created_at timestamptz default now()
);

create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  created_at timestamptz default now(),
  unique (user_id, course_id)
);

-- Perfil automático al registrarse
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'student')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.teachers enable row level security;
alter table public.courses enable row level security;
alter table public.schedule_entries enable row level security;
alter table public.materials enable row level security;
alter table public.testimonials enable row level security;
alter table public.profiles enable row level security;
alter table public.enrollments enable row level security;

create policy "Lectura pública teachers" on public.teachers for select using (true);
create policy "Lectura pública courses" on public.courses for select using (true);
create policy "Lectura pública schedule" on public.schedule_entries for select using (true);
create policy "Lectura pública testimonios" on public.testimonials for select using (visible = true);

create policy "Materiales publicados para autenticados"
  on public.materials for select
  to authenticated
  using (published = true);

create policy "Profes insertan materiales"
  on public.materials for insert
  to authenticated
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.role in ('teacher', 'admin')
        and (p.teacher_id = teacher_id or p.role = 'admin')
    )
  );

create policy "Perfil propio" on public.profiles for select using (auth.uid() = id);
create policy "Perfil update propio" on public.profiles for update using (auth.uid() = id);

create policy "Inscripciones propias" on public.enrollments for select using (auth.uid() = user_id);
