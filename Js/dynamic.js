// Dynamically Generate Header match cards

function generateMatchCards() {
  const matchesData = [
    {
      category: "eng-w-vs-ind-w",
      status: "Live",
      matchType: "1st ODI",
      location: "Southampton",
      team1: {
        name: "ENG-W",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/313200/313261.logo.png",
        score: "258/6",
      },
      team2: {
        name: "IND-W",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/381800/381895.png",
        score: "20/0",
        overs: "(4.1/50 ov, T:259)",
        status: "playing",
      },
      result: "IND Women need 239 runs from 46 overs.",
      matchInfo: "one-vs-one",
    },
    {
      category: "sl-vs-ban",
      status: "Live",
      matchType: "3rd T20",
      location: "Colombo (RPS)",
      team1: {
        name: "SL",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/340000/340047.png",
        score: "132/7",
      },
      team2: {
        name: "BAN",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/341400/341456.png",
        score: "76/2",
        overs: "(9/20 ov, T:133)",
        status: "playing",
      },
      result: "Bangladesh need 59 runs in 68 balls.",
      matchInfo: "one-vs-one",
    },
    {
      category: "sa-vs-aus",
      status: "Live",
      matchType: "3rd ODI (D/N)",
      location: "Mackay",
      team1: {
        name: "Aus",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/340400/340493.png",
        score: "431/2",
      },
      team2: {
        name: "SA",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/382700/382733.png",
        score: "145/8",
        overs: "(21.3/50 ov, T:432)",
        status: "playing",
      },
      result: "SA needs 286 runs in 28.3 overs.",
      matchInfo: "one-vs-one",
    },
    {
      category: "gsl",
      status: "Live",
      matchType: "8th Match",
      series: "GSL",
      format: "T20",
      location: "Providence",
      team1: {
        name: "RAR",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/393900/393981.png",
        score: "158/5",
      },
      team2: {
        name: "DC",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/349600/349619.jpg",
        score: "28/3",
        overs: "(5/20 ov, T:159)",
        status: "playing",
      },
      result: "DC need 131 runs in 90 balls.",
      matchInfo: "league",
    },
    {
      category: "max60",
      status: "Not covered live",
      matchType: "1st Match",
      series: "MAX60",
      location: "George Town",
      team1: {
        name: "BRT",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/403300/403397.png",
      },
      team2: {
        name: "CAT",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/403400/403402.png",
        status: "playing",
      },
      result: "No content available",
      matchInfo: "league",
    },
    {
      category: "max60",
      status: "Not covered live",
      matchType: "2nd Match",
      series: "MAX60",
      location: "George Town",
      team1: {
        name: "FLL",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/403300/403399.png",
      },
      team2: {
        name: "MIB",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/403300/403396.png",
        status: "playing",
      },
      result: "No content available",
      matchInfo: "league",
    },
    {
      category: "vitality-blast-women",
      matchType: "51th Match",
      series: "Vitality Blast Women",
      format: "WT20",
      location: "Cheimsford",
      team1: {
        name: "Essex W",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/313200/313263.logo.png",
        time: "Today",
      },
      team2: {
        name: "Lancashire W",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/401500/401553.png",
        time: "10:00 PM",
      },
      result: "ESS Women chose to bat",
      matchInfo: "league",
    },
    {
      category: "vitality-blast-women",
      matchType: "51nd Match",
      series: "Vitality Blast Women",
      format: "WT20",
      location: "Taunton",
      team1: {
        name: "The Blaze W",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/401500/401551.png",
        time: "Today",
      },
      team2: {
        name: "Somerset W",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/313200/313276.logo.png",
        time: "10:00 PM",
      },
      result: "SOM Women chose to field",
      matchInfo: "league",
    },
    {
      category: "vitality-blast-men",
      matchType: "South Group",
      series: "Vitality Blast Men",
      format: "WT20",
      location: "Lord's",
      team1: {
        name: "Surrey",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/401500/401557.png",
        time: "Today",
      },
      team2: {
        name: "Middlesex",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/313200/313273.logo.png",
        time: "10:15 PM",
      },
      result: "Surrey chose to bat",
      matchInfo: "league",
    },
    {
      category: "max60",
      status: "Not covered live",
      matchType: "3rd Match",
      series: "MAX60",
      location: "George Town",
      team1: {
        name: "BRT",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/403300/403397.png",
        time: "Today, 11:00 PM",
      },
      team2: {
        name: "GCF",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/403300/403398.png",
        time: "1h:28m",
      },
      result: "Match starts in 1 hr and 28 mins",
      matchInfo: "league",
    },
    {
      category: "max60",
      status: "Not covered live",
      matchType: "4th Match",
      series: "MAX60",
      location: "George Town",
      team1: {
        name: "CBS",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/403400/403401.png",
        time: "Tomorrow, 1:30 AM",
      },
      team2: {
        name: "FLL",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/403300/403399.png",
        time: "3h:55m",
      },
      result: "Match starts in 1 hr and 28 mins",
      matchInfo: "league",
    },
    {
      category: "gsl",
      matchType: "9th Match",
      series: "GSL",
      format: "T20",
      location: "Providence",
      team1: {
        name: "GAW",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/313400/313482.logo.png",
        time: "Tomorrow",
      },
      team2: {
        name: "HBH",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/313400/313467.logo.png",
        time: "4:00 PM",
      },
      result: "Match yet to begin",
      matchInfo: "league",
    },
    {
      category: "zim-tri",
      status: "Live",
      series: "ZIM T20 Tri-Series",
      location: "Harare",
      team1: {
        name: "Zim",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/340500/340503.png",
        score: "120/7",
        overs: "",
        status: "",
      },
      team2: {
        name: "NZ",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/340500/340505.png",
        score: "50/1 ",
        overs: "(6.4/20 ov, T:121)",
        status: "playing",
      },
      result: "New Zealand need 70 runs in 80 balls",
      matchInfo: "league",
    },
    {
      category: "zim-tri",
      status: "Result",
      series: "ZIM T20 Tri-Series",
      location: "Harare",
      team1: {
        name: "NZ",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/340500/340505.png",
        score: "173/5",
      },
      team2: {
        name: "SA",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/382700/382733.png",
        score: "152",
        overs: "(18.2/20 ov, T:173)",
        status: "lost",
      },
      result: "New Zealand won by 21 runs",
      matchInfo: "league",
    },
    {
      category: "uae-tri",
      status: "Live",
      series: "ZIM T20 Tri-Series",
      location: "Harare",
      team1: {
        name: "PAK",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/381800/381891.png",
        score: "182/7",
      },
      team2: {
        name: "AFG",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/381800/381892.png",
        score: "143/9",
        overs: "(19.3/20 ov, T:183)",
        status: "playing",
      },
      result: "Afghanistan need 40 runs in 3 balls",
      matchInfo: "league",
    },
    {
      category: "qea-trophy",
      status: "Not covered live",
      matchType: "26th Match",
      format: "FC",
      series: "QEA Trophy",
      location: "Islamabad",
      team1: {
        name: "FATA",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/390300/390396.png",
        score: "460/3",
        overs: "(90 ov)",
        status: "playing",
      },
      team2: {
        name: "Abbottabad",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/390400/390401.png",
        score: "",
        overs: "",
        status: "",
      },
      result: "Abbottabad chose to field.",
      matchInfo: "league",
    },
    {
      category: "qea-trophy",
      status: "Not covered live",
      matchType: "27th Match",
      format: "FC",
      series: "QEA Trophy",
      location: "Islamabad",
      team1: {
        name: "BHPLR",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/390300/390399.png",
        score: "203/2",
        overs: "(58 ov)",
        status: "playing",
      },
      team2: {
        name: "Sailk",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/390300/390386.png",
        score: "",
        overs: "",
        status: "",
      },
      result: "Sailk R chose to field.",
      matchInfo: "league",
    },
    {
      category: "qea-trophy",
      status: "Not covered live",
      matchType: "28th Match",
      format: "FC",
      series: "QEA Trophy",
      location: "Islamabad",
      team1: {
        name: "LAHW",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/390300/390392.png",
        score: "179",
        overs: "",
        status: "",
      },
      team2: {
        name: "FSLB",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/390300/390397.png",
        score: "69/5",
        overs: "(25 ov)",
        status: "playing",
      },
      result: "Faisalabad trail by 110 runs.",
      matchInfo: "league",
    },
    {
      category: "qea-trophy",
      status: "Not covered live",
      matchType: "29th Match",
      format: "FC",
      series: "QEA Trophy",
      location: "Islamabad",
      team1: {
        name: "ISB",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/390300/390394.png",
        score: "272/8",
        overs: "(75 ov)",
        status: "playing",
      },
      team2: {
        name: "MUL",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/390300/390390.png",
        score: "",
        overs: "",
        status: "",
      },
      result: "Multan chose to field.",
      matchInfo: "league",
    },
    {
      category: "qea-trophy",
      status: "Not covered live",
      matchType: "30th Match",
      format: "FC",
      series: "QEA Trophy",
      location: "Islamabad",
      team1: {
        name: "KRBLS",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/390400/390400.png",
        score: "323/7",
        overs: "(90 ov)",
        status: "playing",
      },
      team2: {
        name: "PESH",
        flag: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_80/lsci/db/PICTURES/CMS/390300/390389.png",
        score: "",
        overs: "",
        status: "",
      },
      result: "Peshawar chose to field.",
      matchInfo: "league",
    },
  ];

  // URL mappings for match pages
  const urlMap = {
    "zim-tri": "match-results.html",
    "eng-w-vs-ind-w": "#0",
    "sl-vs-ban": "#0",
    "sa-vs-aus": "live-cricket-score.html",
    "uae-tri": "live-cricket-score.html",
    gsl: "#0",
    max60: "#0",
    "vitality-blast-women": "#0",
    "vitality-blast-men": "#0",
    "qea-trophy": "fullscore-card.html",
  };

  // Tab links configuration based on matchInfo and category
  const tabLinksConfig = {
    "one-vs-one": {
      "sa-vs-aus": {
        schedule:
          "series/south-africa-in-australia-2025/australia-vs-south-africa-3rd-odi/live-matches-schedule.html",
        series: "series/south-africa-in-australia-2025/series.html",
        report:
          "series/south-africa-in-australia-2025/australia-vs-south-africa-3rd-odi/match-report.html",
      },
      "eng-w-vs-ind-w": {
        schedule: "../live-scores/live-matches-schedule.html",
        series: "../series/series.html",
        report: "#report",
      },
      "sl-vs-ban": {
        schedule: "../live-scores/live-matches-schedule.html",
        series: "../series/series.html",
        report: "#report",
      },
      default: {
        schedule: "../live-scores/live-matches-schedule.html",
        series: "../series/series.html",
        report: "#report",
      },
    },
    league: {
      gsl: {
        schedule: "../live-scores/live-matches-schedule.html",
        series: "../series/series.html",
        table: "series/global-super-league-2025/point-table-standing.html",
      },
      max60: {
        schedule: "../live-scores/live-matches-schedule.html",
        series: "../series/series.html",
        table: "series/max60-caribbean-2025/point-table-standing.html",
      },
      "vitality-blast-women": {
        schedule: "../live-scores/live-matches-schedule.html",
        series: "../series/series.html",
        table: "series/vitality-blast-women-2025/point-table-standing.html",
      },
      "vitality-blast-men": {
        schedule: "../live-scores/live-matches-schedule.html",
        series: "../series/series.html",
        table: "series/vitality-blast-men-2025/point-table-standing.html",
      },
      "qea-trophy": {
        schedule: "../live-scores/live-matches-schedule.html",
        series: "../series/series.html",
        table: "series/quaid-e-azam-trophy-2025-26/point-table-standing.html",
      },
      "zim-tri": {
        schedule: "../live-scores/live-matches-schedule.html",
        series: "../series/series.html",
        table:
          "series/zimbabwe-t20i-tri-series-2025/south-africa-vs-new-zealand-2nd-match/point-table-standing.html",
      },
      default: {
        schedule: "#schedule",
        series: "#series",
        table: "#table",
      },
    },
  };

  // Improved getBasePath function that works across entire project
  function getBasePath(category) {
    const currentPath = window.location.pathname;

    // Determine depth level based on current path
    let depth = 0;
    const pathParts = currentPath
      .split("/")
      .filter((part) => part && part !== "index.html");

    // Count non-empty path segments (excluding filename)
    if (
      pathParts.length > 0 &&
      !pathParts[pathParts.length - 1].includes(".html")
    ) {
      depth = pathParts.length;
    } else if (pathParts.length > 1) {
      depth = pathParts.length - 1;
    }

    // Build relative path prefix based on depth
    const prefix = depth > 0 ? "../".repeat(depth) : "./";

    // Category-specific paths
    const categoryPaths = {
      "sa-vs-aus":
        "series/south-africa-in-australia-2025/australia-vs-south-africa-3rd-odi/",
      "zim-tri":
        "series/zimbabwe-t20i-tri-series-2025/south-africa-vs-new-zealand-2nd-match/",
      "uae-tri":
        "series/united-arab-emirates-t20i-tri-series-2025/afghanistan-vs-pakistan-1st-match/",
      "qea-trophy":
        "series/quaid-e-azam-trophy-2025-26/abbottabad-region-vs-federally-administered-tribal-areas-26th-match/",
    };

    return prefix + (categoryPaths[category] || categoryPaths["uae-tri"]);
  }

  // Function to get tab links based on matchInfo and category
  function getTabLinks(matchInfo, category) {
    const config = tabLinksConfig[matchInfo];
    if (!config) return null;

    const links = config[category] || config.default;

    // Calculate the current depth for path resolution
    const currentPath = window.location.pathname;
    const pathParts = currentPath
      .split("/")
      .filter((part) => part && part !== "index.html");

    let depth = 0;
    if (
      pathParts.length > 0 &&
      !pathParts[pathParts.length - 1].includes(".html")
    ) {
      depth = pathParts.length;
    } else if (pathParts.length > 1) {
      depth = pathParts.length - 1;
    }

    const prefix = depth > 0 ? "../".repeat(depth) : "./";

    // Convert links to absolute paths based on current location
    const absoluteLinks = {};
    for (let key in links) {
      if (links[key].startsWith("#")) {
        // Keep hash links as-is
        absoluteLinks[key] = links[key];
      } else {
        // Prepend the calculated prefix to relative paths
        absoluteLinks[key] = prefix + links[key];
      }
    }

    return absoluteLinks;
  }

  // Generate match tabs HTML based on matchInfo
  function generateMatchTabs(matchInfo, category) {
    const tabLinks = getTabLinks(matchInfo, category);
    if (!tabLinks) return "";

    if (matchInfo === "one-vs-one") {
      return `
        <div class="match-tabs flex">
          <a href="${tabLinks.schedule}" class="match-tab">Schedule</a>
          <a href="${tabLinks.series}" class="match-tab">Series</a>
          <a href="${tabLinks.report}" class="match-tab">Report</a>
        </div>
      `;
    } else if (matchInfo === "league") {
      return `
        <div class="match-tabs flex">
          <a href="${tabLinks.schedule}" class="match-tab">Schedule</a>
          <a href="${tabLinks.series}" class="match-tab">Series</a>
          <a href="${tabLinks.table}" class="match-tab">Table</a>
        </div>
      `;
    }

    return "";
  }

  const matchesSlider = $(".matches-slider");
  matchesSlider.empty();

  $.each(matchesData, function (index, match) {
    const pageUrl = urlMap[match.category] || "#0";
    const basePath = getBasePath(match.category);
    const fullUrl = pageUrl !== "#0" ? basePath + pageUrl : "#0";

    let headerDots = "";
    if (match.status === "Live") {
      headerDots += `<span class="dot live uppercase mr-1">${match.status}</span>`;
    }
    if (match.status === "Not covered live") {
      headerDots += `<span class="dot ing-br uppercase mr-1">${match.status}</span>`;
    }
    if (match.matchType) {
      headerDots += `<span class="dot mr-1">${match.matchType}</span>`;
    }
    if (match.series) {
      headerDots += `<span class="dot mr-1">${match.series}</span>`;
    }
    if (match.format) {
      headerDots += `<span class="dot mr-1">${match.format}</span>`;
    }
    headerDots += `<span class="mr-1">${match.location}</span>`;

    let team1Score = match.team1.score
      ? `<span class="team-score">${match.team1.score}</span>`
      : "";
    let team1Time = match.team1.time
      ? `<span class="team-overs">${match.team1.time}</span>`
      : "";
    let team1Overs = match.team1.overs
      ? `<span class="team-overs">${match.team1.overs}</span>`
      : "";

    let team2Score = match.team2.score
      ? `<span class="team-score ${
          match.team2.status === "lost" ? "lost" : ""
        }">${match.team2.score}</span>`
      : "";
    let team2Time = match.team2.time
      ? `<span class="team-score">${match.team2.time}</span>`
      : "";
    let team2Overs = match.team2.overs
      ? `<span class="team-overs">${match.team2.overs}</span>`
      : "";

    // Generate match tabs based on matchInfo
    const matchTabs = generateMatchTabs(match.matchInfo, match.category);

    const matchCard = $(`
      <div class="match-card" data-category="${match.category}">
        <a href="${fullUrl}">
          <div class="match-header flex">
            <div class="indicator ellipsis-text">
              ${headerDots}
            </div>
          </div>
          <div class="teams-container">
            <div class="team flex">
              <div class="team-info flex">
                <div class="team-flag">
                  <img src="${match.team1.flag}" alt="${match.team1.name}" />
                </div>
                <span class="team-name ${
                  match.team1.status === "lost" ||
                  match.team1.status === "playing"
                    ? match.team1.status
                    : ""
                }">${match.team1.name}</span>
              </div>
              <div>
                ${team1Overs}
                ${team1Time}
                ${team1Score}
              </div>
            </div>
            <div class="team flex">
              <div class="team-info flex">
                <div class="team-flag">
                  <img src="${match.team2.flag}" alt="${match.team2.name}" />
                </div>
                <span class="team-name ${
                  match.team2.status === "lost" ||
                  match.team2.status === "playing"
                    ? match.team2.status
                    : ""
                }">${match.team2.name}</span>
              </div>
              <div>
                ${team2Overs}
                ${team2Time}
                ${team2Score}
              </div>
            </div>
          </div>
          <div class="match-result">${match.result}</div>
        </a>
        ${matchTabs}
      </div>
    `);

    matchesSlider.append(matchCard);
  });
}

