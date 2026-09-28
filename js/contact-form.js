/* The demo form. Validates with the browser's rules but not its bubbles
   (novalidate) and marks refused fields with aria-invalid, including those the
   Worker refuses: its email check is stricter. Success goes to /thanks.html. */
window.bookDemoForm = () => ({
    sending: false,
    failed: false,

    async submit() {
        const form = this.$el;
        this.failed = false;

        const invalid = [...form.elements].filter((el) => el.willValidate && !el.checkValidity());
        if (invalid.length) return this.refuse(invalid);

        this.sending = true;
        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: { Accept: "application/json" },
            });
            if (response.ok) return window.location.assign("/thanks.html");

            const body = await response.json().catch(() => ({}));
            const refused = (body.errors ?? []).map((name) => form.elements.namedItem(name)).filter(Boolean);
            if (refused.length) this.refuse(refused);
            else this.failed = true;
        } catch {
            this.failed = true;
        }
        this.sending = false;
    },

    // Only clears marks: a field is marked on submit, never while typing
    recheck(field) {
        if (field.getAttribute("aria-invalid") === "true" && field.checkValidity()) field.removeAttribute("aria-invalid");
    },

    refuse(fields) {
        for (const field of fields) {
            field.setAttribute("aria-invalid", "true");
            this.shake(field.closest(".relative") ?? field);
        }
        fields[0].focus();
    },

    shake(el) {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        el.animate(
            [
                { transform: "translateX(0)" },
                { transform: "translateX(-4px)" },
                { transform: "translateX(4px)" },
                { transform: "translateX(-2px)" },
                { transform: "translateX(2px)" },
                { transform: "translateX(0)" },
            ],
            { duration: 320, easing: "ease-out" },
        );
    },
});
