# Football-Data.org SDK

A complete, fully-typed TypeScript SDK for [Football-Data.org API v4](https://docs.football-data.org/general/v4/index.html).

[![NPM Version](https://img.shields.io/npm/v/football-data-sdk.svg)](https://www.npmjs.com/package/football-data-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Full Coverage**: Exposes every v4 resource (Areas, Competitions, Standings, Matches, Teams, Persons, and Trends).
- **Strongly Typed**: Comprehensive TypeScript interfaces for every resource response and query parameter filter.
- **Modern Architecture**: Clean resource-based namespaces mirroring the documentation endpoints.
- **Zero Dependencies**: Built on top of the native `fetch` API, fully compatible with Node.js, Bun, Deno, and Edge environments.
- **Cache Friendly**: Built-in support for Next.js `revalidate` options and tags.

## Installation

```bash
npm install football-data-sdk
# or
yarn add football-data-sdk
# or
pnpm add football-data-sdk
```

## Quick Start

### Basic Usage

```typescript
import { FootballDataClient } from "football-data-sdk";

const client = new FootballDataClient({
  apiKey: "your_api_key_here",
});

// Fetch current Premier League standings
const standings = await client.competitions.standings("PL");
console.log(standings.standings[0].table);

// Fetch a team profile
const team = await client.teams.get(86); // Real Madrid CF
console.log(team.name);
```

---

## Usage Guide

### Resource Namespaces

The SDK organizes endpoints into logical resource namespaces:

- `client.areas` - Continent and country catalogues (`/areas`)
- `client.competitions` - Competitions, standings, scorers, and teams (`/competitions`)
- `client.matches` - Fixtures, scores, live scores, and head-to-head records (`/matches`)
- `client.teams` - Team profiles and schedules (`/teams`)
- `client.persons` - Coach and player profiles, squads, and player matches (`/persons`)
- `client.trends` - Derived form trends and analysis data (`/trends`)

### Example: Competitions Sub-Resources

```typescript
// List all competitions in Europe (Area ID 2077)
const competitions = await client.competitions.list({ areas: "2077" });

// Get scorers for Primera Division (code: PD)
const scorers = await client.competitions.scorers("PD", { limit: 10 });
```

### Example: Live Matches & H2H

```typescript
// Fetch live matches currently in progress
const liveMatches = await client.matches.live();

// Fetch match H2H statistics
const h2h = await client.matches.head2head(330299);
```

### Example: Trends

```typescript
// Fetch form trends for today's matches
const trends = await client.trends.get({
  window: 5,
  consider_side: true,
});
```

---

## API Coverage

| Category         | Client Property   | Key Methods                                                       |
| :--------------- | :---------------- | :---------------------------------------------------------------- |
| **Areas**        | `areas`           | `list()`, `get(id)`                                               |
| **Competitions** | `competitions`    | `list(filters)`, `get(code)`, `standings()`, `matches()`, `teams()`, `scorers()` |
| **Matches**      | `matches`         | `list(filters)`, `live()`, `get(id)`, `head2head(id, filters)`    |
| **Teams**        | `teams`           | `get(id)`, `matches(id, filters)`                                 |
| **Athletes**     | `persons`         | `get(id)`, `matches(id, filters)`                                 |
| **Analytics**    | `trends`          | `get(filters)`                                                    |

## TypeScript Support

This SDK is written in TypeScript and exports full type definitions. You get autocompletion and type-safety for filters (like dates, match stages, and standings stages) and complex response structures.

## License

MIT © [Your Name/Organization]
