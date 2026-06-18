/**
 * ============================================================================
 *  api-football-sdk.js
 * ----------------------------------------------------------------------------
 *  A complete, single-file, fully-typed (via JSDoc) Node.js / JavaScript SDK
 *  for API-FOOTBALL v3 (https://www.api-football.com/documentation-v3).
 *
 *  Covers every documented endpoint:
 *    Timezone, Countries, Leagues, Leagues/Seasons, Teams, Teams/Statistics,
 *    Teams/Seasons, Teams/Countries, Venues, Standings, Fixtures,
 *    Fixtures/Rounds, Fixtures/HeadToHead, Fixtures/Statistics,
 *    Fixtures/Events, Fixtures/Lineups, Fixtures/Players, Injuries,
 *    Predictions, Coachs, Players, Players/Seasons, Players/Squads,
 *    Players/TopScorers, Players/TopAssists, Players/TopYellowCards,
 *    Players/TopRedCards, Transfers, Trophies, Sidelined, Odds, Odds/Live,
 *    Odds/Live/Bets, Odds/Mapping, Odds/Bookmakers, Odds/Bets.
 *
 *  Zero runtime dependencies — uses the native global `fetch` (Node >= 18).
 *
 *  ----------------------------------------------------------------------------
 *  USAGE
 *  ----------------------------------------------------------------------------
 *    const { ApiFootballClient } = require('./api-football-sdk.js');
 *    // or: import { ApiFootballClient } from './api-football-sdk.js';
 *
 *    const client = new ApiFootballClient({
 *      apiKey: process.env.API_FOOTBALL_KEY,
 *      // host: 'v3.football.api-sports.io',        // default (direct API-SPORTS host)
 *      // provider: 'api-sports',                   // 'api-sports' | 'rapidapi'
 *    });
 *
 *    const res = await client.fixtures.get({ id: 215662 });
 *    console.log(res.response);
 *
 *  RapidAPI users:
 *    const client = new ApiFootballClient({
 *      apiKey: process.env.RAPIDAPI_KEY,
 *      provider: 'rapidapi',
 *    });
 *
 *  ----------------------------------------------------------------------------
 *  TYPE CHECKING
 *  ----------------------------------------------------------------------------
 *  This file is plain JavaScript annotated with JSDoc. If you open it (or any
 *  file that imports it) in a TypeScript-aware editor, or run it through
 *  `tsc --checkJs`, you get full autocompletion and type-checking for every
 *  endpoint's parameters and response shape — no `.d.ts` file needed and no
 *  build step required to actually run the code.
 * ============================================================================
 */

"use strict";

// ============================================================================
// SECTION 1: Generic / shared type definitions
// ============================================================================

/**
 * @template T
 * @typedef {Object} ApiFootballResponse
 * @property {string|string[]} get - The endpoint that was called.
 * @property {Object.<string, any>} parameters - The parameters used for the call (echoed back as strings).
 * @property {string[]} errors - Array of error messages (or object map in some edge cases). Empty when no errors.
 * @property {number} results - Number of items in `response`.
 * @property {ApiFootballPaging} paging - Pagination info.
 * @property {T} response - The actual payload, shape depends on the endpoint.
 */

/**
 * @typedef {Object} ApiFootballPaging
 * @property {number} current - Current page number.
 * @property {number} total - Total number of pages available.
 */

/**
 * @typedef {Object} RequestOptions
 * @property {AbortSignal} [signal] - Optional AbortSignal to cancel the request.
 */

/**
 * @typedef {'api-sports'|'rapidapi'} ApiFootballProvider
 */

/**
 * @typedef {Object} ApiFootballClientOptions
 * @property {string} apiKey - Your API key (from api-football.com / api-sports.io dashboard, or your RapidAPI key).
 * @property {ApiFootballProvider} [provider='api-sports'] - Which provider/host scheme to use.
 *   'api-sports' -> host defaults to v3.football.api-sports.io, auth header `x-apisports-key`.
 *   'rapidapi'   -> host defaults to api-football-v1.p.rapidapi.com, auth headers `x-rapidapi-key` / `x-rapidapi-host`.
 * @property {string} [host] - Override the host entirely (e.g. for a proxy). Must not include protocol.
 * @property {string} [baseUrl] - Override the full base URL entirely (takes precedence over host/provider). e.g. 'https://v3.football.api-sports.io'
 * @property {number} [timeout=30000] - Request timeout in milliseconds.
 * @property {number} [maxRetries=0] - Number of automatic retries on network error or HTTP 5xx/499.
 * @property {number} [retryDelay=500] - Base delay (ms) between retries (linear backoff: retryDelay * attempt).
 * @property {Object.<string,string>} [extraHeaders] - Extra headers merged into every request.
 * @property {typeof fetch} [fetchImpl] - Custom fetch implementation (defaults to global fetch).
 * @property {boolean} [throwOnApiError=false] - If true, throws an ApiFootballError when `errors` is non-empty in the response.
 */

// ============================================================================
// SECTION 2: Domain type definitions (request params & response entities)
// ============================================================================

/* ---------------------------- Timezone ---------------------------------- */
/** @typedef {string[]} TimezoneList - e.g. ["Europe/London", "America/New_York", ...] */

/* ---------------------------- Countries ----------------------------------*/
/**
 * @typedef {Object} CountriesParams
 * @property {string} [name] - Country name.
 * @property {string} [code] - Country Alpha2 or Alpha3 code (e.g. "FR", "GB-ENG").
 * @property {string} [search] - Search by country name (min 3 chars).
 */
/**
 * @typedef {Object} Country
 * @property {string|null} name
 * @property {string|null} code
 * @property {string|null} flag
 */

/* ----------------------------- Leagues -------------------------------- */
/**
 * @typedef {Object} LeaguesParams
 * @property {number} [id]
 * @property {string} [name]
 * @property {string} [country]
 * @property {string} [code] - Country code (Alpha2/Alpha3).
 * @property {number} [season]
 * @property {('league'|'cup')} [type]
 * @property {boolean} [current] - true: only current season; false: all.
 * @property {string} [search] - min 3 chars, searches league/country name.
 * @property {number} [last] - Last N leagues/cups added (max 99).
 */
