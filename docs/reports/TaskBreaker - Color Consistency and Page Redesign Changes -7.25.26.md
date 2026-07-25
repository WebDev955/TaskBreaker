# TaskBreaker - Color Consistency and Page Redesign Changes -7.25.26

Follow-up implementation report for the fixes recommended in [TaskBreaker - CSS Style Report -7.25.26](TaskBreaker%20-%20CSS%20Style%20Report%20-7.25.26.md). Covers: migrating every component onto the 6-token color palette defined in `src/index.css`, and redesigning the Archive and Notes pages to share the Tasks page's visual language.

## Palette roles established

All six CSS custom properties in `src/index.css` are now actually used (`--crimson-violet` and the unused-in-practice tokens from the audit are live), with a consistent semantic assignment across the app:

| Token | Value | Role |
|---|---|---|
| `--rusty-spice` | `#af3800` | Bold "task-level" accent — Tasks bucket, both Add-Task forms, Notes' new-note box and note-title chips |
| `--alabaster-grey` | `#eae6e5` | Neutral card background — Goal/Chunk cards, both Add-Goal/Add-Chunk forms, Archive goal cards, note bodies |
| `--mint-leaf` | `#4fb286` | Positive action — progress bar fill, NavBar hover, Archive's "Keep Goal!" |
| `--crimson-violet` | `#5c0029` | Danger / archive accent (previously defined but never referenced anywhere) — Archive's main wrapper, "Delete Goal", "Delete Note" |
| `--dusk-blue` | `#274c77` | Unchanged — page backdrop only |

## Files changed

### Off-palette colors replaced with palette variables
- **`src/components/AddNewGoal/AddGoal.module.css`** — `.addGoalWrapper` background `grey` → `var(--alabaster-grey)` (+ explicit `color: black`)
- **`src/components/AddNewGoal/addChunk.module.css`** — `.chunkWrapperDiv` background `lightsalmon` → `var(--alabaster-grey)`
- **`src/components/AddNewGoal/addTask.module.css`** — `.taskWrapperDiv` background `lightslategray` → `var(--rusty-spice)` (+ `color: var(--alabaster-grey)` for contrast)
- **`src/components/GoalList/AddAdditionalChunk.module.css`** — same `lightsalmon` → `var(--alabaster-grey)` swap, kept in sync with its AddNewGoal counterpart
- **`src/components/GoalList/AddAdditionalTask.module.css`** — `lightslategray` → `var(--rusty-spice)`; the `aliceblue` "Save" chip → `var(--alabaster-grey)`
- **`src/components/NavBar.module.css`** — nav item background `#ff661f` (an off-brand second orange) → `var(--rusty-spice)`; hover state `rgb(253, 176, 176)` → `var(--mint-leaf)`
- **`src/components/Notes/Notes.module.css`** — note-title chip `chocolate` → `var(--rusty-spice)`; note body `rgb(255,255,255)` → `var(--alabaster-grey)`; "Delete Note" button `burlywood` → `var(--crimson-violet)`

### Color drift fixed (values that were meant to reference a variable but were hand-typed)
- **`src/components/GoalList/GoalsDisplay.module.css`**
  - `.goalOptionsMenu` background `rgba(175, 55, 0, 0.575)` (off by one on the green channel from `--rusty-spice`) → `color-mix(in srgb, var(--rusty-spice) 57.5%, transparent)`, so it can no longer fall out of sync with the token.
  - `.goalNote` background — the one-off `#f195be80` pink with no palette relationship → `color-mix(in srgb, var(--crimson-violet) 45%, transparent)`.

### Contrast fix
- **`src/components/GoalList/TasksDisplay.module.css`** — `.mainTaskDisplayWrapper` had `background-color: var(--rusty-spice)` with no text color, inheriting black (~3.4:1 contrast, below WCAG AA). Added `color: var(--alabaster-grey)`. The same fix was applied proactively everywhere else `--rusty-spice` is used as a background (both Add-Task forms, Notes new-note box, note-title chips).

### Archive page redesign
- **`src/components/ArchivedGoals/ArchivedGoals.module.css`** — rebuilt from scratch to mirror `TasksDisplay.module.css`'s structure: `.mainDiv` is now a `--crimson-violet` bucket wrapper with a 4px top border, fully rounded corners, and the same box-shadow recipe Tasks uses (previously: `tan` background, `max-width: 412px`, no shared structure with any other page). Each archived goal is its own `--alabaster-grey` card (`.goalCard`), replacing the old `lightblue` background and unused two-layer shadow (the second shadow layer had alpha `0` and rendered nothing). `.goalOptions` dropped its `beige` background — it now sits directly on the card.
- **`src/components/ArchivedGoals/ArchivedGoals.tsx`** — wrapped the header text in a new `.archiveHeader` section (parallel to Tasks' `.taskHeader`). Replaced the inline `lightgreen` / `red`+black-text button styles with `var(--mint-leaf)` (Keep) and `var(--crimson-violet)` + `var(--alabaster-grey)` text (Delete) — kept as inline styles (not CSS Module classes) since AntD's own `Button` styles otherwise win the specificity fight.

### Notes page redesign
- **`src/components/Notes/Notes.module.css`** — kept the notebook background image and the exaggerated top-corner curl (`border-top-left/right-radius: 20%`), but:
  - Closed off the previously missing right/bottom borders and added bottom corner radius + the same box-shadow Tasks/Archive use, so it now reads as a complete bucket instead of a card with two sides left open.
  - Now `width: 90%` / centered, with `margin-bottom: 100px` — previously `width: 100%` with no bottom margin at all, so its content could render underneath the fixed nav bar (the same nav-overlap issue flagged for other pages in the earlier report).
  - "Write Note" and "Save Notes" buttons now use the same `whitesmoke` / black-border / `border-radius: 20px` pill style as Tasks' "Add New Task" button (previously bare browser-default buttons).
  - Added missing `border-radius` on the new-note `<input>`/`<textarea>` and the note body, and gave `.newNoteDiv` its own padding + radius so it reads as a card rather than a flat color block.
  - Fixed `.noteDiv` — it had `align-self: center` (a no-op, since its parent isn't a flex container) plus a lone `margin-left: 30px`, which pushed every saved note off-center. Replaced with `width: 90%; margin: 0 auto` so notes actually center and stack with consistent spacing.

## Verification
- `npx tsc --noEmit` — clean.
- `npm run build` — succeeds.
- No browser/screenshot tooling was available in this environment, so the visual result was not screenshotted — verify by eye in the running dev server before considering this final.
