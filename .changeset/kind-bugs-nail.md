---
"@googleworkspace/drive-picker-element": patch
---

Add a console warning when the `app-id` attribute is missing. While the picker may function without it, `app-id` is often required for backend API integration (e.g., `drive.files.get`). This warning helps developers identify potential configuration issues earlier.