/**
 * @typedef {Object} LeagueSeasonCoverageFixtures
 * @property {boolean} events
 * @property {boolean} lineups
 * @property {boolean} statistics_fixtures
 * @property {boolean} statistics_players
 */
/**
 * @typedef {Object} LeagueSeasonCoverage
 * @property {LeagueSeasonCoverageFixtures} fixtures
 * @property {boolean} standings
 * @property {boolean} players
 * @property {boolean} top_scorers
 * @property {boolean} top_assists
 * @property {boolean} top_cards
 * @property {boolean} injuries
 * @property {boolean} predictions
 * @property {boolean} odds
 */
/**
 * @typedef {Object} LeagueSeason
 * @property {number} year
 * @property {string} start - YYYY-MM-DD
 * @property {string} end - YYYY-MM-DD
 * @property {boolean} current
 * @property {LeagueSeasonCoverage} coverage
 */
/**
 * @typedef {Object} LeagueInfo
 * @property {number} id
 * @property {string} name
 * @property {('League'|'Cup')} type
 * @property {string|null} logo
 */
/**
 * @typedef {Object} LeagueCountry
 * @property {string} name
 * @property {string|null} code
 * @property {string|null} flag
 */
/**
 * @typedef {Object} LeagueResponseItem
 * @property {LeagueInfo} league
 * @property {LeagueCountry} country
 * @property {LeagueSeason[]} seasons
 */
/** @typedef {number[]} LeagueSeasonsList */

/* ------------------------------ Teams ------------------------------------*/
/**
 * @typedef {Object} TeamsParams
 * @property {number} [id]
 * @property {string} [name]
 * @property {number} [league]
 * @property {number} [season]
 * @property {string} [country]
 * @property {string} [code] - 3-letter team code.
 * @property {number} [venue] - Venue id.
 * @property {string} [search] - min 3 chars.
 */
/**
 * @typedef {Object} TeamInfo
 * @property {number} id
 * @property {string} name
 * @property {string|null} code
 * @property {string|null} country
 * @property {number|null} founded
 * @property {boolean} national
 * @property {string|null} logo
 */
/**
 * @typedef {Object} VenueInfo
 * @property {number|null} id
 * @property {string|null} name
 * @property {string|null} address
 * @property {string|null} city
 * @property {number|null} capacity
 * @property {string|null} surface
 * @property {string|null} image
 */
/**
 * @typedef {Object} TeamResponseItem
 * @property {TeamInfo} team
 * @property {VenueInfo} venue
 */

/**
 * @typedef {Object} TeamsStatisticsParams
 * @property {number} league - required
 * @property {number} season - required
 * @property {number} team - required
 * @property {string} [date] - YYYY-MM-DD, limits stats up to this date.
 */
/**
 * @typedef {Object} FixturesPlayedRecord
 * @property {number} home
 * @property {number} away
 * @property {number} total
 */
/**
 * @typedef {Object} GoalsForAgainstAverage
 * @property {string} home
 * @property {string} away
 * @property {string} total
 */
/**
 * @typedef {Object} GoalsForAgainstMinuteBucket
 * @property {number|null} total
 * @property {string|null} percentage
 */
/**
 * @typedef {Object} GoalsForAgainst
 * @property {Object.<string,number|null>} total
 * @property {GoalsForAgainstAverage} average
 * @property {Object.<string,GoalsForAgainstMinuteBucket>} minute
 */
/**
 * @typedef {Object} TeamStatisticsResponse
 * @property {LeagueInfo & {country:string,season:number}} league
 * @property {TeamInfo} team
 * @property {Object} form
 * @property {Object} fixtures
 * @property {{for: GoalsForAgainst, against: GoalsForAgainst}} goals
 * @property {Object} biggest
 * @property {Object} clean_sheet
 * @property {Object} failed_to_score
 * @property {Object} penalty
 * @property {Array<Object>} lineups
 * @property {Array<Object>} cards
 */

/** @typedef {{id:number,name:string,league:Object}[]} TeamsCountriesResponse */

/* ------------------------------ Venues ------------------------------------*/
/**
 * @typedef {Object} VenuesParams
 * @property {number} [id]
 * @property {string} [name]
 * @property {string} [city]
 * @property {string} [country]
 * @property {string} [search] - min 3 chars.
 */
/**
 * @typedef {Object} Venue
 * @property {number} id
 * @property {string} name
 * @property {string} address
 * @property {string} city
 * @property {string} country
 * @property {number} capacity
 * @property {string} surface
 * @property {string|null} image
 */

/* ----------------------------- Standings -----------------------------------*/
/**
 * @typedef {Object} StandingsParams
 * @property {number} league - required (unless team provided alone is not supported; league+season required normally)
 * @property {number} season - required
 * @property {number} [team]
 */
/**
 * @typedef {Object} StandingStats
 * @property {number} played
 * @property {number} win
 * @property {number} draw
 * @property {number} lose
 * @property {{for:number, against:number}} goals
 */
/**
 * @typedef {Object} StandingRow
 * @property {number} rank
 * @property {TeamInfo} team
 * @property {number} points
 * @property {number} goalsDiff
 * @property {string|null} group
 * @property {string|null} form
 * @property {string|null} status
 * @property {string|null} description
 * @property {StandingStats} all
 * @property {StandingStats} home
 * @property {StandingStats} away
 * @property {string} update
 */
/**
 * @typedef {Object} StandingsResponseItem
 * @property {{id:number,name:string,country:string,logo:string|null,flag:string|null,season:number,standings:StandingRow[][]}} league
 */

/* ----------------------------- Fixtures -----------------------------------*/
/**
 * @typedef {Object} FixturesParams
 * @property {number} [id]
 * @property {string} [ids] - up to 20 fixture ids separated by "-", e.g. "1-2-3".
 * @property {string} [live] - "all" or league ids separated by "-", e.g. "39-61".
 * @property {number} [date] - actually a date string YYYY-MM-DD (kept as string below for accuracy).
 * @property {number} [league]
 * @property {number} [season]
 * @property {number} [team]
 * @property {number} [last] - max 2 digits.
 * @property {number} [next] - max 2 digits.
 * @property {string} [from] - YYYY-MM-DD
 * @property {string} [to] - YYYY-MM-DD
 * @property {string} [round]
 * @property {string} [status] - "NS","1H","HT","2H","ET","BT","P","SUSP","INT","FT","AET","PEN","PST","CANC","ABD","AWD","WO","LIVE", multiple separated by "-".
 * @property {string} [venue] - venue id
 * @property {string} [timezone]
 */
