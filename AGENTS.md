## Rule Zero — Context7 is mandatory

This is the most important rule in this file. Everything else is secondary.

- Before writing code that touches ANY third-party library (Next.js APIs, shadcn, Prisma, Supabase, Zod, TanStack, etc.), resolve the library ID and fetch its docs with Context7.
- Never write library API calls from training data alone. Training data is stale. Docs are current.
- If Context7 has no docs for a library, say so and fall back to the official docs site — do not guess the API.
- When upgrading or adding a package, re-fetch its docs. APIs change between versions.
- Docs precedence: for Next.js itself, the version-exact guides in `node_modules/next/dist/docs/` win. Context7 covers everything else.

## Project Rules

These are non-negotiable. Every deviation is a mistake. No exceptions.

**Command execution**

- All scripts use **pnpm**, not npm/yarn/bun. Never use `npx` or `npm exec` — use `pnpm`.
- One-off CLIs (e.g. shadcn) run via `pnpm dlx`, not npx.
- Always read `package.json` before running anything unfamiliar.

**Component architecture**

- `page.tsx` MUST be a Server Component. No `"use client"` directive at the top of any `page.tsx`. Ever.
- Pages only fetch data, compose layouts, and pass props down.
- If a page needs state, an event handler, or a browser API — that logic does NOT belong in the page. Extract it into a Client Component.
- Any component that needs interactivity (useState, useEffect, useRef, event handlers, window, localStorage, etc.) MUST be a Client Component.
- Add `"use client"` at the very top of the file — before any imports.
- Keep Client Components as small and leaf-level as possible. Push them down the tree.

**UI construction**

- Every UI element MUST come from shadcn/ui first. Check before writing custom `<div>`: Button, Input, Card, Dialog, Sheet, Table, Form, Select, Tabs, Badge, Avatar, Skeleton — use them all.
- Do NOT install or use Radix UI primitives directly. shadcn wraps them. Use shadcn.
- Do NOT use MUI, Chakra, Mantine, Headless UI, or any other component library alongside shadcn.
- Custom components only permitted when shadcn has nothing that fits. Document why when that happens.
- Always import from `@/components/ui/...`. Style is `radix-nova`. Custom theme lives in `app/globals.css`.

**Separation of concerns**

- Components are responsible for **one thing**: turning data into markup.
- No business logic inside components (no transformation, validation, decision-making).
- No direct database calls inside components. Data arrives via props, Server Actions, or query hooks.
- No API route logic inside UI files.
- If you find yourself writing conditionals that belong in a service or utility — extract and import.

**File structure**

- Every shared component MUST live in its own named folder.
- Structure: `components/ComponentName/ComponentName.tsx`
- Folder name is PascalCase and matches the component name exactly.
- File inside is also PascalCase and matches the folder name exactly.
- One component per folder. No barrel `index.ts` files unless explicitly needed for re-exports across multiple sub-components of the same feature.
- Default export name must match the file and folder name.

**TypeScript discipline**

- Strict mode is on. No `any`. Ever. Use `unknown` plus narrowing when the type is genuinely unknowable.
- Every function parameter and return type is annotated. No implicit anys.
- Validate all external input (forms, URL params, API payloads) with Zod schemas before it touches business logic.
- Prefer `type` for object shapes. Use `interface` only when extension is needed.
- No non-null assertions (`!`) without a comment explaining why it is safe.

**Data layer (Supabase / Prisma)**

- Every new table gets Row Level Security policies before it ships. No exceptions.
- Never expose the service-role key to the client. Client components only ever see the anon key.
- Schema changes go through Prisma migrations. Never hand-edit the production database.

**Server Actions & API routes**

- Every Server Action validates input with Zod first, checks auth second, runs logic last.
- Return typed results. Never throw raw errors to the client — map to user-safe messages.
- No business logic in route handlers that belongs in a service module. Handlers parse, validate, delegate.

**Error handling & UX states**

- Every data-fetching component has three states: loading (Skeleton), error (user-readable message plus retry), empty (a designed empty state, not a blank page).
- Use route-level `loading.tsx` and `error.tsx` files.
- No silent failures. No empty catch blocks. Log the error, show the user something useful.

