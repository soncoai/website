/* sonco.ai/signup, a short address to share: signing up lives on the app's
   own host, so this only points there, query and all. Pure, for `npm test`. */

export const SIGNUP_ORIGIN = "https://app.sonco.ai";

/* Where /signup goes, or null for any other path. */
export function signupRedirect(url) {
    if (url.pathname !== "/signup" && url.pathname !== "/signup/") return null;
    return `${SIGNUP_ORIGIN}/${url.search}`;
}
