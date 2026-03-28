## Helmet.js Configuration

### Configuration Applied

\`\`\`
const apiHelmetConfig = helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,

    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
    },

    xPermittedCrossDomainPolicies: {
        permittedPolicies: "by-content-type",
    },

    hidePoweredBy: true,

    noSniff: true,

    xFrameOptions: {action: "deny"},
}); \`\`\`

### Justification

1. **contentSecurityPolicy: false** - Disabled because this API returns only
   JSON data and does not serve HTML content. CSP is designed to prevent XSS in
   browsers rendering HTML.

2. **crossOriginEmbedderPolicy: false** - Header helps control what resources can be loaded cross-origin, but is disabled becasuse this API does not support a frontend page currently.

3. **hsts** - Enabled with 1-year max-age to enforce HTTPS connection. Enabled to include subdomains, but this doesn't affect this project since this API is running on local host.
Enabled preload to ensure secure connection, the site uses HSTS preloading for HTTPS connections.

4. **xPermittedCrossDomainPolicies:{permittedPolicies: "None"}** - Mainly used for legeacy browers, clients of this domains policy for loading cross-domain content. It's disabled so no policy
files are allowed.

5. **hidePoweredBy: true** - Enabled, it removes server information from response headers.

6. **noSniff: true** - Enabled to prevent MIME sniffing which protects against malicious attacks where a the servers thinks a file is content safe but rather it's a malicious file.

7. **frameguard: { action: "deny" }** - Set to deny to prevent clickjacking, current there is no html site but it's good for future proofing.

### Sources

1. Helmet.js Official Documentation - https://helmetjs.github.io/
2. https://blog.logrocket.com/using-helmet-node-js-secure-application/#why-need-helmet-node-js-app
3. https://stackoverflow.com/questions/60706823/what-modules-of-helmet-should-i-use-in-my-rest-api


## Cors Configuration

### Configuration Applied

\`\`\`
const getCorsOptions = () => {
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment) {
        return {
            origin: true,
            credentials: true,
            optionsSuccessStatus: 204,
        };
    }

    return {
        origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        optionsSuccessStatus: 204,
        maxAge: 1200,
    };
};
 \`\`\`

### Justification

1. **origin: true:** - If in development allow all origins to make request and return it back. Easy for testing.

2. **credentials: true** - If in development allow the origin to use credentitals. Easy for testing.

3. **optionsSuccessStatus: 204** - Send back a success status code

4. **origin: process.env.ALLOWED_ORIGINS?.split(",") || []** - If in production only allow strict origins that have been listing in the .env. Only want origins that we allow.

5. **credentials: true** - If in production allow origin to use credentitals.

6. **methods: ["GET", "POST", "PUT", "DELETE"]** - Which HTTP methods are allowed. Only want certain methods allowed.

7. **allowedHeaders: ["Content-Type", "Authorization"]** - allowedHeaders: is which request headers are allowed. Content-Type: type of data is being sent. Authorization: auth information.
allowedHeaders is included since we are constantly sending JSON and auth tokens.

8. **optionsSuccessStatus: 204** - Send back a success status code

9. **maxAge: 1200** - maxAge is how long information can be contained in the Access-Control-Allow-Mehtods can be cached. Good for setting a time for when the cors is checked again (also tokens). 

###sources

1. https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
2. https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Origin
3. https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Headers
4. https://www.npmjs.com/package/cors#configuration-options
5. https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Max-Age