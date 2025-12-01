# Drive Picker CSP Example

This example demonstrates how to use the `@googleworkspace/drive-picker-element` in an environment with a Content Security Policy (CSP).

## Key Features

1.  **CSP Meta Tag**: The `index.html` includes a `<meta http-equiv="Content-Security-Policy">` tag that defines the allowed sources for scripts, frames, styles, and images.
2.  **Pre-loaded Scripts**: The Google API scripts (`api.js` and `client`) are loaded via `<script>` tags in the `<head>`. This prevents the `drive-picker-element` from attempting to dynamically inject them, which is often blocked by strict CSPs.
3.  **Frame Source**: The `frame-src` directive includes `https://docs.google.com` and `https://drive.google.com` to allow the Picker iframe to load.

## Usage

1.  Install dependencies:

    ```bash
    pnpm install
    ```

2.  Start the development server:

    ```bash
    pnpm dev
    ```

3.  Open the browser and verify that the Picker loads correctly (you will need to provide a valid `client-id` and `app-id` in `index.html` or `src/main.ts`).

## CSP Configuration

The CSP used in this example is:

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://apis.google.com https://accounts.google.com;
  frame-src 'self' https://docs.google.com https://drive.google.com https://accounts.google.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' https://*.googleusercontent.com;
  connect-src 'self' https://*.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
```
