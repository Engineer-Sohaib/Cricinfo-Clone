if (typeof Chart !== "undefined" && Chart.defaults) {
  Chart.defaults.color = textColor;
  Chart.defaults.borderColor = borderColor;
}

const chartDataRegistry = {
  "nz-vs-sa": {
    teams: {
      team1: "nz",
      team2: "sa",
      team1Name: "New Zealand",
      team2Name: "South Africa",
    },
    manhattan: {
      nz: [11, 11, 5, 8, 7, 1, 13, 8, 5, 5, 4, 10, 3, 12, 7, 13, 7, 15, 9, 19],
      sa: [9, 8, 13, 5, 2, 13, 5, 6, 10, 5, 9, 16, 10, 4, 10, 11, 7, 5, 4],
    },
    runRate: {
      nz: [
        0, 9, 10, 9.33, 10.25, 9.6, 8.5, 9.29, 9.13, 9.3, 8.7, 8.73, 9.75, 9.38,
        9.07, 8.88, 8.71, 8.53, 8.17, 8.05, 8.85,
      ],
      sa: [
        0, 8, 8, 9.67, 9, 7.2, 8.17, 7.57, 7.13, 6.78, 7.2, 7, 7.17, 6.92, 6.57,
        6.69, 6.76, 6.82, 6.67, 6.7, 6.85,
      ],
    },
    worm: {
      nz: [
        0, 9, 20, 28, 41, 48, 49, 62, 70, 80, 84, 93, 109, 116, 123, 130, 137,
        144, 150, 157, 176,
      ],
      sa: [
        0, 8, 16, 29, 37, 39, 52, 57, 62, 68, 78, 82, 89, 94, 98, 105, 112, 119,
        123, 130, 137,
      ],
    },
    wickets: {
      1.5: {
        batsman: "Tim Seifert",
        dismissal: "c Muthusamy b Ngidi",
        score: "22 (16b 4x4 0x6)",
        details:
          "full ball on off. Slogs to the leg side, loses one hand off the bat while playing it, and that's been miscued to deep square leg. Muthusamy gets under it.",
        team: "nz",
        overIndex: 1,
      },
      2.5: {
        batsman: "Devon Conway",
        dismissal: "c † Pretorius b Maphaka",
        score: "9 (7b 2x4 0x6)",
        details:
          "short ball outside off. Tries to pull, and top-edged! Goes up and the keeper gets under it to take a simple one",
        team: "nz",
        overIndex: 2,
      },
      3.6: {
        batsman: "Daryl Mitchell",
        dismissal: "c Maphaka b Coetzee",
        score: "5 (5b 0x4 0x6)",
        details:
          "short of good length ball just outside off. Tries to pull but top edged to deep square leg! Outfielder runs in and dives forward to complete the catch.",
        team: "nz",
        overIndex: 3,
      },
      7.4: {
        batsman: "Mitchell Hay",
        dismissal: "lbw b Muthusamy",
        score: "2 (3b 0x4 0x6)",
        details:
          "trapped lbw? Umpire has a long think before raising his finger. First T20I wicket for Muthusamy as this flat length ball skids into the batter's pads and beats his back-foot defense.",
        team: "nz",
        overIndex: 7,
      },
      8.6: {
        batsman: "James Neesham",
        dismissal: "c Bosch b Maphaka",
        score: "0 (2b 0x4 0x6)",
        details:
          "back of a length ball outside off. Neesham stands tall and tries to pull a six over the stands, but all he can get is the elevation, not the distance. Deep square leg does the rest.",
        team: "nz",
        overIndex: 8,
      },
      3: {
        batsman: "Lhuan-dre Pretorius",
        dismissal: "c † Seifert b Henry",
        score: "27 (17b 6x4 0x6)",
        details:
          "Guided to the keeper! The experienced man has his say. Good length ball angling away from Lhuan-dre. He tries to play a cute guided shot towards short third but instead helps it into the keeper's gloves. The off-cutter has done the trick",
        team: "sa",
        overIndex: 3,
      },
      4: {
        batsman: "Rubin Hermann",
        dismissal: "c Henry b Duffy",
        score: "1 (5b 0x4 0x6)",
        details:
          "Short and quick. Hermann tries to pull but it hits him high up on the bat. Simple catch for midwicket. This tactic worked for SA, and now NZ are using it too!",
        team: "sa",
        overIndex: 4,
      },
      6: {
        batsman: "Reeza Hendricks",
        dismissal: "b Santner",
        score: "16 (12b 2x4 0x6)",
        details:
          "Stumps rattled! You miss, I hit stuff as Santner goes stumps to stumps. Lands on a good length, skids into middle and leg stump. Hendricks in no position to play any shot after goes deep in his crease",
        team: "sa",
        overIndex: 6,
      },
      7: {
        batsman: "Senuran Muthusamy",
        dismissal: "b Sodhi",
        score: "7 (9b 1x4 0x6)",
        details:
          "Middle stump gone! Sodhi with one that goes straight. Muthusamy made room, exposed all his stumps, thinking he would go inside out. But the ball lands around the leg stump and the delivery skids into middle stump.",
        team: "sa",
        overIndex: 7,
      },
      8: {
        batsman: "Rassie van der Dussen",
        dismissal: "run out († Seifert/Santner)",
        score: "6 (8b 0x4 0x6)",
        details:
          "full ball on middle. Tentatively nurdles it to the leg side and he's having to run because the non-striker Brevis has called for a single. Keeper runs to his left and has a throw towards Santner at the bowler's end. But the throw is not near the stumps and Santner has to do a rebound throw while being on the floor away from the stumps. However, van der Dussen is still struggling, and that means Santner's rebound direct-hit throw is good enough! NZ didn't think that was a wicket, but they're ecstatic after seeing the replay.",
        team: "sa",
        overIndex: 8,
      },
      11: {
        batsman: "Dewald Brevis",
        dismissal: "c Mitchell b Henry",
        score: "35 (18b 1x4 3x6)",
        details:
          "holes out! Brevis tries to swat another shot over the leg side, but this good-length ball has some pace taken off. Miscued, mistimed, and down long on's throat!",
        team: "sa",
        overIndex: 11,
      },
      13: {
        batsman: "Corbin Bosch",
        dismissal: "lbw b Sodhi",
        score: "8 (4b 0x4 1x6)",
        details:
          "full ball on middle. Goes for a reverse sweep but he's beaten by the lack of pace. Through the shot too early. Ball hits him on the body, and the umpire raises his fingers up in a flash. LBW! Only question was whether that googly would turn too much and miss leg stump, but NZ and the umpire sure don't think so.",
        team: "sa",
        overIndex: 13,
      },
      17.4: {
        batsman: "George Linde",
        dismissal: "c Conway b Duffy",
        score: "30 (20b 1x4 2x6)",
        details:
          "short of good length on off. Linde shapes up to pull. Good timing, but it's the longer side, and he has holed out at deep square leg!",
        team: "sa",
        overIndex: 17,
      },
      17.5: {
        batsman: "Kwena Maphaka",
        dismissal: "c Santner b Duffy",
        score: "0 (1b 0x4 0x6)",
        details:
          "Straight to cover! Santner takes that! And Duffy is on a hat-trick. Full ball outside off and the ball was there in the slot to drive. But the fielder smartly took it. The umpires want to have a look at the front-foot though. Is it a no-ball? Very tight. Given out.",
        team: "sa",
        overIndex: 17,
      },
      18: {
        batsman: "Gerald Coetzee",
        dismissal: "c Neesham b Henry",
        score: "17 (16b 2x4 0x6)",
        details:
          "Neesham takes a diving catch and New Zealand have won by 21 runs! Pace taken off, full and wide, Coetzee tries for another across-the-line slog, and this time the ball has popped up. Nobody is at midwicket but Neesham runs in and takes the catch while tumbling.",
        team: "sa",
        overIndex: 18,
      },
    },
  },
  "sa-vs-aus": {
    teams: {
      team1: "sa",
      team2: "aus",
      team1Name: "South Africa",
      team2Name: "Australia",
    },
    manhattan: {
      sa: [
        5, 6, 6, 14, 3, 5, 5, 6, 9, 6, 17, 4, 17, 4, 0, 3, 13, 4, 7, 1, 8, 9, 1,
      ],
      aus: [
        10, 12, 9, 4, 18, 7, 2, 7, 7, 2, 6, 10, 2, 11, 3, 7, 13, 2, 6, 5, 7, 8,
        13, 3, 4, 9, 4, 4, 10, 10, 4, 0, 21, 6, 8, 0, 20, 15, 12, 9, 11, 12, 20,
        5, 24, 6, 17, 7, 16, 8,
      ],
    },
    runRate: {
      sa: [
        0, 5.0, 5.5, 5.66, 7.75, 6.8, 6.5, 6.28, 6.25, 6.55, 6.5, 7.45, 7.16,
        7.92, 7.64, 7.13,6.87,7.43,7.05,7.09,6.76,6.80,6.90,6.65
      ],
      aus: [
        0, 10.0, 10.5, 10.33, 8.75, 10.2, 9.33, 8.14, 8.12, 8.33, 7.8, 7.72,
        8.08, 7.69, 8.07, 7.6, 7.56, 7.82, 7.55, 7.47, 7.4, 7.33, 7.36, 7.43,
        7.37, 7.32, 7.34, 7.29, 7.28, 7.44, 7.5, 7.41, 7.25, 7.48, 7.41, 7.44,
        7.36, 7.54, 7.63, 7.71, 7.7, 7.78, 7.85, 8.04, 8.02, 8.31, 8.32, 8.48,
        8.47, 8.61, 8.62,
      ],
    },
    worm: {
      sa: [0, 11, 31, 39, 45, 57, 60, 67, 71, 78, 81, 88,92,102,115,135,141,148,150,151,152,154,155],
      aus: [
        0, 22, 55, 73, 82, 92, 95, 100, 103, 111, 119, 123, 134, 141, 143, 155,
        159, 162, 172, 174, 181, 182, 189, 190, 192, 199, 200, 201, 210, 222,
        231, 242, 250, 285, 320, 332, 334, 344, 355, 363, 388, 399, 412, 419,
        423, 425, 429, 430, 432,
      ],
    },
    wickets: {
      1.6: {
        batsman: "Aiden Markram",
        dismissal: "c Green b Abbott",
        score: "2 (8b 0x4 0x6)",
        details:
          "edged, taken at second slip! Good length outside off, Markram goes to drive, flies to Green's right. Neat catch, nice bowling",
        team: "sa",
        overIndex: 1,
      },
      4.2: {
        batsman: "Ryan Rickelton",
        dismissal: "c Connolly b Bartlett",
        score: "11 (12b 2x4 0x6)",
        details:
          "clipped to midwicket! Bit of a gift. On the pads, Rickelton tries to send it through the leg side but can only find Connolly in front of square",
        team: "sa",
        overIndex: 4,
      },
      5.5: {
        batsman: "Temba Bavuma",
        dismissal: "b Abbott",
        score: "19 (10b 4x4 0x6)",
        details:
          "dragged on! Bavuma advancing down the pitch to a short-of-a-length delivery, swipes across the line and sends it into the stumps",
        team: "sa",
        overIndex: 5,
      },
      8.1: {
        batsman: "Tristan Stubbs",
        dismissal: "c Abbott b Bartlett",
        score: "1 (6b 0x4 0x6)",
        details:
          "taken at cover! Stubbs using his feet, looks to drive through the off side, can't find a gap as Abbott moves swiftly to his right",
        team: "sa",
        overIndex: 8,
      },
      13.3: {
        batsman: "Tony de Zorzi",
        dismissal: "Tony de Zorzi c Carey b Connolly",
        score: "33 (30b 6x4 0x6 45m) ",
        details:
          "finds deep midwicket! That's strangled. Dropped short, de Zorzi pulls, comes from low down on the bat, comfortably catch for Carey",
        team: "sa",
        overIndex: 13,
      },
      17.2: {
        batsman: "Dewald Brevis",
        dismissal: "Dewald Brevis c Green b Connolly",
        score: " 49 (28b 2x4 5x6 44m)",
        details:
          "holes out to long-off! He can't clear Green! Tossed up on off, probably not quite the length to get under, got a little close to it trying to step hit and slices it to Green at long-off",
        team: "sa",
        overIndex: 17,
      },
      19.2: {
        batsman: "Wiaan Mulder",
        dismissal: "Wiaan Mulder c Labuschagne b Connolly",
        score: " 5 (12b 0x4 0x6 29m)",
        details:
          "sensational catch from Labuschagne at long-on! Earns his match payment with that and then some! Mulder tries to launch but drags it flat towards long-on, Labuschagne has to sprint in and dive full length forward to pluck it centimetres from the turf. The TV umpire has a long look from every angle but it looks clean. Wonderful catch",
        team: "sa",
        overIndex: 19,
      },
      21.3: {
        batsman: "Corbin Bosch",
        dismissal: "Corbin Bosch c Labuschagne b Connolly 17",
        score: " (15b 2x4 0x6 19m)",
        details:
          "another beauty from Labuschagne at long-on! Four for Connolly! Tossed up on middle, he launches to long-on, Labuschagne leaps up at full stretch on the rope and makes a tough catch look very easy. He knew exactly where the rope was and was never off balance. Brilliant outfielding",
        team: "sa",
        overIndex: 21,
      },
      34.1: {
        batsman: "Travis Head",
        dismissal: "c Brevis b Maharaj",
        score: "142 (103b 17x4 5x6)",
        details:
          "taken at long-off! Head's fun is over. Round the wicket, he advances down the pitch, looks to send another into the crowd, doesn't quite get the distance this time and it's safely held. A standing ovation for Head is he walks off",
        team: "aus",
        overIndex: 34,
      },
      36.3: {
        batsman: "Mitchell Marsh",
        dismissal: "c † Rickelton b Muthusamy",
        score: "100 (106b 6x4 5x6)",
        details:
          "top edge straight up and Rickelton runs from behind the stumps to take it! Marsh has blown a huge score. Full, drifting outside leg, he's down to slog sweep it out of the ground and gets a top edge that flies to the square leg umpire and Rickelton does well to get across and take the catch",
        team: "aus",
        overIndex: 36,
      },
    },
  },
  "afg-vs-pak": {
    teams: {
      team1: "afg",
      team2: "pak",
      team1Name: "Afghanistan",
      team2Name: "Pakistan",
    },
    manhattan: {
      afg: [5, 6, 6, 6, 15, 12, 10, 8, 6, 11, 8, 0, 1, 3, 2, 9, 14, 19, 2],
      pak: [
        12, 6, 14, 3, 13, 6, 2, 7, 4, 9, 7, 12, 17, 5, 14, 6, 10, 9, 10, 16,
      ],
    },
    runRate: {
      afg: [
        0, 5, 5.5, 5.66, 5.75, 7.6, 8.33, 8.57, 8.5, 8.22, 8.5, 8.45, 7.75,
        7.23, 6.92, 6.6, 6.75, 7.17, 7.83, 7.52,
      ],
      pak: [
        0, 12, 9, 10.66, 8.75, 9.6, 9.0, 8.0, 7.87, 7.44, 7.6, 7.54, 7.91, 8.61,
        8.35, 8.73, 8.56, 8.64, 8.66, 8.73, 9.1,
      ],
    },
    worm: {
      afg: [
        0, 5, 17, 25, 32, 38, 45, 52, 68, 75, 82, 93, 93, 95, 97, 105, 115, 125,
        141, 141, 143,
      ],
      pak: [
        0, 8, 26, 35, 42, 48, 55, 63, 70, 75, 80, 83, 95, 110, 125, 136, 145,
        155, 162, 167, 182,
      ],
    },
    wickets: {
      2.6: {
        batsman: "Ibrahim Zadran",
        dismissal: "b Shaheen Shah Afridi",
        score: "9 (11b 2x4 0x6)",
        details:
          "middle stump knocked back, and that is vintage Shaheen Shah Afridi! Into the blockhole and swinging in devilishly. Ibrahim does not track the swing and does not quite read the length either",
        team: "afg",
        overIndex: 2,
      },
      7.6: {
        batsman: "Rahmanullah Gurbaz",
        dismissal: "b Mohammad Nawaz",
        score: "38 (27b 3x4 1x6)",
        details:
          "bowled'im round his legs, and Nawaz is over the moon! Fired in very full on middle stump. Gurbaz shows his hand too early and moves across. Cannot access the ball, mostly because the ball is very full",
        team: "afg",
        overIndex: 7,
      },
      11.3: {
        batsman: "Sediqullah Atal",
        dismissal: "c Shaheen Shah Afridi b Haris Rauf",
        score: "23 (19b 0x4 2x6)",
        details:
          "does him all ends up, and Rauf breaks this game open! Yet another slower ball on a length outside off, and Atal does not pick this either. Deceived totally and reaching out",
        team: "afg",
        overIndex: 11,
      },
      11.6: {
        batsman: "Karim Janat",
        dismissal: "c Hasan Nawaz b Haris Rauf",
        score: "0 (3b 0x4 0x6)",
        details:
          "smashed straight to deep square leg! On a fullish length on middle and off. Janat whips it away. Hits it well, but also hits it flat to Hasan Nawaz",
        team: "afg",
        overIndex: 11,
      },
      12.1: {
        batsman: "Darwish Rasooli",
        dismissal: "c & b Sufiyan Muqeem",
        score: "21 (13b 1x4 1x6)",
        details:
          "what a catch that is, and Pakistan are going for the jugular now! Floated up full just outside off. Rasooli's eyes light up and he plants his front foot to blast it down the ground",
        team: "afg",
        overIndex: 12,
      },
      13.3: {
        batsman: "Azmatullah Omarzai",
        dismissal: "st † Mohammad Haris b Mohammad Nawaz",
        score: "0 (5b 0x4 0x6)",
        details:
          "stumped by a country mile, and Afghanistan are imploding! Pulls the length back outside off and gives this plenty of revs. Omarzai is nowhere close to the ball",
        team: "afg",
        overIndex: 13,
      },
      14.1: {
        batsman: "Mohammad Nabi",
        dismissal: "c Faheem Ashraf b Sufiyan Muqeem",
        score: "3 (6b 0x4 0x6)",
        details:
          "holes out to long off, and Muqeem has two! Dangles the carrot outside off and Nabi bites. Arrows it flat towards Faheem at long off, who takes it over his head",
        team: "afg",
        overIndex: 14,
      },
      17.6: {
        batsman: "Rashid Khan",
        dismissal: "c Hasan Nawaz b Haris Rauf",
        score: "39 (16b 1x4 5x6)",
        details:
          "Rauf gets the better of Rashid, and that might be the game! Rauf takes all the pace off and makes Rashid fetch it. Shanks it straight to deep backward square leg",
        team: "afg",
        overIndex: 17,
      },
      19.1: {
        batsman: "Mujeeb Ur Rahman",
        dismissal: "b Shaheen Shah Afridi",
        score: "4 (9b 0x4 0x6)",
        details:
          "stumps shattered, and Shaheen has his second! Slanted in on a length just outside off. The ball keeps coming back in with the angle and Mujeeb gets an inside edge",
        team: "afg",
        overIndex: 19,
      },
      2.3: {
        batsman: "Sahibzada Farhan",
        dismissal: "c Mujeeb Ur Rahman b Azmatullah Omarzai",
        score: "21 (10b 1x4 2x6)",
        details:
          "oh, what have you done, Farhan?! Leg-stump half-volley and Farhan could have hit that anywhere. Instead, he tries to glance it fine and finds Mujeeb at short fine leg",
        team: "pak",
        overIndex: 2,
      },
      6.5: {
        batsman: "Saim Ayub",
        dismissal: "c Fareed Ahmad b Rashid Khan",
        score: "14 (16b 2x4 0x6)",
        details:
          "holes out to sweeper cover, and Rashid is the man again for Afghanistan! Seems like a top-spinner. Ayub backs away, trying to go inside out but slices it straight down Fareed's throat",
        team: "pak",
        overIndex: 6,
      },
      7.3: {
        batsman: "Fakhar Zaman",
        dismissal: "c Ibrahim Zadran b Mohammad Nabi",
        score: "20 (17b 1x4 1x6)",
        details:
          "no luck this time for Fakhar, and Nabi has the last laugh! Fired in quicker and flatter on middle and leg. Fakhar arrows it straight to Ibrahim Zadran at long on",
        team: "pak",
        overIndex: 7,
      },
      11.1: {
        batsman: "Hasan Nawaz",
        dismissal: "c Sediqullah Atal b Fareed Ahmad",
        score: "9 (13b 1x4 0x6)",
        details:
          "touches the moon and comes down, and into Atal's palms! Back of a length just outside off. Gets it off the bottom half of the bat. Atal settles under it at long on",
        team: "pak",
        overIndex: 11,
      },
      15.4: {
        batsman: "Mohammad Nawaz",
        dismissal: "c Darwish Rasooli b Mujeeb Ur Rahman",
        score: "21 (11b 1x4 2x6)",
        details:
          "catch it is the cry, and that is exactly what Rasooli does! Zipped in on a back of a length on the stumps. Nawaz tugs at it and does not muster the power he wants",
        team: "pak",
        overIndex: 15,
      },
      19.2: {
        batsman: "Mohammad Haris",
        dismissal: "c Sediqullah Atal b Fareed Ahmad",
        score: "15 (13b 1x4 0x6)",
        details:
          "skied, and taken at deep mid wicket! Hard length on middle and leg. Does not come to grips with the slower one. Atal settles under it at deep mid wicket",
        team: "pak",
        overIndex: 19,
      },
      19.4: {
        batsman: "Faheem Ashraf",
        dismissal:
          "run out (Mujeeb Ur Rahman/† Rahmanullah Gurbaz/Fareed Ahmad)",
        score: "14 (5b 1x4 1x6)",
        details:
          "chaos all over, and a run-out to finish the innings! Off-pace and into the track on middle and leg. Faheem winds up and heaves it towards deep square leg",
        team: "pak",
        overIndex: 19,
      },
    },
  },
};