// Home Page Coverage Content Loaded

function loadCoverageContent() {
  const tabsData = [
    { teams: "CPL 2025", details: "T20 league", category: "cpl-2025" },
    { teams: "Zim vs NZ", details: "Men's T20 tri-series", category: "zim-nz" },
    { teams: "WCL 2025", details: "Eng vs Pak", category: "wcl-25" },
    {
      teams: "Eng vs Ind",
      details: "1st Women's ODI",
      category: "ind-w-eng-w",
    },
    { teams: "WI vs AUS", details: "1st Men's T20", category: "wi-vs-aus" },
    {
      teams: "Shpageeza T20s",
      details: "Afganistan domestic",
      category: "afganistan-domestic",
    },
  ];

  const bodyContentData = [
    {
      category: "cpl-2025",
      active: true,
      mainContent: `
                    <div class="card-content mb-2">
                        <div class="flex ais gap-5">
                            <div class="card-image-holder featured-image">
                                <a href="#0"><div class="card-image"><img src="https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/405400/405404.6.jpg" alt="Shakib, Gore the stars as Falcons take down Patriots" /></div></a>
                                <div class="indicator">
                                    <a href="#0" class="text"><span class="dot mr-1 hover">Faqs</span></a>
                                    <a href="#0" class="text"><span class="dot mr-1 hover">Fixtures and results</span></a>
                                    <a href="#0" class="text"><span class="hover">Point table</span></a>
                                </div>
                            </div>
                            <div class="card-text">
                                <a href="#0" class="text"><h2>Shakib, Gore the stars as Falcons take down Patriots</h2></a>
                                <a href="#0" class="live-results flex space-between">
                                    <div class="flex gap-5">
                                        <span><i class="ri-medal-2-fill"></i></span>
                                        <div class="batting-details flex"><span class="overs-details">Falcons won by 7 wickets (with 2 balls remaining)</span></div>
                                    </div>
                                    <span><i class="ri-arrow-right-s-line"></i></span>
                                </a>
                                <a href="#0" class="flex"><span><i class="ri-arrow-right-s-line"></i></span><span class="hover"><span class="bold">Stats</span>: Shakib joins the 500 T20 wickets club</span></a>
                                <a href="#0" class="flex"><span><i class="ri-arrow-right-s-line"></i></span><span class="hover">Barbados Royals remain winless after washout</span></a>
                            </div>
                        </div>
                    </div>
                    <div class="common-slider slides-5 no-auto-play no-dots">
                        ${generateSliderItems([
                          {
                            src: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_240/esci/media/motion/2025/0820/dm_250820_INET_CRIC_cpl_rutherford_interview_nonbranded_global/dm_250820_INET_CRIC_cpl_rutherford_interview_nonbranded_global.jpg",
                            title: "Rutherford: I see Powell as a role model",
                          },
                          {
                            src: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_240/esci/media/motion/2025/0820/dm_250820_INET_CRIC_cpl_penney_interview_nonbranded_global/dm_250820_INET_CRIC_cpl_penney_interview_nonbranded_global.jpg",
                            title: "'De Kock is enjoying Royals environment'",
                          },
                          {
                            src: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_240/esci/media/motion/2025/0818/dm_250818_INET_CRIC_cpl_interviews_wiese_nonbranded_global/dm_250818_INET_CRIC_cpl_interviews_wiese_nonbranded_global.jpg",
                            title:
                              "Wiese 'looking forward' to captaincy challenge",
                          },
                          {
                            src: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_240/esci/media/motion/2025/0818/dm_250818_INET_CRIC_cpl_interviews_powell_nonbranded_global/dm_250818_INET_CRIC_cpl_interviews_powell_nonbranded_global.jpg",
                            title: "Powell: CPL is only behind IPL",
                          },
                          {
                            src: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_240/esci/media/motion/2025/0818/dm_250818_inet_cric_cpl2025_pooraninterview_nonbranded_global/dm_250818_inet_cric_cpl2025_pooraninterview_nonbranded_global.jpg",
                            title: "Pooran: Not trying to reinvent the wheel",
                          },
                          {
                            src: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_240/esci/media/motion/2025/0818/dm_250818_inet_cric_cpl2025_kmint_nonbranded_global/dm_250818_inet_cric_cpl2025_kmint_nonbranded_global.jpg",
                            title:
                              "Keemo Paul: This season is do or die for me",
                          },
                        ])}
                    </div>
                `,
    },
    {
      category: "zim-nz",
      active: false,
      mainContent: `
                    <div class="card-content flex ais gap-5">
                        <div class="card-image-holder featured-image">
                            <a href="#0"><div class="card-image"><img src="https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/403800/403833.6.jpg" alt="Live - Zimbabwe openers brisk in powerplay" /></div></a>
                            <a href="#0"><span class="hover">Tri-series fixtures and results</span></a>
                        </div>
                        <div class="card-text">
                            <a href="#0" class="text"><h2>Live - Zimbabwe openers brisk in powerplay</h2></a>
                            <a href="#0" class="live-results flex space-between">
                                <div class="flex gap-5">
                                    <div class="live-dot"></div>
                                    <div class="batting-details flex">
                                        <span>NZ</span><span class="bold">50/1</span><span class="overs-details">(6.4/20 ov, T:121)</span><span>vs ZIM</span><span class="bold"> 120/7</span>
                                    </div>
                                </div>
                                <span><i class="ri-arrow-right-s-line"></i></span>
                            </a>
                            <a href="#0" class="flex"><span><i class="ri-arrow-right-s-line"></i></span><span class="hover"> Toss: Ravindra, Bracewell return</span></a>
                            <a href="#0" class="flex"><span><i class="ri-arrow-right-s-line"></i></span><span class="hover">Glenn Phillips out of Zimbabwe tour with groin injury</span></a>
                            <a href="#0" class="flex"><span><i class="ri-arrow-right-s-line"></i></span><span class="hover">'An addicting feeling' - Robinson is hungry for more</span></a>
                            <a href="#0" class="flex"><span><i class="ri-arrow-right-s-line"></i></span><span class="hover flex"><div class="bold">NZ vs SA</div>: Robinson, Duffy, Henry subdue SA</span></a>
                        </div>
                    </div>
                `,
    },
    {
      category: "wcl-25",
      active: false,
      mainContent: `
                    <div class="card-content flex ais gap-5">
                        <div class="card-text">
                            <a href="#0" class="live-results flex space-between">
                                <div class="flex gap-5">
                                    <span><i class="ri-calendar-line"></i></span>
                                    <div class="batting-details flex">
                                        <span>Eng Champs</span><span>vs Pak Champs</span>
                                    </div>
                                </div>
                                <span><i class="ri-arrow-right-s-line"></i></span>
                            </a>
                        </div>
                    </div>
                `,
    },
    {
      category: "ind-w-eng-w",
      active: false,
      mainContent: `
                    <div class="card-content flex ais gap-5">
                        <div class="card-image-holder featured-image">
                            <a href="#0"><div class="card-image"><img src="https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/403800/403835.6.jpg" alt="Davidson-Richards stays" /></div></a>
                            <div class="indicator">
                                <a href="#0" class="text"><span class="dot mr-1 hover">Tour blog</span></a>
                                <a href="#0" class="text"><span class="dot mr-1 hover">Powerplay podcost</span></a>
                                <a href="#0" class="text"><span class="hover">Hindi blog</span></a>
                            </div>
                        </div>
                        <div class="card-text">
                            <a href="#0" class="text"><h2>Davidson-Richards stays grounded after coming good on comeback</h2></a>
                            <a href="#0" class="live-results flex space-between">
                                <div class="flex gap-5">
                                    <span><i class="ri-calendar-line"></i></span>
                                    <div class="batting-details flex">
                                        <span>ENG Women</span><span>vs IND Women • </span><span class="overs-details">Match yet to begin | 3:00 Pm</span>
                                    </div>
                                </div>
                                <span><i class="ri-arrow-right-s-line"></i></span>
                            </a>
                            <a href="#0" class="flex"><span><i class="ri-arrow-right-s-line"></i></span><span class="hover">Deepti: I was confident I could finish the game</span></a>
                            <a href="#0" class="flex"><span><i class="ri-arrow-right-s-line"></i></span><span class="hover">Rawal pulled up for 'avoidable physical contact'</span></a>
                            <a href="#0" class="flex"><span><i class="ri-arrow-right-s-line"></i></span><span class="hover flex"><div class="bold">1st ODI</div>- Deepti digs deep as India go 1-0 up</span></a>
                            <a href="#0" class="flex"><span><i class="ri-arrow-right-s-line"></i></span><span class="hover flex">Cross advocates for calmness under pressure</span></a>
                        </div>
                    </div>
                `,
    },
    {
      category: "wi-vs-aus",
      active: false,
      mainContent: `
                    <div class="card-content flex ais gap-5">
                        <div class="card-image-holder featured-image">
                            <a href="#0">
                                <div class="card-image">
                                    <img src="https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/esci/media/motion/2025/0719/dm_250719_INET_CRIC_WIAUS25_RUSSRET_NONRANDED_GLOBAL/dm_250719_INET_CRIC_WIAUS25_RUSSRET_NONRANDED_GLOBAL.jpg" alt="Russell takes his leave as T20WC prep comes into focus" />
                                    <div class="duration">3:26</div>
                                    <div class="icon icon-play flex justify-center"><span><i class="ri-play-large-fill"></i></span></div>
                                    <div class="short-heading">Russell: I want to win and finish on a high</div>
                                </div>
                            </a>
                            <span class="flex gap-5 mt text-color"><a href="#0"><span class="hover">Fixtures and results</span></a></span>
                        </div>
                        <div class="card-text">
                            <a href="#0" class="text"><h2>Russell takes his leave as T20WC prep comes into focus</h2></a>
                            <a href="#0" class="live-results flex space-between">
                                <div class="flex gap-5">
                                    <span><i class="ri-calendar-line"></i></span>
                                    <div class="batting-details flex">
                                        <span>West Indies<span>vs Australia •</span></span><span class="overs-details">Match yet to begin | 5:00 Pm</span>
                                    </div>
                                </div>
                                <span><i class="ri-arrow-right-s-line"></i></span>
                            </a>
                            <a href="#0" class="flex"><span><i class="ri-arrow-right-s-line"></i></span><span class="hover">Russell rates 2016 semi-final as his best innings</span></a>
                            <a href="#0" class="flex"><span><i class="ri-arrow-right-s-line"></i></span><span class="hover">Short out of WI series due to side strain</span></a>
                            <a href="#0" class="flex"><span><i class="ri-arrow-right-s-line"></i></span><span class="hover flex">Australia to trial new plans for T20 cricket</span></a>
                        </div>
                    </div>
                `,
    },
    {
      category: "afganistan-domestic",
      active: false,
      mainContent: `
                    <div class="card-content grid fr-2 gap-1">
                        ${generateMatchResults([
                          {
                            icon: "medal",
                            text: "BEAD vs MAK: BEAD won by 6 wickets (with 4 balls remaining)",
                          },
                          {
                            icon: "live",
                            text: "BDD <span class='bold'>192/4</span> (18.5/20 ov) vs SGT",
                          },
                          {
                            icon: "medal",
                            text: "AMSKS vs BDD: AMSKS won by 6 wickets (with 7 balls remaining)",
                          },
                          {
                            icon: "medal",
                            text: "MAK vs SGT: MAK won by 4 wickets (with 1 ball remaining)",
                          },
                        ])}
                    </div>
                `,
    },
  ];

  function generateSliderItems(items) {
    return items
      .map(
        (item) => `
                <div class="slide-item">
                    <div class="slide-content">
                        <a href="#0" class="card-image-holder">
                            <div class="card-image">
                                <img src="${item.src}" alt="${item.title}" />
                                <div class="icon icon-play flex justify-center"><span><i class="ri-play-large-fill"></i></span></div>
                            </div>
                        </a>
                        <div class="card-text w-100 mb-1">
                            <h3 class="text-color mt">${item.title}</h3>
                        </div>
                    </div>
                </div>
            `,
      )
      .join("");
  }

  function generateMatchResults(results) {
    return results
      .map(
        (result) => `
                <div class="card-text w-100">
                    <a href="#0" class="live-results flex space-between">
                        <div class="flex gap-5">
                            <span><i class="ri-${
                              result.icon === "medal"
                                ? "medal-2-fill"
                                : "live-dot"
                            }"></i></span>
                            <div class="batting-details flex"><span>${
                              result.text
                            }</span></div>
                        </div>
                        <span><i class="ri-arrow-right-s-line"></i></span>
                    </a>
                </div>
            `,
      )
      .join("");
  }

  const card = $("<div>").addClass("card coverage home-coverage");

  const cardHead = $("<div>").addClass("card-head");
  const heading = $("<div>")
    .addClass("heading")
    .append($("<h3>").text("Match Coverage"));
  const matchTabs = $("<div>").addClass("match-tabs flex");

  tabsData.forEach((tab, index) => {
    const tabElement = $("<div>")
      .addClass("match-tab" + (index === 0 ? " active" : ""))
      .attr("data-category", tab.category)
      .append(
        $("<div>").addClass("teams").text(tab.teams),
        $("<div>").addClass("details").text(tab.details),
      );
    matchTabs.append(tabElement);
  });

  cardHead.append(heading, matchTabs);

  const cardBodies = bodyContentData.map((body) => {
    return $("<div>")
      .addClass("card-body" + (body.active ? " active" : ""))
      .attr("data-category", body.category)
      .html(body.mainContent);
  });

  card.append(cardHead, ...cardBodies);

  $(".card.home-coverage").replaceWith(card);
}