/**
 * @typedef {Object} FixturePeriods
 * @property {number|null} first
 * @property {number|null} second
 */
/**
 * @typedef {Object} FixtureStatus
 * @property {string} long
 * @property {string} short
 * @property {number|null} elapsed
 * @property {number|null} extra
 */
/**
 * @typedef {Object} FixtureCore
 * @property {number} id
 * @property {string|null} referee
 * @property {string} timezone
 * @property {string} date - ISO8601
 * @property {number} timestamp
 * @property {{id:number|null,name:string|null,city:string|null}} venue
 * @property {FixtureStatus} status
 * @property {FixturePeriods} periods
 */
/**
 * @typedef {Object} FixtureTeamsBlock
 * @property {TeamInfo & {winner:boolean|null}} home
 * @property {TeamInfo & {winner:boolean|null}} away
 */
/**
 * @typedef {Object} FixtureGoals
 * @property {number|null} home
 * @property {number|null} away
 */
/**
 * @typedef {Object} FixtureScore
 * @property {FixtureGoals} halftime
 * @property {FixtureGoals} fulltime
 * @property {FixtureGoals} extratime
 * @property {FixtureGoals} penalty
 */
/**
 * @typedef {Object} FixtureEvent
 * @property {{elapsed:number,extra:number|null}} time
 * @property {TeamInfo} team
 * @property {{id:number|null,name:string|null}} player
 * @property {{id:number|null,name:string|null}} assist
 * @property {('Goal'|'Card'|'Subst'|'Var')} type
 * @property {string} detail
 * @property {string|null} comments
 */
/**
 * @typedef {Object} FixtureLineupPlayer
 * @property {number} id
 * @property {string} name
 * @property {number|null} number
 * @property {string|null} pos
 * @property {string|null} grid
 */
/**
 * @typedef {Object} FixtureLineup
 * @property {TeamInfo & {colors:Object}} team
 * @property {string} formation
 * @property {{player:FixtureLineupPlayer}[]} startXI
 * @property {{player:FixtureLineupPlayer}[]} substitutes
 * @property {{id:number,name:string,photo:string|null}} coach
 */
/**
 * @typedef {Object} FixtureTeamStatistic
 * @property {string} type
 * @property {string|number|null} value
 */
/**
 * @typedef {Object} FixtureStatisticsBlock
 * @property {TeamInfo} team
 * @property {FixtureTeamStatistic[]} statistics
 */
/**
 * @typedef {Object} FixturePlayerStatsBlock
 * @property {{id:number,name:string,photo:string|null}} player
 * @property {Array<Object>} statistics
 */
/**
 * @typedef {Object} FixturePlayersResponseItem
 * @property {TeamInfo} team
 * @property {FixturePlayerStatsBlock[]} players
 */
/**
 * @typedef {Object} FixtureResponseItem
 * @property {FixtureCore} fixture
 * @property {{id:number,name:string,country:string,logo:string|null,flag:string|null,season:number,round:string}} league
 * @property {FixtureTeamsBlock} teams
 * @property {FixtureGoals} goals
 * @property {FixtureScore} score
 * @property {FixtureEvent[]} [events]
 * @property {FixtureLineup[]} [lineups]
 * @property {FixtureStatisticsBlock[]} [statistics]
 * @property {FixturePlayersResponseItem[]} [players]
 */

/**
 * @typedef {Object} FixturesRoundsParams
 * @property {number} league - required
 * @property {number} season - required
 * @property {boolean} [current]
 * @property {string} [timezone]
 */
/** @typedef {string[]} FixturesRoundsResponse */

/**
 * @typedef {Object} FixturesHeadToHeadParams
 * @property {string} h2h - required, "{team1}-{team2}", e.g. "33-34"
 * @property {string} [date]
 * @property {number} [league]
 * @property {number} [season]
 * @property {string} [from]
 * @property {string} [to]
 * @property {number} [last]
 * @property {number} [next]
 * @property {string} [status]
 * @property {string} [venue]
 * @property {string} [timezone]
 */

/**
 * @typedef {Object} FixturesStatisticsParams
 * @property {number} fixture - required
 * @property {number} [team]
 * @property {('1st Half'|'2nd Half')} [half] - filter by half (if supported by competition).
 */

/**
 * @typedef {Object} FixturesEventsParams
 * @property {number} fixture - required
 * @property {number} [team]
 * @property {number} [player]
 * @property {('Goal'|'Card'|'Subst'|'Var')} [type]
 */

/**
 * @typedef {Object} FixturesLineupsParams
 * @property {number} fixture - required
 * @property {number} [team]
 * @property {number} [player]
 * @property {string} [type] - "startXI" | "substitutes"
 */

/**
 * @typedef {Object} FixturesPlayersParams
 * @property {number} [fixture]
 * @property {number} [team]
 */

/* ----------------------------- Injuries ------------------------------------*/
/**
 * @typedef {Object} InjuriesParams
 * @property {number} [league]
 * @property {number} [season]
 * @property {number} [fixture]
 * @property {number} [team]
 * @property {number} [player]
 * @property {string} [date]
 * @property {string} [timezone]
 */
/**
 * @typedef {Object} InjuryItem
 * @property {{id:number,name:string,photo:string|null,type:string,reason:string}} player
 * @property {TeamInfo} team
 * @property {FixtureCore} fixture
 * @property {{id:number,name:string,country:string,logo:string|null,flag:string|null,season:number}} league
 */

/* ---------------------------- Predictions -----------------------------------*/
/**
 * @typedef {Object} PredictionsParams
 * @property {number} fixture - required
 */
/**
 * @typedef {Object} PredictionWinner
 * @property {number|null} id
 * @property {string|null} name
 * @property {string|null} comment
 */
