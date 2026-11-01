import { getScheduleEntries } from "@/lib/data/repository";
import { TeacherBadge } from "@/components/TeacherBadge";
import { timeSlots } from "@/lib/brand";

export const metadata = { title: "Horarios" };

export default async function HorariosPage() {
  const entries = await getScheduleEntries("analisis-1");

  const monthLabel =
    entries[0]?.date.toLocaleDateString("es-AR", { month: "long", year: "numeric" }) ??
    "Calendario";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="heading-display text-3xl text-brand-dark">Grilla de horarios</h1>
      <p className="mt-2 capitalize text-brand-muted">
        {monthLabel} · {entries[0]?.courseTitle ?? "Análisis 1"}
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-black/10 shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-brand-dark text-left text-white">
              <th className="px-4 py-3 font-semibold">Fecha</th>
              <th className="px-4 py-3 font-semibold">Tema</th>
              {timeSlots.map((slot) => (
                <th
                  key={slot}
                  className="bg-brand-gradient px-4 py-3 font-bold text-brand-dark"
                >
                  {slot}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.map((row, i) => {
              const isWeekend = [0, 6].includes(row.date.getUTCDay());
              const rowClass = row.isHoliday
                ? "bg-neutral-300 text-neutral-600"
                : isWeekend
                  ? "bg-brand-surface text-brand-muted"
                  : "bg-white";

              return (
                <tr key={`${row.date.toISOString()}-${i}`} className={`border-t border-black/5 ${rowClass}`}>
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
                          name={row.teacher.name}
                          color={row.teacher.color}
                          textColor={
                            row.teacher.color === "#22d3ee" ||
                            row.teacher.color === "#f59e0b"
                              ? "#0f172a"
                              : "#fff"
                          }
                        />
                      ) : (
                        <span className="text-neutral-300">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
