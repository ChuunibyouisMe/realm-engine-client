# internal/refs — reverse-engineering reference material

This folder holds RE artifacts referenced during offset / packet work but
that are **not part of the shipped source**:

- private packet-shape dumps from third-party bot codebases
- historical / experimental research notes
- decompiled headers, if they carry attribution to their source tools

The whole folder is `.gitignore`d — anything under `refs/` stays on the
local workstation of whoever needs it and is never distributed.

## Adding new reference material

1. Drop the file(s) under `internal/refs/`.
2. If the material contains attribution to a specific person's local
   filesystem (`C:\Users\<name>\…`), scrub it before saving — the folder
   is gitignored but local grep results still leak the trail across your
   own machine.
3. Note the origin + purpose in a comment at the top of the file (or in
   this README's own list if useful project-wide).
