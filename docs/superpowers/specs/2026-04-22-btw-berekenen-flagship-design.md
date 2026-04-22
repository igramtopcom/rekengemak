# BTW Berekenen Flagship Page Design

## Status
Draft for review

## Date
2026-04-22

## Context
RekenGemak has moved beyond the original 12-tool MVP. The live site now contains the homepage, the 12 core tools, static trust pages, and a growing `kennisbank`. The next growth phase is not broad feature sprawl across the full site. The priority is a targeted upgrade of the highest-potential landing pages so they can capture more search traffic, convert more visitors into tool usage, and send more users deeper into the site.

The owner confirmed the current business goal for this phase is:

- optimize the interface
- add useful features
- support future traffic growth

From the three candidate flagship pages:

- `btw-berekenen`
- `procenten-berekenen`
- `vakantiegeld-berekenen`

`btw-berekenen` was selected as the flagship page for the first upgrade cycle.

## Why `btw-berekenen` First
This decision is based on a mix of product fit, search demand, and site differentiation.

### Market signals
- Public Semrush snapshots for `btwberekenen24.nl` show strong traffic and a high-volume keyword cluster around `btw berekenen`.
- One Semrush snapshot for December 2025 shows `btw berekenen` at roughly `60,500` average monthly searches in the Netherlands and the competitor domain at `87.26K` visits in that month.
- A later Semrush snapshot for March 2026 shows the same competitor domain at `118.07K` visits.
- Semrush defines search volume as average monthly search volume over the prior 12 months, so the number should be interpreted as directional rather than as a live daily count.

### Product fit
- `btw-berekenen` already has a strong base: NL and BE support, formula explanation, history, deeplinks, copy actions, print action, and comparison output.
- The page already solves a high-intent utility task with low friction.
- Repositioning it from a plain calculator to a fast VAT workspace can create a visible UX gap versus common competitor pages that still behave like generic form calculators.

### Strategic fit
- `btw-berekenen` is evergreen across the year.
- `vakantiegeld-berekenen` remains valuable as a near-term seasonal push for May-June 2026, but it is more seasonal.
- `procenten-berekenen` has broader utility, but the search landscape is crowded with exact-match calculator sites, so it is a weaker first page for a flagship UX-led differentiation test.

## Sources Used For The Decision
- Semrush traffic snapshot for `btwberekenen24.nl` dated April 13, 2026:
  `https://www.semrush.com/website/btwberekenen24.nl/overview/`
- Semrush traffic snapshot for `btwberekenen24.nl` dated January 13, 2026:
  `https://www.semrush.com/website/btwberekenen24.nl/overview/?source=trending-websites`
- Semrush explanation of search volume:
  `https://nl.semrush.com/kb/683-what-is-search-volume-in-semrush`
- Rijksoverheid guidance on vakantiegeld timing and amount:
  `https://www.rijksoverheid.nl/onderwerpen/vakantiedagen-en-vakantiegeld/vraag-en-antwoord/hoe-hoog-is-mijn-vakantiegeld`
- Belastingdienst example page for VAT calculations:
  `https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/btw_berekenen_aan_uw_klanten/btw_berekenen/rekenvoorbeeld_btw_berekenen`

## Current-State Assessment
The current live `btw-berekenen` page is already functional and materially stronger than a barebones calculator page. It includes:

- NL and BE country tabs
- inclusive/exclusive direction toggle
- immediate result rendering
- formula explanation block
- local history
- deeplink state in the URL
- copy and print actions
- educational content and FAQ

The main weakness is not missing capability. The weakness is interaction framing.

The current interface still behaves like a technical calculator:

- first the user chooses a country
- then the user interprets a toggle
- then the user figures out what kind of VAT action they actually need

That is the wrong order for many search visitors. Search intent is usually framed as:

- I want to add VAT
- I want to remove VAT
- I want to know the VAT part only
- I want to check if an invoice amount is right
- I want to compare NL and BE rates

The page should therefore shift from `field-first` UX to `intent-first` UX while preserving instant calculation speed.

## Goals
- Increase first-screen clarity for search visitors.
- Increase successful tool interaction rate.
- Increase shareability and repeat use through URL state and stored history.
- Increase clicks from the flagship tool page into the knowledge base.
- Create a reusable UI and feature pattern that can be adapted later for `vakantiegeld-berekenen` and `procenten-berekenen`.

## Non-Goals
- No framework migration.
- No shared asset pipeline.
- No server-side features.
- No account system or cloud sync.
- No invoice generator or PDF export in this phase.
- No full-site redesign in this spec.

## Alternatives Considered

### Option A: polish the current calculator only
Keep the current structure and apply incremental UX improvements such as better spacing, better copy actions, and better mobile rhythm.

Pros:
- lowest implementation risk
- fastest delivery
- minimal regression surface

