/* The demo-request form. Posts itself in place and swaps in the thank-you;
   with no script running the same form posts normally and the Worker
   redirects to /thanks.html, so both paths end on the same words. */
window.demoForm = () => ({
    state: "idle",

    async submit(event) {
        const form = event.target;
        this.state = "sending";
        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: { Accept: "application/json" },
            });
            this.state = response.ok ? "sent" : "error";
        } catch {
            this.state = "error";
        }
    },
});