// Home Page Gallery Images Loading

const images = [
  {
    url: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/405400/405428.jpg",
    alt: "Jordan Cox in Action",
    caption:
      "Jordan Cox continued his good form, Oval Invincibles vs London Spirit, Kia Oval, The Hundred men's competition, August 25, 2025",
    source: "© Getty Images",
  },
  {
    url: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/405400/405427.jpg",
    alt: "Jamie Overton clubs to the leg side",
    caption:
      "Jamie Overton clubs to the leg side, Oval Invincibles vs London Spirit, The Kia Oval, The Hundred men's competition, August 25, 2025",
    source: "© Getty Images",
  },
  {
    url: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/405400/405426.jpg",
    alt: "Tom Curran removed Jamie Smith",
    caption:
      "Tom Curran removed Jamie Smith, Oval Invincibles vs London Spirit, The Kia Oval, The Hundred men's competition, August 25, 2025",
    source: "© Getty Images",
  },
  {
    url: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/405400/405425.jpg",
    alt: "Construction at Fale Mosi-oa-Tunya International Cricket Stadium in full swing, August 25, 2025",
    caption:
      "Construction at Fale Mosi-oa-Tunya International Cricket Stadium in full swing, August 25, 2025",
    source: "© Zimbabwe Cricket",
  },
  {
    url: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/405400/405424.jpg",
    alt: "ZC's flagship Fale Mosi-oa-Tunya International Cricket Stadium",
    caption:
      "ZC's flagship Fale Mosi-oa-Tunya International Cricket Stadium is expected to be ready by August 2026, August 25, 2025",
    source: "© Zimbabwe Cricket",
  },
  {
    url: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/405400/405423.jpg",
    alt: "The progress at the Victoria Falls stadium, August 25, 2025",
    caption: "The progress at the Victoria Falls stadium, August 25, 2025",
    source: "© Zimbabwe Cricket",
  },
  {
    url: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/405400/405422.jpg",
    alt: "Sarah Glenn picked the key wicket of Lauren Winfield-Hill",
    caption:
      "Sarah Glenn picked the key wicket of Lauren Winfield-Hill, Oval Invincibles vs London Spirit, Women's Hundred, The Oval, August 25, 2025",
    source: "© Getty Images",
  },
  {
    url: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/405400/405410.jpg",
    alt: "Fans wait under umbrellas to save themselves from rain",
    caption:
      "Fans wait under umbrellas to save themselves from rain, St Lucia Kings vs Barbados Royals, CPL 2025, Gros Islet, August 24, 2025",
    source: "© Getty Images",
  },
  {
    url: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/405400/405409.jpg",
    alt: "Perth Scorchers Academy celebrate the T20 Top End title",
    caption:
      "Perth Scorchers Academy celebrate the T20 Top End title, Perth Scorchers Academy vs Adelaide Strikers Academy, Top End T20, Darwin, August 24, 2025",
    source: "© Getty Images",
  },
  {
    url: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/405400/405408.jpg",
    alt: "Joe Clarke struck 40 off 21",
    caption:
      "Joe Clarke struck 40 off 21, Manchester Originals vs Birmingham Phoenix, Emirates Old Trafford, The Hundred men's competition, August 24, 2025",
    source: "© Getty Images",
  },
];

