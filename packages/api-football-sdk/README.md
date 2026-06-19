# API-Football SDK

A complete, fully-typed TypeScript SDK for [API-FOOTBALL v3](https://www.api-football.com/documentation-v3).

[![NPM Version](https://img.shields.io/npm/v/api-football-sdk.svg)](https://www.npmjs.com/package/api-football-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Full Coverage**: Every documented endpoint (Timezones, Countries, Leagues, Teams, Fixtures, Odds, Players, etc.).
- **Strongly Typed**: Comprehensive TypeScript interfaces for every request parameter and response payload.
- **Dual Provider Support**: Seamlessly switch between direct API-Sports and RapidAPI.
- **Robust Core**: Built-in support for retries, timeouts, and rate-limit tracking
- **Zero Dependencies**: Uses the native `fetch` API (Node.js 18+, Bun, Deno, or Browser).

## Installation

```bash
npm install api-football-sdk
# or
yarn add api-football-sdk
# or
pnpm add api-football-sdk
```

## Quick Start

### Basic Usage (Direct API-Sports)

```typescript
import { ApiFootballClient } from "api-football-sdk";

const football = new ApiFootballClient({
  apiKey: "your_api_sports_key",
});

// Fetch current Premier League standings
const { response } = await football.standings.get({
  league: 39,
  season: 2024,
});

console.log(response[0].league.standings);
```

### RapidAPI Usage

```typescript
const football = new ApiFootballClient({
  apiKey: "your_rapidapi_key",
  provider: "rapidapi",
});
```

---

## Usage Guide

### Resource Namespaces

The SDK is organized into intuitive namespaces that match the API documentation:

- `client.fixtures` - All fixture related data (live, rounds, head-to-head, etc.)
- `client.leagues` - League info and seasons
- `client.teams` - Team info, statistics, and countries
- `client.players` - Player data, top scorers, assists, squads
- `client.odds` - Pre-match and live odds, bookmakers, bets
- `client.standings` - League standings
- `client.countries` - List of supported countries
- ... and many more.

### Example: Nested Resources

For complex endpoints like Fixtures, sub-resources are used for better organization:

```typescript
// Get statistics for a specific fixture
const stats = await football.fixtures.statistics.get({ fixture: 215662 });

// Get live scores for specific leagues
const live = await football.fixtures.live({ league: "39-61" });
```

### Rate Limit Tracking

The client automatically tracks rate limits from response headers:

```typescript
const res = await football.fixtures.get({ id: 215662 });

console.log(football.rateLimit);
// Output: { requestsRemaining: 99, requestsLimit: 100, dailyRemaining: 7450 }
```

### Advanced Configuration

```typescript
const football = new ApiFootballClient({
  apiKey: "...",
  timeout: 15000, // 15s timeout
  maxRetries: 3, // Retry on 5xx errors or timeouts
  retryDelay: 1000, // Base delay for linear backoff
});
```

## API Coverage

| Category         | Client Property                                              | Key Methods                                   |
| :--------------- | :----------------------------------------------------------- | :-------------------------------------------- |
| **Global**       | `timezone`, `countries`                                      | `list()`, `get()`                             |
| **Competitions** | `leagues`, `standings`                                       | `get()`, `seasons()`                          |
| **Teams**        | `teams`, `venues`                                            | `get()`, `statistics()`, `seasons()`          |
| **Matches**      | `fixtures`                                                   | `get()`, `live()`, `headToHead()`, `rounds()` |
| **In-Match**     | `fixtures.statistics`, `fixtures.events`, `fixtures.lineups` | `get()`                                       |
| **Athletes**     | `players`, `coaches`                                         | `get()`, `seasons()`, `squads.get()`          |
| **Rankings**     | `players.topScorers`, `players.topAssists`                   | `get()`                                       |
| **Betting**      | `odds`, `odds.live`                                          | `get()`, `mapping.get()`, `bets.get()`        |
| **Extras**       | `injuries`, `predictions`, `transfers`, `trophies`           | `get()`                                       |

## TypeScript Support

This SDK is written in TypeScript and provides full type definitions out of the box. You get IntelliSense for both request parameters and complex response shapes, reducing the need to constantly check the documentation.

## License

MIT © [Your Name/Organization]