/**
 * @typedef {Object} PredictionPercent
 * @property {string} home
 * @property {string} draw
 * @property {string} away
 */
/**
 * @typedef {Object} PredictionsResponseItem
 * @property {{winner:PredictionWinner, win_or_draw:boolean, under_over:string|null, goals:{home:string,away:string}, advice:string, percent:PredictionPercent}} predictions
 * @property {{id:number,name:string,country:string,logo:string|null,flag:string|null,season:number}} league
 * @property {{home:TeamInfo & {last_5:Object,league:Object}, away:TeamInfo & {last_5:Object,league:Object}}} teams
 * @property {{home:Object[], away:Object[]}} comparison
 * @property {{home:Object[], away:Object[]}} h2h
 */

/* ----------------------------- Coachs ------------------------------------*/
/**
 * @typedef {Object} CoachsParams
 * @property {number} [id]
 * @property {number} [team]
 * @property {string} [search] - min 3 chars.
 */
/**
 * @typedef {Object} CoachCareerItem
 * @property {TeamInfo} team
 * @property {string|null} start
 * @property {string|null} end
 */
/**
 * @typedef {Object} CoachItem
 * @property {number} id
 * @property {string} name
 * @property {string} firstname
 * @property {string} lastname
 * @property {string|null} age
 * @property {string|null} birth_date
 * @property {string|null} birth_place
 * @property {string|null} birth_country
 * @property {string|null} nationality
 * @property {string|null} height
 * @property {string|null} weight
 * @property {string|null} photo
 * @property {CoachCareerItem[]} career
 */

/* ----------------------------- Players ------------------------------------*/
/**
 * @typedef {Object} PlayersParams
 * @property {number} [id]
 * @property {number} [team]
 * @property {number} [league]
 * @property {number} [season] - required when using league/team filters without id.
 * @property {string} [search] - min 4 chars.
 * @property {number} [page]
 */
/**
 * @typedef {Object} PlayerBirth
 * @property {string|null} date
 * @property {string|null} place
 * @property {string|null} country
 */
/**
 * @typedef {Object} PlayerInfo
 * @property {number} id
 * @property {string} name
 * @property {string} firstname
 * @property {string} lastname
 * @property {number|null} age
 * @property {PlayerBirth} birth
 * @property {string|null} nationality
 * @property {string|null} height
 * @property {string|null} weight
 * @property {boolean} injured
 * @property {string|null} photo
 */
/**
 * @typedef {Object} PlayerSeasonStatistics
 * @property {{id:number,name:string,country:string,logo:string|null,flag:string|null,season:number}} league
 * @property {TeamInfo} team
 * @property {Object} games
 * @property {Object} substitutes
 * @property {Object} shots
 * @property {Object} goals
 * @property {Object} passes
 * @property {Object} tackles
 * @property {Object} duels
 * @property {Object} dribbles
 * @property {Object} fouls
 * @property {Object} cards
 * @property {Object} penalty
 */
/**
 * @typedef {Object} PlayerResponseItem
 * @property {PlayerInfo} player
 * @property {PlayerSeasonStatistics[]} statistics
 */

/** @typedef {number[]} PlayersSeasonsResponse */

/**
 * @typedef {Object} PlayersSquadsParams
 * @property {number} [team]
 * @property {number} [player]
 */
/**
 * @typedef {Object} SquadPlayer
 * @property {number} id
 * @property {string} name
 * @property {number|null} age
 * @property {number|null} number
 * @property {string|null} position
 * @property {string|null} photo
 */
/**
 * @typedef {Object} PlayersSquadsResponseItem
 * @property {TeamInfo} team
 * @property {SquadPlayer[]} players
 */

/**
 * @typedef {Object} TopPlayersParams
 * @property {number} league - required
 * @property {number} season - required
 */

/* ----------------------------- Transfers ------------------------------------*/
/**
 * @typedef {Object} TransfersParams
 * @property {number} [player]
 * @property {number} [team]
 */
/**
 * @typedef {Object} TransferDetail
 * @property {string} date
 * @property {string|null} type
 * @property {TeamInfo} teams_in
 * @property {TeamInfo} teams_out
 */
/**
 * @typedef {Object} TransfersResponseItem
 * @property {{id:number,name:string}} player
 * @property {{date:string,type:string|null,teams:{in:TeamInfo,out:TeamInfo}}[]} transfers
 */

/* ----------------------------- Trophies ------------------------------------*/
/**
 * @typedef {Object} TrophiesParams
 * @property {number} [player]
 * @property {number} [coach]
 */
/**
 * @typedef {Object} TrophyItem
 * @property {string} league
 * @property {string} country
 * @property {string} season
 * @property {('Winner'|'Runner-Up')} place
 */

/* ---------------------------- Sidelined ------------------------------------*/
/**
 * @typedef {Object} SidelinedParams
 * @property {number} [player]
 * @property {number} [coach]
 */
/**
 * @typedef {Object} SidelinedItem
 * @property {('injury'|'suspension')} type
 * @property {string} start
 * @property {string|null} end
 */

/* ------------------------------- Odds ------------------------------------*/
/**
 * @typedef {Object} OddsParams
 * @property {number} [fixture]
 * @property {number} [league]
 * @property {number} [season]
 * @property {string} [date]
 * @property {number} [page]
 * @property {number} [bookmaker]
 * @property {number} [bet]
 * @property {string} [timezone]
 */
/**
 * @typedef {Object} OddsValue
 * @property {string} value
 * @property {string} odd
 */
/**
 * @typedef {Object} OddsBet
 * @property {number} id
 * @property {string} name
 * @property {OddsValue[]} values
 */
/**
 * @typedef {Object} OddsBookmaker
 * @property {number} id
 * @property {string} name
 * @property {OddsBet[]} bets
 */
/**
 * @typedef {Object} OddsResponseItem
 * @property {{id:number,timezone:string,date:string,timestamp:number}} fixture
 * @property {{id:number,name:string,country:string,logo:string|null,flag:string|null,season:number}} league
 * @property {boolean} update
 * @property {OddsBookmaker[]} bookmakers
 */