const gridClasses = [
  "image-1",
  "image-2",
  "image-main main-photo",
  "image-3",
  "image-4",
  "image-large",
];

function loadGalleryImages() {
  const $imageGrid = $(".image-grid");
  $imageGrid.empty();

  images.forEach((image, index) => {
    const gridClass = gridClasses[index] || "";
    const isHidden = index >= 6 ? "hidden" : "";

    const imageCard = $("<div>")
      .addClass(`image-card ${gridClass} ${isHidden}`)
      .attr("data-caption", image.caption)
      .attr("data-source", image.source);

    const img = $("<img>").attr("src", image.url).attr("alt", image.alt);

    imageCard.append(img);
    $imageGrid.append(imageCard);
  });
}

// Home Page Top Stories Content Loaded

function loadDynamicTopStories() {
  const topStoriesData = [
    {
      imageUrl:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_160/lsci/db/PICTURES/CMS/410400/410422.6.jpg",
      altText: "Gill left out of India's T20 World Cup squad",
      title: "Gill left out of India's T20 World Cup squad",
      time: "16 mins ago",
      author: "ESPNcricinfo Staff",
      pageUrl: "",
    },
    {
      imageUrl:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_160/lsci/db/PICTURES/CMS/402400/402489.6.jpg",
      altText: "Australia to trial new combinations",
      title: "Australia to trial new combinations in T20 WC build-up",
      time: "14 hrs ago",
      author: "Alax Malcolm",
    },
    {
      imageUrl:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_160/lsci/db/PICTURES/CMS/383700/383721.6.jpg",
      altText: "UAE likely to host Afghanistan-Bangladesh T20Is in October",
      title: "UAE likely to host Afghanistan-Bangladesh T20Is in October",
      time: "1 hrs ago",
      author: "Mohammad Isam",
    },
    {
      imageUrl:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_160/lsci/db/PICTURES/CMS/403800/403885.6.jpg",
      altText: "Players want cut to 12 County Championship games",
      title: "Players want cut to 12 County Championship games",
      time: "15 hrs ago",
      author: "ESPNcricinfo staff",
    },
    {
      imageUrl:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_160/lsci/db/PICTURES/CMS/403700/403743.6.jpg",
      altText: "Eng vs Ind: India confront the curse of the break",
      title: "Eng vs Ind: India confront the curse of the break",
      time: "6 hrs ago",
      author: "Nagraj Gollapudi",
    },
    {
      imageUrl:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_160/lsci/db/PICTURES/CMS/403800/403851.6.jpg",
      altText: "Eng vs Ind: Rawal pulled up for 'avoidable physical contact'",
      title: "Eng vs Ind: Rawal pulled up for 'avoidable physical contact'",
      time: "Updated 2 hrs ago",
      author: "ESPNcricinfo staff",
    },
    {
      imageUrl:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_160/lsci/db/PICTURES/CMS/396500/396552.6.jpg",
      altText: "Phillips ruled out of Zimbabwe tour with groin injury",
      title: "Phillips ruled out of Zimbabwe tour with groin injury",
      time: "6 hrs ago",
      author: "ESPNcricinfo staff",
    },
    {
      imageUrl:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_1200,q_60/lsci/db/PICTURES/CMS/399400/399426.6.jpg",
      altText: "Pakistan to host SA for three women's ODIs in September",
      title: "Pakistan to host SA for three women's ODIs in September",
      time: "11 hrs ago",
      author: "ESPNcricinfo staff",
    },
  ];

  // Loop through the array and create card elements
  $.each(topStoriesData, function (index, card) {
    const $cardLink = $("<a>")
      .attr("href", "#0")
      .addClass("card-content flex ais gap-5");

    const $imageHolder = $("<div>").addClass("card-image-holder");
    const $imageDiv = $("<div>").addClass("card-image");
    const $image = $("<img>")
      .attr("src", card.imageUrl)
      .attr("alt", card.altText);

    $imageDiv.append($image);
    $imageHolder.append($imageDiv);

    const $cardText = $("<div>").addClass("card-text");
    const $textDiv = $("<div>").addClass("text");
    const $title = $("<h2>").addClass("font-small").text(card.title);

    $textDiv.append($title);

    const $indicator = $("<div>").addClass("flex gap-5 indicator");
    const $time = $("<span>").addClass("time dot").text(card.time);
    const $author = $("<span>").text(card.author);

    $indicator.append($time, $author);
    $cardText.append($textDiv, $indicator);
    $cardLink.append($imageHolder, $cardText);

    $(".homepage .top-stories .card-body").append($cardLink);
  });
}

