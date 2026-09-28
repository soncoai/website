/* English is the markup; Spanish sits beside it:
     data-es                    an element's content, markup allowed
     data-es-alt, -es-content   that attribute
     data-lang="es"             a whole block (the legal texts)
   Runs before Alpine, so <html lang> is set when the header reads it. */
(() => {
    const SUPPORTED = ["en", "es"];
    const KEY = "sonco-lang";
    // The old site's key
    const LEGACY_KEY = "sonnco-lang";

    function initial() {
        let stored = null;
        try {
            stored = localStorage.getItem(KEY) || localStorage.getItem(LEGACY_KEY);
        } catch {
            // Storage blocked
        }
        const candidates = [
            new URLSearchParams(location.search).get("lang"),
            stored,
            (navigator.language || "en").slice(0, 2).toLowerCase(),
        ];
        return candidates.find((lang) => SUPPORTED.includes(lang)) ?? "en";
    }

    // Keeps the English, so switching back restores it exactly
    function swap(el, lang, read, write, name) {
        const en = `en${name}`;
        if (!(en in el.dataset)) el.dataset[en] = read();
        write(lang === "es" ? el.dataset[`es${name}`] : el.dataset[en]);
    }

    function apply(lang) {
        document.documentElement.lang = lang;
        for (const el of document.querySelectorAll("[data-es]")) {
            swap(el, lang, () => el.innerHTML, (v) => { el.innerHTML = v; }, "");
        }
        for (const attr of ["alt", "content"]) {
            const name = attr[0].toUpperCase() + attr.slice(1);
            for (const el of document.querySelectorAll(`[data-es-${attr}]`)) {
                swap(el, lang, () => el.getAttribute(attr), (v) => el.setAttribute(attr, v), name);
            }
        }
        for (const el of document.querySelectorAll("[data-lang]")) el.hidden = el.dataset.lang !== lang;
        // The demo form's language, for the Worker
        for (const input of document.querySelectorAll('input[name="lang"]')) input.value = lang;
    }

    window.setLang = (lang) => {
        if (!SUPPORTED.includes(lang)) return;
        try {
            localStorage.setItem(KEY, lang);
            localStorage.removeItem(LEGACY_KEY);
        } catch {
            // Storage blocked: this page still switches
        }
        apply(lang);
    };

    apply(initial());
})();
