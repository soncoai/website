import { test } from "node:test";
import assert from "node:assert/strict";
import { signupRedirect } from "../signup.mjs";

const at = (path) => signupRedirect(new URL(path, "https://sonco.ai"));

test("/signup goes to signing up on the app's host", () => {
    assert.equal(at("/signup"), "https://app.sonco.ai/");
});

test("a trailing slash is the same address", () => {
    assert.equal(at("/signup/"), "https://app.sonco.ai/");
});

test("the plan, period and language carry through", () => {
    assert.equal(at("/signup?plan=solo&interval=year&lang=es"), "https://app.sonco.ai/?plan=solo&interval=year&lang=es");
});

test("any other path is not a signup", () => {
    for (const path of ["/", "/contact", "/signups", "/signup/details"]) assert.equal(at(path), null, path);
});