// Home Page Trending Players Content Loaded

function loadDynamicTrendingPlayers() {
  const trendingPlayersData = [
    {
      name: "Virat Kohli",
      url: "#0",
    },
    {
      name: "Tim Robinson",
      url: "#0",
    },
    {
      name: "Jasprit Bumrah",
      url: "#0",
    },
    {
      name: "Mahdi Hassan",
      url: "#0",
    },
    {
      name: "Ravindra Jadeja",
      url: "#0",
    },
    {
      name: "Joe Root",
      url: "#0",
    },
    {
      name: "Hasan Ali",
      url: "./cricketers/hasan-ali.html",
    },
    {
      name: "Andre Russell",
      url: "#0",
    },
    {
      name: "Tanzid Hassan",
      url: "#0",
    },
    {
      name: "Mitchell Starc",
      url: "#0",
    },
    {
      name: "Shakib Ul Hassan",
      url: "#0",
    },
  ];
  $.each(trendingPlayersData, function (index, player) {
    const $playerLink = $("<a>")
      .attr("href", `${player.url}`)
      .addClass("text-color flex gap-1 rounded-box");

    const $playerName = $("<span>").text(player.name);
    const $arrowIcon = $("<span>").html(
      '<i class="ri-arrow-right-s-line"></i>',
    );

    $playerLink.append($playerName, $arrowIcon);
    $(".trending-players .card-content").append($playerLink);
  });
}