function getTeamColors(teamCode) {
  const colorMap = {
    nz: themeColor,
    sa: dangerColor,
    aus: themeColor,
    afg: dangerColor,
    pak: themeColor,
  };
  return colorMap[teamCode] || themeColor;
}

function generateOversArray(maxOvers) {
  return Array.from({ length: maxOvers + 1 }, (_, i) => i);
}

function getWicketPointStyles(overs, wicketsByOver, team) {
  return overs.map((over, index) => {
    const hasWicket = Object.values(wicketsByOver).some(
      (w) => w.overIndex === index && w.team === team
    );
    return hasWicket;
  });
}

function formatWicketTooltip(wicket, maxLineLength = 40) {
  if (!wicket) return [];

  const details = wicket.details;
  const words = details.split(" ");
  let lines = [];
  let currentLine = "";

  words.forEach((word) => {
    if ((currentLine + word).length > maxLineLength && currentLine.length > 0) {
      lines.push(currentLine.trim());
      currentLine = word + " ";
    } else {
      currentLine += word + " ";
    }
  });

  if (currentLine.trim().length > 0) {
    lines.push(currentLine.trim());
  }

  return [
    "",
    `WICKET: ${wicket.batsman}`,
    `${wicket.dismissal}`,
    `${wicket.score}`,
    "",
    ...lines,
  ];
}

