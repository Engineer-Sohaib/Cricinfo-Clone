$(function () {
  // Wheel Graph

  const timData = {
    sectors: [
      { runs: 11, highlight: false },
      { runs: 8, highlight: false },
      { runs: 9, highlight: false },
      { runs: 12, highlight: false },
      { runs: 9, highlight: false },
      { runs: 15, highlight: true },
      { runs: 4, highlight: false },
      { runs: 7, highlight: false },
    ],
  };

  const bjData = {
    sectors: [
      { runs: 5, highlight: false },
      { runs: 4, highlight: false },
      { runs: 2, highlight: false },
      { runs: 2, highlight: false },
      { runs: 15, highlight: true },
      { runs: 10, highlight: false },
      { runs: 4, highlight: false },
      { runs: 2, highlight: false },
    ],
  };

  const mahrajData = {
    sectors: [
      { runs: 0, highlight: false },
      { runs: 0, highlight: false },
      { runs: 0, highlight: false },
      { runs: 0, highlight: false },
      { runs: 0, highlight: false },
      { runs: 2, highlight: true },
      { runs: 0, highlight: false },
      { runs: 0, highlight: false },
    ],
  };

  const fazalhaqData = {
    sectors: [
      { runs: 0, highlight: false },
      { runs: 0, highlight: false },
      { runs: 0, highlight: false },
      { runs: 0, highlight: false },
      { runs: 0, highlight: false },
      { runs: 1, highlight: true },
      { runs: 0, highlight: false },
      { runs: 0, highlight: false },
    ],
  };

  const fareedAhmadData = {
    sectors: [
      { runs: 0, highlight: false },
      { runs: 0, highlight: false },
      { runs: 0, highlight: false },
      { runs: 0, highlight: false },
      { runs: 0, highlight: false },
      { runs: 1, highlight: true },
      { runs: 0, highlight: false },
      { runs: 0, highlight: false },
    ],
  };

  function createWagonWheel(svgId, playerData) {
    const svg = document.querySelector(svgId);

    if (!svg) {
      return;
    }

    const centerX = 115;
    const centerY = 100;
    const radius = 100;
    const innerRadius = 0;

    svg.innerHTML = "";

    const sectorAngle = 360 / 8;
    playerData.sectors.forEach((sector, index) => {
      const startAngle = index * sectorAngle - 90;
      const endAngle = (index + 1) * sectorAngle - 90;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      const x1 = centerX + innerRadius * Math.cos(startRad);
      const y1 = centerY + innerRadius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(startRad);
      const y2 = centerY + radius * Math.sin(startRad);
      const x3 = centerX + radius * Math.cos(endRad);
      const y3 = centerY + radius * Math.sin(endRad);
      const x4 = centerX + innerRadius * Math.cos(endRad);
      const y4 = centerY + innerRadius * Math.sin(endRad);

      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x2} ${y2}`,
        `A ${radius} ${radius} 0 0 1 ${x3} ${y3}`,
        "Z",
      ].join(" ");

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute("d", pathData);
      path.setAttribute("class", "sector");
      path.setAttribute("fill", sector.highlight ? themeColor : "transparent");
      path.setAttribute("data-runs", sector.runs);
      path.setAttribute("data-index", index);
      svg.appendChild(path);

      const textAngle = startAngle + sectorAngle / 2;
      const textRad = (textAngle * Math.PI) / 180;
      const textRadius = radius * 0.6;
      const textX = centerX + textRadius * Math.cos(textRad);
      const textY = centerY + textRadius * Math.sin(textRad);

      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      text.setAttribute("x", textX);
      text.setAttribute("y", textY);
      text.setAttribute("class", "sector-text");
      text.textContent = sector.runs;
      svg.appendChild(text);
    });
  }

  $(document).ready(function () {
    createWagonWheel(".timWheel", timData);
    createWagonWheel(".bjWheel", bjData);
    createWagonWheel(".mahrajWheel", mahrajData);
    createWagonWheel(".fazalhaqWheel", fazalhaqData);
    createWagonWheel(".fareedAhmadheel", fareedAhmadData);
  });

  $(document).ready(function () {
    const $tabs = $(".graph-tab");
    const $graphs = $("[data-graph-type]");

    $tabs.on("click", function () {
      const $clickedTab = $(this);
      const targetGraphType = $clickedTab.data("target");

      if ($clickedTab.hasClass("active")) return;

      $tabs.removeClass("active").css({
        transition: "all 0.3s ease",
        opacity: 0.7,
      });

      $clickedTab.addClass("active").css("opacity", 1);

      $graphs.each(function () {
        const $graph = $(this);
        const graphType = $graph.data("graph-type");

        if (graphType === targetGraphType) {
          $graph.stop(true, true).addClass("active").hide().fadeIn(300);
          if (targetGraphType === "wagon-zone-graph") {
            $(".match-player .bowlers-dropdown1").addClass("hidden").css({
              transition: "all 0.3s ease",
              opacity: 0.7,
            });
          } else {
            $(".match-player .bowlers-dropdown1").removeClass("hidden").css({
              transition: "all 0.3s ease",
              opacity: 0.7,
            });
          }
        } else {
          $graph.stop(true, true).removeClass("active").fadeOut(200);
        }
      });

      setTimeout(() => {
        $tabs.css("transition", "");
      }, 300);
    });

    if (!$tabs.hasClass("active")) {
      $tabs.first().trigger("click");
    }
  });
});

$(function () {
  const players = {
    timRobinson: {
      wheelId: ".wagonWheel1",
      legendClass: ".legend1",
      runsLabel: ".player-one .runs-label",
      data: {
        "All Bowlers": {
          ones: [
            15, 45, 75, 90, 105, 120, 135, 165, 180, 195, 210, 225, 240, 270,
            300, 330, 333, 366, 388, 400,
          ],
          twos: [30, 44, 96, 150, 270],
          threes: [121],
          fours: [25, 63, 99, 111, 145, 200],
          fives: [],
          sixes: [12, 85, 250],
          totalRuns: 75,
        },
        "Corbin Bosch": {
          ones: [45, 75, 90, 105, 135],
          twos: [30],
          threes: [],
          fours: [25, 63, 99, 111, 232],
          fives: [],
          sixes: [],
          totalRuns: 27,
        },
        "George Linde": {
          ones: [400],
          twos: [150],
          threes: [],
          fours: [],
          fives: [],
          sixes: [250],
          totalRuns: 9,
        },
        "Gerald Coetzee": {
          ones: [33, 58, 61, 100],
          twos: [],
          threes: [163],
          fours: [138],
          fives: [],
          sixes: [201, 270],
          totalRuns: 23,
        },
        "Kwena Maphaka": {
          ones: [33, 144, 261],
          twos: [],
          threes: [],
          fours: [],
          fives: [],
          sixes: [],
          totalRuns: 3,
        },
        "Lungi Ngidi": {
          ones: [401],
          twos: [323],
          threes: [],
          fours: [],
          fives: [],
          sixes: [],
          totalRuns: 3,
        },
        "Senuran Muthusamy": {
          ones: [110, 123, 180, 204, 280, 300],
          twos: [107, 402],
          threes: [],
          fours: [],
          fives: [],
          sixes: [],
          totalRuns: 10,
        },
      },
    },
    jacob: {
      wheelId: ".wagonWheel",
      legendClass: ".legend2",
      runsLabel: ".player-two .runs-label",
      data: {
        "All Bowlers": {
          ones: [
            1, 3, 3, 31, 39, 40, 119, 135, 149, 168, 296, 300, 301, 310, 349,
            171,
          ],
          twos: [80, 81, 190],
          threes: [],
          fours: [245],
          fives: [],
          sixes: [60, 94, 113],
          totalRuns: 44,
        },
        "Corbin Bosch": {
          ones: [90, 105, 135],
          twos: [45],
          threes: [],
          fours: [],
          fives: [],
          sixes: [],
          totalRuns: 5,
        },
        "Gerald Coetzee": {
          ones: [76, 102],
          twos: [],
          threes: [],
          fours: [233],
          fives: [],
          sixes: [301],
          totalRuns: 12,
        },
        "Kwena Maphaka": {
          ones: [77, 98, 164],
          twos: [455],
          threes: [],
          fours: [],
          fives: [],
          sixes: [321],
          totalRuns: 11,
        },
        "Lungi Ngidi": {
          ones: [110, 500],
          twos: [],
          threes: [],
          fours: [],
          fives: [],
          sixes: [343],
          totalRuns: 8,
        },
        "Senuran Muthusamy": {
          ones: [115, 154, 199, 234, 324, 432],
          twos: [10],
          threes: [],
          fours: [],
          fives: [],
          sixes: [],
          totalRuns: 8,
        },
      },
    },
    kashMahraj: {
      wheelId: ".kash-mahraj",
      legendClass: ".legend3",
      runsLabel: ".player-three .runs-label",
      data: {
        "All Bowlers": {
          ones: [101, 150],
          twos: [],
          threes: [],
          fours: [],
          fives: [],
          sixes: [],
          totalRuns: 2,
        },
        "Nathan Ellis": {
          ones: [101, 150],
          twos: [],
          threes: [],
          fours: [],
          fives: [],
          sixes: [],
          totalRuns: 2,
        },
        "Cooper Connolly": {
          ones: [],
          twos: [],
          threes: [],
          fours: [],
          fives: [],
          sixes: [],
          totalRuns: 0,
        },
      },
    },
    fazalhaqFarooqi: {
      wheelId: ".fazalhaq-farooqi",
      legendClass: ".legend4",
      runsLabel: ".player-four .runs-label",
      data: {
        "All Bowlers": {
          ones: [150],
          twos: [],
          threes: [],
          fours: [],
          fives: [],
          sixes: [],
          totalRuns: 1,
        },
        "Shaheen Shah Afridi": {
          ones: [],
          twos: [],
          threes: [],
          fours: [],
          fives: [],
          sixes: [],
          totalRuns: 0,
        },
        "Haris Rauf": {
          ones: [150],
          twos: [],
          threes: [],
          fours: [],
          fives: [],
          sixes: [],
          totalRuns: 1,
        },
      },
    },
    freedAhmad: {
      wheelId: ".freed-ahmad",
      legendClass: ".legend5",
      runsLabel: ".player-five .runs-label",
      data: {
        "All Bowlers": {
          ones: [150],
          twos: [],
          threes: [],
          fours: [],
          fives: [],
          sixes: [],
          totalRuns: 1,
        },
        "Shaheen Shah Afridi": {
          ones: [],
          twos: [],
          threes: [],
          fours: [],
          fives: [],
          sixes: [],
          totalRuns: 0,
        },
        "Haris Rauf": {
          ones: [150],
          twos: [],
          threes: [],
          fours: [],
          fives: [],
          sixes: [],
          totalRuns: 1,
        },
      },
    },
  };

  const widthRanges = {
    ones: { min: 35, max: 55 },
    twos: { min: 45, max: 65 },
    threes: { min: 55, max: 80 },
    fours: { min: 100, max: 105 },
    fives: { min: 70, max: 90 },
    sixes: { min: 105, max: 110 },
  };

  const playerControllers = {};
  Object.keys(players).forEach((player) => {
    const config = players[player];
    playerControllers[player] = initPlayerWheel(
      config.wheelId,
      config.legendClass,
      config.runsLabel,
      config.data
    );
  });

  function initPlayerWheel(
    wheelId,
    legendClass,
    runsLabelSelector,
    battingData
  ) {
    let currentBowler = "All Bowlers";
    let currentBattingData = battingData[currentBowler];
    let filteredData = { ...currentBattingData };

    function createScoreLines() {
      const $wheel = $(wheelId);
      $wheel.find(".score-line").remove();

      $.each(filteredData, (scoreType, angles) => {
        if (
          ["ones", "twos", "threes", "fours", "fives", "sixes"].includes(
            scoreType
          )
        ) {
          $.each(angles, (_, angle) => {
            const range = widthRanges[scoreType];
            const width = range
              ? Math.floor(Math.random() * (range.max - range.min + 1)) +
                range.min
              : 50;

            $("<div>", {
              class: `score-line ${scoreType}`,
              "data-type": scoreType,
              css: {
                transform: `rotate(${angle}deg)`,
                width: `${width}px`,
              },
            }).appendTo($wheel);
          });
        }
      });
    }

    function updateLegendCounts() {
      const typeToNumber = {
        ones: "1",
        twos: "2",
        threes: "3",
        fours: "4",
        fives: "5",
        sixes: "6",
      };

      $(`${legendClass} .legend-item`).each(function () {
        const $item = $(this);
        const type = $item.find(".legend-checkbox").data("type");

        if (type === "all") return;

        const count = currentBattingData[type]
          ? currentBattingData[type].length
          : 0;
        const numberPrefix = typeToNumber[type] || "";
        $item.find("span").last().text(`${numberPrefix}s x ${count}`);
      });
    }

    function updatePlayerStats() {
      $(runsLabelSelector).text(`${currentBattingData.totalRuns} runs`);
    }

    function updateFilteredData() {
      filteredData = { ...currentBattingData };

      const checkedTypes = [];
      $(`${legendClass} .legend-checkbox:not(.all)`).each(function () {
        if ($(this).hasClass("checked")) {
          checkedTypes.push($(this).data("type"));
        }
      });

      if (checkedTypes.length < 6) {
        Object.keys(filteredData).forEach((type) => {
          if (
            ["ones", "twos", "threes", "fours", "fives", "sixes"].includes(type)
          ) {
            if (!checkedTypes.includes(type)) {
              filteredData[type] = [];
            }
          }
        });
      }
    }

    function updateGraphForBowler(bowlerName) {
      currentBowler = bowlerName;
      currentBattingData =
        battingData[bowlerName] || battingData["All Bowlers"];
      $(`${legendClass} .legend-checkbox`).addClass("checked");
      updateFilteredData();
      createScoreLines();
      updateLegendCounts();
      updatePlayerStats();
    }

    function initLegendEvents() {
      $(`${legendClass}`).on("click", ".legend-checkbox", function () {
        const $this = $(this);
        const type = $this.data("type");
        const wasChecked = $this.hasClass("checked");

        if (type === "all") {
          const newState = !wasChecked;
          $(`${legendClass} .legend-checkbox`).toggleClass("checked", newState);
        } else {
          $this.toggleClass("checked");
          const $allCheckbox = $(`${legendClass} .legend-checkbox.all`);
          const allChecked =
            $(`${legendClass} .legend-checkbox:not(.all).checked`).length === 6;
          $allCheckbox.toggleClass("checked", allChecked);
        }

        updateFilteredData();
        createScoreLines();
      });
    }

    updateFilteredData();
    createScoreLines();
    updateLegendCounts();
    updatePlayerStats();
    initLegendEvents();

    return {
      updateGraphForBowler: updateGraphForBowler,
    };
  }

  function initCustomDropdown(containerSelector, options) {
    const defaults = {
      dropdownSelector: ".dropdown",
      triggerSelector: ".bowlers",
      activeClass: "active",
      arrowIconSelector: ".angle-down",
      rotatedClass: "rotated",
      selectedTextSelector: ".selected-text",
      itemSelector: ".dropdown-item",
      closeOnClickOutside: true,
    };

    const settings = $.extend({}, defaults, options);

    $(containerSelector).each(function () {
      const $container = $(this);
      const $dropdown = $container.find(settings.dropdownSelector);
      const $trigger = $container.find(settings.triggerSelector);
      const $selectedText = $container.find(settings.selectedTextSelector);
      const $items = $container.find(settings.itemSelector);
      const $arrowIcon = $container.find(settings.arrowIconSelector);

      const $selectedImage = $trigger.find(".holder img");

      // Updated player detection to handle all three players
      const $playerContainer = $container.closest(
        ".player-one, .player-two, .player-three, .player-four, .player-five"
      );
      let playerClass;
      if ($playerContainer.hasClass("player-one")) {
        playerClass = "timRobinson";
      } else if ($playerContainer.hasClass("player-two")) {
        playerClass = "jacob";
      } else if ($playerContainer.hasClass("player-three")) {
        playerClass = "kashMahraj";
      } else if ($playerContainer.hasClass("player-four")) {
        playerClass = "fazalhaqFarooqi";
      } else if ($playerContainer.hasClass("player-five")) {
        playerClass = "freedAhmad";
      }

      const wheelController = playerControllers[playerClass];

      function toggleDropdown() {
        $dropdown.toggleClass(settings.activeClass);
        $arrowIcon.toggleClass(settings.rotatedClass);
      }

      function closeDropdown() {
        $dropdown.removeClass(settings.activeClass);
        $arrowIcon.removeClass(settings.rotatedClass);
      }

      function updateSelected($clickedItem, text) {
        $items.removeClass("active");
        $clickedItem.addClass("active");
        $selectedText.text(text);

        const $clickedImage = $clickedItem.find(".holder img");
        if ($clickedImage.length && $selectedImage.length) {
          const newImageSrc = $clickedImage.attr("src");
          const newImageAlt = $clickedImage.attr("alt");

          if (newImageSrc && newImageSrc.trim() !== "") {
            $selectedImage.attr("src", newImageSrc);
          }

          if (newImageAlt && newImageAlt.trim() !== "") {
            $selectedImage.attr("alt", newImageAlt);
          }
        }

        if (wheelController) {
          wheelController.updateGraphForBowler(text);
        }
        closeDropdown();
      }

      $trigger.on("click", function (e) {
        e.stopPropagation();
        toggleDropdown();
      });

      $items.on("click", function (e) {
        e.preventDefault();
        updateSelected($(this), $(this).text().trim());
      });

      if (settings.closeOnClickOutside) {
        $(document).on("click", function (e) {
          if (!$(e.target).closest(containerSelector).length) {
            closeDropdown();
          }
        });
      }

      $dropdown.on("click", function (e) {
        e.stopPropagation();
      });
    });
  }

  initCustomDropdown(".bowlers-dropdown1", {});
});

$(document).ready(function () {
  const canvas = $(".PointgraphCanvas")[0];
  const ctx = canvas.getContext("2d");

  // Set canvas size
  function setCanvasSize() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  setCanvasSize();

  // Team data - points progression through matches
  const teamsData = {
    PESH: {
      color: "#fff",
      points: [0, 12, 24, 36, 54, 102],
      matches: [
        "",
        "PESH vs Sialk (06 Oct '25)\nMatch drawn",
        "PESH vs FATA (12 Oct '25)\nPeshawar won by 17 runs",
        "BHLPR vs PESH (18 Oct '25)\nPeshawar won by 8 wickets",
        "PESH vs ABT (24 Oct '25)\nPeshawar won by 247 runs",
        "PESH vs FSLB (30 Oct '25)\nFaisalabad won by 7 wickets",
      ],
    },
    Sialk: {
      color: "#fff",
      points: [0, 6, 12, 24, 42, 90],
      matches: [
        "",
        "PESH vs Sialk (06 Oct '25)\nMatch drawn",
        "Sialk vs MUL (12 Oct '25)\nSialkot won by 5 wickets",
        "Sialk vs KRBLS (18 Oct '25)\nSialkot won by 123 runs",
        "ABT vs Sialk (24 Oct '25)\nSialkot won by 6 wickets",
        "Sialk vs LAHW (30 Oct '25)\nSialkot won by an innings and 45 runs",
      ],
    },
    LAHW: {
      color: "#fff",
      points: [0, 12, 18, 30, 48, 66],
      matches: [
        "",
        "LAHW vs BHLPR (06 Oct '25)\nLahore Whites won by 9 wickets",
        "LAHW vs KRBLS (12 Oct '25)\nMatch drawn",
        "FSLB vs LAHW (18 Oct '25)\nLahore Whites won by 10 wickets",
        "LAHW vs MUL (24 Oct '25)\nLahore Whites won by 6 wickets",
        "Sialk vs LAHW (30 Oct '25)\nSialkot won by an innings and 45 runs",
      ],
    },
    KRBLS: {
      color: "#fff",
      points: [0, 12, 18, 30, 42, 78],
      matches: [
        "",
        "KRBLS vs FATA (06 Oct '25)\nKarachi Blues won by 156 runs",
        "LAHW vs KRBLS (12 Oct '25)\nMatch drawn",
        "Sialk vs KRBLS (18 Oct '25)\nSialkot won by 123 runs",
        "KRBLS vs FSLB (24 Oct '25)\nKarachi Blues won by 8 wickets",
        "KRBLS vs ISB (30 Oct '25)\nKarachi Blues won by an innings and 34 runs",
      ],
    },
    BHLPR: {
      color: "#fff",
      points: [0, 12, 18, 30, 48, 60],
      matches: [
        "",
        "LAHW vs BHLPR (06 Oct '25)\nLahore Whites won by 9 wickets",
        "BHLPR vs ISB (12 Oct '25)\nMatch drawn",
        "BHLPR vs PESH (18 Oct '25)\nPeshawar won by 8 wickets",
        "BHLPR vs Sialk (24 Oct '25)\nBahawalpur won by 7 wickets",
        "MUL vs BHLPR (30 Oct '25)\nMatch drawn",
      ],
    },
    MUL: {
      color: "#fff",
      points: [0, 12, 18, 24, 36, 54],
      matches: [
        "",
        "MUL vs ABT (06 Oct '25)\nMultan won by 63 runs",
        "Sialk vs MUL (12 Oct '25)\nSialkot won by 5 wickets",
        "MUL vs FATA (18 Oct '25)\nMatch drawn",
        "LAHW vs MUL (24 Oct '25)\nLahore Whites won by 6 wickets",
        "MUL vs BHLPR (30 Oct '25)\nMatch drawn",
      ],
    },
    FATA: {
      color: "#fff",
      points: [0, 12, 18, 24, 36, 60],
      matches: [
        "",
        "KRBLS vs FATA (06 Oct '25)\nKarachi Blues won by 156 runs",
        "PESH vs FATA (12 Oct '25)\nPeshawar won by 17 runs",
        "MUL vs FATA (18 Oct '25)\nMatch drawn",
        "FATA vs ISB (24 Oct '25)\nFATA won by 7 wickets",
        "FATA vs ABT (30 Oct '25)\nFATA won by 117 runs",
      ],
    },
    FSLB: {
      color: "#fff",
      points: [0, 6, 12, 18, 24, 36],
      matches: [
        "",
        "FSLB vs ISB (06 Oct '25)\nMatch drawn",
        "ABT vs FSLB (12 Oct '25)\nMatch drawn",
        "FSLB vs LAHW (18 Oct '25)\nLahore Whites won by 10 wickets",
        "KRBLS vs FSLB (24 Oct '25)\nKarachi Blues won by 8 wickets",
        "PESH vs FSLB (30 Oct '25)\nFaisalabad won by 7 wickets",
      ],
    },
    ABT: {
      color: "#fff",
      points: [0, 12, 18, 24, 42, 60],
      matches: [
        "",
        "MUL vs ABT (06 Oct '25)\nMultan won by 63 runs",
        "ABT vs FSLB (12 Oct '25)\nMatch drawn",
        "ISB vs ABT (18 Oct '25)\nMatch drawn",
        "PESH vs ABT (24 Oct '25)\nPeshawar won by 247 runs",
        "FATA vs ABT (30 Oct '25)\nFATA won by 117 runs",
      ],
    },
    ISB: {
      color: "#fff",
      points: [0, 12, 18, 24, 36, 48],
      matches: [
        "",
        "FSLB vs ISB (06 Oct '25)\nMatch drawn",
        "BHLPR vs ISB (12 Oct '25)\nMatch drawn",
        "ISB vs ABT (18 Oct '25)\nMatch drawn",
        "FATA vs ISB (24 Oct '25)\nFATA won by 7 wickets",
        "KRBLS vs ISB (30 Oct '25)\nKarachi Blues won by an innings and 34 runs",
      ],
    },
  };

  let activeTeams = new Set(Object.keys(teamsData));
  let hoveredPoint = null;
  let clickedPoint = null;

  const padding = { top: 40, right: 250, bottom: 60, left: 60 };
  const maxMatches = 9;
  const maxPoints = 102;

  function drawGraph() {
    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const graphWidth = width - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;

    // Draw grid lines and Y-axis labels
    ctx.strokeStyle = "#3f3f3f";
    ctx.lineWidth = 0.5;
    ctx.fillStyle = "#fff";
    ctx.font = "11px Arial";
    ctx.textAlign = "right";

    for (let i = 0; i <= 17; i++) {
      const y = padding.top + (graphHeight / 17) * i;
      const points = maxPoints - i * 6;

      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      ctx.fillText(points, padding.left - 15, y + 4);
    }

    // Draw X-axis labels
    ctx.textAlign = "center";
    ctx.fillStyle = "#888";
    ctx.font = "11px Arial";
    for (let i = 0; i <= maxMatches; i++) {
      const x = padding.left + (graphWidth / maxMatches) * i;
      ctx.fillText(i, x, height - padding.bottom + 25);
    }

    // X-axis label
    ctx.fillStyle = "#999";
    ctx.font = "12px Arial";
    ctx.fillText("Matches", width / 2 - 100, height - 15);

    // Y-axis label
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.fillStyle = "#999";
    ctx.font = "12px Arial";
    ctx.fillText("Pts", 0, 0);
    ctx.restore();

    // Draw team lines
    activeTeams.forEach((teamName) => {
      const team = teamsData[teamName];
      ctx.strokeStyle = team.color;
      ctx.lineWidth = 2;
      ctx.beginPath();

      team.points.forEach((points, index) => {
        const x = padding.left + (graphWidth / maxMatches) * index;
        const y =
          padding.top + graphHeight - (points / maxPoints) * graphHeight;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Draw points
      team.points.forEach((points, index) => {
        const x = padding.left + (graphWidth / maxMatches) * index;
        const y =
          padding.top + graphHeight - (points / maxPoints) * graphHeight;

        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();

        // Add black border to points
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Highlight clicked point
        if (
          clickedPoint &&
          clickedPoint.team === teamName &&
          clickedPoint.index === index
        ) {
          ctx.strokeStyle = "#3b9aef";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(x, y, 7, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Highlight hovered point
        if (
          hoveredPoint &&
          hoveredPoint.team === teamName &&
          hoveredPoint.index === index
        ) {
          if (
            !clickedPoint ||
            clickedPoint.team !== teamName ||
            clickedPoint.index !== index
          ) {
            ctx.strokeStyle = "#666";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y, 7, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      });
    });

    // Draw dashed line from clicked point to info box
    if (clickedPoint) {
      const pointX =
        padding.left + (graphWidth / maxMatches) * clickedPoint.index;
      const pointY =
        padding.top +
        graphHeight -
        (clickedPoint.points / maxPoints) * graphHeight;
      const infoBoxX = width - padding.right + 20;

      ctx.strokeStyle = "#3b9aef";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(pointX, pointY);
      ctx.lineTo(infoBoxX, pointY);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  function findNearestPoint(mouseX, mouseY) {
    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;
    const graphWidth = width - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;

    let nearest = null;
    let minDist = 15;

    activeTeams.forEach((teamName) => {
      const team = teamsData[teamName];
      team.points.forEach((points, index) => {
        const x = padding.left + (graphWidth / maxMatches) * index;
        const y =
          padding.top + graphHeight - (points / maxPoints) * graphHeight;

        const dist = Math.sqrt(
          Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2)
        );
        if (dist < minDist) {
          minDist = dist;
          nearest = {
            team: teamName,
            index,
            x,
            y,
            points,
            matchInfo: team.matches[index],
          };
        }
      });
    });

    return nearest;
  }

  $(canvas).on("click", function (e) {
    const pos = getMousePos(e);
    const point = findNearestPoint(pos.x, pos.y);

    if (point && point.matchInfo) {
      clickedPoint = point;
      $("#matchInfo").text(point.matchInfo);
      drawGraph();
    }
  });

  $(canvas).on("mousemove", function (e) {
    const pos = getMousePos(e);
    const point = findNearestPoint(pos.x, pos.y);

    if (point) {
      hoveredPoint = point;
      $(canvas).css("cursor", "pointer");
    } else {
      hoveredPoint = null;
      $(canvas).css("cursor", "default");
    }

    drawGraph();
  });

  $(canvas).on("mouseleave", function () {
    hoveredPoint = null;
    drawGraph();
  });

  $(".team-btn").on("click", function () {
    const team = $(this).data("team");
    $(this).toggleClass("active");

    if (activeTeams.has(team)) {
      activeTeams.delete(team);
    } else {
      activeTeams.add(team);
    }

    drawGraph();
  });

  $("#resetBtn").on("click", function () {
    activeTeams = new Set(Object.keys(teamsData));
    $(".team-btn").addClass("active");
    clickedPoint = null;
    $("#matchInfo").text(
      "Click on any colored dot in\nthe graph to discover links to\nthe corresponding match\nscorecards here"
    );
    drawGraph();
  });

  $(window).on("resize", function () {
    setCanvasSize();
    drawGraph();
  });

  drawGraph();
});
