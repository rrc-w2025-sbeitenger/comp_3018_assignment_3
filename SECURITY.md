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

4. **xPermittedCrossDomainPolicies:{permittedPolicies: "None"}** - Mainly used for legeacy browers clients of this domains policy for loading cross-domain content. It's disabled so no policy
files are allowed.

5. **hidePoweredBy: true** - Enabled, it removes server information from response headers.

6. **noSniff: true** - Enabled to prevent MIME sniffing which protects against malicious attacks where a the servers thinks a file is content safe but rather it's a malicious file.

7. **frameguard: { action: "deny" }** - Set to deny to prevent clickjacking, current there is no html site but it's good for future proofing.

### Sources

1. Helmet.js Official Documentation - https://helmetjs.github.io/
2. OWASP Secure Headers Project - https://owasp.org/www-project-secure-headers/


## Cors Configuration

### Configuration Applied

\`\`\`
const getCorsOptions = () => {
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment) {
        return {
            origin: true,
            credentials: true,
        };
    }

    return {
        origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    };
};
 \`\`\`

### Justification

1. ****