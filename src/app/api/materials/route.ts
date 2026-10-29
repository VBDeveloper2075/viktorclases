import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Publicación desactivada en modo demo." },
    { status: 503 },
  );
}
