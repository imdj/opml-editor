export async function handle({ event, resolve }) {
    const response = await resolve(event);

    response.headers.set("Content-Security-Policy", "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; frame-ancestors 'none';");
    response.headers.set("X-Frame-Options", "deny");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("Feature-Policy", "camera 'none'; geolocation 'none'; microphone 'none'");

    return response;
}