**Testing discipline**

- After EVERY change: test the specific feature you touched, then re-test the section it lives in. Both must be green.
- Once per feature, before marking it Done: run a full-app smoke pass, then `pnpm build`. The order is fixed: change → test → build → done. Never build before testing.
- Use the Playwright MCP to test the application fully. Drive the real UI: navigate, click, fill forms, submit, verify. Nothing ships untested.
- Test the unhappy paths too: invalid input, failed requests, empty states, logged-out users.
- Screenshots on failure. If you cannot reproduce it, you cannot claim it works.
- Circuit breaker: if the same problem fails 3 attempts in a row, stop, mark the item Blocked, and report why. Do not loop forever.
- If the build fails, fix it and re-run the loop (tests + build). A feature is not done until tests pass AND the build passes.

**Performance**

- No client-side fetch waterfalls. Fetch in parallel with `Promise.all` or colocate data needs in Server Components.
- Use `next/image` for content images. No raw `<img>` tags.
- Keep Client Components small and leaf-level (this is why that rule exists).
- Check bundle impact before adding a dependency. If a util function is all you need, do not install a library.

**Security**

- `.env` is gitignored. Never commit secrets. Verify `.env` exists before `pnpm dev` — a missing env file crashes immediately.
- Validate everything at the boundary with Zod. Trust nothing from the client.

**Styling**

- Tailwind only. Theme tokens live in `app/globals.css` — use them, never hardcode colors.
- No inline styles except for genuinely dynamic values (computed widths, animation values).
- shadcn first. Custom CSS only when Tailwind cannot express it.

**Accessibility**

- Every input has a label. Every icon-only button has an aria-label.
- Semantic HTML: buttons are `<button>`, links are `<a>`. No divs pretending to be interactive.
- Keyboard navigable. If you cannot Tab through it, it is broken.

**Git & commits**

- `pnpm lint` before every commit. It is the quality gate.
- Never auto-commit without explicit approval.
- Small, scoped commits. One logical change per commit.

**Code hygiene**

- No `console.log` in committed code. Use proper logging or remove it.
- No dead code, no commented-out blocks. Delete it — git remembers.
- No bare `// TODO`. Every TODO names an owner and a reason.

**Documentation**

- When behavior changes, update the docs in the same change. Code and docs ship together.
- Document WHY for non-obvious decisions, not WHAT the code does.

## One-time build specs

Task-specific requirements (features, design tokens, checklists) live in a separate `SPEC.md` next to this file. This file holds permanent rules only. If a SPEC.md exists, follow it — it may scope or override sections of this file for that build.

## Commands (pnpm)

- `pnpm install` — install dependencies
- `pnpm dev` — start development server (requires `.env`)
- `pnpm build` — runs `pnpm next build` (also runs `prisma generate`)
- `pnpm start` — start production server (after build)
- `pnpm lint` — run ESLint (Next.js core-web-vitals + typescript). Run before every commit.

`.env` is gitignored. Never commit secrets.

## Framework Notes

- Next.js 16 + React 19. APIs and conventions differ from older versions — do not assume.
- `next.config.ts`: React Compiler is enabled (`reactCompiler: true`).
- TypeScript path alias: `@/*` maps to the project root.
- App Router only. Pages are Server Components by default.
- Always read package.json.

## Gotchas

- `pnpm build` already runs `prisma generate`. Only run it separately if the schema changed and you need the client rebuilt without a full build.
- Missing `.env` will crash `pnpm dev` immediately — verify it exists first.
- Never use `npx` or `npm` — this project uses pnpm exclusively.

## Summary

| Rule | Requirement |
| --- | --- |
| Context7 | Mandatory before any library API usage — rule zero; node_modules docs win for Next.js itself |
| `page.tsx` | Server Component — no exceptions |
| Interactivity | Extract to small leaf-level Client Components |
| UI library | shadcn/ui only |
| Code | Strict TS, no `any`, Zod at every boundary, one component per folder |
| Data | RLS on every table, migrations only |
| Testing | Feature + section per change; full smoke + build per feature; 3-strike circuit breaker |
| UX states | Loading, error, empty — always |
| Commits | `pnpm lint` first, no auto-commit |

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
