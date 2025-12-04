# @googleworkspace/drive-picker-element

## 0.7.2

### Patch Changes

- 1a2fafb: Added Content Security Policy (CSP) guide and example.
- c37edb5: Fix: `injectScript` now always injects a new script element to avoid race conditions with `async` loading. It also copies all attributes (including `nonce` and `integrity`) from any existing script tag to ensure CSP compliance.
- 2f1276b: Update README to point to @googleworkspace/drive-picker-react for React usage.

## 0.7.1

### Patch Changes

- e7d5f8c: Add a console warning when the `app-id` attribute is missing. While the picker may function without it, `app-id` is often required for backend API integration (e.g., `drive.files.get`). This warning helps developers identify potential configuration issues earlier.

## 0.7.0

### Minor Changes

- 16fae9d: Add React wrapper package.

## 0.6.5

### Patch Changes

- e0d4ab6: Fix provenance for package.

## 0.6.4

### Patch Changes

- 3178fef: Fix README after monorepo transition.
- 3178fef: Fix path to custom-elements.json

## 0.6.3

### Patch Changes

- d465c69: fix: minor formatting and build process cleanup
