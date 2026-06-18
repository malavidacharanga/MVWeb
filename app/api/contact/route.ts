import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/mock-data";

type ContactPayload = {
  nombre?: unknown;
  telefono?: unknown;
  fecha?: unknown;
  localidad?: unknown;
  mensaje?: unknown;
};

const fieldLimits = {
  nombre: 90,
  telefono: 40,
  fecha: 80,
  localidad: 90,
  mensaje: 1200
} as const;

function normalizeField(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "La solicitud no tiene un formato valido." },
      { status: 400 }
    );
  }

  const contact = {
    nombre: normalizeField(payload.nombre, fieldLimits.nombre),
    telefono: normalizeField(payload.telefono, fieldLimits.telefono),
    fecha: normalizeField(payload.fecha, fieldLimits.fecha),
    localidad: normalizeField(payload.localidad, fieldLimits.localidad),
    mensaje: normalizeField(payload.mensaje, fieldLimits.mensaje)
  };

  const missingFields = [
    ["nombre", contact.nombre],
    ["telefono", contact.telefono],
    ["mensaje", contact.mensaje]
  ]
    .filter(([, value]) => !value)
    .map(([field]) => field);

  if (missingFields.length > 0) {
    return NextResponse.json(
      {
        ok: false,
        error: "Faltan campos obligatorios.",
        fields: missingFields
      },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    return NextResponse.json(
      {
        ok: false,
        error: "El envio de contacto no esta configurado."
      },
      { status: 503 }
    );
  }

  const rows = [
    ["Nombre", contact.nombre],
    ["Telefono", contact.telefono],
    ["Fecha del evento", contact.fecha || "No indicada"],
    ["Localidad", contact.localidad || "No indicada"],
    ["Mensaje", contact.mensaje]
  ];

  const text = [
    "Nueva solicitud desde la web de Charanga Malavida",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`)
  ].join("\n");

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <th style="padding:10px 12px;border:2px solid #000;text-align:left;background:#ffd3e6;">${escapeHtml(label)}</th>
          <td style="padding:10px 12px;border:2px solid #000;">${escapeHtml(value)}</td>
        </tr>
      `
    )
    .join("");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#161616;">
      <h1 style="margin:0 0 16px;font-size:28px;line-height:1;">Nueva solicitud desde la web de Charanga Malavida</h1>
      <table style="width:100%;border-collapse:collapse;border:2px solid #000;">
        <tbody>${htmlRows}</tbody>
      </table>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from,
      to: siteConfig.contact.email,
      subject: "Nueva solicitud desde la web de Charanga Malavida",
      text,
      html
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "No se pudo enviar la solicitud."
      },
      { status: 502 }
    );
  }
}