Cons:
- weaker differentiation
- lower impact on user understanding
- less reusable as a flagship interaction pattern

Rejected because it improves the page without materially changing how visitors understand or use it.

### Option B: convert the page into a VAT workspace
Keep the underlying calculator speed, but reorganize the page around explicit intent modes such as adding VAT, removing VAT, checking VAT only, and comparing rates.

Pros:
- best UX impact for the current codebase
- easiest way to align the page to search intent
- strong reusable pattern for later rollout

Cons:
- requires a careful UI refactor and clearer state model
- larger regression surface than simple polish

Accepted because it creates a meaningful product upgrade without introducing a new stack or a new runtime model.

### Option C: turn the page into a guided decision tool
Introduce a stronger wizard-like experience that asks the user what they are trying to do and guides them through a sequence.

Pros:
- highly beginner-friendly
- strong educational framing

Cons:
- slower for repeat users
- risks overcomplicating a quick utility page
- easiest path to hurting speed and flow

Rejected for phase 1. It may become useful later for selected edge cases, but it is too heavy for the first flagship iteration.

## Product Direction
`btw-berekenen` will be repositioned from a generic VAT calculator into a fast `VAT workspace`.

The page will still solve the same calculations, but its first screen will immediately answer the user's practical task. The interaction model will prioritize intent first, then country and rate, then raw field input.

The result should feel:

- faster to understand
- easier to use on mobile
- more trustworthy for invoice checking
- more shareable
- more connected to related educational content

## User Intents To Support
Phase 1 will explicitly support these user intents:

1. Add VAT to an amount without VAT.
2. Remove VAT from an amount including VAT.
3. See only the VAT portion of a number.
4. Compare different rates on the same base amount.
5. Check whether an invoice amount looks correct.
6. Compare NL versus BE scenarios quickly.

## UX Structure
The first-screen experience will be reorganized into five major blocks.

### 1. Action-led hero
The hero remains short and search-friendly, but directly exposes quick intents below the subtitle:

- `BTW erbij rekenen`
- `BTW eruit rekenen`
- `Factuur checken`
- `NL of BE vergelijken`

These intents are shortcuts that set the tool mode and move focus into the calculator. They are not a separate navigation system.

### 2. Mode-based tool card
The calculator card becomes centered around explicit modes instead of a single direction toggle.

Primary modes:
- `Excl -> Incl`
- `Incl -> Excl`
- `Alleen btw-bedrag`
- `Tarieven vergelijken`

Country remains available, but becomes a secondary switch because `land` is not the main intent for most users. The user first chooses the kind of task, then the country/rate details.

### 3. Two-layer result area
The result area is split into:

- a single primary answer with dominant visual weight
- three smaller breakdown cards:
  - `Excl. btw`
  - `BTW`
  - `Incl. btw`

This makes the output more scannable on mobile and produces cleaner screenshots and copied summaries.

### 4. Action strip below results
Below the result area, the page exposes immediate actions:

- `Kopieer resultaat`
- `Deel link`
- `Berekening opslaan`

`Deel link` uses the existing deeplink state so users can send the exact calculation to a customer, colleague, or their future self.

### 5. Support blocks
The page keeps the formula and history blocks, then adds a stronger support area:

- existing formula explanation
- existing history
- new quick examples block
- contextual internal links to relevant `kennisbank` content

## Phase 1 Feature Scope
Phase 1 includes exactly six user-facing feature upgrades.

### Feature 1: intent modes
Replace the current direction-heavy framing with explicit user tasks:

- `Excl -> Incl`
- `Incl -> Excl`
- `Alleen btw-bedrag`
- `Tarieven vergelijken`

This is the most important UX change in the phase.

### Feature 2: shareable result
Add a visible `Deel link` action that copies the current deeplink URL.

This is intentionally small in technical scope and large in practical value.

### Feature 3: structured result cards
Render results as separate numeric cards for:

- exclusive amount
- VAT amount
- inclusive amount

The page already has the data. This change is primarily a rendering and hierarchy upgrade.

### Feature 4: quick examples
Add fast-fill examples such as:

- `EUR100 @ 21%`
- `EUR250 @ 9%`
- `EUR100 incl. 21%`
- `EUR100 BE @ 6%`

The quick examples reduce empty-state hesitation and help first-time users start interacting immediately.

### Feature 5: invoice check helper
Add a small helper framing below the main calculator to support invoice checking.

This is not a second calculator. It is a wording and output-context enhancement that makes an existing use case more explicit.

### Feature 6: contextual internal links
After a calculation, show relevant links into the knowledge base based on the chosen mode and rate.

Examples:
- NL standard rate -> `wat-is-btw`
- comparison mode -> a rate-explanation article
- inclusive-to-exclusive mode -> invoice or factuur guidance

