type SheetRow = Record<string, string>;

function bool(value: string | undefined, defaultValue = false): boolean {
  if (value === undefined || value === "") return defaultValue;
  return ["1", "true", "si", "sí", "yes"].includes(value.toLowerCase());
}

function rowsToObjects(values: string[][]): SheetRow[] {
  if (values.length < 2) return [];
  const headers = values[0].map((h) => h.trim().toLowerCase());
  return values.slice(1).map((row) => {
    const obj: SheetRow = {};
    headers.forEach((header, i) => {
      obj[header] = (row[i] ?? "").trim();
    });
    return obj;
  });
}

export async function fetchSheetTab(tabName: string): Promise<SheetRow[] | null> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  if (!spreadsheetId || !apiKey) return null;

  const range = encodeURIComponent(`${tabName}!A:Z`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    console.error(`Sheets read failed (${tabName}):`, res.status, await res.text());
    return null;
  }

  const data = (await res.json()) as { values?: string[][] };
  return rowsToObjects(data.values ?? []);
}

export async function appendSheetRow(
  tabName: string,
  values: string[],
): Promise<boolean> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!spreadsheetId || !clientEmail || !privateKey) return false;

  const { google } = await import("googleapis");
  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tabName}!A:Z`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [values] },
  });

  return true;
}

export { bool };
