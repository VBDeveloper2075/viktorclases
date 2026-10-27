import { prisma } from "@/lib/prisma";
import { TeacherBadge } from "@/components/TeacherBadge";
import { timeSlots } from "@/lib/brand";

export const metadata = { title: "Horarios" };

export default async function HorariosPage() {
  const entries = await prisma.scheduleEntry.findMany({
    include: {
      teacher: { include: { user: true } },
      course: true,
    },
    orderBy: { date: "asc" },
  });

  const monthLabel =
    entries[0]?.date.toLocaleDateString("es-AR", { month: "long", year: "numeric" }) ??
    "Calendario";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-bold text-[#1a3568]">Grilla de horarios</h1>
      <p className="mt-2 text-slate-600 capitalize">{monthLabel} · {entries[0]?.course.title}</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-800 text-left text-white">
              <th className="px-4 py-3 font-semibold">Fecha</th>
              <th className="px-4 py-3 font-semibold">Tema</th>
              {timeSlots.map((slot) => (
                <th key={slot} className="bg-[#f5c518] px-4 py-3 font-semibold text-black">
                  {slot}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.map((row) => {
              const isWeekend = [0, 6].includes(row.date.getUTCDay());
              const rowClass = row.isHoliday
                ? "bg-slate-300 text-slate-600"
                : isWeekend
                  ? "bg-slate-100 text-slate-400"
                  : "bg-white";

              return (
                <tr key={row.id} className={`border-t border-slate-100 ${rowClass}`}>
                  <td className="whitespace-nowrap px-4 py-3 font-medium">
                    {row.date.toLocaleDateString("es-AR", {
                      weekday: "short",
                      day: "numeric",
                      month: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">{row.topic}</td>
                  {timeSlots.map((slot) => (
                    <td key={slot} className="px-4 py-3">
                      {row.isHoliday ? (
                        "—"
                      ) : row.timeSlot === slot && row.teacher ? (
                        <TeacherBadge
                          name={row.teacher.user.name}
                          color={row.teacher.color}
                          textColor={
                            row.teacher.color === "#22d3ee" ||
                            row.teacher.color === "#f59e0b"
                              ? "#0f172a"
                              : "#fff"
                          }
                        />
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Colores por docente según la planilla actual (Viktor, Pablo, Fabrizio,
        Sylvina, Sergio).
      </p>
    </div>
  );
}