/**
 * @typedef {Object} OddsLiveParams
 * @property {number} [fixture]
 * @property {number} [league]
 * @property {number} [bet]
 */
/**
 * @typedef {Object} OddsLiveValue
 * @property {string} value
 * @property {string} odd
 * @property {('up'|'down')} [handicap]
 * @property {boolean} [main]
 * @property {boolean} suspended
 */
/**
 * @typedef {Object} OddsLiveBet
 * @property {number} id
 * @property {string} name
 * @property {OddsLiveValue[]} values
 */
/**
 * @typedef {Object} OddsLiveResponseItem
 * @property {{id:number,status:Object}} fixture
 * @property {{id:number,name:string,country:string,logo:string|null,flag:string|null,season:number}} league
 * @property {FixtureTeamsBlock} teams
 * @property {{status:Object,minute:number}} [status]
 * @property {{id:number,name:string}[]} odds
 */

/** @typedef {{id:number,name:string}[]} OddsLiveBetsResponse */

/**
 * @typedef {Object} OddsMappingParams
 * @property {number} [page]
 */
/**
 * @typedef {Object} OddsMappingItem
 * @property {number} fixture
 * @property {number} league
 * @property {number} season
 * @property {string} date
 */

/**
 * @typedef {Object} OddsBookmakersParams
 * @property {number} [id]
 * @property {number} [search]
 */
/** @typedef {{id:number,name:string}[]} OddsBookmakersResponse */

/**
 * @typedef {Object} OddsBetsParams
 * @property {number} [id]
 * @property {string} [search]
 */
/** @typedef {{id:number,name:string}[]} OddsBetsResponse */

// ============================================================================
// SECTION 3: Errors
// ============================================================================

/**
 * Error thrown for any failed request: network failure, non-2xx HTTP status,
 * or (when `throwOnApiError` is enabled) a non-empty `errors` field in an
 * otherwise-200 API-Football response.
 */
class ApiFootballError extends Error {
  /**
   * @param {string} message
   * @param {Object} [details]
   * @param {number} [details.status] - HTTP status code, if available.
   * @param {any} [details.body] - Parsed response body, if available.
   * @param {string} [details.url] - The request URL.
   * @param {Error} [details.cause] - The underlying error, if any.
   */
  constructor(message, details = {}) {
    super(message);
    this.name = "ApiFootballError";
    this.status = details.status;
    this.body = details.body;
    this.url = details.url;
    if (details.cause) this.cause = details.cause;
  }
}

// ============================================================================
// SECTION 4: Internal HTTP core
// ============================================================================

const PROVIDER_DEFAULTS = {
  "api-sports": {
    host: "v3.football.api-sports.io",
    buildHeaders: (apiKey) => ({ "x-apisports-key": apiKey }),
  },
  rapidapi: {
    host: "api-football-v1.p.rapidapi.com",
    buildHeaders: (apiKey, host) => ({
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": host,
    }),
  },
};

/**
 * Remove undefined/null params and stringify booleans/numbers for the query string.
 * @param {Object.<string,any>} params
 * @returns {Object.<string,string>}
 */
function cleanParams(params) {
  /** @type {Object.<string,string>} */
  const out = {};
  if (!params) return out;
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    out[key] = String(value);
  }
  return out;
}

/**
 * Sleep helper for retry backoff.
 * @param {number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class ApiFootballHttpCore {
  /** @param {ApiFootballClientOptions} options */
  constructor(options) {
    if (!options || !options.apiKey) {
      throw new ApiFootballError('ApiFootballClient: "apiKey" is required.');
    }

    /** @type {ApiFootballProvider} */
    this.provider = options.provider || "api-sports";
    if (!PROVIDER_DEFAULTS[this.provider]) {
      throw new ApiFootballError(
        `ApiFootballClient: unknown provider "${options.provider}". Use "api-sports" or "rapidapi".`,
      );
    }

    const providerDefaults = PROVIDER_DEFAULTS[this.provider];
    this.host = options.host || providerDefaults.host;
    this.baseUrl = options.baseUrl || `https://${this.host}`;
    this.apiKey = options.apiKey;
    this.timeout = options.timeout ?? 30000;
    this.maxRetries = options.maxRetries ?? 0;
    this.retryDelay = options.retryDelay ?? 500;
    this.extraHeaders = options.extraHeaders || {};
    this.fetchImpl = options.fetchImpl || globalThis.fetch;
    this.throwOnApiError = options.throwOnApiError ?? false;

    if (typeof this.fetchImpl !== "function") {
      throw new ApiFootballError(
        "ApiFootballClient: global fetch is not available. Use Node >= 18, or pass a custom `fetchImpl` in options.",
      );
    }

    this.authHeaders = providerDefaults.buildHeaders(this.apiKey, this.host);

    /** Last rate-limit info observed from response headers. */
    this.rateLimit = {
      limitDay: /** @type {number|null} */ (null),
      remainingDay: /** @type {number|null} */ (null),
      requestsCurrent: /** @type {number|null} */ (null),
      requestsLimit: /** @type {number|null} */ (null),
    };
  }

  /**
   * Perform a GET request against an API-Football endpoint.
   * @template T
   * @param {string} path - e.g. "/fixtures"
   * @param {Object.<string,any>} [params]
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<T>>}
   */
  async get(path, params, options = {}) {
    const query = cleanParams(params);
    const url = new URL(this.baseUrl.replace(/\/$/, "") + path);
    for (const [k, v] of Object.entries(query)) {
      url.searchParams.set(k, v);
    }

    const headers = {
      Accept: "application/json",
      ...this.authHeaders,
      ...this.extraHeaders,
    };

    let attempt = 0;
    // attempt 0 = first try, then up to maxRetries additional attempts
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      // Combine caller-provided signal with our internal timeout signal.
      if (options.signal) {
        options.signal.addEventListener("abort", () => controller.abort(), {
          once: true,
        });
      }

      try {
        const res = await this.fetchImpl(url.toString(), {
          method: "GET",
          headers,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        this._captureRateLimit(res.headers);

        const text = await res.text();
        /** @type {any} */
        let body;
        try {
          body = text ? JSON.parse(text) : {};
        } catch {
          body = { raw: text };
        }

        if (!res.ok || res.status === 499) {
          if (
            attempt < this.maxRetries &&
            (res.status >= 500 || res.status === 499)
          ) {
            attempt++;
            await sleep(this.retryDelay * attempt);
            continue;
          }
          throw new ApiFootballError(
            `API-Football request failed with status ${res.status} for ${path}`,
            { status: res.status, body, url: url.toString() },
          );
        }

        if (
          this.throwOnApiError &&
          body &&
          body.errors &&
          ((Array.isArray(body.errors) && body.errors.length > 0) ||
            (!Array.isArray(body.errors) &&
              Object.keys(body.errors).length > 0))
        ) {
          throw new ApiFootballError(
            `API-Football returned errors for ${path}: ${JSON.stringify(body.errors)}`,
            { status: res.status, body, url: url.toString() },
          );
        }

        return body;
      } catch (err) {
        clearTimeout(timeoutId);
        if (err instanceof ApiFootballError) throw err;

        const isAbort = err && err.name === "AbortError";
        if (attempt < this.maxRetries) {
          attempt++;
          await sleep(this.retryDelay * attempt);
          continue;
        }
        throw new ApiFootballError(
          isAbort
            ? `API-Football request to ${path} timed out after ${this.timeout}ms`
            : `API-Football request to ${path} failed: ${err && err.message}`,
          { url: url.toString(), cause: err },
        );
      }
    }
  }

  /**
   * @param {Headers} headers
   */
  _captureRateLimit(headers) {
    const get = (name) => {
      const v = headers.get(name);
      return v === null ? null : Number(v);
    };
    const limitDay = get("x-ratelimit-requests-limit");
    const remainingDay = get("x-ratelimit-requests-remaining");
    const requestsCurrent =
      get("x-ratelimit-current") ?? get("x-ratelimit-limit");
    const requestsLimit = get("x-ratelimit-limit");

    if (limitDay !== null) this.rateLimit.limitDay = limitDay;
    if (remainingDay !== null) this.rateLimit.remainingDay = remainingDay;
    if (requestsCurrent !== null)
      this.rateLimit.requestsCurrent = requestsCurrent;
    if (requestsLimit !== null) this.rateLimit.requestsLimit = requestsLimit;
  }
}

