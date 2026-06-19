# Football API SDKs Monorepo

Welcome to the **Football API SDKs** monorepo. This repository contains complete, fully-typed TypeScript SDKs for popular football (soccer) data APIs.

## Packages

This monorepo manages the following SDKs:

1. **[api-football-sdk](file:///Users/admin/Development/api-football-sdk/packages/api-football-sdk/README.md)**: A TypeScript SDK for [API-FOOTBALL v3](https://www.api-football.com/documentation-v3). Supports API-Sports, RapidAPI, rate limits, retries, and covers leagues, standing, livescores, odds, statistics, predictions, and more.
2. **[football-data-sdk](file:///Users/admin/Development/api-football-sdk/packages/football-data/README.md)**: A TypeScript SDK for [Football-Data.org API v4](https://docs.football-data.org/general/v4/index.html). Supports areas, competitions, live matches, H2H statistics, and analytics/trends.

---

## Development & Contribution

This repository uses **pnpm** and **pnpm workspaces** to manage packages.

### Getting Started

1. **Clone the repository and install dependencies**:
   ```bash
   pnpm install
   ```

2. **Build all packages**:
   ```bash
   pnpm build
   ```

3. **Run tests**:
   ```bash
   pnpm test
   ```

### Code Style & Structure

- Every SDK resides under the `packages/` directory.
- We use **TypeScript** and compile using `tsup`.
- We use **vitest** for testing and **eslint** for linting.

### Contribution Guidelines & Commits

To automate releases, we use [release-please](https://github.com/googleapis/release-please). 
Please write your commit messages using the **Conventional Commits** specification:

- `feat(api-football-sdk): add player statistics support` (triggers a **minor** version bump)
- `fix(football-data): fix response header check` (triggers a **patch** version bump)
- `chore: update dependencies` or `docs: update readme` (does not trigger version bumps)

When your Pull Request is merged into `main`, `release-please` will evaluate the conventional commit messages since the last release and automatically open/update a Release PR. Merging the Release PR automatically tags the release, publishes the packages to npm, and creates the GitHub releases.
