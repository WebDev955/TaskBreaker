# TaskBreaker - CSS Style Report -7.25.26

Audit of every stylesheet and CSS Module under `src/`, cross-referenced against the components that use them. Goal: flag layout issues, evaluate the color palette, and call out general design/consistency gaps.

## Summary

The app has the bones of a real design system — six CSS custom properties defined in `src/index.css`, consistent camelCase class naming, and a coherent flex-based layout strategy with no `@media` queries at all (single-column, works down to narrow widths without breakpoints). But the system is only half-adopted: older components (`AddGoal`, `AddChunk`, `AddTask`, `ArchivedGoals`, `Notes`) bypass the palette entirely with named CSS colors (`lightsalmon`, `tan`, `chocolate`, etc.), there's a real (if minor) layout bug currently live in `GoalsDisplay.module.css`, and there are zero custom button styles or `:focus` states anywhere in the app outside AntD components.

**Bottom line: yes, your CSS works** — nothing here is broken in a way that crashes the layout — but there are one active bug, one accessibility (contrast) failure, and a consistent theme of "newer components follow the palette, older ones don't."

---

## 1. Layout Issues

### Active bug: bottom nav overlap, self-canceling margin
- `src/components/NavBar.module.css` — the navbar is `position: fixed; bottom: 0; width: 100vw`, so any scrollable screen needs bottom clearance roughly equal to its rendered height (~70-90px).
- `src/components/GoalList/GoalsDisplay.module.css:2` sets `margin-bottom: 80px;` on `.mainWrapper`, but line 6 immediately overrides it with `margin-bottom: 200px;` in the same rule. The `80px` was almost certainly the intended nav-clearance value; `200px` looks like a leftover from editing, not a deliberate choice.
- **Bigger issue:** `Notes.module.css`, `ArchivedGoals.module.css`, and `Pomodoro.module.css` reserve **no bottom space at all** — the last ~70-90px of content on the Notes, Archive, and Pomodoro screens renders underneath the fixed nav.
- Suggested direction: one `--navbar-height` variable, referenced by both the navbar's own box model and a shared bottom-padding rule applied to whatever wraps `renderContent` in `App.tsx`, instead of each screen guessing (or forgetting).

### Other layout findings
- `NavBar.module.css` uses `width: 100vw` on a fixed element inside a page that also sets `overflow-x: hidden` on `#root` — if a scrollbar is present, `100vw` can include the scrollbar gutter and cause a 1-2px horizontal overhang. `width: 100%` avoids this since the element is fixed to viewport anyway.
- Two self-canceling declarations found (dead CSS, likely bugs rather than intentional):
  - `TasksDisplay.module.css:71-74` — `.downArrow:hover` sets `transform: scale(1.5)` then `transform: scaleY(-1)` on the next line; only the flip survives. If both were intended: `transform: scale(1.5) scaleY(-1);`.
  - `NavBar.module.css:18-19` — `justify-content: flex-start` immediately overridden by `justify-content: space-evenly`.
  - `GoalsDisplay.module.css:90-92` — `.focusGoal {}` is an empty ruleset; the "Focus Goal" button in `GoalsDisplay.tsx` renders as a bare, unstyled `<button>`, suggesting the class was never actually wired up.
- `GoalNote.module.css:9-18` — the note `<textarea>` is hardcoded `width: 300px; max-width: 350px`. Against `#root`'s `width: 95%; max-width: 650px` shell, a very narrow phone (~280-320px) can force this textarea past the visible edge; since `#root` clips overflow-x, it will silently cut off rather than scroll.
- No `@media` queries exist anywhere in `src`. That's a coherent minimalist strategy given the fixed 650px max-width shell (everything just stacks in one column), but it also means there's no deliberate "wide screen" layout — a desktop browser gets the same narrow column as a phone, just centered with empty space on either side.
- No `z-index` is used anywhere in the project — no current conflicts, but the AntD modals/toasts are relying entirely on AntD's own internal stacking. Worth a deliberate scale if a custom overlay is ever added later.

---

## 2. Color Audit

### Defined palette (`src/index.css`)

| Variable | Value | Where it's actually used |
|---|---|---|
| `--rusty-spice` | `#af3800` | `App.css`, `TasksDisplay.module.css`, `Notes.module.css` |
| `--alabaster-grey` | `#eae6e5` | `App.css`, `ChunksDisplay.module.css`, `GoalsDisplay.module.css`, `NavBar.module.css` |
| `--mint-leaf` | `#4fb286` | `GoalsDisplay.module.css` (`.progressFill`) only |
| `--dusk-blue` | `#274c77` | `index.css` root background only |
| `--crimson-violet` | `#5c0029` | **Unused anywhere** |
| `--max-mobile-width` | `430px` | **Unused anywhere** |

So there's a real, intentional 4-color palette — but 2 of the 6 tokens are dead, and it's only consistently applied in the Goals/Tasks display components.

### Color drift
- `GoalsDisplay.module.css:87` — `.goalOptionsMenu` uses `rgba(175, 55, 0, 0.575)` instead of `var(--rusty-spice)` (`#af3800` = `rgb(175, 56, 0)`). It's off by 1 on the green channel and hand-typed instead of referencing the variable — if the brand color is ever retuned, this rule silently falls out of sync.

