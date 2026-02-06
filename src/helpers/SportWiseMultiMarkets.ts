export const SportWiseMultiMarkets: any = [
    {
        "sportId": 1,
        "sportName": "Soccer",
        "sportType": "sport",
        "defaultMarketName": "1X2",
        "isLMTavailable": "False",
        "FixtureType": "",
        "defaultMarketTemplateId": "1",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "Teams to Score,First Team to Score,Last Team to Score,Match Result and Both Teams to Score,1st half - both teams to score,2nd Half - Both teams to Score,1st half-draw no bet,2nd half-draw no bet,Odd/Even,1st Half-Odd/Even,2nd Half-Odd/Even,Exact Goals",
            "marketTypeCSS2": "Both Teams To Score In 1st Half,Both Teams To Score,Over/Under,HDP,HDP HT,Draw no bet,Draw No Bet,Total Goals Odd/Even",
            "marketTypeCSS3": "Match Winner,Double Chance,Total,First/Last Goal,HalfTime/FullTime,Correct score,Halftime/fulltime correct score,1st half - correct score,2nd half - correct score,Halftime/fulltime correct score",
            "marketTypeCSS2WithSubHeaders": "Total Goals - Under/Over,Asian Handicap,Handicap,1st Half - Handicap,HDP HT",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "1X2,Over/Under,Handicap,Both Teams to Score,Draw No Bet,Odd/Even,Double Chance",
            "marketsSupported": [
                {
                    "UIMarketName": "1X2",
                    "clientMarketName": "Match Winner",
                    "displayHeaders": "1,X,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col3",
                    "showHeaderWIthOdds": "",
                    "marketTemplateId": "1"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Total Goals - Under/Over",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "showHeaderWIthOdds": "",
                    "subMarketHeader": "Goals",
                    "marketTemplateId": "5"
                },
                {
                    "UIMarketName": "Handicap",
                    "clientMarketName": "Asian Handicap",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "showHeaderWIthOdds": "",
                    "marketTemplateId": "8",
                    "subMarketHeader": "Handicap"
                },
                {
                    "UIMarketName": "Both Teams to Score",
                    "clientMarketName": "Both Teams To Score",
                    "displayHeaders": "Yes,No",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "showHeaderWIthOdds": "",
                    "marketTemplateId": "16"
                },
                {
                    "UIMarketName": "Draw No Bet",
                    "clientMarketName": "Draw no bet",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "showHeaderWIthOdds": "",
                    "marketTemplateId": "10"
                },
                {
                    "UIMarketName": "Odd/Even",
                    "clientMarketName": "Total Goals Odd/Even",
                    "displayHeaders": "Odd,Even",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "showHeaderWIthOdds": "",
                    "marketTemplateId": "33"
                },
                {
                    "UIMarketName": "Double Chance",
                    "clientMarketName": "Double Chance",
                    "displayHeaders": "1X,12,X2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col3",
                    "showHeaderWIthOdds": "",
                    "marketTemplateId": "66"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 2,
        "sportName": "Basketball",
        "sportType": "sport",
        "isLMTavailable": "False",
        "FixtureType": "",
        "defaultMarketName": "Match Result",
        "defaultMarketTemplateId": "1",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Match Result( Inc Overtime),Winner (incl. overtime),Match Result (Inc OT),HDP,",
            "marketTypeCSS3": "1X2,Match Result",
            "marketTypeCSS2WithSubHeaders": "Total (incl. overtime),Total Points U/O,Handicap (incl. overtime),Handicap (No Draw)",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Match Result,Handicap,Over/Under",
            "marketsSupported": [
                {
                    "UIMarketName": "Match Result",
                    "clientMarketName": "Match Result (Inc OT)",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "2"
                },
                {
                    "UIMarketName": "Handicap",
                    "clientMarketName": "Handicap (No Draw)",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "9",
                    "subMarketHeader": "Handicap"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Total Points U/O",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "3",
                    "subMarketHeader": "Points"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 3,
        "sportName": "Baseball",
        "sportType": "sport",
        "isLMTavailable": "False",
        "FixtureType": "",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "1",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Match Winner",
            "marketTypeCSS3": "1X2",
            "marketTypeCSS2WithSubHeaders": "Total Runs Under / Over,Handicap",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner,Over/Under,Handicap",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Match Winner",
                    "displayHeaders": "Home,Away",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "showHeaderWIthOdds": "",
                    "marketTemplateId": "1"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Total Runs U/O",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "3",
                    "subMarketHeader": "Runs"
                },
                {
                    "UIMarketName": "Handicap",
                    "clientMarketName": "Handicap",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "2",
                    "subMarketHeader": "Handicap"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 4,
        "sportName": "Ice Hockey",
        "sportType": "sport",
        "isLMTavailable": "False",
        "FixtureType": "",
        "defaultMarketName": "Match Result",
        "defaultMarketTemplateId": "2",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Match Result,Match Result (Inc OT)",
            "marketTypeCSS3": "1X2",
            "marketTypeCSS2WithSubHeaders": "Goals U/O (Inc OT),Handicap (Inc OT)",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Match Result,Over/Under,Handicap",
            "marketsSupported": [
                {
                    "UIMarketName": "Match Result",
                    "clientMarketName": "Match Result (Inc OT)",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "2"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Goals U/O (Inc OT)",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "showHeaderWIthOdds": "",
                    "marketTemplateId": "5",
                    "subMarketHeader": "Goals"
                },
                {
                    "UIMarketName": "Handicap",
                    "clientMarketName": "Handicap (Inc OT)",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "3",
                    "subMarketHeader": "Handicap"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 5,
        "sportName": "Tennis",
        "sportType": "sport",
        "isLMTavailable": "False",
        "FixtureType": "",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "1",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Match Winner",
            "marketTypeCSS3": "",
            "marketTypeCSS2WithSubHeaders": "Set Handicap,Total Sets",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner,Game HDP,Over/Under",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Match Winner",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "1"
                },
                {
                    "UIMarketName": "Game HDP",
                    "clientMarketName": "Match Handicap Games 2-way",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "8",
                    "subMarketHeader": "Handicap"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Match Total Games 2-way",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "6",
                    "subMarketHeader": "Games"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 6,
        "sportName": "Handball",
        "sportType": "sport",
        "isLMTavailable": "False",
        "FixtureType": "",
        "defaultMarketName": "Match Result",
        "defaultMarketTemplateId": "1",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "",
            "marketTypeCSS3": "Match Result",
            "marketTypeCSS2WithSubHeaders": "Total Goals Over/Under,Handicap",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Match Result,Over/Under,Total Goals,Handicap,HDP No Tie",
            "marketsSupported": [
                {
                    "UIMarketName": "Match Result",
                    "clientMarketName": "Match Result",
                    "displayHeaders": "1,X,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "1"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Rolling Over/Under",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "37",
                    "subMarketHeader": "Goals"
                },
                {
                    "UIMarketName": "Total Goals",
                    "clientMarketName": "Total Goals Over/Under",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "3",
                    "subMarketHeader": "Goals"
                },
                {
                    "UIMarketName": "Handicap",
                    "clientMarketName": "Handicap - Rolling Middle Line",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "36",
                    "subMarketHeader": "HDP"
                },
                {
                    "UIMarketName": "HDP No Tie",
                    "clientMarketName": "Handicap (no tie)",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "9",
                    "subMarketHeader": "HDP"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 9,
        "sportName": "Golf",
        "sportType": "sport",
        "isLMTavailable": "false",
        "FixtureType": "",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "101",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "",
            "marketTypeCSS3": "1x2,Tournament Winner",
            "marketTypeCSS2WithSubHeaders": "Total",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner,Matchbet",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Tournament Winner",
                    "displayHeaders": "1,X,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "101"
                },
                {
                    "UIMarketName": "Matchbet",
                    "clientMarketName": "Tournament Matchbet (inc Draw)",
                    "displayHeaders": "1,X,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "7"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 10,
        "sportName": "Boxing",
        "sportType": "sport",
        "isLMTavailable": "false",
        "FixtureType": "",
        "defaultMarketName": "Fight Winner",
        "defaultMarketTemplateId": "1",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "",
            "marketTypeCSS3": "Fight Winner,Draw no bet",
            "marketTypeCSS2WithSubHeaders": "",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Fight Winner,DNB,Over/Under",
            "marketsSupported": [
                {
                    "UIMarketName": "Fight Winner",
                    "clientMarketName": "Fight Winner",
                    "displayHeaders": "Home,Draw,Away",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "1"
                },
                {
                    "UIMarketName": "DNB",
                    "clientMarketName": "Draw no bet",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "showHeaderWIthOdds": "",
                    "marketTemplateId": "2"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Total Rounds Completed",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "7",
                    "subMarketHeader": "Rounds"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 12,
        "sportName": "Rugby",
        "sportType": "sport",
        "isLMTavailable": "False",
        "FixtureType": "",
        "defaultMarketName": "1X2",
        "defaultMarketTemplateId": "1",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Win Draw No Bet",
            "marketTypeCSS3": "Match Winner",
            "marketTypeCSS2WithSubHeaders": "Handicap",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "1X2,Over/Under,Handicap,Total Points,HDP Mid",
            "marketsSupported": [
                {
                    "UIMarketName": "1X2",
                    "clientMarketName": "Match Winner",
                    "displayHeaders": "Home,Tie,Away",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "1"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Total Points Under/Over",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "6",
                    "subMarketHeader": "Goals"
                },
                {
                    "UIMarketName": "Handicap",
                    "clientMarketName": "Handicap",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "7",
                    "subMarketHeader": "Handicap"
                },
                {
                    "UIMarketName": "Total Points",
                    "clientMarketName": "Total Points Line Mid",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "16",
                    "subMarketHeader": "Points"
                },
                {
                    "UIMarketName": "HDP Mid",
                    "clientMarketName": "HandicapLine Mid",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "15",
                    "subMarketHeader": "Handicap"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 13,
        "sportName": "Aussie Rules",
        "sportType": "sport",
        "isLMTavailable": "False",
        "FixtureType": "",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "186",
        "markets": {
            "ResultRowCss": "SB-threeInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "",
            "marketTypeCSS3": "Match Winner",
            "marketTypeCSS2WithSubHeaders": "Handicap,Total Score Under/Over",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner,Over/Under,Handicap",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Match Winner",
                    "displayHeaders": "Home,Draw,Away",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "1"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Total Score Under/Over",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "7",
                    "subMarketHeader": "Score"
                },
                {
                    "UIMarketName": "Handicap",
                    "clientMarketName": "Handicap",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "10",
                    "subMarketHeader": "Handicap"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 16,
        "sportName": "American Football",
        "sportType": "sport",
        "FixtureType": "",
        "isLMTavailable": "False",
        "defaultMarketName": "Moneyline",
        "defaultMarketTemplateId": "21",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Moneyline,Winner (incl. overtime)",
            "marketTypeCSS3": "",
            "marketTypeCSS2WithSubHeaders": "Total Points U/O,Total (incl. overtime),Handicap,Handicap (incl. overtime)",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Moneyline,Over/Under,Handicap",
            "marketsSupported": [
                {
                    "UIMarketName": "Moneyline",
                    "clientMarketName": "Moneyline",
                    "displayHeaders": "Team 1,Team 2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "21"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Total Points U/O",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "4",
                    "subMarketHeader": "Points"
                },
                {
                    "UIMarketName": "Handicap",
                    "clientMarketName": "Handicap",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "2",
                    "subMarketHeader": "Handicap"
                }
            ]

        },
        "key": "sb_event"
    },
    {
        "sportId": 19,
        "sportName": "Snooker",
        "sportType": "sport",
        "isLMTavailable": "False",
        "FixtureType": "",
        "defaultMarketName": "Match Result",
        "defaultMarketTemplateId": "1",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Match Result,Total Frames",
            "marketTypeCSS3": "1X2",
            "marketTypeCSS2WithSubHeaders": "Total Frames,",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Match Result,Over/Under,Handicap",
            "marketsSupported": [
                {
                    "UIMarketName": "Match Result",
                    "clientMarketName": "Match Result",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "1"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Total Frames",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "7"
                },
                {
                    "UIMarketName": "Handicap",
                    "clientMarketName": "Handicap",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "4",
                    "subMarketHeader": "Handicap"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 20,
        "sportName": "Table Tennis",
        "sportType": "sport",
        "isLMTavailable": "False",
        "FixtureType": "",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "1",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Match Winner",
            "marketTypeCSS3": "",
            "marketTypeCSS2WithSubHeaders": "Total points,Match Total Points 2-Way,Match Handicap,Point handicap",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner,Over/Under,Handicap",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Match Winner",
                    "displayHeaders": "Home,Away",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "1"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Match Total Points 2-Way",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "8",
                    "subMarketHeader": "Points"
                },
                {
                    "UIMarketName": "Handicap",
                    "clientMarketName": "Match Handicap",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "7",
                    "subMarketHeader": "Handicap"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 21,
        "sportName": "Cricket",
        "sportType": "sport",
        "isLMTavailable": "False",
        "FixtureType": "",
        "defaultMarketName": "1X2",
        "defaultMarketTemplateId": "1",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Match Winner (Draw No Bet),Winner (incl. super over)",
            "marketTypeCSS3": "1X2,Match Winner,Team With Highest Score At 1st Dismissal",
            "marketTypeCSS2WithSubHeaders": "Innings Runs 2-Ways",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "1X2,Winner DNB,Total Runs,Innings Runs",
            "marketsSupported": [
                {
                    "UIMarketName": "1X2",
                    "clientMarketName": "Match Winner",
                    "displayHeaders": "Home,Draw,Away",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col3",
                    "showHeaderWIthOdds": "",
                    "marketTemplateId": "1"
                },

                {
                    "UIMarketName": "Winner DNB",
                    "clientMarketName": "Match Winner (Draw No Bet)",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "52"
                },
                {
                    "UIMarketName": "Total Runs",
                    "clientMarketName": "Innings Runs 2-Ways",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "11"
                },
                {
                    "UIMarketName": "Innings Runs",
                    "clientMarketName": "Innings Runs 2-Ways",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "3"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 22,
        "sportName": "Darts",
        "sportType": "sport",
        "isLMTavailable": "False",
        "FixtureType": "",
        "defaultMarketName": "Match Result",
        "defaultMarketTemplateId": "1",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Match Result",
            "marketTypeCSS3": "",
            "marketTypeCSS2WithSubHeaders": "Match Sets U/O,Handicap2-way,Set handicap",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Match Result,Sets,Handicap",
            "marketsSupported": [
                {
                    "UIMarketName": "Match Result",
                    "clientMarketName": "Match Result",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "1"
                },
                {
                    "UIMarketName": "Handicap",
                    "clientMarketName": "Handicap",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "2",
                    "subMarketHeader": "Handicap"
                },
                {
                    "UIMarketName": "Sets",
                    "clientMarketName": "Match Sets U/O",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "26",
                    "subMarketHeader": "Sets"
                }

            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 23,
        "sportName": "Volleyball",
        "sportType": "sport",
        "isLMTavailable": "False",
        "FixtureType": "",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "1",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Winner",
            "marketTypeCSS3": "",
            "marketTypeCSS2WithSubHeaders": "Match Handicap Sets,Total points",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner,Over/Under,Handicap",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Match Winner",
                    "displayHeaders": "Home,Away",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "1"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Total Match Points 2-way",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "8",
                    "subMarketHeader": "Points"
                },
                {
                    "UIMarketName": "Handicap",
                    "clientMarketName": "Match Handicap Sets",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "7",
                    "subMarketHeader": "Sets"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 29,
        "sportName": "Futsal",
        "sportType": "sport",
        "isLMTavailable": "false",
        "FixtureType": "",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "1",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "",
            "marketTypeCSS3": "Match Winner",
            "marketTypeCSS2WithSubHeaders": "",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Match Winner",
                    "displayHeaders": "Home,Away",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "1"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 31,
        "sportName": "Badminton",
        "sportType": "sport",
        "isLMTavailable": "False",
        "FixtureType": "",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "186",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Winner",
            "marketTypeCSS3": "",
            "marketTypeCSS2WithSubHeaders": "Point handicap,Total points",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner,Handicap,Over/Under",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Winner",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "186"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Total Points",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "238",
                    "subMarketHeader": "Points"
                },
                {
                    "UIMarketName": "Handicap",
                    "clientMarketName": "Point Handicap",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "237",
                    "subMarketHeader": "Handicap"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 109,
        "sportName": "Counter-Strike",
        "sportType": "esport",
        "isLMTavailable": "false",
        "FixtureType": "",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "186",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Winner",
            "marketTypeCSS3": "",
            "marketTypeCSS2WithSubHeaders": "Map handicap,Total maps",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner,Handicap,Over/Under",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Winner",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "186"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Total Maps",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "328",
                    "subMarketHeader": "Maps"
                },
                {
                    "UIMarketName": "Handicap",
                    "clientMarketName": "Map Handicap",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "327",
                    "subMarketHeader": "Handicap"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 110,
        "sportName": "League of Legends",
        "sportType": "esport",
        "isLMTavailable": "false",
        "FixtureType": "",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "186",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Winner",
            "marketTypeCSS3": "",
            "marketTypeCSS2WithSubHeaders": "Map handicap,Total maps",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner,Handicap,Over/Under",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Winner",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "186"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Total Maps",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "328",
                    "subMarketHeader": "Maps"
                },
                {
                    "UIMarketName": "Handicap",
                    "clientMarketName": "Map Handicap",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "327",
                    "subMarketHeader": "Handicap"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 111,
        "sportName": "Dota 2",
        "sportType": "esport",
        "isLMTavailable": "false",
        "FixtureType": "",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "186",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "",
            "marketTypeCSS3": "Winner",
            "marketTypeCSS2WithSubHeaders": "Map handicap,Total maps",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner,Handicap,Over/Under",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Winner",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "186"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Total Maps",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "328",
                    "subMarketHeader": "Maps"
                },
                {
                    "UIMarketName": "Handicap",
                    "clientMarketName": "Map Handicap",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "327",
                    "subMarketHeader": "Handicap"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 112,
        "sportName": "Starcraft",
        "sportType": "esport",
        "isLMTavailable": "false",
        "FixtureType": "",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "186",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Winner",
            "marketTypeCSS3": "",
            "marketTypeCSS2WithSubHeaders": "Map handicap,Total maps",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner,Handicap,Over/Under",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Winner",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "186"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Total Maps",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "328",
                    "subMarketHeader": "Maps"
                },
                {
                    "UIMarketName": "Handicap",
                    "clientMarketName": "Map Handicap",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "327",
                    "subMarketHeader": "Handicap"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 113,
        "sportName": "Heartstone",
        "sportType": "esport",
        "isLMTavailable": "false",
        "FixtureType": "",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "186",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Winner",
            "marketTypeCSS3": "",
            "marketTypeCSS2WithSubHeaders": "",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Winner",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "186"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 117,
        "sportName": "MMA",
        "sportType": "sport",
        "isLMTavailable": "false",
        "FixtureType": "",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "1",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Fight Winner",
            "marketTypeCSS3": "",
            "marketTypeCSS2WithSubHeaders": "Total Rounds Completed",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner,Over/Under",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Fight Winner",
                    "displayHeaders": "Home,Away",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "1"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Total Rounds Completed",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "7",
                    "subMarketHeader": "Rounds"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 118,
        "sportName": "Call of Duty",
        "sportType": "esport",
        "isLMTavailable": "false",
        "FixtureType": "",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "186",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Winner",
            "marketTypeCSS3": "",
            "marketTypeCSS2WithSubHeaders": "",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Winner",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "186"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 121,
        "sportName": "Overwatch",
        "sportType": "esport",
        "isLMTavailable": "false",
        "FixtureType": "",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "186",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Winner",
            "marketTypeCSS3": "",
            "marketTypeCSS2WithSubHeaders": "",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Winner",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "186"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 125,
        "sportName": "Rainbow Six",
        "sportType": "esport",
        "isLMTavailable": "false",
        "FixtureType": "",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "186",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Winner",
            "marketTypeCSS3": "",
            "marketTypeCSS2WithSubHeaders": "",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Winner",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "186"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 128,
        "sportName": "Rocket League",
        "sportType": "esport",
        "isLMTavailable": "false",
        "FixtureType": "",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "186",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Winner",
            "marketTypeCSS3": "",
            "marketTypeCSS2WithSubHeaders": "",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Winner",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "186"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 134,
        "sportName": "King of Glory",
        "sportType": "esport",
        "isLMTavailable": "false",
        "FixtureType": "",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "186",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Winner",
            "marketTypeCSS3": "",
            "marketTypeCSS2WithSubHeaders": "",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Winner",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "186"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 137,
        "sportName": "eSoccer",
        "sportType": "esport",
        "isLMTavailable": "False",
        "FixtureType": "",
        "defaultMarketName": "1x2",
        "defaultMarketTemplateId": "1",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "",
            "marketTypeCSS3": "1X2",
            "marketTypeCSS2WithSubHeaders": "Handicap,Total",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "1x2,Handicap,Over/Under",
            "marketsSupported": [
                {
                    "UIMarketName": "1x2",
                    "clientMarketName": "1X2",
                    "displayHeaders": "Home,Draw,Away",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "1"
                },
                {
                    "UIMarketName": "Handicap",
                    "clientMarketName": "Handicap",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "16",
                    "subMarketHeader": "Handicap"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Total",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "18",
                    "subMarketHeader": "Goals"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 153,
        "sportName": "eBasketball",
        "sportType": "esport",
        "isLMTavailable": "False",
        "FixtureType": "",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "219",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Winner (incl. overtime)",
            "marketTypeCSS3": "",
            "marketTypeCSS2WithSubHeaders": "Handicap (incl. overtime),Total (incl. overtime)",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner,Handicap,Over/Under",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Winner (incl. overtime)",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "219"
                },
                {
                    "UIMarketName": "Handicap",
                    "clientMarketName": "Handicap (incl. overtime)",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "223",
                    "subMarketHeader": "Handicap"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Total (incl. overtime)",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "225",
                    "subMarketHeader": "Points"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 59,
        "sportName": "Rugby League",
        "sportType": "sport",
        "isLMTavailable": "False",
        "FixtureType": "",
        "defaultMarketName": "1X2",
        "defaultMarketTemplateId": "1",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "",
            "marketTypeCSS3": "1X2",
            "marketTypeCSS2WithSubHeaders": "Handicap,Total,Total Points Under / Over,Total Points Line Mid,Handicap 2 way,HandicapLine Mid",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "1X2,Over/Under,Over/Under Mid,Handicap,HDP Mid",
            "marketsSupported": [
                {
                    "UIMarketName": "1X2",
                    "clientMarketName": "Match Winner",
                    "displayHeaders": "Home,Draw,Away",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "1"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Total Points Under / Over",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "6",
                    "subMarketHeader": "Points"
                },
                {
                    "UIMarketName": "Over/Under Mid",
                    "clientMarketName": "Total Points Line Mid",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "16",
                    "subMarketHeader": "Points"
                },
                {
                    "UIMarketName": "Handicap",
                    "clientMarketName": "Handicap 2 way",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "7",
                    "subMarketHeader": "Handicap"
                },
                {
                    "UIMarketName": "HDP Mid",
                    "clientMarketName": "HandicapLine Mid",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "15",
                    "subMarketHeader": "Handicap"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 1001,
        "sportName": "Virtual Soccer",
        "sportType": "virtual",
        "isLMTavailable": "False",
        "FixtureType": "Virtual Soccer",
        "defaultMarketName": "1X2",
        "defaultMarketTemplateId": "1",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "",
            "marketTypeCSS3": "1X2",
            "marketTypeCSS2WithSubHeaders": "Handicap,Total",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "1X2,Handicap,Over/Under",
            "marketsSupported": [
                {
                    "UIMarketName": "1X2",
                    "clientMarketName": "1X2",
                    "displayHeaders": "Home,Draw,Away",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "1"
                },
                {
                    "UIMarketName": "Handicap",
                    "clientMarketName": "Handicap",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "16",
                    "subMarketHeader": "Handicap"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Total",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "18",
                    "subMarketHeader": "Goals"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 1002,
        "sportName": "Virtual Basketball",
        "sportType": "virtual",
        "isLMTavailable": "False",
        "FixtureType": "Virtual Basketball",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "219",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Winner (incl. overtime)",
            "marketTypeCSS3": "",
            "marketTypeCSS2WithSubHeaders": "Handicap (incl. overtime),Total (incl. overtime)",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner,Over/Under,Handicap",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Winner (incl. overtime)",
                    "displayHeaders": "1,X,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "219"
                },
                {
                    "UIMarketName": "Handicap",
                    "clientMarketName": "Handicap (incl. overtime)",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "223",
                    "subMarketHeader": "Handicap"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Total (incl. overtime)",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "225",
                    "subMarketHeader": "Points"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 1003,
        "sportName": "Virtual Baseball",
        "sportType": "virtual",
        "isLMTavailable": "False",
        "FixtureType": "Virtual Baseball",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "251",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Winner (incl. extrainnings)",
            "marketTypeCSS3": "",
            "marketTypeCSS2WithSubHeaders": "Total (incl. extrainnings),Handicap (incl. extrainnings)",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner,Over/Under,Handicap",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Winner (incl. extrainnings)",
                    "displayHeaders": "1,X,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "251"
                },
                {
                    "UIMarketName": "Handicap",
                    "clientMarketName": "Handicap (incl. extrainnings)",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "256",
                    "subMarketHeader": "Handicap"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Total (incl. extrainnings)",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "258",
                    "subMarketHeader": "Runs"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 1005,
        "sportName": "Virtual Tennis",
        "sportType": "virtual",
        "isLMTavailable": "False",
        "FixtureType": "",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "186",
        "markets": {
            "ResultRowCss": "SB-twoInRow,SB-threeInRow",
            "marketTypeCSS1": "",
            "marketTypeCSS2": "Winner",
            "marketTypeCSS3": "",
            "marketTypeCSS2WithSubHeaders": "Game handicap,Total games",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner,Game HDP,Over/Under",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Winner",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "186"
                },
                {
                    "UIMarketName": "Game HDP",
                    "clientMarketName": "Game Handicap",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "187",
                    "subMarketHeader": "Handicap"
                },
                {
                    "UIMarketName": "Over/Under",
                    "clientMarketName": "Total Games",
                    "displayHeaders": "Over,Under",
                    "marketWithSubMarket": true,
                    "outcomeTemplateType": "SB-col3",
                    "marketTemplateId": "189",
                    "subMarketHeader": "Games"
                }
            ]
        },
        "key": "sb_event"
    },
    {
        "sportId": 1055,
        "sportName": "Virtual Horse Racing",
        "sportType": "virtual",
        "isLMTavailable": "False",
        "FixtureType": "",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "866",
        "markets": {
            "ResultRowCss": "",
            "marketTypeCSS1": "Win",
            "marketTypeCSS2": "",
            "marketTypeCSS3": "",
            "marketTypeCSS2WithSubHeaders": "",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Win",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "866"
                }
            ]
        },
        "key": "sb_event"
    },

    {
        "sportId": 1058,
        "sportName": "Virtual Dog Racing",
        "sportType": "virtual",
        "isLMTavailable": "False",
        "FixtureType": "",
        "defaultMarketName": "Winner",
        "defaultMarketTemplateId": "866",
        "markets": {
            "ResultRowCss": "",
            "marketTypeCSS1": "Win",
            "marketTypeCSS2": "",
            "marketTypeCSS3": "",
            "marketTypeCSS2WithSubHeaders": "",
            "marketTypeCSS3WithSubHeaders": "",
            "UISupportedMarkets": "Winner",
            "marketsSupported": [
                {
                    "UIMarketName": "Winner",
                    "clientMarketName": "Win",
                    "displayHeaders": "1,2",
                    "marketWithSubMarket": false,
                    "outcomeTemplateType": "SB-col2",
                    "marketTemplateId": "866"
                }
            ]
        },
        "key": "sb_event"
    }
]

