

## v1.2.5 - 2025-09-03

### Bug Fixes
- SortMenu now hides the Random sort option only on the provider list page (`/providers`), regardless of URL case. The Random sort remains available on all other pages, including provider detail and category pages. (#INT-3107)

### Improvements
- Improved SortMenu logic for robust URL matching and case-insensitive handling on provider list page.

**References:**
[INT-3107](https://negroup-dev.atlassian.net/browse/INT-3107)

---
## v1.2.4 - 2025-08-27

### Bug Fixes
- Fixed currency icon display in all dropdowns and transaction tables by switching to `<img>` and SVG file URLs.
- Ensured Select dropdown overlays and triggers have matching width for perfect alignment.
- Unified navigation and menu item icon types for consistent usage of SVG sprite or file URLs.
- Corrected currency and user avatar icon fields to use string SVG paths, eliminating React component inconsistencies.
- Improved currency code mapping and icon retrieval logic for dropdowns and transaction tables.
- Game detail page now robustly matches games by name, title, or slug for better routing.

### Improvements
- Transaction tables (Deposit, Withdraw, SportsBet, Tip) now display currency icons using the shared Icon component for consistency.
- Updated Copilot instructions and commit prompt for bug fix and release management.

### Refactoring
- Removed redundant React component icon usage in favor of SVG file URLs or sprite references.

---

## Previous Releases
## v1.2.3 - 2025-09-24

### Bug Fixes
- Coin values now always display as integers with comma separation (no decimals) in BalanceCoins, UserCard, and all wallet/transaction dropdowns and tables.
- Fixed inconsistent currency icon rendering in wallet tabs, dropdowns, and transaction tables.

### Improvements
- Refactored `formatNumber` utility for explicit integer formatting and legacy fallback.
- Unified currency icon selection logic using `getCurrencyIconByCode` across all wallet and transaction components.
- Improved initial currency selection logic and code consistency in wallet forms.

**References:**
[Coin formatting and currency icon fixes PR](#)
## v1.2.4 - 2025-08-27

### Bug Fixes
- Game detail page now loads correctly when using game name in the URL (spaces replaced by dashes).
- Navigation from game cards and rounded icons generates readable URLs and loads the correct game details.

### Improvements
- Refactored routing and lookup logic for better maintainability and user experience.
- Updated error handling documentation in `.github/copilot-instructions.md`.

### Breaking Changes
- Game detail URLs now use the game name slug instead of game_code or id. Old direct links using game_code/id will not work.

**References:**
[#113](https://github.com/SportsITDev/Ossino_fe/issues/113)