### Colors outside the token system
The palette is well-followed in `GoalsDisplay`/`TasksDisplay`, but bypassed elsewhere:
- `AddGoal.module.css` — `grey`
- `addChunk.module.css` / `AddAdditionalChunk.module.css` — `lightsalmon` (at least consistent with each other)
- `addTask.module.css` / `AddAdditionalTask.module.css` — `lightslategray`, `aliceblue`
- `ArchivedGoals.module.css` + inline styles in `ArchivedGoals.tsx` — `tan`, `lightblue`, `beige`, plus inline `lightgreen` and `red`
- `Notes.module.css` — `chocolate`, `burlywood`
- `NavBar.module.css` — `#ff661f` (a second, unrelated orange — not the same as `--rusty-spice`) and `rgb(253, 176, 176)`
- `GoalsDisplay.module.css:72` — `#f195be80`, a one-off translucent pink with no palette relationship

These read like placeholder/wireframe colors that were never migrated once the real palette was established — there's no shared logic tying `lightsalmon` (chunks) to `lightslategray` (tasks) to the brand colors.

### Accessibility / contrast
- **Real failure:** `TasksDisplay.module.css` sets `.mainTaskDisplayWrapper { background-color: var(--rusty-spice) }` (`#af3800`) with no explicit text color, so it inherits black from its ancestor. Black-on-`#af3800` computes to **≈3.4:1 contrast**, below WCAG AA's 4.5:1 minimum for normal-size text — and this block contains real body-size task text, not large headers. This is the one finding I'd fix first; either lighten the text to white/near-white or darken/adjust the background.
- `ArchivedGoals.tsx` — the inline "Delete Goal" button (`backgroundColor: "red", color: "black"`) computes to ≈5.25:1, which passes AA but only barely — fragile if the red is ever darkened even slightly.
- Every icon-only `<img>` in the app (checkboxes, delete/archive icons, nav icons, expand arrow) has no `alt` text. Not a CSS issue, but worth fixing alongside any accessibility pass since some of these are the only affordance for their action.

---

## 3. Consistency

- **Naming is locally clean but structurally inconsistent**: camelCase throughout, but the "top-level wrapper" role is named four different ways across files — `addGoalWrapper`, `chunkWrapperDiv`, `mainDiv`, `mainChunkDisplayWrapper`, `mainNotesWrapper`, `mainWrapper`. No fixed convention for what a screen's root container should be called.
- **Real duplication between parallel "Add" forms**: `AddNewGoal/addChunk.module.css` and `GoalList/AddAdditionalChunk.module.css` both define a near-identical `.chunkWrapperDiv` (same flex/background/padding/radius), with the GoalList version just adding width/border/shadow on top. Same pattern between `addTask.module.css` and `AddAdditionalTask.module.css`. These are strong candidates for one shared base class extended per context, rather than four files each carrying the same 6-7 declarations — any future style tweak currently has to be made twice.
- **No `rem` usage anywhere** — everything is `px`/`%`/`vh`/`vw`, so nothing scales with a user's browser font-size setting, and there's no typographic rhythm tied to a base unit.
- **Font sizing mixes keywords and pixels** with no defined scale: `larger` and `medium` (relative, context-dependent) alongside raw `15px` values, used for what appear to be the same visual role in different files.
- **Font weights**: 400, 500, 600, 700, and 800 all appear across different files with no apparent "this weight = this role" system.
- **No spacing, radius, or z-index scale** — border-radius values (`1px`, `5px`, `10px`, `20px`, `25px`, `30px`) and margins (`5px` through `200px`) are all one-off literals rather than drawn from a shared set.

---

## 4. General Design Suggestions
- **Buttons are the single biggest "unfinished" signal.** Every card/wrapper in the app has deliberate color, radius, and shadow styling, but nearly every `<button>` outside of AntD (`GoalsDisplay.tsx`, `TasksDisplay.tsx`, `Notes.tsx`, `Pomodoro.tsx`) is a bare, unstyled browser-default button. Adding one shared button class (primary/secondary/danger variants) would do more for the app's perceived polish than any other single change.
- **No `:focus`/`:focus-visible` styles anywhere**, and only two `:hover` rules in the whole project (nav items, and the buggy down-arrow). Keyboard users get browser-default focus rings, which may have poor visibility against the darker/colored backgrounds like `--rusty-spice` or `--dusk-blue`.
- **`color-scheme: light dark` is set in `index.css` but does nothing** — every color below the root is hardcoded with no `prefers-color-scheme` branch or dark token set, so this declaration is currently a no-op.
- **Shadows are applied inconsistently** — compare `ArchivedGoals.module.css` (a two-layer shadow where the second layer has alpha `0`, i.e. it renders nothing) against single flat shadows elsewhere. None follow a consistent depth system; picking one layered shadow "recipe" and reusing it would tie the cards together visually.
- **Typography scale**: recommend a small `rem`-based scale (e.g. body/1rem, subhead/1.125rem, header/1.5rem) to replace the keyword/pixel mix, and consolidating the three near-duplicate label styles (`GoalForm.module.css`, `AddGoal.module.css`, `addTask.module.css`) into one shared label class.

---

## Answering your questions directly
**"Do my CSS styles work?"** Yes — nothing here breaks the app. The one real bug (the `80px`/`200px` margin override in `GoalsDisplay.module.css`) is currently masked because `200px` still clears the nav, just with more empty space than intended. The Notes/Archive/Pomodoro screens do have unaddressed nav-overlap at the very bottom of scroll, though.

**"Are the colors good?"** The four brand colors you've defined (`--rusty-spice`, `--alabaster-grey`, `--mint-leaf`, `--dusk-blue`) work well together and look intentional where they're actually used (Goals/Tasks display). The problem isn't the palette itself — it's that roughly half the app (the Add-forms, Archive, Notes) never adopted it and still uses leftover named colors like `lightsalmon` and `chocolate`, plus one contrast failure (black text on `--rusty-spice`) worth fixing for readability.
