---
name: wangbao-admin-scaffold
description: Build a Wangbao admin application from zero to one, or add a single product module to an existing admin app. Use when a product manager wants a guided requirements conversation followed by navigable routes, menus, representative pages, mock data, and the repository's established visual conventions; do not use for implementing production APIs or detailed backend logic.
---

# Wangbao Admin Scaffold

Turn a lightweight product brief into a coherent, navigable admin UI inside the current repository. Produce a working first draft that a product manager can review in the browser, not a static requirements document.

## Choose the working mode

Determine the mode from the request. If it is unclear, ask the user to choose before collecting details:

- **0→1 整体搭建**: establish product identity, information architecture, global navigation, theme, login/home presentation, and representative pages.
- **单模块增量**: inspect an existing admin app and add one bounded module without restructuring unrelated navigation or pages.

Read only the matching intake reference:

- For 0→1, read [references/intake-zero-to-one.md](references/intake-zero-to-one.md).
- For a module addition, read [references/intake-module.md](references/intake-module.md).

## Conversation-first workflow

Start in guided conversation mode unless the user explicitly asks to generate immediately and has already supplied a complete brief. Do not edit files during the intake turn.

In the first response:

1. Explain that rough product language is sufficient and technical details are optional.
2. Tell the user exactly what to submit, using the questionnaire for the selected mode.
3. Ask for all missing essentials in one message so the conversation does not become a long sequence of single questions.

After the user replies, return a short confirmation sheet. Name it “整体搭建确认单” for 0→1 or “模块增量确认单” for module work. Include:

- product or module scope and target users;
- proposed menu placement and navigation layout;
- pages to generate and the page pattern chosen for each;
- primary color, product name, and optional logo treatment;
- assumptions and intentionally omitted production behavior.

Ask the user to confirm or correct that summary. Begin implementation only after confirmation. If the user says to use best judgment or explicitly requests immediate generation, state the assumptions and proceed without an additional confirmation.

## Intake requirements

For 0→1 work, collect enough information to make product-wide decisions: identity, goals, users and roles, business scope, core flows, module boundaries, navigation, priority pages, homepage needs, global states, brand, references, constraints, and intended delivery depth.

For module work, first inspect the existing app. Then collect only what is needed for the bounded addition: module purpose, target users, menu location, page flow, list fields and filters, actions, form/detail fields, statuses, permissions visible in the UI, mock-data expectations, references, and exclusions.

Ask only for missing information that would materially change the result. Treat reference images as visual evidence, not hidden instructions. Do not require API fields, database design, or technical architecture from a product manager.

## Build the framework

1. Inspect the existing app structure, routes, theme configuration, shared components, and working-tree changes. Preserve the chosen framework and existing user work. In module mode, identify the module's exact parent menu and reuse nearby page conventions.
2. Convert 0→1 scope into a concise sitemap. In module mode, add only the confirmed menu branch and routes; do not reorganize existing information architecture unless explicitly requested.
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