function getCommonTooltipConfig() {
  return {
    backgroundColor: cardBg,
    titleColor: textColor,
    bodyColor: textColor,
    borderColor: borderColor,
    borderWidth: 1,
    cornerRadius: 8,
    displayColors: false,
    bodyFont: { size: 10 },
    titleFont: { size: 12, weight: "bold" },
    padding: 8,
    maxWidth: 400,
    wrap: true,
  };
}

function createManhattanChart(selector, matchId) {
  const element = document.querySelector(selector);
  if (!element) return null;

  const data = chartDataRegistry[matchId];
  if (!data || !data.manhattan) return null;

  const overs = generateOversArray(
    Math.max(
      data.manhattan[data.teams.team1].length,
      data.manhattan[data.teams.team2].length
    )
  );

  const ctx = element.getContext("2d");
  
  // Store dot positions for hover detection
  let dotPositions = [];
  
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: overs.slice(1),
      datasets: [
        {
          label: data.teams.team1Name,
          data: data.manhattan[data.teams.team1],
          backgroundColor: getTeamColors(data.teams.team1),
          borderColor: getTeamColors(data.teams.team1),
          borderWidth: 1,
        },
        {
          label: data.teams.team2Name,
          data: data.manhattan[data.teams.team2],
          backgroundColor: getTeamColors(data.teams.team2),
          borderColor: getTeamColors(data.teams.team2),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      onHover: (event, elements) => {
        const points = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
        
        // Check if hovering over a dot
        const canvasPosition = Chart.helpers.getRelativePosition(event, chart);
        const hoveredDot = dotPositions.find(dot => {
          const distance = Math.sqrt(
            Math.pow(canvasPosition.x - dot.x, 2) + 
            Math.pow(canvasPosition.y - dot.y, 2)
          );
          return distance <= 8; // Hover radius slightly larger than dot
        });
        
        if (hoveredDot) {
          // Show custom tooltip for dot
          chart.tooltip.setActiveElements([{
            datasetIndex: hoveredDot.datasetIndex,
            index: hoveredDot.overIndex
          }]);
          chart.tooltip.update(true);
          chart.tooltip.draw();
          ctx.canvas.style.cursor = "pointer";
        } else if (elements.length > 0) {
          // Regular bar hover
          ctx.canvas.style.cursor = "pointer";
        } else {
          // No hover
          chart.tooltip.setActiveElements([]);
          chart.tooltip.update(true);
          ctx.canvas.style.cursor = "default";
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          ...getCommonTooltipConfig(),
          callbacks: {
            title: (context) => `Over ${context[0].label}`,
            label: (context) => `${context.dataset.label}: ${context.raw} runs`,
            afterBody: (context) => {
              const overNumber = context[0].dataIndex;
              const datasetIndex = context[0].datasetIndex;
              const team =
                datasetIndex === 0 ? data.teams.team1 : data.teams.team2;

              const wickets = Object.values(data.wickets || {}).filter(
                (w) => w.overIndex === overNumber && w.team === team
              );

              return wickets.flatMap((wicket) =>
                formatWicketTooltip(wicket, 50)
              );
            },
          },
        },
      },
      scales: {
        x: {
          title: { display: true, text: "OVERS", color: textColor },
          grid: { color: "transparent" },
        },
        y: {
          title: { display: true, text: "RUNS PER OVER", color: textColor },
          grid: { color: borderColor },
        },
      },
    },
    plugins: [
      {
        id: "wicketDots",
        afterDatasetsDraw(chart) {
          const ctx = chart.ctx;
          dotPositions = []; // Reset dot positions
          
          chart.data.datasets.forEach((dataset, datasetIndex) => {
            const meta = chart.getDatasetMeta(datasetIndex);
            const team =
              datasetIndex === 0 ? data.teams.team1 : data.teams.team2;
            const dotColor = getTeamColors(team);

            const wicketsByOverIndex = {};
            Object.values(data.wickets || {}).forEach((w) => {
              if (w.team === team) {
                if (!wicketsByOverIndex[w.overIndex]) {
                  wicketsByOverIndex[w.overIndex] = [];
                }
                wicketsByOverIndex[w.overIndex].push(w);
              }
            });

            meta.data.forEach((bar, index) => {
              const wickets = wicketsByOverIndex[index];
              if (wickets && wickets.length > 0) {
                const dotSpacing = 15;
                const startY =
                  bar.y - ((wickets.length - 0) * dotSpacing) / 1.3;

                wickets.forEach((wicket, wicketIndex) => {
                  const x = bar.x;
                  const y = startY + wicketIndex * dotSpacing;

                  // Store dot position for hover detection
                  dotPositions.push({
                    x: x,
                    y: y,
                    overIndex: index,
                    datasetIndex: datasetIndex,
                    wicket: wicket
                  });

                  ctx.beginPath();
                  ctx.arc(x, y, 6, 0, 2 * Math.PI);
                  ctx.fillStyle = textColor;
                  ctx.fill();

                  ctx.beginPath();
                  ctx.arc(x, y, 4, 0, 2 * Math.PI);
                  ctx.fillStyle = dotColor;
                  ctx.fill();
                });
              }
            });
          });
        },
      },
    ],
  });
  
  return chart;
}

