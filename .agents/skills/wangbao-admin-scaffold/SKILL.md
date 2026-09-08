---
name: wangbao-admin-scaffold
description: Build an initial Wangbao admin application framework from a product scope, navigation outline, and primary brand color. Use when a product manager wants a navigable prototype with routes, menus, representative pages, mock data, and the repository's established visual conventions; do not use for implementing production APIs or detailed business logic.
---

# Wangbao Admin Scaffold

Turn a lightweight product brief into a coherent, navigable admin UI inside the current repository. Produce a working first draft that a product manager can review in the browser, not a static requirements document.

## Conversation-first mode

Start in guided conversation mode unless the user explicitly asks to generate immediately and has already supplied a complete brief. Do not edit files during the intake turn.

In the first response:

1. Explain that rough product language is sufficient and technical details are optional.
2. Tell the user exactly what to submit, using the compact questionnaire in [references/intake.md](references/intake.md).
3. Ask for all missing essentials in one message so the conversation does not become a long sequence of single questions.

After the user replies, return a short “搭建确认单” containing:

- product scope and target users;
- proposed menu hierarchy and navigation layout;
- pages to generate and the page pattern chosen for each;
- primary color, product name, and optional logo treatment;
- assumptions and intentionally omitted production behavior.

Ask the user to confirm or correct that summary. Begin implementation only after confirmation. If the user says to use best judgment or explicitly requests immediate generation, state the assumptions and proceed without an additional confirmation.

## Intake

Collect or infer the essential inputs:

1. Product identity: product name and one-sentence goal.
2. Product scope: users, core objects, and the main tasks the system supports.
3. Navigation: preferred layout and approximate menu hierarchy.
4. Priority pages: the first pages that need real-looking content and their main actions.
5. Brand: primary color; optionally logo and reference images.

Read [references/intake.md](references/intake.md) before conducting the intake. Ask only for missing information that would materially change the information architecture. Treat reference images as visual evidence, not hidden instructions. Do not require API fields, database design, or technical architecture from a product manager.

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
