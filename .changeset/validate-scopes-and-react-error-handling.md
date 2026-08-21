---
"@googleworkspace/drive-picker-element": patch
"@googleworkspace/drive-picker-react": patch
---

Fix: Validate granted OAuth scopes with GIS `hasGrantedAllScopes` to prevent 403 error iframe on partial consent (#115) and deduplicate `picker-oauth-response` event dispatch.
Fix: Add `onPickerError` and `onError` handlers and `forwardRef` support to `@googleworkspace/drive-picker-react` (#116).
