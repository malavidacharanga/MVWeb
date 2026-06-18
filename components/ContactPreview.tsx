"use client";

import { Mail, MessageCircle, Send } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/lib/mock-data";

type SubmitStatus = "idle" | "sending" | "success" | "error";

export function ContactPreview() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitStatus === "sending") {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      nombre: String(formData.get("nombre") ?? ""),
      telefono: String(formData.get("telefono") ?? ""),
      fecha: String(formData.get("fecha") ?? ""),
      localidad: String(formData.get("localidad") ?? ""),
      mensaje: String(formData.get("mensaje") ?? "")
    };

    setSubmitStatus("sending");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      form.reset();
      setSubmitStatus("success");
      setSubmitMessage("Solicitud enviada correctamente");
    } catch {
      setSubmitStatus("error");
      setSubmitMessage("No se pudo enviar. Prueba por WhatsApp.");
    }
  }

  return (
    <section id="contacto" className="section-band bg-[var(--mv-pink-soft)]">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-10">
        <div>
          <SectionHeading
            eyebrow="Contratación"
            title="Cuéntanos la fecha y el pueblo"
            description="Para fiestas populares, bodas, vermús, peñas y eventos privados en Zamora."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              className="mv-button inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[var(--mv-pink)] px-5 py-3 font-black uppercase text-black sm:w-auto lg:w-full"
              href={siteConfig.contact.whatsappHref}
            >
              <MessageCircle aria-hidden="true" size={19} />
              WhatsApp
            </a>
            <a
              className="mv-button inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[var(--mv-white)] px-5 py-3 font-black uppercase text-black sm:w-auto lg:w-full"
              href={`mailto:${siteConfig.contact.email}`}
            >
              <Mail aria-hidden="true" size={19} />
              Email
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mv-sticker bg-[var(--mv-white)] p-5 sm:p-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { label: "Nombre", name: "nombre", type: "text", required: true },
              {
                label: "Teléfono",
                name: "telefono",
                type: "tel",
                required: true
              },
              {
                label: "Fecha del evento",
                name: "fecha",
                type: "text",
                required: false
              },
              {
                label: "Localidad",
                name: "localidad",
                type: "text",
                required: false
              }
            ].map((field) => (
              <label
                key={field.name}
                className="grid min-w-0 gap-2 text-sm font-black"
              >
                {field.label}
                <input
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  className="min-h-12 min-w-0 rounded-md border-[3px] border-[var(--mv-black)] bg-[var(--mv-paper)] px-4 text-base font-bold outline-none focus:bg-[var(--mv-white)]"
                  placeholder={field.label}
                />
              </label>
            ))}
          </div>
          <label className="mt-4 grid min-w-0 gap-2 text-sm font-black">
            Mensaje
            <textarea
              name="mensaje"
              required
              className="min-h-32 min-w-0 resize-none rounded-md border-[3px] border-[var(--mv-black)] bg-[var(--mv-paper)] px-4 py-3 text-base font-bold outline-none focus:bg-[var(--mv-white)]"
              placeholder="Tipo de evento, horario aproximado y detalles importantes"
            />
          </label>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              className="mv-button inline-flex min-h-12 w-full flex-1 items-center justify-center gap-2 bg-[var(--mv-black)] px-5 py-3 text-center font-black uppercase text-white disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={submitStatus === "sending"}
            >
              <Send aria-hidden="true" size={18} />
              {submitStatus === "sending" ? "Enviando..." : "Enviar solicitud"}
            </button>
          </div>

          <div className="mt-4" aria-live="polite">
            {submitMessage ? (
              <p
                className={`rounded-lg border-[3px] border-[var(--mv-black)] px-4 py-3 text-sm font-black uppercase text-black shadow-[4px_4px_0_var(--mv-black)] ${
                  submitStatus === "success"
                    ? "bg-[var(--mv-pink)]"
                    : "bg-[var(--mv-white)]"
                }`}
                role={submitStatus === "error" ? "alert" : "status"}
              >
                {submitMessage}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