This turns the flagship page into both a converter and a traffic distribution point.

## Information Architecture Changes
The flagship page will keep a single-page structure, but the calculator area will change from:

- country tab
- direction toggle
- amount field
- result

to:

- quick intent shortcuts
- mode bar
- country and rate controls
- amount input
- primary result
- breakdown cards
- result actions
- support blocks

This preserves speed while removing the need for the user to mentally translate from UI controls into their real-life task.

## Technical Design
Implementation stays inside `btw-berekenen/index.html`.

### Constraints
- no framework
- no bundler
- no external UI dependency
- inline CSS and JS only
- preserve current dark/light theme behavior
- preserve PageSpeed-oriented design choices

### Reused capabilities
The phase should reuse and adapt the current logic where possible:

- inclusive and exclusive VAT math
- formula rendering
- history persistence
- deeplink updates
- copy behavior
- print behavior

### State model
The page state should be normalized around:

- `land`
- `mode`
- `rate`
- `amount`

`direction` should stop being an independent user concept and instead become a consequence of `mode`.

This reduces branching complexity and makes deeplink state easier to understand and restore.

### Functional units inside the page script
The script should be reorganized into clear units, even though it remains a single file:

- state reading
- mode application
- calculation
- result rendering
- support rendering
- URL synchronization
- history persistence
- quick example application

Suggested function families:

- `renderModeState()`
- `readInputs()`
- `calculateBtwScenario()`
- `renderPrimaryResult()`
- `renderBreakdownCards()`
- `renderFormula()`
- `renderHistory()`
- `updateUrlFromState()`
- `restoreStateFromUrl()`
- `applyQuickExample()`

The exact names may change during implementation, but the separation of responsibilities should remain.

## Deeplink Compatibility
The current page already supports URL state. The upgraded page should continue to support:

- amount
- rate
- country
- calculation direction or equivalent mode

Where possible, existing URL parameters should continue to work so old shared links do not silently break.

## Content Strategy For The Flagship Page
The page should remain primarily a tool page, not become a long article with a calculator buried inside it.

Content must support the tool:

- quick orientation in the hero
- practical framing for invoice checks and rate comparison
- concise examples close to the calculator
- deeper explanation and FAQ below the fold
- contextual links into the `kennisbank`

The educational content should reinforce search relevance without slowing down the first interaction.

## Error Handling
Error behavior should remain simple and local.

- Invalid or empty input should not produce noisy alerts.
- Blank or invalid state should reset the result area cleanly.
- Quick example actions should always produce a valid render.
- Mode changes should not leave stale labels or stale result phrasing behind.
- Deeplink restore should fail safely if parameters are malformed.

## Testing Expectations
Phase 1 implementation must verify at least:

- NL `Excl -> Incl`
- NL `Incl -> Excl`
- BE `Excl -> Incl`
- `Alleen btw-bedrag`
- `Tarieven vergelijken`
- copy primary result
- copy/share deeplink
- quick example application
- history save and restore
- URL restore for saved state
- stable mobile layout behavior

## Success Metrics
This design is meant to improve the page as a growth surface, not only as a prettier calculator.

Success should be evaluated with metrics such as:

- more visitors interacting with the tool
- more use of copy/share actions
- more clicks from `btw-berekenen` into the `kennisbank`
- stronger retention and revisit behavior through deeplinks and saved calculations
- later reuse of the same interaction pattern on `vakantiegeld-berekenen` and `procenten-berekenen`

## Risks And Mitigations

### Risk 1: the single file becomes harder to maintain
Mitigation:
- keep the scope focused
- reorganize JS into sections with clear responsibilities
- avoid unrelated cleanup

### Risk 2: deeplink or history regressions
Mitigation:
- preserve compatibility where possible
- test restore flows explicitly

### Risk 3: UI polish hurts speed
Mitigation:
- no new libraries
- no new asset pipeline
- no heavy animation
- retain inline static architecture

### Risk 4: intent-first UX slows repeat users
Mitigation:
- make mode switching one tap
- keep all actions immediate, not wizard-driven

## Rollout Strategy

### Phase 1
Upgrade `btw-berekenen` as the flagship VAT workspace.

### Phase 1b
Apply selected seasonal improvements to `vakantiegeld-berekenen`, reusing the strongest interaction patterns where they fit.

### Phase 2
Adapt the validated pattern to `procenten-berekenen`.

This rollout order keeps the learning loop tight:

- prove the flagship pattern on the strongest evergreen page
- adapt it to a seasonal opportunity
- then scale to another high-potential calculator

## Decision Summary
RekenGemak should not spread this phase across the whole site. It should use `btw-berekenen` as the flagship page, upgrade it from a generic VAT calculator into a fast VAT workspace, and use that page to validate a repeatable design pattern for future traffic-focused upgrades.
