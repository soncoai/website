import { test } from "node:test";
import assert from "node:assert/strict";
import { placeFor, PLACES } from "../geo.mjs";

test("a coastal province maps to its costa", () => {
    assert.equal(placeFor({ country: "ES", postalCode: "03730" }), "blanca");
    assert.equal(placeFor({ country: "ES", postalCode: "29600" }), "sol");
    assert.equal(placeFor({ country: "ES", postalCode: "17255" }), "brava");
    assert.equal(placeFor({ country: "ES", postalCode: "07800" }), "balearics");
});

test("Cádiz and Huelva share one coast", () => {
    assert.equal(placeFor({ country: "ES", postalCode: "11140" }), "luz");
    assert.equal(placeFor({ country: "ES", postalCode: "21100" }), "luz");
});

test("inland Spain falls back to the country", () => {
    assert.equal(placeFor({ country: "ES", postalCode: "28001" }), "spain");
    assert.equal(placeFor({ country: "ES", postalCode: "" }), "spain");
    assert.equal(placeFor({ country: "ES" }), "spain");
});

test("anywhere else gets the default", () => {
    assert.equal(placeFor({ country: "GB", postalCode: "SW1A 1AA" }), "costas");
    assert.equal(placeFor({ country: "NL" }), "costas");
});

test("a missing cf object never throws", () => {
    assert.equal(placeFor(undefined), "costas");
    assert.equal(placeFor(null), "costas");
    assert.equal(placeFor("nonsense"), "costas");
});

test("country case does not matter", () => {
    assert.equal(placeFor({ country: "es", postalCode: "03730" }), "blanca");
});

test("every key placeFor can return is a known place", () => {
    const returned = [
        placeFor({ country: "ES", postalCode: "03730" }),
        placeFor({ country: "ES", postalCode: "28001" }),
        placeFor({ country: "GB" }),
    ];
    for (const key of returned) assert.ok(PLACES.includes(key), key);
});
