---
"@googleworkspace/drive-picker-element": patch
---

Fix: `injectScript` now always injects a new script element to avoid race conditions with `async` loading. It also copies all attributes (including `nonce` and `integrity`) from any existing script tag to ensure CSP compliance.
