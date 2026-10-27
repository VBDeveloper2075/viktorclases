"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CourseOption = { id: string; title: string };

export function MaterialUploadForm({ courses }: { courses: CourseOption[] }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      courseId: String(form.get("courseId")),
      topic: String(form.get("topic")),
      title: String(form.get("title")),
      type: String(form.get("type")),
      url: String(form.get("url")),
    };

    const res = await fetch("/api/materials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (!res.ok) {
      setError("No se pudo publicar. Revisá los datos.");
      return;
    }
    e.currentTarget.reset();
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-2xl border border-slate-200 p-5">
      <h3 className="font-semibold text-[#1a3568]">Publicar apunte o video</h3>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <select name="courseId" required className="w-full rounded-lg border px-3 py-2 text-sm">
        {courses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.title}
          </option>
        ))}
      </select>
      <input
        name="topic"
        placeholder="Tema (ej. Vectores)"
        required
        className="w-full rounded-lg border px-3 py-2 text-sm"
      />
      <input
        name="title"
        placeholder="Título del material"
        required
        className="w-full rounded-lg border px-3 py-2 text-sm"
      />
      <select name="type" className="w-full rounded-lg border px-3 py-2 text-sm">
        <option value="APUNTE">Apunte (URL o /ruta)</option>
        <option value="VIDEO">Video (YouTube embed o URL)</option>
      </select>
      <input
        name="url"
        placeholder="https://... o /materiales/archivo.pdf"
        required
        className="w-full rounded-lg border px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-[#f5c518] px-4 py-2 text-sm font-bold text-[#1a3568] disabled:opacity-60"
      >
        {loading ? "Publicando…" : "Publicar"}
      </button>
    </form>
  );
}
