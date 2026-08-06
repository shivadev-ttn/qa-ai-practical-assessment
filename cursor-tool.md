# .Cursor / Tool — Rules & Skills

## AI Tools Used (Multi-Tool Approach)

| Tool | Primary Use in This Project | Record Available |
|------|----------------------------|------------------|
| **ChatGPT** | Early requirement brainstorming, test planning ideas, manual test case drafts | Chat history (export/screenshots if required) |
| **Claude** | Requirement analysis, test strategy (UI vs API, smoke vs regression), refining manual TC format | Chat history (export/screenshots if required) |
| **Cursor** | Automation framework build, Page Objects, Playwright specs, debugging, README/project-info, Excel TC updates | Full agent conversation transcript in Cursor |

**Division of work:** ChatGPT and Claude were used for **planning and analysis**; Cursor was used for **implementation and iteration** where code, file structure, and test execution were required.

---

## Cursor — Rules

### Custom project rules (`.cursor/rules/`)

No custom `.cursor/rules/` files were added to this repository. Rules were applied through:

1. **Cursor default agent behaviour** — follow existing code patterns, minimal diffs, run tests after changes.
2. **User / workspace rules** configured in Cursor settings, including:
   - Follow existing naming, folder structure, and formatting
   - Do not introduce new frameworks or dependencies unless necessary
   - Minimal, reviewable changes — avoid unrelated refactors
   - No hardcoded credentials; do not commit secrets
   - Explain what changed, why, and which files were modified
   - Run and fix tests when behaviour changes
3. **Prompt library** (`ai-prompts/`) — acted as persistent context instead of formal Cursor rules:
   - `requirements-and-planning.md` — SUT context, modules, business rules
   - `test-design.md` — manual UI TC format and coverage expectations
   - `test-design-API.md` — API TC format and AC1/AC2 flows
   - `test-data.md` — payload and data conventions
   - `automation-and-debugging.md` — framework structure, POM, logging, reporting

### Effective rules followed during automation (self-imposed)

| Rule | Purpose |
|------|---------|
| Page Object Model for UI; API client layer for API | Maintainability |
| One spec file per major TC (UI-1 to UI-5 separate files) | Clarity and parallel review |
| Tag tests: `@Smoke`, `@Regression`, `@Positive`, `@Negative`, `@Edge` | Selective execution |
| Dynamic test data per run (unique email/password) | Avoid duplicate-user failures on demo API |
| Screenshot + video + trace on UI failure only | Faster API runs, rich UI debug data |
| Max 8 API tests after coverage review | Assessment constraint |

---

## Cursor — Skills

### Custom skills

No project-specific Cursor Skills (`SKILL.md`) were authored for this assessment.

Cursor’s **built-in agent capabilities** were used instead:

- Codebase search and file editing
- Terminal execution (Playwright test runs)
- Web fetch / API inspection for locator and endpoint discovery
- Multi-step task execution (implement → run → fix → re-run)

### Prompt library as “skill substitute”

The `ai-prompts/` folder functioned like reusable skills: each file encodes a repeatable workflow (requirements → design → data → automation) so the same instructions did not need to be retyped in every Cursor session.

| File | Role (similar to a Skill) |
|------|---------------------------|
| `requirements-and-planning.md` | Requirement analysis template |
| `test-design.md` | Manual UI test case generation |
| `test-design-API.md` | API test case generation |
| `test-data.md` | Test data and payload rules |
| `automation-and-debugging.md` | Framework setup and debug workflow |
| `documentation-and-summary.md` | Documentation AI usage log |

---

## What to Submit for “.Cursor/Tool”

If the assessor expects a **folder**, you can either:

**Option A — Submit this file**  
Include `ai-prompts/cursor-tool.md` (this document) in your zip.

**Option B — Add minimal `.cursor/rules/` (optional)**  
Create one rule file, e.g. `.cursor/rules/qa-automation.mdc`, with 5–10 bullets from the table above. Not required if you document rules here.

**Option C — Screenshots**  
- Cursor chat for automation work (implementation record)  
- ChatGPT/Claude chats for planning/manual TCs (if assessor asks for all tools)

---

## One-paragraph summary (for project-info or cover sheet)

> Planning and manual test design were done with **ChatGPT** and **Claude** using structured prompts and acceptance criteria for the Practice Software Testing Toolshop. **Cursor** was the primary implementation tool: Playwright UI/API automation, Page Object Model, debugging, and project documentation. No custom Cursor Skills were created; reusable guidance lived in the `ai-prompts/` library. Cursor followed workspace rules for minimal changes, secure coding, and test validation. ChatGPT/Claude outputs were reviewed and refined before automation and before adding cases to `FunctionalTestcase.xlsx`.
