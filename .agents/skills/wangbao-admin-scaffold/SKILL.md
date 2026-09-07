---
name: wangbao-admin-scaffold
description: Build an initial Wangbao admin application framework from a product scope, navigation outline, and primary brand color. Use when a product manager wants a navigable prototype with routes, menus, representative pages, mock data, and the repository's established visual conventions; do not use for implementing production APIs or detailed business logic.
---

# Wangbao Admin Scaffold

Turn a lightweight product brief into a coherent, navigable admin UI inside the current repository. Produce a working first draft that a product manager can review in the browser, not a static requirements document.

## Intake

Collect or infer the three essential inputs:

1. Product scope: users, core objects, and the main tasks the system supports.
2. Navigation: preferred layout and approximate menu hierarchy.
3. Brand: primary color; optionally product name and logo.

Use [references/intake.md](references/intake.md) when the user wants a form to fill in. Ask only for missing information that would materially change the information architecture. Otherwise use clearly stated defaults and proceed.

## Build the framework

1. Inspect the existing app structure, routes, theme configuration, shared components, and working-tree changes. Preserve the chosen framework and existing user work.
2. Convert the scope into a concise sitemap. Keep the first draft small: include only navigation needed to demonstrate the main workflows.
3. Map every route to the closest established page pattern: standard list, tab list, tree plus table, basic form, stepped form, drawer form, basic detail, or detail plus related list.
4. Configure the primary color through the project's theme tokens. Derive states from tokens; do not scatter hard-coded brand colors across pages.
5. Implement the navigation, routes, page shells, representative fields, mock rows, empty/loading states where useful, and enough interaction to make navigation and tabs visibly testable.
6. Follow [references/ui-contract.md](references/ui-contract.md). Reuse existing project components and examples before introducing new abstractions.
7. Verify relevant type checks or builds and inspect the main routes in the browser. Fix visible overflow, inconsistent spacing, inactive controls, and navigation-state errors.

## Scope boundaries

- Build presentation, routing, mock data, and lightweight local interaction only unless the user explicitly requests production behavior.
- Do not invent API contracts, permissions, database schemas, analytics, deployment, or destructive migrations.
- Do not replace the repository's UI framework or redesign unrelated pages.
- Mark assumptions in the handoff so the product manager can revise them.

## Handoff

Report the resulting sitemap, preview routes, primary color, major assumptions, and what remains mocked. Keep the explanation product-facing; mention implementation details only when they help the next person continue the work.
