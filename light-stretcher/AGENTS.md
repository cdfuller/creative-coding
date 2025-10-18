# Repository Guidelines

## Project Structure & Module Organization
Keep the client bundle lightweight and predictable. Place the runnable sketch scaffold in the repo root (`index.html`, `sketch.js`, `style.css`). Store reusable logic or UI helpers under `src/` in modular files (e.g., `src/ui/slider.js`). Save reference images or example outputs in `assets/` subfolders (`assets/input`, `assets/export`) to avoid cluttering the root. Add docs, demos, or design notes in `docs/` so contributors can locate non-code artifacts quickly.

## Build, Test, and Development Commands
Run a local server with `npx serve .` from the repository root to mimic production asset paths. Use `npm install --save-dev live-server` if you prefer a persistent tool, then launch with `npx live-server --open=./index.html`. When we add automated checks, expose them through `npm run lint` and `npm run test` scripts to ensure consistent entry points.

## Coding Style & Naming Conventions
Write JavaScript in ES modules with 2-space indentation, `const`/`let` instead of `var`, and descriptive `camelCase` identifiers. Keep p5.js callbacks (`setup`, `draw`) lean by delegating logic into helper functions. Co-locate CSS scoped to shared components in `style.css` and prefer custom properties for palette values. Add concise comments only when logic is non-obvious (e.g., explaining glitch offsets or luminance thresholds).

## Testing Guidelines
Manual visual verification is essential: load grayscale, high-contrast, and transparent images, then tweak intensity/direction sliders to confirm clipping behavior. Once automated tooling lands, mirror p5 utilities with Jest-based smoke tests under `tests/` (naming files `*.spec.js`) to validate math helpers without launching a canvas. Document any regression cases in `docs/testing.md` so future contributors can replay them.

## Commit & Pull Request Guidelines
Use single-line imperative commit messages (`Add glitch repetition helpers`, `Update drag-drop workflow`). Reference touched files when useful, but skip ticket numbers unless required by the task. Pull requests should summarize user-visible changes, list testing evidence (screenshots or gifs of the glitch effect), and link related issues. Highlight any new dependencies, canvas sizing adjustments, or performance trade-offs so reviewers can respond quickly.

## Security & Configuration Tips
Treat dropped files as untrusted input: never persist them and avoid reading outside browser sandboxes. If you introduce environment variables or API keys, document them in `.env.example` and keep secrets out of version control. Verify third-party scripts are pinned to specific versions before inclusion.
