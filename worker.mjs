/* The one thing a static file cannot do: take the demo-request form and turn
   it into an email. Every other request is handed to the static assets,
   which is what the Worker was before it had a script at all. */

import { EmailMessage } from "cloudflare:email";
import { FROM, buildMessage, validate } from "./contact.mjs";

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        if (url.pathname !== "/contact") return env.ASSETS.fetch(request);
        if (request.method !== "POST") {
            return new Response("Method not allowed", { status: 405, headers: { Allow: "POST" } });
        }
        return handleContact(request, env, url.origin);
    },
};

async function handleContact(request, env, origin) {
    // The page's own script asks for JSON and shows the result in place; a
    // browser with no script running posts the form and follows a redirect
    const json = (request.headers.get("Accept") || "").includes("application/json");
    const answer = (status, body, path) => {
        if (json) {
            return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
        }
        return status < 400
            ? Response.redirect(new URL(path, origin).toString(), 303)
            : new Response("Please go back and check the form.", { status, headers: { "Content-Type": "text/plain" } });
    };

    let data = {};
    try {
        data = Object.fromEntries(await request.formData());
    } catch {
        // Not a form: falls through to validation, which refuses it
    }

    const result = validate(data);
    if (!result.ok) return answer(400, { ok: false, errors: result.errors }, "/#contact");
    if (result.spam) return answer(200, { ok: true }, "/thanks.html");

    if (!env.CONTACT_TO) {
        console.error("CONTACT_TO is not set — see README, Deploy");
        return answer(500, { ok: false }, "/#contact");
    }

    const raw = buildMessage({ from: FROM, to: env.CONTACT_TO, values: result.values, now: new Date(), id: crypto.randomUUID() });
    try {
        await env.CONTACT.send(new EmailMessage(FROM, env.CONTACT_TO, raw));
    } catch (error) {
        console.error("demo request not sent:", error.message);
        return answer(502, { ok: false }, "/#contact");
    }

    // The only analytics the site keeps: one line per request, in the Worker's logs
    console.log(JSON.stringify({ event: "demo-request", agents: result.values.agents, lang: result.values.lang }));
    return answer(200, { ok: true }, "/thanks.html");
}
