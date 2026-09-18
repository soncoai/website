import { test } from "node:test";
import assert from "node:assert/strict";
import { buildMessage, validate } from "../contact.mjs";

const good = { name: "Ana García", agency: "Costa Homes", email: "ana@example.com", phone: "+34 600 000 000", agents: "2-5", message: "Two offices, Kyero and Idealista.", lang: "es" };

test("a complete submission is accepted with its values trimmed", () => {
    const result = validate({ ...good, name: "  Ana García  " });
    assert.equal(result.ok, true);
    assert.equal(result.spam, false);
    assert.equal(result.values.name, "Ana García");
    assert.equal(result.values.lang, "es");
});

test("the required fields are named when missing", () => {
    const result = validate({ email: "not-an-email", agents: "lots" });
    assert.equal(result.ok, false);
    assert.deepEqual(result.errors, ["name", "agency", "email", "agents"]);
});

test("phone and message are optional", () => {
    const result = validate({ ...good, phone: "", message: "" });
    assert.equal(result.ok, true);
});

test("an unknown language falls back to English", () => {
    assert.equal(validate({ ...good, lang: "xx" }).values.lang, "en");
});

test("a field over its limit is refused", () => {
    const result = validate({ ...good, message: "x".repeat(2001) });
    assert.deepEqual(result, { ok: false, errors: ["message"] });
});

test("a filled honeypot is flagged as spam, not refused", () => {
    const result = validate({ ...good, website: "http://spam.example" });
    assert.equal(result.ok, true);
    assert.equal(result.spam, true);
});

test("line breaks in a single-line field cannot reach the headers", () => {
    const result = validate({ ...good, name: "Ana\r\nBcc: victim@example.com" });
    assert.equal(result.values.name, "Ana Bcc: victim@example.com");
});

test("the message carries the submission, base64-encoded, with the sender as Reply-To", () => {
    const raw = buildMessage({ from: "hello@sonco.ai", to: "inbox@example.com", values: good, now: new Date("2026-09-18T09:00:00Z"), id: "abc-123" });
    const [head, body] = raw.split("\r\n\r\n");
    const headers = Object.fromEntries(head.split("\r\n").map((line) => line.split(/: (.*)/s)));

    assert.equal(headers.From, "sonco <hello@sonco.ai>");
    assert.equal(headers.To, "<inbox@example.com>");
    assert.match(headers["Reply-To"], /^=\?utf-8\?B\?[A-Za-z0-9+/=]+\?= <ana@example\.com>$/);
    assert.match(headers.Subject, /^=\?utf-8\?B\?[A-Za-z0-9+/=]+\?=$/);
    assert.equal(headers.Date, "Fri, 18 Sep 2026 09:00:00 GMT");
    assert.equal(headers["Message-ID"], "<abc-123@sonco.ai>");
    assert.equal(headers["Content-Transfer-Encoding"], "base64");

    const subject = Buffer.from(headers.Subject.slice(10, -2), "base64").toString("utf8");
    assert.equal(subject, "Demo request — Costa Homes");

    const text = Buffer.from(body.replace(/\r\n/g, ""), "base64").toString("utf8");
    assert.match(text, /Agency: {3}Costa Homes/);
    assert.match(text, /Two offices, Kyero and Idealista\./);
    for (const line of body.trim().split("\r\n")) assert.ok(line.length <= 76, "base64 lines stay under 76 characters");
});

test("an empty phone and message print as a dash", () => {
    const raw = buildMessage({ from: "hello@sonco.ai", to: "inbox@example.com", values: { ...good, phone: "", message: "" }, now: new Date(), id: "x" });
    const text = Buffer.from(raw.split("\r\n\r\n")[1].replace(/\r\n/g, ""), "base64").toString("utf8");
    assert.match(text, /Phone: {4}—/);
    assert.match(text, /Message:\n—/);
});
