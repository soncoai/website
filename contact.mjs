/* The demo-request form, minus the network: what a valid submission is, and
   the raw email one becomes. Pure so `npm test` can cover it in Node; the
   Worker in worker.mjs is the only caller. */

export const FROM = "hello@sonco.ai";

const AGENTS = new Set(["1", "2-5", "6-10", "10+"]);
const LANGS = new Set(["en", "es", "nl", "fr", "de"]);
const MAX = { name: 100, agency: 150, email: 254, phone: 40, message: 2000 };

/* Returns { ok: false, errors } naming the fields that failed, or
   { ok: true, spam, values } where spam means the honeypot was filled in —
   the caller answers a bot as if it had succeeded, so it learns nothing. */
export function validate(data) {
    const s = (k) => String(data[k] ?? "").replace(/[\r\n]+/g, " ").trim();
    const lang = s("lang");
    const values = {
        name: s("name"),
        agency: s("agency"),
        email: s("email"),
        phone: s("phone"),
        agents: s("agents"),
        message: String(data.message ?? "").trim(),
        lang: LANGS.has(lang) ? lang : "en",
    };

    const errors = [];
    if (!values.name) errors.push("name");
    if (!values.agency) errors.push("agency");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.push("email");
    if (!AGENTS.has(values.agents)) errors.push("agents");
    for (const [field, max] of Object.entries(MAX)) {
        if (values[field].length > max && !errors.includes(field)) errors.push(field);
    }
    if (errors.length) return { ok: false, errors };

    return { ok: true, spam: s("website") !== "", values };
}

/* One RFC 5322 message, CRLF-terminated, everything user-supplied either
   base64-encoded or stripped of line breaks, so nothing typed into the form
   can add a header. */
export function buildMessage({ from, to, values, now, id }) {
    const body = [
        "Demo request from sonco.ai",
        "",
        `Name:     ${values.name}`,
        `Agency:   ${values.agency}`,
        `Email:    ${values.email}`,
        `Phone:    ${values.phone || "—"}`,
        `Agents:   ${values.agents}`,
        `Language: ${values.lang}`,
        "",
        "Message:",
        values.message || "—",
        "",
    ].join("\n");

    const headers = [
        `From: sonco <${from}>`,
        `To: <${to}>`,
        `Reply-To: ${encodedWord(values.name)} <${values.email}>`,
        `Subject: ${encodedWord(`Demo request — ${values.agency}`)}`,
        `Date: ${now.toUTCString()}`,
        `Message-ID: <${id}@${from.split("@")[1]}>`,
        "MIME-Version: 1.0",
        "Content-Type: text/plain; charset=utf-8",
        "Content-Transfer-Encoding: base64",
    ];

    return headers.join("\r\n") + "\r\n\r\n" + wrap(base64(body)) + "\r\n";
}

// RFC 2047: a header value that may hold anything, as one base64 word
function encodedWord(text) {
    return `=?utf-8?B?${base64(text)}?=`;
}

function base64(text) {
    const bytes = new TextEncoder().encode(text);
    let binary = "";
    for (const b of bytes) binary += String.fromCharCode(b);
    return btoa(binary);
}

function wrap(encoded) {
    return encoded.match(/.{1,76}/g).join("\r\n");
}