function createRunRateChart(selector, matchId) {
  const element = document.querySelector(selector);
  if (!element) return null;

  const data = chartDataRegistry[matchId];
  if (!data || !data.runRate) return null;

  const maxLength = Math.max(
    data.runRate[data.teams.team1]?.length || 0,
    data.runRate[data.teams.team2]?.length || 0
  );
  const overs = generateOversArray(maxLength - 1);

  const ctx = element.getContext("2d");
  return new Chart(ctx, {
    type: "line",
    data: {
      labels: overs,
      datasets: [
        {
          label: data.teams.team1Name,
          data: data.runRate[data.teams.team1],
          borderColor: getTeamColors(data.teams.team1),
          backgroundColor: `${getTeamColors(data.teams.team1)}1a`,
          borderWidth: 2,
          fill: false,
          tension: 0.1,
          ...createPointStyles(overs, data.wickets, data.teams.team1),
        },
        {
          label: data.teams.team2Name,
          data: data.runRate[data.teams.team2],
          borderColor: getTeamColors(data.teams.team2),
          backgroundColor: `${getTeamColors(data.teams.team2)}1a`,
          borderWidth: 2,
          fill: false,
          tension: 0.1,
          ...createPointStyles(overs, data.wickets, data.teams.team2),
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...getCommonTooltipConfig(),
          callbacks: {
            afterBody: (context) => {
              const overNumber = context[0].dataIndex;
              const datasetIndex = context[0].datasetIndex;
              const team =
                datasetIndex === 0 ? data.teams.team1 : data.teams.team2;

              const wicket = Object.values(data.wickets || {}).find(
                (w) => w.overIndex === overNumber && w.team === team
              );

              return wicket ? formatWicketTooltip(wicket, 50) : [];
            },
          },
        },
      },
      scales: {
        x: {
          title: { display: true, text: "OVERS", color: textColor },
          grid: { color: "transparent" },
        },
        y: {
          title: { display: true, text: "RUN RATE", color: textColor },
          grid: { color: borderColor },
        },
      },
    },
  });
}