// Home Page Indepth Current News Content Loaded

function loadCurrentNews() {
  var newsContent = [
    {
      image:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_320/esci/media/motion/2025/0710/dm_250710_New_CenturySoFar_Rauf/dm_250710_New_CenturySoFar_Rauf.jpg",
      alt: "Haris Rauf make his choices",
      duration: "3:26",
      heading: "Haris Rauf make his choices",
      category: "Pakistan News",
      links: [
        { text: "WWC build-up: Pak to host SA", href: "#0" },
        { text: "Shakeel to lead Shaheens", href: "#0" },
        { text: "Another PCB domestic overhaul", href: "#0" },
        { text: "Babar to keep wicket in T20Is?", href: "#0" },
        { text: "Azhar is acting Test head coach", href: "#0" },
      ],
      tabLinks: [
        [
          { text: "No category A contracts for Pakistan players", href: "#0" },
          { text: "Pak-W receive 50% increase in retainers", href: "#0" },
          { text: "Babar, Rizwan out of Asia Cup squad", href: "#0" },
          { text: "Haider arrested and granted bail", href: "#0" },
          { text: "Asia Cup: Ind vs Pak on Sept 14", href: "#0" },
        ],
      ],
    },
    {
      image:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_320/esci/media/motion/2025/0707/dm_250707_AnilKumble_TC_LegSpinClip/dm_250707_AnilKumble_TC_LegSpinClip.jpg",
      alt: "Why Kumble chose legspin",
      duration: "3:26",
      heading: "Why Kumble chose legspin",
      category: "Talking Cricket",
      links: [
        { text: "Kumble on the decline of wristspin", href: "#0" },
        { text: "Podcast: All about wristspin", href: "#0" },
        {
          text: "'I couldn't even lift my hand'",
          href: "#0",
          icon: "ri-play-circle-line",
        },
        {
          text: "'Spin has become a thing used only in the subcontinent'",
          href: "#0",
          icon: "ri-play-circle-line",
        },
      ],
    },
    {
      image:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_320/lsci/db/PICTURES/CMS/355900/355920.6.jpg",
      alt: "'Please, 3-0!' - Goswami to India",
      category: "The buzz",
      links: [
        { text: "'Please, 3-0!' - Goswami to India", href: "#0" },
        { text: "What's on the Lord's lunch menu?", href: "#0" },
        { text: "The coolest elevator entrance?", href: "#0" },
        { text: "England-India banter from Lord's", href: "#0" },
        { text: "Read more Buzz here", href: "#0", bold: true },
      ],
    },
  ];

  var $container = $(".in-depth .card-body.current-news");
  $container.empty();

  $.each(newsContent, function (index, item) {
    var cardHtml = '<div class="card-content">';
    cardHtml += '<a href="#0" class="card-image-holder">';
    cardHtml += '<div class="card-image">';
    cardHtml += '<img src="' + item.image + '" alt="' + item.alt + '" />';
    if (item.duration) {
      cardHtml += '<div class="duration">' + item.duration + "</div>";
      cardHtml += '<div class="icon icon-play flex justify-center">';
      cardHtml += '<span><i class="ri-play-large-fill"></i></span>';
      cardHtml += "</div>";
    }
    if (item.heading) {
      cardHtml += '<div class="short-heading">' + item.heading + "</div>";
    }
    cardHtml += "</div>";
    cardHtml += "</a>";

    cardHtml += '<div class="card-text">';
    cardHtml += '<div class="category">';
    cardHtml += '<a href="#0" class="text">';
    cardHtml += '<p class="uppercase mt">' + item.category + "</p>";
    cardHtml += "</a>";
    cardHtml += "</div>";

    if (item.tabLinks) {
      cardHtml += '<div class="tab-group">';
      cardHtml += '<div class="tab-list active" data-list="tab1-list">';
      $.each(item.links, function (linkIndex, link) {
        cardHtml += '<a href="' + link.href + '" class="flex">';
        cardHtml += '<span><i class="ri-arrow-right-s-line"></i></span>';
        cardHtml += '<span class="hover">' + link.text + "</span>";
        cardHtml += "</a>";
      });
      cardHtml += "</div>";

      cardHtml += '<div class="tab-list" data-list="tab2-list">';
      $.each(item.tabLinks[0], function (tabIndex, tabLink) {
        cardHtml += '<a href="' + tabLink.href + '" class="flex">';
        cardHtml += '<span><i class="ri-arrow-right-s-line"></i></span>';
        cardHtml += '<span class="hover">' + tabLink.text + "</span>";
        cardHtml += "</a>";
      });
      cardHtml += "</div>";

      cardHtml += '<div class="nav-btns flex justify-center mt-1">';
      cardHtml +=
        '<div class="tab icon flex justify-center active" data-list="tab1-list">';
      cardHtml += "<span>1</span>";
      cardHtml += "</div>";
      cardHtml +=
        '<div class="tab icon flex justify-center" data-list="tab2-list">';
      cardHtml += "<span>2</span>";
      cardHtml += "</div>";
      cardHtml += "</div>";
      cardHtml += "</div>";
    } else {
      $.each(item.links, function (linkIndex, link) {
        cardHtml += '<a href="' + link.href + '" class="flex">';
        cardHtml +=
          '<span><i class="' +
          (link.icon || "ri-arrow-right-s-line") +
          '"></i></span>';
        cardHtml +=
          '<span class="hover' +
          (link.bold ? " bold" : "") +
          '">' +
          link.text +
          "</span>";
        cardHtml += "</a>";
      });
    }

    cardHtml += "</div></div>";

    $container.append(cardHtml);
  });
}

