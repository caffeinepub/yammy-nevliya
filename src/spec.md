# Specification

## Summary
**Goal:** Build the Yammy Nevliya bilingual (Hindi/English) recipe website with seeded world-famous recipes, searchable browsing, recipe details, and an in-app recipe creation flow, backed by a single Motoko canister.

**Planned changes:**
- Implement a Motoko recipe data model with persistence and APIs to create, list, get-by-id, and search/filter recipes (including bilingual fields and metadata).
- Seed the backend with an initial set of world-famous recipes across multiple categories and cuisines, each with English+Hindi content and a valid static photoAssetPath.
- Build a bilingual UI with a global Hindi/English language toggle that switches recipe content and key UI labels without reload.
- Create core pages and navigation: Explore (search + category/cuisine filters + recipe grid), Recipe Detail (photo, metadata, ingredients, steps), and a New Recipe form.
- Add a coherent food-themed visual design (avoiding blue/purple as primary colors) and ensure responsive layouts.
- Add and use generated static assets (logo/hero + recipe photos) under `frontend/public/assets/generated` and reference them via `photoAssetPath`.

**User-visible outcome:** Users can toggle Hindi/English, browse seeded world-famous recipes with photos, search and filter by category/cuisine, open a recipe detail page, and add new bilingual recipes via an in-app form selecting from existing static images.
