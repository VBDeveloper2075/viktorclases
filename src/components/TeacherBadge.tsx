type TeacherBadgeProps = {
  name: string;
  color: string;
  textColor?: string;
};

export function TeacherBadge({ name, color, textColor = "#fff" }: TeacherBadgeProps) {
  return (
    <span
      className="inline-block rounded-md px-2 py-0.5 text-xs font-bold uppercase tracking-wide"
      style={{ backgroundColor: color, color: textColor }}
    >
      {name}
    </span>
  );
}
