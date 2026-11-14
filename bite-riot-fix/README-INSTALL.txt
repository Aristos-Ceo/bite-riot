# BITE RIOT — Professional Loader + Homepage Hero Fix (v2)

This patch targets the current public BITE RIOT source layout:
- `src/components/site-intro.tsx`
- `src/app/loader-mobile-polish.css`

## What it changes
- Replaces the emoji/orbit/spark loader with a restrained editorial brand loader.
- Removes the decorative emoji, orbit and sparkle elements from the loader markup.
- Keeps the existing once-per-session intro behavior, with a shorter 1.8-second timeout.
- Adds a clean progress line, restrained grid texture and typography using the existing BITE RIOT palette.
- Forces homepage hero text, supporting copy and buttons to remain left-aligned on desktop and mobile.
- Leaves the shared food slideshow and other page components untouched.
- Creates timestamped backups before changing either file.

## Install on Windows
1. Extract this ZIP.
2. Copy the `bite-riot-fix` folder into the project folder that contains `package.json`.
3. Open PowerShell in that project folder.
4. Run:

   `node .\bite-riot-fix\apply-fix.cjs`

5. Then run:

   `npm.cmd run build`

6. If the build passes, inspect the site locally:

   `npm.cmd run dev`

   Open `http://localhost:3000` and check the homepage on desktop and a narrow mobile viewport.

7. Only after visual checks pass, stage and commit the changed files:

   `git add src/components/site-intro.tsx src/app/loader-mobile-polish.css`

   `git status`

   Confirm `.env` is NOT staged. Then:

   `git commit -m "Refine BITE RIOT loader and homepage hero alignment"`

   `git push origin main`

Vercel should deploy from the connected GitHub branch.

## Important
- Do not replace your whole project or upload the original ZIP again.
- The script backs up the two target files in `.bite-riot-backup-<timestamp>`.
- It appends CSS to the existing loader stylesheet, preserving its slideshow and other page rules.
- This patch is based on the public GitHub `main` source. If you have unpushed local edits to either target file, the backup lets you restore them.
- This patch does not change database settings, environment variables, authentication, checkout, WhatsApp, or order tracking.
