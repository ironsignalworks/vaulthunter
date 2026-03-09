# Contributing to VAULT HUNTER

Thanks for your interest in VAULT HUNTER. This is a small indie web game by Iron Signal Works.

## Ways to Contribute

- **Bug reports** — Open an issue describing the bug, steps to reproduce, and your environment (browser, OS).
- **Suggestions** — Feature ideas and UX improvements are welcome as issues.
- **Code** — For larger changes, open an issue first to discuss before submitting a PR.

## Development Setup

1. Clone the repo and open `index.html` in a browser, or run a local server (see [README](README.md#run-locally)).
2. Edit `index.html` (inline CSS) and `script.js` (game logic).
3. Test on desktop and mobile viewports — the game is mobile-first.

## Code Style

- **JavaScript** — ES6+, no frameworks. Use `const`/`let`, arrow functions where natural.
- **CSS** — Inline in `<style>`, uses custom properties. Keep selectors minimal.
- **HTML** — Semantic where possible, accessibility-friendly (ARIA, focus states).

## Submitting Changes

1. Fork the repo.
2. Create a branch (`git checkout -b fix/something` or `feature/something`).
3. Commit with clear messages (`git commit -m "Fix: correct timer display on mobile"`).
4. Push and open a pull request.
5. Ensure the game runs and passes basic playthrough on your changes.

---

© Iron Signal Works