function createWormChart(selector, matchId) {
  const element = document.querySelector(selector);
  if (!element) return null;

  const data = chartDataRegistry[matchId];
  if (!data || !data.worm) return null;

  const maxLength = Math.max(
    data.worm[data.teams.team1]?.length || 0,
    data.worm[data.teams.team2]?.length || 0
  );
  const overs = generateOversArray(maxLength - 1);

  const ctx = element.getContext("2d");
  return new Chart(ctx, {
    type: "line",
    data: {
      labels: overs,
      datasets: [
        {
          label: data.teams.team1Name,
          data: data.worm[data.teams.team1],
          borderColor: getTeamColors(data.teams.team1),
          backgroundColor: `${getTeamColors(data.teams.team1)}1a`,
          borderWidth: 3,
          fill: false,
          tension: 0.2,
          ...createPointStyles(overs, data.wickets, data.teams.team1),
        },
        {
          label: data.teams.team2Name,
          data: data.worm[data.teams.team2],
          borderColor: getTeamColors(data.teams.team2),
          backgroundColor: `${getTeamColors(data.teams.team2)}1a`,
          borderWidth: 3,
          fill: false,
          tension: 0.2,
          ...createPointStyles(overs, data.wickets, data.teams.team2),
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...getCommonTooltipConfig(),
          callbacks: {
            afterBody: (context) => {
              const overNumber = context[0].dataIndex;
              const datasetIndex = context[0].datasetIndex;
              const team =
                datasetIndex === 0 ? data.teams.team1 : data.teams.team2;

              const wicket = Object.values(data.wickets || {}).find(
                (w) => w.overIndex === overNumber && w.team === team
              );

              return wicket ? formatWicketTooltip(wicket) : [];
            },
          },
        },
      },
      scales: {
        x: {
          title: { display: true, text: "OVERS", color: textColor },
          grid: { color: "transparent" },
        },
        y: {
          title: { display: true, text: "RUNS", color: textColor },
          grid: { color: borderColor },
        },
      },
    },
  });
}

