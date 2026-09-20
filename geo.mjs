/* Which stretch of coast the visitor is on, as a key the page phrases itself.
   Pure so `npm test` can cover it; worker.mjs is the only caller. */

/* Spanish postcodes carry the province in their first two digits, and the
   costas follow provinces — cf.region is too coarse, since "Andalusia" alone
   spans the Sol, the Luz, Tropical and Almería. */
const PROVINCE = {
    "03": "blanca",
    "29": "sol",
    "17": "brava",
    "30": "calida",
    "04": "almeria",
    "11": "luz",
    "21": "luz",
    "07": "balearics",
};

export const PLACES = ["blanca", "sol", "brava", "calida", "almeria", "luz", "balearics", "spain", "costas"];

/* Returns a PLACES key. "costas" is the answer whenever we cannot do better,
   so the default has to be the line the page is happy to show anyone. */
export function placeFor(cf) {
    if (!cf || typeof cf !== "object") return "costas";
    if (String(cf.country || "").toUpperCase() !== "ES") return "costas";

    const postal = String(cf.postalCode || "").trim();
    // Mobile traffic often resolves to the carrier's hub rather than the
    // handset, so a coastal agent on 4G lands on "spain". That is fine.
    return PROVINCE[postal.slice(0, 2)] || "spain";
}