// ============================================================================
// SECTION 5: Resource namespaces (one class per endpoint family)
// ============================================================================

class TimezoneResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
  }

  /**
   * GET /timezone — list all valid timezone strings.
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<TimezoneList>>}
   */
  list(options) {
    return this._core.get("/timezone", undefined, options);
  }
}

class CountriesResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
  }

  /**
   * GET /countries
   * @param {CountriesParams} [params]
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<Country[]>>}
   */
  get(params, options) {
    return this._core.get("/countries", params, options);
  }
}

class LeaguesResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
  }

  /**
   * GET /leagues
   * @param {LeaguesParams} [params]
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<LeagueResponseItem[]>>}
   */
  get(params, options) {
    return this._core.get("/leagues", params, options);
  }

  /**
   * GET /leagues/seasons — all available season years across all leagues.
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<LeagueSeasonsList>>}
   */
  seasons(options) {
    return this._core.get("/leagues/seasons", undefined, options);
  }
}

class TeamsResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
  }

  /**
   * GET /teams
   * @param {TeamsParams} [params]
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<TeamResponseItem[]>>}
   */
  get(params, options) {
    return this._core.get("/teams", params, options);
  }

  /**
   * GET /teams/statistics
   * @param {TeamsStatisticsParams} params - league, season, team are required.
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<TeamStatisticsResponse>>}
   */
  statistics(params, options) {
    return this._core.get("/teams/statistics", params, options);
  }

  /**
   * GET /teams/seasons — list of season years a team has data for.
   * @param {{team: number}} params
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<number[]>>}
   */
  seasons(params, options) {
    return this._core.get("/teams/seasons", params, options);
  }

  /**
   * GET /teams/countries — list of countries with at least one national team.
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<TeamsCountriesResponse>>}
   */
  countries(options) {
    return this._core.get("/teams/countries", undefined, options);
  }
}

class VenuesResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
  }

  /**
   * GET /venues
   * @param {VenuesParams} [params]
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<Venue[]>>}
   */
  get(params, options) {
    return this._core.get("/venues", params, options);
  }
}

class StandingsResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
  }

  /**
   * GET /standings
   * @param {StandingsParams} params - league & season are required.
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<StandingsResponseItem[]>>}
   */
  get(params, options) {
    return this._core.get("/standings", params, options);
  }
}

class FixturesResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
    this.statisticsResource = new FixturesStatisticsResource(core);
    this.eventsResource = new FixturesEventsResource(core);
    this.lineupsResource = new FixturesLineupsResource(core);
    this.playersResource = new FixturesPlayersResource(core);
  }

  /**
   * GET /fixtures
   * @param {FixturesParams} [params]
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<FixtureResponseItem[]>>}
   */
  get(params, options) {
    return this._core.get("/fixtures", params, options);
  }

  /**
   * Convenience wrapper: GET /fixtures?live=all (or filtered league ids).
   * @param {{league?: string}} [params] - league: "-"-joined league ids, or omit for all.
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<FixtureResponseItem[]>>}
   */
  live(params, options) {
    return this._core.get(
      "/fixtures",
      { live: (params && params.league) || "all" },
      options,
    );
  }

  /**
   * GET /fixtures/rounds
   * @param {FixturesRoundsParams} params - league & season required.
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<FixturesRoundsResponse>>}
   */
  rounds(params, options) {
    return this._core.get("/fixtures/rounds", params, options);
  }

  /**
   * GET /fixtures/headtohead
   * @param {FixturesHeadToHeadParams} params - h2h required, e.g. "33-34".
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<FixtureResponseItem[]>>}
   */
  headToHead(params, options) {
    return this._core.get("/fixtures/headtohead", params, options);
  }

  /** @returns {FixturesStatisticsResource} */
  get statistics() {
    return this.statisticsResource;
  }

  /** @returns {FixturesEventsResource} */
  get events() {
    return this.eventsResource;
  }

  /** @returns {FixturesLineupsResource} */
  get lineups() {
    return this.lineupsResource;
  }

  /** @returns {FixturesPlayersResource} */
  get players() {
    return this.playersResource;
  }
}

class FixturesStatisticsResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
  }

  /**
   * GET /fixtures/statistics
   * @param {FixturesStatisticsParams} params - fixture required.
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<FixtureStatisticsBlock[]>>}
   */
  get(params, options) {
    return this._core.get("/fixtures/statistics", params, options);
  }
}

class FixturesEventsResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
  }

  /**
   * GET /fixtures/events
   * @param {FixturesEventsParams} params - fixture required.
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<FixtureEvent[]>>}
   */
  get(params, options) {
    return this._core.get("/fixtures/events", params, options);
  }
}

class FixturesLineupsResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
  }

  /**
   * GET /fixtures/lineups
   * @param {FixturesLineupsParams} params - fixture required.
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<FixtureLineup[]>>}
   */
  get(params, options) {
    return this._core.get("/fixtures/lineups", params, options);
  }
}

class FixturesPlayersResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
  }

  /**
   * GET /fixtures/players
   * @param {FixturesPlayersParams} params - fixture or team required.
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<FixturePlayersResponseItem[]>>}
   */
  get(params, options) {
    return this._core.get("/fixtures/players", params, options);
  }
}

class InjuriesResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
  }

  /**
   * GET /injuries
   * @param {InjuriesParams} [params]
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<InjuryItem[]>>}
   */
  get(params, options) {
    return this._core.get("/injuries", params, options);
  }
}

class PredictionsResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
  }

  /**
   * GET /predictions
   * @param {PredictionsParams} params - fixture required.
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<PredictionsResponseItem[]>>}
   */
  get(params, options) {
    return this._core.get("/predictions", params, options);
  }
}

class CoachsResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
  }

  /**
   * GET /coachs
   * @param {CoachsParams} [params]
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<CoachItem[]>>}
   */
  get(params, options) {
    return this._core.get("/coachs", params, options);
  }
}

class PlayersResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
    this.squadsResource = new PlayersSquadsResource(core);
    this.topScorersResource = new TopPlayersResource(
      core,
      "/players/topscorers",
    );
    this.topAssistsResource = new TopPlayersResource(
      core,
      "/players/topassists",
    );
    this.topYellowCardsResource = new TopPlayersResource(
      core,
      "/players/topyellowcards",
    );
    this.topRedCardsResource = new TopPlayersResource(
      core,
      "/players/topredcards",
    );
  }

  /**
   * GET /players
   * @param {PlayersParams} [params]
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<PlayerResponseItem[]>>}
   */
  get(params, options) {
    return this._core.get("/players", params, options);
  }

  /**
   * GET /players/seasons — list of season years available for players data.
   * @param {{player?: number}} [params]
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<PlayersSeasonsResponse>>}
   */
  seasons(params, options) {
    return this._core.get("/players/seasons", params, options);
  }

  /** @returns {PlayersSquadsResource} */
  get squads() {
    return this.squadsResource;
  }

  /** @returns {TopPlayersResource} */
  get topScorers() {
    return this.topScorersResource;
  }

  /** @returns {TopPlayersResource} */
  get topAssists() {
    return this.topAssistsResource;
  }

  /** @returns {TopPlayersResource} */
  get topYellowCards() {
    return this.topYellowCardsResource;
  }

  /** @returns {TopPlayersResource} */
  get topRedCards() {
    return this.topRedCardsResource;
  }
}

class PlayersSquadsResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
  }

  /**
   * GET /players/squads
   * @param {PlayersSquadsParams} params - team or player required.
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<PlayersSquadsResponseItem[]>>}
   */
  get(params, options) {
    return this._core.get("/players/squads", params, options);
  }
}

class TopPlayersResource {
  /**
   * @param {ApiFootballHttpCore} core
   * @param {string} path
   */
  constructor(core, path) {
    this._core = core;
    this._path = path;
  }

  /**
   * @param {TopPlayersParams} params - league & season required.
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<PlayerResponseItem[]>>}
   */
  get(params, options) {
    return this._core.get(this._path, params, options);
  }
}

class TransfersResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
  }

  /**
   * GET /transfers
   * @param {TransfersParams} params - player or team required.
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<TransfersResponseItem[]>>}
   */
  get(params, options) {
    return this._core.get("/transfers", params, options);
  }
}

class TrophiesResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
  }

  /**
   * GET /trophies
   * @param {TrophiesParams} params - player or coach required.
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<TrophyItem[]>>}
   */
  get(params, options) {
    return this._core.get("/trophies", params, options);
  }
}

class SidelinedResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
  }

  /**
   * GET /sidelined
   * @param {SidelinedParams} params - player or coach required.
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<SidelinedItem[]>>}
   */
  get(params, options) {
    return this._core.get("/sidelined", params, options);
  }
}

class OddsResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
    this.liveResource = new OddsLiveResource(core);
    this.mappingResource = new OddsMappingResource(core);
    this.bookmakersResource = new OddsBookmakersResource(core);
    this.betsResource = new OddsBetsResource(core);
  }

  /**
   * GET /odds (pre-match odds, last 7 days only)
   * @param {OddsParams} [params]
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<OddsResponseItem[]>>}
   */
  get(params, options) {
    return this._core.get("/odds", params, options);
  }

  /** @returns {OddsLiveResource} */
  get live() {
    return this.liveResource;
  }

  /** @returns {OddsMappingResource} */
  get mapping() {
    return this.mappingResource;
  }

  /** @returns {OddsBookmakersResource} */
  get bookmakers() {
    return this.bookmakersResource;
  }

  /** @returns {OddsBetsResource} */
  get bets() {
    return this.betsResource;
  }
}

class OddsLiveResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
    this.betsResource = new OddsLiveBetsResource(core);
  }

  /**
   * GET /odds/live
   * @param {OddsLiveParams} [params]
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<OddsLiveResponseItem[]>>}
   */
  get(params, options) {
    return this._core.get("/odds/live", params, options);
  }

  /** @returns {OddsLiveBetsResource} */
  get bets() {
    return this.betsResource;
  }
}

class OddsLiveBetsResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
  }

  /**
   * GET /odds/live/bets — list of bet types available for live odds.
   * @param {{id?: number, search?: string}} [params]
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<OddsLiveBetsResponse>>}
   */
  get(params, options) {
    return this._core.get("/odds/live/bets", params, options);
  }
}

class OddsMappingResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
  }

  /**
   * GET /odds/mapping — list of fixtures for which pre-match odds exist.
   * @param {OddsMappingParams} [params]
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<OddsMappingItem[]>>}
   */
  get(params, options) {
    return this._core.get("/odds/mapping", params, options);
  }
}

class OddsBookmakersResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
  }

  /**
   * GET /odds/bookmakers
   * @param {OddsBookmakersParams} [params]
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<OddsBookmakersResponse>>}
   */
  get(params, options) {
    return this._core.get("/odds/bookmakers", params, options);
  }
}

class OddsBetsResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
  }

  /**
   * GET /odds/bets — list of available pre-match bet types.
   * @param {OddsBetsParams} [params]
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<OddsBetsResponse>>}
   */
  get(params, options) {
    return this._core.get("/odds/bets", params, options);
  }
}

class StatusResource {
  /** @param {ApiFootballHttpCore} core */
  constructor(core) {
    this._core = core;
  }

  /**
   * GET /status — info about your subscription (plan, requests used, etc).
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<Object>>}
   */
  get(options) {
    return this._core.get("/status", undefined, options);
  }
}

// ============================================================================
// SECTION 6: Top-level client
// ============================================================================

/**
 * Full SDK client for API-FOOTBALL v3.
 *
 * Every endpoint family is exposed as a namespaced property, e.g.:
 *   client.fixtures.get({ id: 215662 })
 *   client.fixtures.live()
 *   client.fixtures.headToHead({ h2h: '33-34' })
 *   client.fixtures.statistics.get({ fixture: 215662 })
 *   client.fixtures.events.get({ fixture: 215662 })
 *   client.fixtures.lineups.get({ fixture: 215662 })
 *   client.fixtures.players.get({ fixture: 215662 })
 *   client.leagues.get({ id: 39 })
 *   client.leagues.seasons()
 *   client.teams.get({ id: 33 })
 *   client.teams.statistics({ league: 39, season: 2023, team: 33 })
 *   client.teams.seasons({ team: 33 })
 *   client.teams.countries()
 *   client.venues.get({ id: 556 })
 *   client.standings.get({ league: 39, season: 2023 })
 *   client.players.get({ id: 276, season: 2023 })
 *   client.players.seasons()
 *   client.players.squads.get({ team: 33 })
 *   client.players.topScorers.get({ league: 39, season: 2023 })
 *   client.players.topAssists.get({ league: 39, season: 2023 })
 *   client.players.topYellowCards.get({ league: 39, season: 2023 })
 *   client.players.topRedCards.get({ league: 39, season: 2023 })
 *   client.injuries.get({ league: 39, season: 2023 })
 *   client.predictions.get({ fixture: 215662 })
 *   client.coachs.get({ team: 33 })
 *   client.transfers.get({ player: 276 })
 *   client.trophies.get({ player: 276 })
 *   client.sidelined.get({ player: 276 })
 *   client.odds.get({ fixture: 215662 })
 *   client.odds.live.get({ fixture: 215662 })
 *   client.odds.live.bets.get()
 *   client.odds.mapping.get()
 *   client.odds.bookmakers.get()
 *   client.odds.bets.get()
 *   client.countries.get({ name: 'France' })
 *   client.timezone.list()
 *   client.status.get()
 */
class ApiFootballClient {
  /** @param {ApiFootballClientOptions} options */
  constructor(options) {
    const core = new ApiFootballHttpCore(options);

    /** @private */
    this._core = core;

    /** @type {TimezoneResource} */
    this.timezone = new TimezoneResource(core);
    /** @type {CountriesResource} */
    this.countries = new CountriesResource(core);
    /** @type {LeaguesResource} */
    this.leagues = new LeaguesResource(core);
    /** @type {TeamsResource} */
    this.teams = new TeamsResource(core);
    /** @type {VenuesResource} */
    this.venues = new VenuesResource(core);
    /** @type {StandingsResource} */
    this.standings = new StandingsResource(core);
    /** @type {FixturesResource} */
    this.fixtures = new FixturesResource(core);
    /** @type {InjuriesResource} */
    this.injuries = new InjuriesResource(core);
    /** @type {PredictionsResource} */
    this.predictions = new PredictionsResource(core);
    /** @type {CoachsResource} */
    this.coachs = new CoachsResource(core);
    /** @type {PlayersResource} */
    this.players = new PlayersResource(core);
    /** @type {TransfersResource} */
    this.transfers = new TransfersResource(core);
    /** @type {TrophiesResource} */
    this.trophies = new TrophiesResource(core);
    /** @type {SidelinedResource} */
    this.sidelined = new SidelinedResource(core);
    /** @type {OddsResource} */
    this.odds = new OddsResource(core);
    /** @type {StatusResource} */
    this.status = new StatusResource(core);
  }

  /**
   * Current rate-limit snapshot, populated from the most recent response's headers.
   * @returns {{limitDay: number|null, remainingDay: number|null, requestsCurrent: number|null, requestsLimit: number|null}}
   */
  getRateLimit() {
    return { ...this._core.rateLimit };
  }

  /**
   * Escape hatch: call any endpoint directly, including ones not yet wrapped above
   * or newly added by API-Football.
   * @template T
   * @param {string} path - e.g. "/fixtures" (leading slash required).
   * @param {Object.<string,any>} [params]
   * @param {RequestOptions} [options]
   * @returns {Promise<ApiFootballResponse<T>>}
   */
  raw(path, params, options) {
    return this._core.get(path, params, options);
  }
}

// ============================================================================
// SECTION 7: Exports
// ============================================================================

module.exports = {
  ApiFootballClient,
  ApiFootballError,
};

// Also support ESM-style named import interop (e.g. via esModuleInterop/Babel)
module.exports.default = module.exports;