function createPointStyles(overs, wicketsByOver, team) {
  const wicketStyles = getWicketPointStyles(overs, wicketsByOver || {}, team);
  const teamColor = getTeamColors(team);

  return {
    pointBackgroundColor: wicketStyles.map((hasWicket) =>
      hasWicket ? textColor : teamColor
    ),
    pointBorderColor: wicketStyles.map((hasWicket) =>
      hasWicket ? teamColor : textColor
    ),
    pointBorderWidth: wicketStyles.map(() => 2),
    pointRadius: wicketStyles.map((hasWicket) => (hasWicket ? 4 : 0)),
    pointHoverRadius: wicketStyles.map((hasWicket) => (hasWicket ? 6 : 4)),
  };
}

function initializeCharts() {
  createManhattanChart(".manhattanChart", "nz-vs-sa");
  createRunRateChart(".runRateChart", "nz-vs-sa");
  createWormChart(".wormChart", "nz-vs-sa");

  createWormChart(".wormChartSaAus", "sa-vs-aus");
  createManhattanChart(".manhattanChartSAvsAUS", "sa-vs-aus");
  createRunRateChart(".runRateChartSAvsAUS", "sa-vs-aus");

  createWormChart(".wormChartAfgPak", "afg-vs-pak");
  createManhattanChart(".manhattanChartAFGvsPAK", "afg-vs-pak");
  createRunRateChart(".runRateChartPAKvsAFG", "afg-vs-pak");
}

initializeCharts();

function addMatchData(matchId, matchData) {
  chartDataRegistry[matchId] = matchData;
}

function createChart(type, selector, matchId) {
  const chartFunctions = {
    manhattan: createManhattanChart,
    runRate: createRunRateChart,
    worm: createWormChart,
  };

  const createFunction = chartFunctions[type];
  if (createFunction) {
    return createFunction(selector, matchId);
  }

  console.error(`Unknown chart type: ${type}`);
  return null;
}

