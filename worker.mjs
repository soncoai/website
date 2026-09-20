/* The two things a static file cannot do: take the demo-request form and turn
   it into an email, and tell a page where its reader is. Everything else is
   handed to the static assets, which is what the Worker was before it had a
   script at all. */

import { EmailMessage } from "cloudflare:email";
import { FROM, buildMessage, validate } from "./contact.mjs";
import { placeFor } from "./geo.mjs";

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        if (url.pathname !== "/contact") return withPlace(request, await env.ASSETS.fetch(request));
        if (request.method !== "POST") {
            return new Response("Method not allowed", { status: 405, headers: { Allow: "POST" } });
        }
        return handleContact(request, env, url.origin);
    },
};

/* One attribute on <html>, which js/i18n.js reads to phrase the hero. The page
   cannot be rewritten in place: the heading is Alpine's, so anything written
   into it is replaced the moment Alpine boots. */
function withPlace(request, response) {
    if (!(response.headers.get("Content-Type") || "").includes("text/html")) return response;
    return new HTMLRewriter()
        .on("html", {
            element(el) {
                el.setAttribute("data-place", placeFor(request.cf));
            },
        })
        .transform(response);
}

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