// Home Page Key Series Content Loaded

function loadKeySeriesContent() {
  const seriesData = [
    "GSL 2025",
    "MAX60 Caribbean 2025",
    "Bangladesh vs Pakistan",
    "Zimbabwe vs New Zealand",
    "Zimbabwe Twenty20 Tri-Series",
    "Zimbabwe vs South Africa",
    "ENG Women vs IND Women",
    "MLC 2025",
    "Mitchell Starc",
    "West Indies vs Australia",
    "England vs India",
    "Sri Lanka vs Bangladesh",
    "County Division 2",
    "County Division 1",
    "Vitality Blast Women",
    "Vitality Blast Men",
    "ENG Under-19s vs IND Under-19s",
    "Women's Championship",
    "ICC World Test Championship, 2025-2027",
  ];

  const $currentKeySeries = $(".key-series .card-body .current-key-series");
  $currentKeySeries.empty();
  $.each(seriesData, function (index, seriesName) {
    const seriesItem = `
            <a href="#0" class="text-color flex gap-1 rounded-box">
                <span>${seriesName}</span>
                <span><i class="ri-arrow-right-s-line"></i></span>
            </a>
        `;
    $currentKeySeries.append(seriesItem);
  });
}

// Share html loaded

function loadShareElement(containerSelector, options = {}) {
  const defaults = {
    copyText: "Copy Comment",
    twitterText: "Twitter",
    emailText: "Email",
    iconClass: "ri-share-line",
  };

  const settings = { ...defaults, ...options };

  $(containerSelector).append(`
        <div class="bowlers flex space-between w-100">
            <i class="${settings.iconClass}"></i>
        </div>
        <div class="dropdown">
            <div class="dropdown-content">
                <div class="dropdown-section">
                    <div class="dropdown-column">
                        <a href="#0" class="dropdown-item flex">
                            <span class="flex gap-0">
                                <i class="ri-file-copy-line"></i>
                                <span>${settings.copyText}</span>
                            </span>
                        </a>
                        <a href="#0" class="dropdown-item flex">
                            <span class="flex gap-0">
                                <i class="ri-twitter-x-line"></i>
                                <span>${settings.twitterText}</span>
                            </span>
                        </a>
                        <a href="#0" class="dropdown-item flex">
                            <span class="flex gap-0">
                                <i class="ri-mail-line"></i>
                                <span>${settings.emailText}</span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `);
}

$(document).ready(function () {
  generateMatchCards();
  loadCoverageContent();
  loadGalleryImages();
  loadDynamicTopStories();
  loadDynamicTrendingPlayers();
  loadCurrentNews();
  loadKeySeriesContent();
  loadShareElement(".full-commantary .share-commentary.bowlers-dropdown");
  loadShareElement(".commentary-short .share-commentary.bowlers-dropdown");
});
