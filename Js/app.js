class AdvancedThemeToggler {
  constructor(options = {}) {
    this.config = {
      togglerSelector: options.togglerSelector || ".theme-toggler",
      bodyClass: options.bodyClass || "dark-mode",
      storageKey: options.storageKey || "theme-preference",
      iconClasses: {
        dark: options.lightIcon || "ri-sun-fill",
        light: options.darkIcon || "ri-moon-fill",
      },
    };

    this.$toggler = $(this.config.togglerSelector);
    this.$body = $("body");
    this.$icon = this.$toggler.find("i");

    this.init();
  }

  init() {
    this.loadSavedTheme();
    this.bindEvents();
    this.updateUI();
  }

  bindEvents() {
    this.$toggler.on("click.themeToggler", (e) => {
      e.preventDefault();
      this.toggleTheme();
    });

    $(window).on("storage.themeToggler", (e) => {
      if (e.originalEvent.key === this.config.storageKey) {
        this.syncThemeFromStorage();
      }
    });
  }

  getCurrentTheme() {
    return this.$body.hasClass(this.config.bodyClass) ? "dark" : "light";
  }

  isDarkMode() {
    return this.getCurrentTheme() === "dark";
  }

  toggleTheme() {
    const newTheme = this.isDarkMode() ? "light" : "dark";
    this.setTheme(newTheme);
  }

  setTheme(theme) {
    if (theme === "dark") {
      this.$body.addClass(this.config.bodyClass);
    } else {
      this.$body.removeClass(this.config.bodyClass);
    }

    this.updateIcon();
    this.saveTheme(theme);
  }

  updateIcon() {
    const isDark = this.isDarkMode();
    const currentIconClass = isDark
      ? this.config.iconClasses.light
      : this.config.iconClasses.dark;
    const newIconClass = isDark
      ? this.config.iconClasses.dark
      : this.config.iconClasses.light;

    this.$icon.removeClass(currentIconClass).addClass(newIconClass);
  }

  updateUI() {
    this.updateIcon();
  }

  saveTheme(theme) {
    try {
      localStorage.setItem(this.config.storageKey, theme);
    } catch (error) {
      console.warn("Theme storage not available:", error);
    }
  }

  loadSavedTheme() {
    try {
      const savedTheme = localStorage.getItem(this.config.storageKey);

      if (savedTheme && savedTheme !== this.getCurrentTheme()) {
        this.setTheme(savedTheme);
      }
    } catch (error) {
      console.warn("Could not load saved theme:", error);
    }
  }

  syncThemeFromStorage() {
    try {
      const storedTheme = localStorage.getItem(this.config.storageKey);

      if (storedTheme && storedTheme !== this.getCurrentTheme()) {
        this.setTheme(storedTheme);
      }
    } catch (error) {
      console.warn("Could not sync theme from storage:", error);
    }
  }

  setLightTheme() {
    this.setTheme("light");
  }

  setDarkTheme() {
    this.setTheme("dark");
  }

  getTheme() {
    return this.getCurrentTheme();
  }

  destroy() {
    this.$toggler.off(".themeToggler");
    $(window).off(".themeToggler");
  }

  reinit(newOptions = {}) {
    this.destroy();
    this.config = { ...this.config, ...newOptions };
    this.init();
  }
}

class StickyNavBar {
  constructor(options = {}) {
    this.defaults = {
      navSelector: ".sticky-nav",
      fixedClass: "fixed",
    };
    this.settings = $.extend({}, this.defaults, options);
    this.isFixed = false;
    this.navOffsetTop = null;
    this.$nav = null;

    this.init();
  }

  init() {
    this.$nav = $(this.settings.navSelector);
    if (this.$nav.length === 0) return;

    this.navOffsetTop = this.$nav.offset().top;
    this.bindEvents();
  }

  bindEvents() {
    $(window).on("scroll", () => {
      this.handleScroll();
    });
  }

  handleScroll() {
    const scrollTop = $(window).scrollTop();

    if (scrollTop > this.navOffsetTop && !this.isFixed) {
      this.isFixed = true;
      this.$nav.addClass(this.settings.fixedClass);
      $(".current-team-playing").addClass(this.settings.fixedClass);

      const navHeight = this.$nav.outerHeight();
      $(".current-team-playing.fixed").css("top", navHeight + "px");
    } else if (scrollTop <= this.navOffsetTop && this.isFixed) {
      this.isFixed = false;
      this.$nav.removeClass(this.settings.fixedClass);
      $(".current-team-playing")
        .removeClass(this.settings.fixedClass)
        .css("top", "");
    }
  }
}

class TableSorter {
  constructor(
    tableSelector,
    sortLinkSelector,
    defaultColumn = 2,
    defaultDirection = "desc"
  ) {
    this.$table = $(tableSelector);
    this.$sortLink = $(sortLinkSelector);
    this.sortDirection = defaultDirection;
    this.defaultColumn = defaultColumn;

    this.init();
  }

  init() {
    this.sortTable(this.defaultColumn, this.sortDirection);
    this.bindEvents();
  }

  parseValue(cellValue) {
    if (cellValue === "-" || cellValue === "") return -Infinity;

    const num = parseFloat(cellValue);
    if (!isNaN(num)) return num;

    return cellValue;
  }

  sortTable(columnIndex, direction) {
    const $tbody = this.$table.find("tbody");
    const $rows = $tbody.find("tr").get();

    $rows.sort((a, b) => {
      const aValue = this.parseValue($(a).find("td").eq(columnIndex).text());
      const bValue = this.parseValue($(b).find("td").eq(columnIndex).text());

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    $.each($rows, (index, row) => {
      $tbody.append(row);
    });

    this.updateSortIcon(direction);
  }

  updateSortIcon(direction) {
    this.$sortLink
      .find("span:last i")
      .removeClass("ri-arrow-down-s-line ri-arrow-up-s-line")
      .addClass(
        direction === "asc" ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"
      );
  }

  bindEvents() {
    this.$sortLink.on("click", (e) => {
      e.preventDefault();
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      this.sortTable(this.defaultColumn, this.sortDirection);
    });
  }
}

class DismissalToggle {
  constructor() {
    this.init();
  }

  setupDismissalToggle(
    containerSelector,
    dismissalSelector = ".dismissal",
    rowSelector = ".player-row",
    contentSelector = ".collapse-content"
  ) {
    $(containerSelector).on("click", dismissalSelector, function (e) {
      e.preventDefault();
      const $row = $(this).closest(rowSelector);
      const $content = $row.find(contentSelector);
      const $arrow = $(this).find("i");

      if ($(this).hasClass("season-list") || $(this).hasClass("records-list")) {
        $(this).toggleClass("active");
      }

      $row.toggleClass("active");
      $content.toggleClass("active");
      if ($arrow.length) {
        if ($arrow.hasClass("ri-add-line") || $arrow.hasClass("ri-subtract-line")) {
          $arrow.toggleClass("ri-subtract-line ri-add-line");
          return;
        } else {
          $arrow.toggleClass("ri-arrow-down-s-line ri-arrow-up-s-line");
        }
      }
    });
  }

  init() {
    this.setupDismissalToggle("body");
    this.setupDismissalToggle("body", ".wicket-ball", ".bowler-row");
    this.setupDismissalToggle(
      "body",
      ".teams-overs",
      ".teams-overs",
      ".collapse-content"
    );
    this.setupDismissalToggle(
      "body",
      ".team-row .team-series",
      ".team-content",
      ".collapse-content"
    );
    this.setupDismissalToggle(
      "body",
      ".match-flow-list",
      ".card-content",
      ".collapse-content"
    );
    this.setupDismissalToggle(
      "body",
      ".teams-container",
      ".card-content",
      ".collapse-content"
    );
  }
}

class ExpandCollapse {
  constructor() {
    this.initializeEvents();
  }

  initializeEvents() {
    $(".expend-all").click(function () {
      $(".teams-overs .over-details .collapse-content").toggleClass("active");
      $(".team-overs-list span").toggleClass("rotated");
      $(this).find("i").toggleClass("uil-compress-arrows uil-expand-arrows");
    });
  }
}

class PopupManager {
  constructor() {
    this.$popup = $(".popup");
    this.$overlay = $(".overlay");
    this.init();
  }

  init() {
    $(document).on("click", ".popup-toggler", (e) => {
      e.preventDefault();
      this.open();
    });

    $(document).on("click", ".popup-close", (e) => {
      e.preventDefault();
      this.close();
    });

    $(document).on("keydown", (e) => {
      if (e.key === "Escape" && this.$popup.hasClass("active")) {
        this.close();
      }
    });
  }

  open() {
    this.$overlay.addClass("active");
    this.$popup.addClass("active");
    $("body").css("overflow", "hidden");
    this.focusFirstElement();
  }

  close() {
    this.$overlay.removeClass("active");
    this.$popup.removeClass("active");
    $("body").css("overflow", "");
  }

  focusFirstElement() {
    const $focusable = this.$popup
      .find(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      .filter(":visible");
    if ($focusable.length) {
      $focusable.first().focus();
    }
  }
}

class BackToTop {
  constructor({
    selector = ".back-to-top, .floating-icons .back-top",
    containerSelector = null,
    scrollThreshold = 500,
    animationDuration = 1000,
    throttleDelay = 100,
    photosPageMode = false,
  } = {}) {
    this.settings = {
      selector,
      containerSelector,
      scrollThreshold,
      animationDuration,
      throttleDelay,
      photosPageMode,
    };

    this.$visibilityElement = null;
    this.$backToTop = null;
    this.throttledToggleVisibility = null;

    this.init();
  }

  init() {
    const { selector, containerSelector, throttleDelay } = this.settings;

    this.$visibilityElement = containerSelector
      ? $(containerSelector)
      : $(selector);
    this.$backToTop = $(selector);

    this.throttledToggleVisibility = this.throttle(
      this.toggleVisibility.bind(this),
      throttleDelay
    );

    $(window).on("scroll", this.throttledToggleVisibility);
    this.$backToTop.on("click", this.scrollToTop.bind(this));

    this.toggleVisibility();
  }

  throttle(func, wait) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = () => {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  toggleVisibility() {
    const { photosPageMode, scrollThreshold } = this.settings;

    if (photosPageMode) {
      const scrollTop = $(window).scrollTop();
      const windowHeight = $(window).height();
      const documentHeight = $(document).height();
      const isAtBottom = scrollTop + windowHeight >= documentHeight - 10;

      this.$visibilityElement.toggleClass("active", isAtBottom);
    } else {
      this.$visibilityElement.toggleClass(
        "active",
        $(window).scrollTop() > scrollThreshold
      );
    }
  }

  scrollToTop(e) {
    if (e) e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, this.settings.animationDuration);
  }

  show() {
    this.$visibilityElement.addClass("active");
  }

  hide() {
    this.$visibilityElement.removeClass("active");
  }

  destroy() {
    $(window).off("scroll", this.throttledToggleVisibility);
    this.$backToTop.off("click", this.scrollToTop);
  }
}

class CustomDropdown {
  constructor(containerSelector, options, callbacks) {
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

    this.settings = $.extend({}, defaults, options);
    this.callbacks = callbacks;
    this.containerSelector = containerSelector;

    this.init();
  }

  init() {
    $(this.containerSelector).each((index, element) => {
      this.setupDropdown($(element));
    });
  }

  setupDropdown($container) {
    const $dropdown = $container.find(this.settings.dropdownSelector);
    const $trigger = $container.find(this.settings.triggerSelector);
    const $selectedText = $container.find(this.settings.selectedTextSelector);
    const $items = $container.find(this.settings.itemSelector);
    const $arrowIcon = $container.find(this.settings.arrowIconSelector);
    const $selectedImage = $trigger.find(".holder img");

    const toggleDropdown = () => {
      $dropdown.toggleClass(this.settings.activeClass);
      $arrowIcon.toggleClass(this.settings.rotatedClass);

      if (this.callbacks && this.callbacks.onToggle) {
        this.callbacks.onToggle($dropdown, $arrowIcon);
      }
    };

    const closeDropdown = () => {
      $dropdown.removeClass(this.settings.activeClass);
      $arrowIcon.removeClass(this.settings.rotatedClass);

      if (this.callbacks && this.callbacks.onClose) {
        this.callbacks.onClose($dropdown, $arrowIcon);
      }
    };

    const updateSelected = ($clickedItem, text) => {
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
      closeDropdown();
    };

    $trigger.on("click", (e) => {
      e.stopPropagation();
      toggleDropdown();
    });

    $items.on("click", (e) => {
      e.preventDefault();
      updateSelected($(e.currentTarget), $(e.currentTarget).text().trim());
    });

    if (this.settings.closeOnClickOutside) {
      $(document).on("click", (e) => {
        if (!$(e.target).closest(this.containerSelector).length) {
          closeDropdown();
        }
      });
    }

    $dropdown.on("click", (e) => {
      e.stopPropagation();
    });
  }
}

window.CustomDropdown = CustomDropdown;

class ScrollSlider {
  constructor() {
    this.$scrollSlider = null;
    this.$leftIndicator = null;
    this.$rightIndicator = null;
    this.$leftBtn = null;
    this.$rightBtn = null;
    this.isDragging = false;
    this.startX = 0;
    this.scrollLeft = 0;
    this.isScrolling = null;

    this.init();
  }

  init() {
    try {
      this.$scrollSlider = $(".scrollSlider");
      if (!this.$scrollSlider.length || !this.$scrollSlider[0]) return;

      this.$leftIndicator = $(".leftIndicator");
      this.$rightIndicator = $(".rightIndicator");
      this.$leftBtn = $(".leftBtn");
      this.$rightBtn = $(".rightBtn");

      this.bindEvents();
      this.updateScrollIndicators();
    } catch (e) {
      console.error("Error initializing ScrollSlider:", e);
    }
  }

  throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function () {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }

  updateScrollIndicators() {
    try {
      if (!this.$scrollSlider.length || !this.$scrollSlider[0]) return;

      const scrollLeft = this.$scrollSlider.scrollLeft();
      const scrollWidth = this.$scrollSlider[0].scrollWidth;
      const clientWidth = this.$scrollSlider.width();

      if (this.$leftIndicator.length && this.$leftIndicator[0]) {
        this.$leftIndicator.toggleClass("visible", scrollLeft > 0);
      }
      if (this.$leftBtn.length && this.$leftBtn[0]) {
        this.$leftBtn.toggleClass("visible", scrollLeft > 0);
      }
      if (this.$rightIndicator.length && this.$rightIndicator[0]) {
        this.$rightIndicator.toggleClass(
          "visible",
          scrollLeft < scrollWidth - clientWidth - 1
        );
      }
      if (this.$rightBtn.length && this.$rightBtn[0]) {
        this.$rightBtn.toggleClass(
          "visible",
          scrollLeft < scrollWidth - clientWidth - 1
        );
      }
    } catch (e) {
      console.error("Error in updateScrollIndicators:", e);
    }
  }

  bindEvents() {
    if (this.$leftBtn.length && this.$leftBtn[0]) {
      this.$leftBtn.off("click").on("click", () => {
        this.$scrollSlider.animate({ scrollLeft: "-=200" }, 300);
      });
    }

    if (this.$rightBtn.length && this.$rightBtn[0]) {
      this.$rightBtn.off("click").on("click", () => {
        this.$scrollSlider.animate({ scrollLeft: "+=200" }, 300);
      });
    }

    this.$scrollSlider
      .off("click", ".scroll-item")
      .on("click", ".scroll-item", (e) => {
        try {
          e.preventDefault();
          const item = $(e.currentTarget);
          if (item && typeof item[0].scrollIntoView === "function") {
            item[0].scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "center",
            });
          }
        } catch (e) {
          console.error("Error handling scroll-item click:", e);
        }
      });

    this.$scrollSlider.off("scroll").on("scroll", () => {
      try {
        window.cancelAnimationFrame(this.isScrolling);
        this.isScrolling = window.requestAnimationFrame(() =>
          this.updateScrollIndicators()
        );
      } catch (e) {
        console.error("Error handling scroll event:", e);
      }
    });

    $(window)
      .off("resize")
      .on(
        "resize",
        this.throttle(() => this.updateScrollIndicators(), 100)
      );

    this.$scrollSlider.off("wheel").on("wheel", (e) => {
      try {
        if (e.originalEvent.deltaY !== 0) {
          e.preventDefault();
          this.$scrollSlider.scrollLeft(
            this.$scrollSlider.scrollLeft() + e.originalEvent.deltaY
          );
        }
      } catch (e) {
        console.error("Error handling wheel event:", e);
      }
    });

    this.$scrollSlider
      .off("mousedown mouseleave mouseup mousemove")
      .on("mousedown", (e) => {
        try {
          this.isDragging = true;
          this.startX = e.pageX - this.$scrollSlider.offset().left;
          this.scrollLeft = this.$scrollSlider.scrollLeft();
          this.$scrollSlider.addClass("dragging");
        } catch (e) {
          console.error("Error handling mousedown:", e);
        }
      })
      .on("mouseleave mouseup", () => {
        try {
          this.isDragging = false;
          this.$scrollSlider.removeClass("dragging");
        } catch (e) {
          console.error("Error handling mouseleave/mouseup:", e);
        }
      })
      .on("mousemove", (e) => {
        try {
          if (!this.isDragging) return;
          e.preventDefault();
          const x = e.pageX - this.$scrollSlider.offset().left;
          const walk = (x - this.startX) * 2;
          this.$scrollSlider.scrollLeft(this.scrollLeft - walk);
        } catch (e) {
          console.error("Error handling mousemove:", e);
        }
      });
  }
}

class ImpactOversScroller {
  constructor(options) {
    this.settings = $.extend(
      {
        linkSelector: ".link-scroller a",
        contentSelector: ".teams-overs .over-details",
        statsCardsSelector: ".stats-cards .card",
        matchesSelector: ".matches-live",
        activeClass: "active",
        hiddenClass: "hidden",
        initialActiveFilter: "impact-over",
        isStatsCardsView: false,
        isMultiFilterView: false,
        resetSelector: ".resets",
        closeSelector: ".close",
        nothingFoundSelector: ".nothing-found",
        resetFilterSelector: ".ask-btn",
        breadcrumbSelector: ".breadcrumb",
        breadcrumb1Selector: ".breadcrumb-1",
      },
      options
    );

    this.activeFilters = new Set();
    this.init();
  }

  init() {
    this.cacheElements();
    this.bindEvents();
    this.activateInitialSections();
  }

  cacheElements() {
    this.$links = $(this.settings.linkSelector);
    this.$contents = $(this.settings.contentSelector);
    this.$statsCards = $(this.settings.statsCardsSelector);
    this.$matches = $(this.settings.matchesSelector);
    this.$resetBtn = $(this.settings.resetSelector);
    this.$nothingFound = $(this.settings.nothingFoundSelector);
    this.$resetFilterBtn = $(this.settings.resetFilterSelector);
    this.$breadcrumbs = $(this.settings.breadcrumbSelector);
    this.$breadcrumb1 = $(this.settings.breadcrumb1Selector);
  }

  bindEvents() {
    const self = this;

    this.$links.on("click", function (e) {
      e.preventDefault();
      self.handleLinkClick($(this));
    });

    if (this.settings.isMultiFilterView) {
      this.$links.find(this.settings.closeSelector).on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const $link = $(this).closest("a");
        self.handleFilterRemove($link);
      });

      this.$resetBtn.on("click", function (e) {
        e.preventDefault();
        self.resetAllFilters();
      });

      this.$resetFilterBtn.on("click", function (e) {
        e.preventDefault();
        self.resetAllFilters();
      });
    }
  }

  handleLinkClick($clickedLink) {
    const oversType = $clickedLink.data("overs");

    if (this.settings.isMultiFilterView) {
      this.handleMultiFilterClick($clickedLink, oversType);
    } else {
      this.updateActiveStates($clickedLink, oversType);
    }
  }

  handleMultiFilterClick($clickedLink, oversType) {
    if ($clickedLink.hasClass(this.settings.activeClass)) {
      this.handleFilterRemove($clickedLink);
    } else {
      this.activeFilters.add(oversType);
      $clickedLink.addClass(this.settings.activeClass);
      this.updateMultiFilterResults();
    }
    this.updateResetButtonState();
  }

  handleFilterRemove($link) {
    const oversType = $link.data("overs");
    this.activeFilters.delete(oversType);
    $link.removeClass(this.settings.activeClass);
    this.updateMultiFilterResults();
    this.updateResetButtonState();
  }

  resetAllFilters() {
    this.activeFilters.clear();
    this.$links.removeClass(this.settings.activeClass);
    this.$matches
      .removeClass(this.settings.hiddenClass)
      .addClass(this.settings.activeClass);
    this.$nothingFound
      .removeClass(this.settings.activeClass)
      .addClass(this.settings.hiddenClass);
    this.$resetBtn.removeClass(this.settings.activeClass);
    this.$breadcrumbs.removeClass(this.settings.hiddenClass);
  }

  updateResetButtonState() {
    if (this.activeFilters.size > 0) {
      this.$resetBtn.addClass(this.settings.activeClass);
    } else {
      this.$resetBtn.removeClass(this.settings.activeClass);
    }
  }

  updateMultiFilterResults() {
    let hasResults = false;

    this.$nothingFound
      .removeClass(this.settings.activeClass)
      .addClass(this.settings.hiddenClass);

    if (this.activeFilters.size === 0) {
      this.$matches
        .removeClass(this.settings.hiddenClass)
        .addClass(this.settings.activeClass);
      this.$breadcrumbs.removeClass(this.settings.hiddenClass);
      return;
    }

    this.$matches.each((index, element) => {
      const $match = $(element);
      const matchOvers = ($match.data("overs") || "").toString().split(",");
      let matchesFilter = false;

      const filtersArray = Array.from(this.activeFilters);
      for (let i = 0; i < filtersArray.length; i++) {
        if (
          matchOvers.indexOf(filtersArray[i]) !== -1 ||
          matchOvers.indexOf("all") !== -1
        ) {
          matchesFilter = true;
          break;
        }
      }

      if (matchesFilter) {
        $match
          .removeClass(this.settings.hiddenClass)
          .addClass(this.settings.activeClass);
        hasResults = true;
      } else {
        $match
          .addClass(this.settings.hiddenClass)
          .removeClass(this.settings.activeClass);
      }
    });

    if (!hasResults) {
      this.$matches
        .addClass(this.settings.hiddenClass)
        .removeClass(this.settings.activeClass);
      this.$breadcrumbs
        .not(this.$breadcrumb1)
        .addClass(this.settings.hiddenClass);
      this.$breadcrumb1.removeClass(this.settings.hiddenClass);
      this.$nothingFound
        .removeClass(this.settings.hiddenClass)
        .addClass(this.settings.activeClass);
    } else {
      this.$breadcrumbs.removeClass(this.settings.hiddenClass);
    }
  }

  updateActiveStates($clickedLink, filterValue) {
    this.$links.removeClass(this.settings.activeClass);
    $clickedLink.addClass(this.settings.activeClass);

    if (
      !this.settings.isStatsCardsView &&
      !this.settings.isMultiFilterView &&
      this.$contents.length
    ) {
      this.$contents.removeClass(this.settings.activeClass);
      if (filterValue) {
        this.$contents
          .filter('[data-overs*="' + filterValue + '"]')
          .addClass(this.settings.activeClass);
      }
    }

    if (this.settings.isStatsCardsView && this.$statsCards.length) {
      this.$statsCards.removeClass(this.settings.activeClass);
      if (filterValue === "all") {
        this.$statsCards.addClass(this.settings.activeClass);
      } else if (filterValue) {
        this.$statsCards
          .filter('[data-overs*="' + filterValue + '"]')
          .addClass(this.settings.activeClass);
      }
    }
  }

  activateInitialSections() {
    if (this.settings.isMultiFilterView) {
      this.$matches.addClass(this.settings.activeClass);
      this.$nothingFound.addClass(this.settings.hiddenClass);
      this.$resetBtn.removeClass(this.settings.activeClass);
      return;
    }

    if (this.settings.initialActiveFilter) {
      if (!this.settings.isStatsCardsView && this.$contents.length) {
        this.$contents
          .filter('[data-overs*="' + this.settings.initialActiveFilter + '"]')
          .addClass(this.settings.activeClass);
      }

      if (this.settings.isStatsCardsView && this.$statsCards.length) {
        if (this.settings.initialActiveFilter === "all") {
          this.$statsCards.addClass(this.settings.activeClass);
        } else {
          this.$statsCards
            .filter('[data-overs*="' + this.settings.initialActiveFilter + '"]')
            .addClass(this.settings.activeClass);
        }
      }

      this.$links
        .filter('[data-overs*="' + this.settings.initialActiveFilter + '"]')
        .addClass(this.settings.activeClass);
    }
  }

  showOver(oversType) {
    const $link = this.$links
      .filter('[data-overs="' + oversType + '"]')
      .first();
    if ($link.length) {
      this.handleLinkClick($link);
    }
  }

  destroy() {
    this.$links.off("click");
    this.$links.find(this.settings.closeSelector).off("click");
    this.$resetBtn.off("click");
    this.$resetFilterBtn.off("click");
    this.$links.removeClass(this.settings.activeClass);
    this.$contents.removeClass(this.settings.activeClass);
    this.$statsCards.removeClass(this.settings.activeClass);
    this.$matches
      .removeClass(this.settings.activeClass)
      .removeClass(this.settings.hiddenClass);
    this.$nothingFound
      .removeClass(this.settings.activeClass)
      .addClass(this.settings.hiddenClass);
    this.$resetBtn.removeClass(this.settings.activeClass);
    this.$breadcrumbs.removeClass(this.settings.hiddenClass);
  }
}

class OversSorter {
  constructor() {
    this.sortDirection = 1;
    this.init();
  }

  init() {
    $(document).ready(() => {
      this.bindEvents();
    });
  }

  bindEvents() {
    $(".overs-sorter").on("click", () => {
      this.sortOvers();
    });
  }

  sortOvers() {
    const $oversContainer = $(".batting-section");
    const $overs = $(".teams-overs").detach();

    $overs.sort((a, b) => {
      const aVal = parseInt($(a).find(".team-over-no span").text());
      const bVal = parseInt($(b).find(".team-over-no span").text());
      return (aVal - bVal) * this.sortDirection;
    });

    this.sortDirection *= -1;
    $oversContainer.append($overs);
  }
}

class TabHandler {
  constructor() {
    this.init();
  }

  init() {
    $(".tab").on("click", this.handleTabClick.bind(this));
  }

  handleTabClick(event) {
    const $clickedTab = $(event.currentTarget);
    const targetList = $clickedTab.data("list");
    const tabGroup = $clickedTab.closest(".tab-group");

    tabGroup.find(".tab").removeClass("active");
    $clickedTab.addClass("active");

    const contentElements = tabGroup.find("[data-list]").not(".tab");
    contentElements.removeClass("active");

    tabGroup.find(`[data-list="${targetList}"]`).not(".tab").addClass("active");
  }
}

class AdditionalDropdownFunctionalityManager {
  constructor() {
    this.bowlersDropdown = null;
    this.init();
  }

  init() {
    this.bowlersDropdown = new CustomDropdown(".bowlers-dropdown", {
      dropdownSelector: ".dropdown",
      triggerSelector: ".bowlers-dp",
      activeClass: "active",
      arrowIconSelector: ".angle-down",
      rotatedClass: "rotated",
      selectedTextSelector: ".selected-text",
      itemSelector: ".dropdown-item",
      closeOnClickOutside: true,
    });

    this.setupTeamsDropdown();
    this.setupSeriesDropdown();
    this.setupCheckboxHandlers();
    this.setupCloseButton();
    this.setupSearch();
    this.setupAskButton();

    this.updateCheckboxCount();
  }

  setupTeamsDropdown() {
    $(".teams-dp").on("click", function (e) {
      e.stopPropagation();
      const dropdown = $(".bowlers-dropdown .dropdown");
      const angleIcon = $(this).find(".angle-down");
      dropdown.show().addClass("active");
      $(".bowlers-dropdown .angle-down ").removeClass("rotated");
      angleIcon.addClass("rotated");
      $(".tab").removeClass("active");
      $('.tab[data-list="teams"]').addClass("active");
      $(".teams-list").removeClass("active");
      $('.teams-list[data-list="teams"]').addClass("active");
    });
  }

  setupSeriesDropdown() {
    $(".series-dp").on("click", function (e) {
      e.stopPropagation();
      const dropdown = $(".bowlers-dropdown .dropdown");
      const angleIcon = $(this).find(".angle-down");
      dropdown.show().addClass("active");
      $(".bowlers-dropdown .angle-down").removeClass("rotated");
      angleIcon.addClass("rotated");
      $(".tab").removeClass("active");
      $('.tab[data-list="series"]').addClass("active");
      $(".teams-list").removeClass("active");
      $('.teams-list[data-list="series"]').addClass("active");
    });
  }

  setupCheckboxHandlers() {
    $(".checkbox").on("change", () => {
      this.updateCheckboxCount();
    });

    $(".clear-all").on("click", (e) => {
      e.preventDefault();
      $(".checkbox").prop("checked", false);
      this.updateCheckboxCount();
    });
  }

  setupCloseButton() {
    $(".filter-header .ri-close-line").on("click", () => {
      $(".dropdown").hide().removeClass("active");
      $(".bowlers-dropdown .angle-down ").removeClass("rotated");
    });
  }

  setupSearch() {
    $(".search-input").on("input", function () {
      const searchTerm = $(this).val().toLowerCase();
      let dropdownContainer = $(this).closest(".dropdown");
      if (dropdownContainer.length === 0) {
        dropdownContainer = $(this).closest(".dropdown-content");
      }
      const activeList = dropdownContainer.find(".teams-list.active");

      activeList.find(".team-item").each(function () {
        const teamName = $(this).find(".team-name").text().toLowerCase();
        if (teamName.includes(searchTerm)) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    });
  }

  setupAskButton() {
    $(".ask-btn a").on("click", (e) => {
      e.preventDefault();
      $(".dropdown").hide().removeClass("active");
      $(".bowlers-dropdown .angle-down").removeClass("rotated");
    });
  }

  updateCheckboxCount() {
    const checkedBoxes = $(".checkbox:checked").length;
    const countElement = $(".filter-title .count");
    countElement.text(checkedBoxes);
    if (checkedBoxes > 0) {
      countElement.addClass("active");
    } else {
      countElement.removeClass("active");
    }
  }
}

class HomeMatchCoverage {
  constructor(container) {
    this.$container = $(container);
    this.$tabs = this.$container.find(".match-tab");
    this.$bodies = this.$container.find(".card-body");
    this.currentCategory = this.$tabs.filter(".active").data("category");
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.$container.on("click", ".match-tab", (e) => {
      const $tab = $(e.currentTarget);
      this.switchTab($tab.data("category"));
    });
  }

  switchTab(category) {
    if (category === this.currentCategory) return;

    this.$tabs.removeClass("active");
    this.$tabs.filter(`[data-category="${category}"]`).addClass("active");
    this.$bodies.removeClass("active");
    this.$bodies.filter(`[data-category="${category}"]`).addClass("active");
    this.currentCategory = category;
    this.$container.trigger("tabChanged", [category]);
  }

  switchToTab(category) {
    if (this.$tabs.filter(`[data-category="${category}"]`).length) {
      this.switchTab(category);
      return true;
    }
    return false;
  }

  getCurrentCategory() {
    return this.currentCategory;
  }
}

class VideosPageVideoPlayer {
  constructor(containerSelector) {
    this.container = $(containerSelector);
    if (
      this.container.length === 0 ||
      this.container.find(".videoPlayer").length === 0
    )
      return;

    this.elements = {
      videoContainer: this.container.find(".video-container"),
      video: this.container.find(".videoPlayer")[0],
      playPauseBtn: this.container.find(".play-pause-btn"),
      skipBackBtn: this.container.find(".skip-back-btn"),
      skipForwardBtn: this.container.find(".skip-forward-btn"),
      volumeBtn: this.container.find(".volume-btn"),
      volumeSlider: this.container.find(".volume-slider"),
      volumeProgress: this.container.find(".volume-progress"),
      fullscreenBtn: this.container.find(".fullscreen-btn"),
      settingsBtn: this.container.find(".settings-btn"),
      progressBar: this.container.find(".VidprogressBar"),
      progressContainer: this.container.find(".VidprogressContainer"),
      currentTimeDisplay: this.container.find(".currentTime"),
      durationDisplay: this.container.find(".vedio-duration"),
      autoplayToggle: this.container.find(".autoplay-toggle"),
      autoplaySwitch: this.container.find(".autoplay-switch"),
      loadingOverlay: this.container.find(".loading-overlay"),
      controlsContainer: this.container.find(".controls-container"),
    };

    this.state = {
      isPlaying: false,
      currentTime: 260,
      totalDuration: 924,
      volume: 1.0,
      isMuted: false,
      autoplayEnabled: true,
      isDragging: false,
      controlsTimeout: null,
      timeUpdateInterval: null,
    };

    this.initializePlayer();
  }

  initializePlayer() {
    this.updateTimeDisplay();
    this.updateProgressBar();
    this.updateVolumeDisplay();
    this.setupEventListeners();

    setTimeout(() => {
      this.elements.loadingOverlay.addClass("hidden");
    }, 1000);
  }

  setupEventListeners() {
    this.elements.playPauseBtn.on("click", this.handlePlayPause.bind(this));

    this.elements.skipBackBtn.on("click", this.handleSkipBack.bind(this));
    this.elements.skipForwardBtn.on("click", this.handleSkipForward.bind(this));

    this.elements.progressContainer.on(
      "mousedown",
      this.startSeeking.bind(this)
    );
    $(document).on("mousemove", this.handleSeeking.bind(this));
    $(document).on("mouseup", this.stopSeeking.bind(this));

    this.elements.volumeBtn.on("click", this.toggleMute.bind(this));
    this.elements.volumeSlider.on("click", this.handleVolumeChange.bind(this));

    this.elements.autoplayToggle.on("click", this.toggleAutoplay.bind(this));

    this.elements.fullscreenBtn.on("click", this.toggleFullscreen.bind(this));

    this.elements.settingsBtn.on("click", this.showSettings.bind(this));

    $(document).on("keydown", this.handleKeyboardShortcuts.bind(this));

    this.elements.videoContainer.on(
      "click",
      this.handleVideoContainerClick.bind(this)
    );
    this.elements.videoContainer.on(
      "dblclick",
      this.handleVideoContainerDoubleClick.bind(this)
    );

    this.elements.videoContainer.on(
      "mouseenter mousemove",
      this.showControls.bind(this)
    );
    this.elements.videoContainer.on("mouseleave", this.hideControls.bind(this));
    this.elements.controlsContainer.on(
      "mouseenter",
      this.cancelHideControls.bind(this)
    );
    this.elements.controlsContainer.on(
      "mouseleave",
      this.hideControls.bind(this)
    );

    $(document).on(
      "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
      this.handleFullscreenChange.bind(this)
    );
  }

  handlePlayPause(e) {
    e.stopPropagation();
    this.state.isPlaying = !this.state.isPlaying;

    if (this.state.isPlaying) {
      this.elements.playPauseBtn
        .find("i")
        .removeClass("ri-play-fill")
        .addClass("ri-pause-line");
      this.startTimeUpdate();
    } else {
      this.elements.playPauseBtn
        .find("i")
        .removeClass("ri-pause-line")
        .addClass("ri-play-fill");
      this.stopTimeUpdate();
    }
  }

  handleSkipBack(e) {
    e.stopPropagation();
    this.state.currentTime = Math.max(0, this.state.currentTime - 10);
    this.updateTimeDisplay();
    this.updateProgressBar();
  }

  handleSkipForward(e) {
    e.stopPropagation();
    this.state.currentTime = Math.min(
      this.state.totalDuration,
      this.state.currentTime + 10
    );
    this.updateTimeDisplay();
    this.updateProgressBar();
  }

  startSeeking(e) {
    this.state.isDragging = true;
    this.seekToPosition(e);
  }

  handleSeeking(e) {
    if (this.state.isDragging) {
      this.seekToPosition(e);
    }
  }

  stopSeeking() {
    this.state.isDragging = false;
  }

  seekToPosition(e) {
    const containerOffset = this.elements.progressContainer.offset();
    const containerWidth = this.elements.progressContainer.width();
    const clickX = e.pageX - containerOffset.left;
    const percentage = Math.max(
      0,
      Math.min(100, (clickX / containerWidth) * 100)
    );

    this.state.currentTime = (percentage / 100) * this.state.totalDuration;
    this.updateTimeDisplay();
    this.updateProgressBar();
  }

  toggleMute(e) {
    e.stopPropagation();
    this.state.isMuted = !this.state.isMuted;
    this.updateVolumeDisplay();
  }

  handleVolumeChange(e) {
    e.stopPropagation();
    const sliderOffset = this.elements.volumeSlider.offset();
    const sliderWidth = this.elements.volumeSlider.width();
    const clickX = e.pageX - sliderOffset.left;
    const percentage = Math.max(0, Math.min(100, (clickX / sliderWidth) * 100));

    this.state.volume = percentage / 100;
    this.state.isMuted = false;
    this.updateVolumeDisplay();
  }

  updateVolumeDisplay() {
    if (this.state.isMuted || this.state.volume === 0) {
      this.elements.volumeBtn
        .find("i")
        .removeClass("ri-volume-down-fill ri-volume-up-fill")
        .addClass("ri-volume-mute-fill");
      this.elements.volumeProgress.css("width", "0%");
    } else if (this.state.volume < 0.5) {
      this.elements.volumeBtn
        .find("i")
        .removeClass("ri-volume-mute-fill ri-volume-up-fill")
        .addClass("ri-volume-down-fill");
      this.elements.volumeProgress.css("width", this.state.volume * 100 + "%");
    } else {
      this.elements.volumeBtn
        .find("i")
        .removeClass("ri-volume-mute-fill ri-volume-down-fill")
        .addClass("ri-volume-up-fill");
      this.elements.volumeProgress.css("width", this.state.volume * 100 + "%");
    }
  }

  toggleAutoplay(e) {
    e.stopPropagation();
    this.state.autoplayEnabled = !this.state.autoplayEnabled;
    this.elements.autoplayToggle.toggleClass("disabled");
  }

  toggleFullscreen(e) {
    e.stopPropagation();
    const videoContainer =
      this.elements.videoContainer.length > 0
        ? this.elements.videoContainer[0]
        : null;

    if (!videoContainer) return;

    if (!document.fullscreenElement) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
      } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  showSettings(e) {
    e.stopPropagation();
    console.log("Settings menu would appear here");
  }

  handleFullscreenChange() {
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      this.elements.fullscreenBtn
        .find("i")
        .removeClass("ri-fullscreen-line")
        .addClass("ri-fullscreen-exit-line");
    } else {
      this.elements.fullscreenBtn
        .find("i")
        .removeClass("ri-fullscreen-exit-line")
        .addClass("ri-fullscreen-line");
    }
  }

  startTimeUpdate() {
    if (this.state.timeUpdateInterval) {
      clearInterval(this.state.timeUpdateInterval);
    }

    this.state.timeUpdateInterval = setInterval(() => {
      if (this.state.currentTime < this.state.totalDuration) {
        this.state.currentTime += 1;
        this.updateTimeDisplay();
        this.updateProgressBar();
      } else {
        this.state.isPlaying = false;
        this.elements.playPauseBtn
          .find("i")
          .removeClass("ri-pause-line")
          .addClass("ri-play-fill");
        this.stopTimeUpdate();

        if (this.state.autoplayEnabled) {
          setTimeout(() => {
            this.state.currentTime = 0;
            this.handlePlayPause({ stopPropagation: () => {} });
          }, 2000);
        }
      }
    }, 1000);
  }

  stopTimeUpdate() {
    if (this.state.timeUpdateInterval) {
      clearInterval(this.state.timeUpdateInterval);
      this.state.timeUpdateInterval = null;
    }
  }

  updateTimeDisplay() {
    this.elements.currentTimeDisplay.text(
      this.formatTime(this.state.currentTime)
    );
    this.elements.durationDisplay.text(
      this.formatTime(this.state.totalDuration)
    );
  }

  updateProgressBar() {
    const percentage =
      (this.state.currentTime / this.state.totalDuration) * 100;
    this.elements.progressBar.css("width", percentage + "%");
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  handleKeyboardShortcuts(e) {
    if (
      this.isElementInViewport(this.elements.videoContainer[0]) &&
      e.target.tagName.toLowerCase() !== "input"
    ) {
      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          this.handlePlayPause({ stopPropagation: () => {} });
          break;
        case "ArrowLeft":
          e.preventDefault();
          this.state.currentTime = Math.max(0, this.state.currentTime - 5);
          this.updateTimeDisplay();
          this.updateProgressBar();
          break;
        case "ArrowRight":
          e.preventDefault();
          this.state.currentTime = Math.min(
            this.state.totalDuration,
            this.state.currentTime + 5
          );
          this.updateTimeDisplay();
          this.updateProgressBar();
          break;
        case "ArrowUp":
          e.preventDefault();
          this.state.volume = Math.min(1, this.state.volume + 0.1);
          this.state.isMuted = false;
          this.updateVolumeDisplay();
          break;
        case "ArrowDown":
          e.preventDefault();
          this.state.volume = Math.max(0, this.state.volume - 0.1);
          this.updateVolumeDisplay();
          break;
        case "m":
          e.preventDefault();
          this.toggleMute({ stopPropagation: () => {} });
          break;
        case "f":
          e.preventDefault();
          this.toggleFullscreen({ stopPropagation: () => {} });
          break;
      }
    }
  }

  handleVideoContainerClick(e) {
    if (
      !$(e.target).closest(".controls-container").length &&
      !$(e.target).hasClass("controls-container")
    ) {
      this.handlePlayPause({ stopPropagation: () => {} });
    }
  }

  handleVideoContainerDoubleClick(e) {
    if (
      !$(e.target).closest(".controls-container").length &&
      !$(e.target).hasClass("controls-container")
    ) {
      this.toggleFullscreen({ stopPropagation: () => {} });
    }
  }

  showControls() {
    this.elements.controlsContainer.css("opacity", "1");

    if (this.state.controlsTimeout) {
      clearTimeout(this.state.controlsTimeout);
    }

    if (this.state.isPlaying) {
      this.state.controlsTimeout = setTimeout(() => {
        if (!this.elements.controlsContainer.is(":hover")) {
          this.elements.controlsContainer.css("opacity", "0");
        }
      }, 3000);
    }
  }

  hideControls() {
    if (this.state.isPlaying) {
      this.state.controlsTimeout = setTimeout(() => {
        if (!this.elements.controlsContainer.is(":hover")) {
          this.elements.controlsContainer.css("opacity", "0");
        }
      }, 1000);
    }
  }

  cancelHideControls() {
    if (this.state.controlsTimeout) {
      clearTimeout(this.state.controlsTimeout);
    }
  }

  isElementInViewport(el) {
    if (!el) return false;

    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}

class CurrentSeriesTabs {
  constructor(container, options) {
    this.$container = $(container);
    this.settings = $.extend(
      {
        activeClass: "active",
        hiddenClass: "cricket-hidden",
        loadingClass: "cricket-loading",
        useUrlHash: true,
        keyboardNavigation: true,
        autoInit: true,
        preventDefaultClick: true,
        tabSelector: ".full-length",
        contentSelector: ".series-page .left-content [data-overs]",
        beforeTabChange: null,
        onTabChange: null,
        onTabChanged: null,
        onError: null,
        onInit: null,
      },
      options
    );

    this.$tabs = null;
    this.$contents = null;
    this.currentTab = null;
    this.isAnimating = false;

    this.init();
  }

  init() {
    try {
      this.setupTabs();
      this.bindEvents();

      if (this.settings.useUrlHash) {
        this.handleUrlHash();
      } else if (this.settings.autoInit) {
        this.initializeFirstTab();
      }

      this.triggerCallback("onInit");
    } catch (error) {
      this.handleError("Initialization failed", error);
    } finally {
      this.isInitializing = false;
    }
  }

  setupTabs() {
    this.$tabs = this.$container.find(this.settings.tabSelector);
    this.$contents = $(this.settings.contentSelector);

    this.$tabs.attr({
      role: "tab",
      tabindex: "0",
    });

    var $contentSections = $(".left-content").find("[data-overs]");
    $contentSections.attr({
      role: "tabpanel",
    });

    this.$tabs.each((index, tab) => {
      $(tab).attr("data-tab-index", index);
    });

    $contentSections.each((index, section) => {
      if ($(section).data("overs") !== "current") {
        $(section).hide().addClass(this.settings.hiddenClass);
      }
    });
  }

  bindEvents() {
    this.$tabs.on("click.currentSeriesTabs", this.handleTabClick.bind(this));

    if (this.settings.useUrlHash) {
      $(window).on(
        "hashchange.currentSeriesTabs",
        this.handleUrlHash.bind(this)
      );
    }

    $(window).on(
      "resize.currentSeriesTabs",
      this.debounce(this.handleResize.bind(this), 250)
    );
  }

  handleTabClick(e) {
    if (this.settings.preventDefaultClick) {
      e.preventDefault();
    }

    var $clickedTab = $(e.currentTarget);
    var targetOvers = $clickedTab.data("overs");

    if (!targetOvers) {
      this.handleError("No data-overs attribute found", null);
      return;
    }

    this.changeTab($clickedTab, targetOvers);
  }

  changeTab($tab, targetOvers) {
    if (this.isAnimating || !$tab.length) return;

    if ($tab.hasClass(this.settings.activeClass)) {
      return;
    }

    var $targetContent = $(".left-content").find(
      '[data-overs="' + targetOvers + '"]'
    );

    if (!$targetContent.length) {
      this.handleError("No matching content found for: " + targetOvers, null);
      return;
    }

    if (
      this.triggerCallback("beforeTabChange", [$tab, targetOvers]) === false
    ) {
      return;
    }

    this.isAnimating = true;

    this.updateActiveStates($tab);

    if (
      this.settings.useUrlHash &&
      !(this.isInitializing && targetOvers === "current")
    ) {
      this.updateUrlHash(targetOvers);
    }

    this.triggerCallback("onTabChange", [$tab, targetOvers]);

    $(".left-content")
      .find("[data-overs]:visible")
      .hide()
      .addClass(this.settings.hiddenClass);
    $targetContent.show().removeClass(this.settings.hiddenClass);

    this.currentTab = targetOvers;
    this.isAnimating = false;

    $tab.focus();

    this.triggerCallback("onTabChanged", [$tab, targetOvers]);
  }

  updateActiveStates($activeTab) {
    this.$tabs
      .removeClass(this.settings.activeClass)
      .attr("aria-selected", "false");
    $activeTab
      .addClass(this.settings.activeClass)
      .attr("aria-selected", "true");
  }

  updateUrlHash(targetOvers) {
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, null, "#" + targetOvers);
    } else {
      window.location.hash = targetOvers;
    }
  }

  handleUrlHash() {
    var hash = window.location.hash.substring(1);
    if (hash && this.settings.useUrlHash) {
      var $matchingTab = this.$tabs.filter('[data-overs="' + hash + '"]');
      if ($matchingTab.length) {
        this.changeTab($matchingTab, hash);
        return;
      }
    }
    this.initializeFirstTab();
  }

  initializeFirstTab() {
    var defaultTab = "current";
    var $defaultTab = this.$tabs.filter('[data-overs="' + defaultTab + '"]');

    if (!$defaultTab.length && this.settings.useUrlHash) {
      var hash = window.location.hash.substring(1);
      if (hash) {
        $defaultTab = this.$tabs.filter('[data-overs="' + hash + '"]');
        defaultTab = hash;
      }
    }

    if (!$defaultTab.length) {
      $defaultTab = this.$tabs.first();
      defaultTab = $defaultTab.data("overs");
    }

    if ($defaultTab.length && defaultTab) {
      var $targetContent = $(".left-content").find(
        '[data-overs="' + defaultTab + '"]'
      );
      if ($targetContent.length) {
        $(".left-content")
          .find("[data-overs]")
          .not($targetContent)
          .hide()
          .addClass(this.settings.hiddenClass);
        $targetContent.show().removeClass(this.settings.hiddenClass);
        this.currentTab = defaultTab;

        this.updateActiveStates($defaultTab);

        this.triggerCallback("onTabChanged", [$defaultTab, defaultTab]);
      }
    }
  }

  handleResize() {
    this.triggerCallback("onResize");
  }

  handleError(message, error) {
    console.error("Cricket Tabs Error: " + message, error);
    this.triggerCallback("onError", [message, error]);
  }

  triggerCallback(callbackName, args) {
    if (typeof this.settings[callbackName] === "function") {
      return this.settings[callbackName].apply(this.$container[0], args || []);
    }
  }

  debounce(func, wait) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  goToTab(targetOvers) {
    var $tab = this.$tabs.filter('[data-overs="' + targetOvers + '"]');
    if ($tab.length) {
      this.changeTab($tab, targetOvers);
    }
  }

  getCurrentTab() {
    return this.currentTab;
  }

  refresh() {
    this.$tabs = this.$container.find(this.settings.tabSelector);
    this.$contents = $(".left-content").find("[data-overs]");
    this.setupTabs();
  }

  destroy() {
    this.$tabs.off(".currentSeriesTabs");
    $(window).off(".currentSeriesTabs");
    this.$container.removeData("currentSeriesTabs");
  }
}

$.fn.currentSeriesTabs = function (options) {
  return this.each(function () {
    if (!$(this).data("currentSeriesTabs")) {
      const currentSeriesTabs = new CurrentSeriesTabs(this, options);
      $(this).data("currentSeriesTabs", currentSeriesTabs);
    }
  });
};

class TeamsPerformenceNavigator {
  constructor(totalTabs = 3) {
    this.currentTab = 0;
    this.totalTabs = totalTabs;
    this.isAnimating = false;
  }
  gator;

  init() {
    this.updateNavigation();

    $("#prev-btn").on("click", (e) => {
      e.preventDefault();
      if (!this.isAnimating && this.currentTab > 0) {
        this.navigateToTab(this.currentTab - 1);
      }
    });

    $("#next-btn").on("click", (e) => {
      e.preventDefault();
      if (!this.isAnimating && this.currentTab < this.totalTabs - 1) {
        this.navigateToTab(this.currentTab + 1);
      }
    });
  }

  navigateToTab(newTab) {
    if (newTab === this.currentTab || this.isAnimating) return;

    this.isAnimating = true;

    $(`#tab-${this.currentTab}`).removeClass("active");

    this.currentTab = newTab;
    $(`#tab-${this.currentTab}`).addClass("active");

    this.updateNavigation();

    setTimeout(() => {
      this.isAnimating = false;
    }, 100);
  }

  updateNavigation() {
    $("#page-indicator").text(`${this.currentTab + 1} / ${this.totalTabs}`);

    if (this.currentTab === 0) {
      $("#prev-btn").prop("disabled", true);
    } else {
      $("#prev-btn").prop("disabled", false);
    }

    if (this.currentTab === this.totalTabs - 1) {
      $("#next-btn").prop("disabled", true);
    } else {
      $("#next-btn").prop("disabled", false);
    }
  }
}

class SlideBackgroundManager {
  constructor() {
    this.backgroundImages = [
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_640/lsci/db/PICTURES/CMS/405900/405971.png",
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_640/lsci/db/PICTURES/CMS/400300/400324.png",
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_640/lsci/db/PICTURES/CMS/373800/373842.jpg",
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_640/lsci/db/PICTURES/CMS/373800/373842.jpg",
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_640/lsci/db/PICTURES/CMS/317600/317634.png",
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_640/lsci/db/PICTURES/CMS/317700/317754.png",
      "https://www.espncricinfo.com/static/images/genre-default-bg.png",
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_640/lsci/db/PICTURES/CMS/317700/317736.png",
      "https://www.espncricinfo.com/static/images/genre-default-bg.png",
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_640/lsci/db/PICTURES/CMS/317700/317756.png",
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_640/lsci/db/PICTURES/CMS/316900/316983.png",
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_640/lsci/db/PICTURES/CMS/317600/317627.png",
    ];
  }

  applyBackgrounds() {
    $(".cricket-videos-page .team-fixtures .rounded-box").each(
      (index, element) => {
        if (index < this.backgroundImages.length) {
          $(element).css({
            "background-image": "url(" + this.backgroundImages[index] + ")",
            "background-size": "cover",
            "background-position": "center",
            "background-repeat": "no-repeat",
          });
        }
      }
    );
  }

  init() {
    this.applyBackgrounds();
  }
}

class QuotesSearchHandler {
  constructor() {
    this.searchInput = $(".quotes .search-input");
    this.itemsContainer = $(".quotes-list");
    this.searchButton = $(".quotes .search-container i");
    this.items = $(".item");
    this.noResultsClass = "no-results";
    this.hiddenClass = "hidden";
    this.noResultsMessage = "No quotes found. Try changing your filters.";

    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // this.searchInput.on("input", (e) => {
    //   this.handleSearch(e);
    // });

    this.searchInput.on("keypress", (e) => {
      if (e.which === 13 || e.keyCode === 13) {
        this.handleSearch(e);
      }
    });

    this.searchButton.on("click", (e) => {
      this.handleSearch({ target: this.searchInput[0] });
    });

    this.searchInput.on("input", (e) => {
      const searchTerm = $(e.target).val().trim();
      if (searchTerm === "") {
        this.clearSearch();
      }
    });
  }

  handleSearch(event) {
    const searchTerm = $(event.target).val().toLowerCase();

    this.filterItems(searchTerm);
    this.handleNoResults(searchTerm);
  }

  filterItems(searchTerm) {
    this.items.each((index, element) => {
      const $item = $(element);
      const matchesSearch = this.itemMatchesSearch($item, searchTerm);

      if (matchesSearch) {
        $item.removeClass(this.hiddenClass);
      } else {
        $item.addClass(this.hiddenClass);
      }
    });
  }

  itemMatchesSearch($item, searchTerm) {
    const quoteText = $item.find("h2").text().toLowerCase();
    const playerName = $item.find(".bold").text().toLowerCase();
    const description = $item.find("p").text().toLowerCase();

    return (
      quoteText.includes(searchTerm) ||
      playerName.includes(searchTerm) ||
      description.includes(searchTerm)
    );
  }

  handleNoResults(searchTerm) {
    const visibleItems = $(`.item:not(.${this.hiddenClass})`).length;

    if (visibleItems === 0 && searchTerm.length > 0) {
      this.showNoResults();
    } else {
      this.hideNoResults();
    }
  }

  showNoResults() {
    if ($(`.${this.noResultsClass}`).length === 0) {
      const noResultsHtml = `
                <div class="${this.noResultsClass} item w-100">
                    <p>${this.noResultsMessage}</p>
                </div>
            `;
      this.itemsContainer.append(noResultsHtml);
    }
  }

  hideNoResults() {
    $(`.${this.noResultsClass}`).remove();
  }

  setSearchTerm(term) {
    this.searchInput.val(term);
    this.filterItems(term.toLowerCase());
    this.handleNoResults(term.toLowerCase());
  }

  clearSearch() {
    this.searchInput.val("");
    this.items.removeClass(this.hiddenClass);
    this.hideNoResults();
  }

  getSearchTerm() {
    return this.searchInput.val();
  }
}

class PartnershipVisualizer {
  constructor() {
    this.maxWidth = 170;
    this.partnerships = [];
    this.collectPartnerships();
    this.applyVisuals();
  }

  collectPartnerships() {
    $(".partnership-item").each((index, element) => {
      const $players = $(element).find(".player");
      const runs1 =
        parseInt($players.eq(0).find("span").text().split(" ")[0]) || 0;
      const runs2 =
        parseInt($players.eq(1).find("span").text().split(" ")[0]) || 0;
      const total = runs1 + runs2;
      const balls1 =
        parseInt(
          $players
            .eq(0)
            .find("span")
            .text()
            .match(/\((\d+)\)/)?.[1]
        ) || 0;
      const balls2 =
        parseInt(
          $players
            .eq(1)
            .find("span")
            .text()
            .match(/\((\d+)\)/)?.[1]
        ) || 0;
      const totalBalls = balls1 + balls2;

      this.partnerships.push({
        element: $(element),
        runs1,
        runs2,
        total,
        totalBalls,
      });
    });
  }

  applyVisuals() {
    if (this.partnerships.length === 0) return;

    const maxTotal = Math.max(...this.partnerships.map((p) => p.total));

    this.partnerships.forEach((p) => {
      let percent1 = p.total > 0 ? (p.runs1 / p.total) * 100 : 0;

      if (p.runs1 === 0 && p.total > 0) {
        percent1 = 11;
      }

      const $bar = p.element.find(".partnership-bar");
      const $progress = $bar.find(".progress");
      const $percentDisplay = p.element.find(".contribution-percent");

      let barWidth = (p.total / maxTotal) * this.maxWidth;
      $bar.css("width", `${barWidth}px`);

      $progress.css("width", `${percent1}%`);
    });
  }
}

class CommentarySwitcher {
  constructor(containerSelector, options) {
    const defaults = {
      commentarySelector: ".summary-content",
      itemSelector: ".dropdown-item",
      commentaryAttribute: "data-ball-by-ball",
      activeClass: "active",
      hiddenClass: "hidden",
    };

    this.settings = $.extend({}, defaults, options);
    this.containerSelector = containerSelector;

    this.init();
  }

  init() {
    $(this.containerSelector).each((index, element) => {
      this.setupCommentarySwitcher($(element));
    });
  }

  setupCommentarySwitcher($container) {
    const $items = $container.find(this.settings.itemSelector);
    const $commentaries = $container.find(this.settings.commentarySelector);

    // Hide all commentaries initially except the active one
    this.hideAllCommentaries($commentaries);
    this.showActiveCommentary($container, $items, $commentaries);

    // Listen for dropdown item clicks
    $items.on("click", (e) => {
      const $clickedItem = $(e.currentTarget);
      const commentaryTarget = $clickedItem.attr(
        this.settings.commentaryAttribute
      );

      if (commentaryTarget) {
        this.switchCommentary($commentaries, commentaryTarget);
      }
    });
  }

  hideAllCommentaries($commentaries) {
    $commentaries.addClass("hidden");
  }

  showActiveCommentary($container, $items, $commentaries) {
    const $activeItem = $items.filter(`.${this.settings.activeClass}`);

    if ($activeItem.length) {
      const commentaryTarget = $activeItem.attr(
        this.settings.commentaryAttribute
      );
      if (commentaryTarget) {
        this.switchCommentary($commentaries, commentaryTarget);
      }
    }
  }

  switchCommentary($commentaries, target) {
    // Hide all commentaries
    $commentaries.addClass("hidden");

    // Show the targeted commentary
    const $targetCommentary = $commentaries.filter(
      `[${this.settings.commentaryAttribute}="${target}"]`
    );
    $targetCommentary.removeClass("hidden");
  }
}

window.CommentarySwitcher = CommentarySwitcher;

const commentarySwitcher = new CommentarySwitcher(".full-commantary");

class DRSReviewFilter {
  constructor() {
    this.reviewData = [
      {
        innings: "SA",
        over: "14.4",
        decision: "Wicket",
        reviewBy: "Australia (Bowling)",
        batter: "D Brevis",
        bowler: "A Zampa",
        umpire: "SJ Nogajski",
        originalDRS: "Not Out → Not Out",
        result: "unsuccessful",
        team: "Australia",
      },
    ];

    this.filterState = {
      innings: "umpire2-review", // Default to Umpire: SJ Nogajski
      team: "all-team-review", // Default to Both Teams
      result: "all-type-review", // Default to All
    };

    this.init();
  }

  init() {
    this.attachEventListeners();
    this.applyFilters();
  }

  attachEventListeners() {
    const self = this;

    $(".review-innings .dropdown .dropdown-item").on("click", function (e) {
      e.preventDefault();
      self.handleFilterClick($(this));
    });
  }

  handleFilterClick($element) {
    const $dropdown = $element.closest(".dropdown");
    const $parentDropdown = $dropdown.closest(".bowlers-dropdown");
    const filterType = this.getFilterType($parentDropdown);

    // Update active class
    $element
      .closest(".dropdown-column")
      .find(".dropdown-item")
      .removeClass("active");
    $element.addClass("active");

    // Update selected text
    const selectedText = $element.find("span").text();
    $parentDropdown.find(".selected-text").text(selectedText);

    // Update filter state
    this.filterState[filterType] = $element.data("review");

    // Close dropdown
    $dropdown.removeClass("active");
    $parentDropdown.find(".angle-down").css("transform", "rotate(0deg)");

    // Apply filters
    this.applyFilters();
  }

  getFilterType($parentDropdown) {
    if ($parentDropdown.hasClass("review-innings")) {
      return "innings";
    } else if ($parentDropdown.hasClass("review-takken-by")) {
      return "team";
    } else {
      return "result";
    }
  }

  applyFilters() {
    let visibleCount = 0;
    let successfulCount = 0;
    let unsuccessfulCount = 0;
    let overturnedCount = 0;

    const self = this;

    $(".review-table tbody tr").each(function () {
      const $row = $(this);
      const showRow = self.shouldShowRow($row);

      if (showRow) {
        $row.show().addClass("fade-in");
        visibleCount++;

        // Update counts for stats
        const stats = self.updateRowStats($row);
        successfulCount += stats.successful;
        unsuccessfulCount += stats.unsuccessful;
        overturnedCount += stats.overturned;
      } else {
        $row.hide();
      }
    });

    // Show no reviews message if no rows visible
    this.toggleNoReviewsMessage(visibleCount);
  }

  shouldShowRow($row) {
    let showRow = true;

    // Innings filter
    if (
      this.filterState.innings === "sa-inn-review" &&
      $row.data("innings") !== "SA"
    ) {
      showRow = false;
    } else if (
      this.filterState.innings === "aus-inn-review" &&
      $row.data("innings") !== "AUS"
    ) {
      showRow = false;
    } else if (
      this.filterState.innings === "umpire1-review" &&
      $row.data("umpire") !== "CB Gaffaney"
    ) {
      showRow = false;
    } else if (
      this.filterState.innings === "umpire2-review" &&
      $row.data("umpire") !== "SJ Nogajski"
    ) {
      showRow = false;
    }

    // Team filter
    if (showRow && this.filterState.team !== "all-team-review") {
      if (
        this.filterState.team === "aus-review" &&
        $row.data("team") !== "Australia"
      ) {
        showRow = false;
      } else if (
        this.filterState.team === "sa-review" &&
        $row.data("team") !== "South Africa"
      ) {
        showRow = false;
      }
    }

    // Result filter
    if (showRow && this.filterState.result !== "all-type-review") {
      if (
        this.filterState.result === "successful-review" &&
        $row.data("result") !== "successful"
      ) {
        showRow = false;
      } else if (
        this.filterState.result === "unsuccessful-review" &&
        $row.data("result") !== "unsuccessful"
      ) {
        showRow = false;
      }
    }

    return showRow;
  }

  updateRowStats($row) {
    const stats = {
      successful: 0,
      unsuccessful: 0,
      overturned: 0,
    };

    if ($row.data("result") === "successful") {
      stats.successful = 1;

      // Check if decision was overturned
      const originalDRS = $row.find("td:eq(7)").text();
      if (
        originalDRS.includes("→") &&
        !originalDRS.includes("Not Out → Not Out") &&
        !originalDRS.includes("Out → Out")
      ) {
        stats.overturned = 1;
      }
    } else {
      stats.unsuccessful = 1;
    }

    return stats;
  }

  toggleNoReviewsMessage(visibleCount) {
    if (visibleCount === 0) {
      $(".no-reviews").show();
    } else {
      $(".no-reviews").hide();
    }
  }

  // Public method to get current filter state
  getFilterState() {
    return { ...this.filterState };
  }

  // Public method to set filter state programmatically
  setFilterState(newState) {
    this.filterState = { ...this.filterState, ...newState };
    this.applyFilters();
  }

  // Public method to reset filters
  resetFilters() {
    this.filterState = {
      innings: "umpire2-review",
      team: "all-team-review",
      result: "all-type-review",
    };
    this.applyFilters();
  }
}

class CurrentTimeDisplay {
  constructor(selector) {
    this.element = $(selector);
    this.intervalId = null;
  }

  formatTime() {
    const now = new Date();

    const day = now.getUTCDate();
    const month = now.toLocaleString("en-US", {
      month: "short",
      timeZone: "UTC",
    });
    const hours = String(now.getUTCHours()).padStart(2, "0");
    const minutes = String(now.getUTCMinutes()).padStart(2, "0");
    const seconds = String(now.getUTCSeconds()).padStart(2, "0");

    return `${day} ${month}, ${hours}:${minutes}:${seconds} GMT`;
  }

  updateDisplay() {
    this.element.text(this.formatTime());
  }

  start() {
    // Update immediately
    this.updateDisplay();

    // Update every second
    this.intervalId = setInterval(() => {
      this.updateDisplay();
    }, 1000);

    return this;
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    return this;
  }

  restart() {
    this.stop();
    this.start();
    return this;
  }
}

$(document).ready(function () {
  window.themeToggler = new AdvancedThemeToggler();

  new StickyNavBar({
    navSelector: ".normal-navigation",
  });

  $(".view-more .link").on("click", function (e) {
    e.preventDefault();
    $(".card-content").toggleClass("active");
  });

  const tableSorter = new TableSorter(".mvp-table", ".sort", 2, "desc");

  new DismissalToggle();

  new ExpandCollapse();

  window.popupManager = new PopupManager();

  const isPhotosPage =
    $("body").hasClass("photos-page") ||
    window.location.pathname.includes("photos") ||
    $(".photos-page").length > 0;

  window.backToTopMain = new BackToTop({
    photosPageMode: isPhotosPage,
  });

  if ($(".floating-icons").length) {
    window.backToTopFloating = new BackToTop({
      selector: ".floating-icons .back-top",
      containerSelector: ".floating-icons",
      photosPageMode: isPhotosPage,
    });
  }

  const myDropdown = new CustomDropdown(".bowlers-dropdown");

  new ScrollSlider();

  $(
    ".link-scroller:not(.stat-cards-selector):not(.multi-filter-selector)"
  ).each(function () {
    new ImpactOversScroller({ container: $(this) });
  });

  $(".link-scroller.stat-cards-selector").each(function () {
    new ImpactOversScroller({
      container: $(this),
      contentSelector: "",
      statsCardsSelector: ".stats-cards .card",
      initialActiveFilter: "all",
      isStatsCardsView: true,
    });
  });

  $(".link-scroller.multi-filter-selector").each(function () {
    new ImpactOversScroller({
      container: $(this),
      contentSelector: "",
      matchesSelector: ".matches-live",
      isMultiFilterView: true,
      resetSelector: ".resets",
      closeSelector: ".close",
      nothingFoundSelector: ".nothing-found",
      resetFilterSelector: ".ask-btn",
      breadcrumbSelector: ".breadcrumb",
      breadcrumb1Selector: ".breadcrumb-1",
    });
  });

  new OversSorter();

  // const partnershipVisualizer = new PartnershipVisualizer();
  // partnershipVisualizer.init();

  new TabHandler();

  new AdditionalDropdownFunctionalityManager();

  const matchCoverage = new HomeMatchCoverage(".card.coverage");

  window.matchCoverageAPI = {
    switchTab: (category) => matchCoverage.switchToTab(category),
    getCurrentTab: () => matchCoverage.getCurrentCategory(),
  };

  $(".video-container").each(function () {
    new VideosPageVideoPlayer(this);
  });

  $(".series-page .card-content").currentSeriesTabs({
    useUrlHash: true,
    keyboardNavigation: true,
    onTabChanged: function (tab, targetOvers) {
      if (typeof gtag !== "undefined") {
        gtag("event", "tab_change", {
          custom_parameter: targetOvers,
        });
      }
    },
    beforeTabChange: function (tab, targetOvers) {
      return true;
    },
    onError: function (message, error) {},
  });

  setTimeout(function () {
    const tabsApi = $(".card-content").data("currentSeriesTabs");
    if (tabsApi) {
    }
  }, 1000);

  const tabNavigator = new TeamsPerformenceNavigator(3);
  tabNavigator.init();

  const slideManager = new SlideBackgroundManager();
  slideManager.init();

  const searchHandler = new QuotesSearchHandler();

  window.searchHandler = searchHandler;

  new PartnershipVisualizer();

  const drsFilter = new DRSReviewFilter();
  const timeDisplay = new CurrentTimeDisplay(".current-time p");
  timeDisplay.start();
});

function getCssVariable(element, variable) {
  const styles = getComputedStyle(element);
  return styles.getPropertyValue(variable).trim();
}

const colorSource = document.body.classList.contains("dark-mode")
  ? document.body
  : document.documentElement;

const themeColor = getCssVariable(colorSource, "--theme-color");
const dangerColor = getCssVariable(colorSource, "--danger-color");
const cardBg = getCssVariable(colorSource, "--card-bg");
const textColor = getCssVariable(colorSource, "--text-color");
const borderColor = getCssVariable(colorSource, "--border-color");

(function ($) {
  const $dropdownItems = $(".type-dp .dropdown-item");
  const $allHovers = $(".hover");
  const $overEnding = $(".over-ending");
  const $overNo = $(".over-no");

  let lazyLoaderInstance = null;

  function getDataCommentaryValues($element) {
    const data = $element.data("commentary");
    if (!data) return [];
    if (Array.isArray(data)) return data;
    return data
      .toString()
      .split(",")
      .map((item) => item.trim());
  }

  // function initLazyLoader() {
  //   if (
  //     $(".commentary").length > 0 &&
  //     $(".over-count").length > 0 &&
  //     !lazyLoaderInstance
  //   ) {
  //     lazyLoaderInstance = createLazyLoader();
  //   }
  // }

  function destroyLazyLoader() {
    if (lazyLoaderInstance) {
      lazyLoaderInstance.destroy();
      lazyLoaderInstance = null;
    }
  }

  $dropdownItems.on("click", function (e) {
    e.preventDefault();

    const $this = $(this);
    const filterValues = getDataCommentaryValues($this);
    const isFullCommentary = $this.is('[href="#0"]:not([data-commentary])');

    $dropdownItems.removeClass("active");
    $this.addClass("active");

    if (isFullCommentary) {
      showAllItems();
      initLazyLoader();
    } else {
      destroyLazyLoader();
      filterItems(filterValues);
    }
  });

  function showAllItems() {
    $allHovers.show();
    $overEnding.show();
    $overNo.removeClass("filter-active");
  }

  function filterItems(filterValues) {
    $overNo.addClass("filter-active");
    $overEnding.hide();

    $allHovers
      .hide()
      .filter(function () {
        const itemValues = getDataCommentaryValues($(this));
        if (itemValues.length === 0) return false;

        return filterValues.some((filter) => itemValues.includes(filter));
      })
      .show();
  }

  window.createLazyLoader = function (options) {
    const settings = $.extend(
      {
        container: ".commentary",
        itemSelector: ".over-count",
        loaderDuration: 2000,
        batchSize: 3,
        scrollTriggerOffset: 300,
        loaderHtml:
          '<div class="loader-container" style="text-align: center; padding: 20px; display: none;"><div class="loader" style="width: 50px; height: 50px; margin: 0 auto; border: 5px solid var(--border-color); border-top: 5px solid var(--theme-color); border-radius: 50%; animation: spin 2s linear infinite;"></div></div>',
        animationCss:
          "@keyframes spin {0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }",
      },
      options
    );

    const $container = $(settings.container);
    const $items = $(settings.itemSelector);

    if ($container.length === 0 || $items.length === 0) {
      console.warn("Lazy loader not initialized - required elements not found");
      return {
        loadMore: function () {},
        destroy: function () {},
        isComplete: function () {
          return true;
        },
      };
    }

    $items.hide();
    $items.slice(0, settings.batchSize).show();

    const $loader = $(settings.loaderHtml);
    $container.append($loader);
    $("<style>").html(settings.animationCss).appendTo("head");

    let isLoading = false;
    let lastTriggerPoint = 0;

    function loadMoreContent() {
      if (isLoading) return;

      const $hiddenItems = $items.filter(":hidden");
      if ($hiddenItems.length === 0) {
        $loader.hide();
        $(window).off("scroll.lazyLoader");
        return;
      }

      isLoading = true;
      const $lastVisible = $items.filter(":visible").last();

      if ($lastVisible.length > 0) {
        $loader.insertAfter($lastVisible).show();
      } else {
        $loader.appendTo($container).show();
      }

      const $nextBatch = $hiddenItems.slice(0, settings.batchSize);
      $nextBatch.hide();

      setTimeout(() => {
        $loader.hide();
        $nextBatch.show();
        isLoading = false;

        const $newLastVisible = $items.filter(":visible").last();
        if ($newLastVisible.length > 0 && $newLastVisible.offset()) {
          lastTriggerPoint = $newLastVisible.offset().top;
        }
      }, settings.loaderDuration);
    }

    function scrollHandler() {
      if (isLoading) return;

      const scrollBottom = $(window).scrollTop() + $(window).height();
      const currentTriggerPoint =
        lastTriggerPoint + settings.scrollTriggerOffset;

      if (scrollBottom > currentTriggerPoint) {
        loadMoreContent();
      }
    }

    const $initialLastVisible = $items.filter(":visible").last();
    if ($initialLastVisible.length > 0 && $initialLastVisible.offset()) {
      lastTriggerPoint = $initialLastVisible.offset().top;
    }

    $(window).on("scroll.lazyLoader", scrollHandler);

    return {
      loadMore: loadMoreContent,
      destroy: function () {
        $(window).off("scroll.lazyLoader");
        $loader.remove();
        $items.show();
      },
      isComplete: function () {
        return $items.filter(":hidden").length === 0;
      },
      refresh: function () {
        const $visibleItems = $items.filter(":visible");
        if ($visibleItems.length > 0) {
          lastTriggerPoint = $visibleItems.last().offset().top;
        }
        $(window).trigger("scroll.lazyLoader");
      },
    };
  };

  $(document).ready(function () {
    // initLazyLoader();

    $(".commentary-sort").click(function () {
      $(".loader-container").show();

      setTimeout(() => {
        var $this = $(this).find(".selected-text");
        var isCurrentlyNew = $this.text() === "New";
        $this.text(isCurrentlyNew ? "Old" : "New");

        var $summaryContent = $(".summary-content");

        const scrollPos = $(window).scrollTop();

        if ($this.text() === "Old") {
          var $sections = $summaryContent.children().get().reverse();
          $summaryContent.empty().append($sections);

          $(".post-match-comentary, .commentary").each(function () {
            var $section = $(this);
            var $children = $section.children().get().reverse();
            $section.empty().append($children);
          });

          $(".over-count").each(function () {
            var $overCount = $(this);
            var $ballItems = $overCount
              .find(".hover[data-commentary]")
              .parent()
              .get()
              .reverse();
            $overCount.find(".hover[data-commentary]").parent().detach();
            $overCount.prepend($ballItems);
          });
        } else {
          var $sections = $summaryContent.children().get().reverse();
          $summaryContent.empty().append($sections);

          $(".post-match-comentary, .commentary").each(function () {
            var $section = $(this);
            var $children = $section.children().get().reverse();
            $section.empty().append($children);
          });

          $(".over-count").each(function () {
            var $overCount = $(this);
            var $ballItems = $overCount
              .find(".hover[data-commentary]")
              .parent()
              .get()
              .reverse();
            $overCount.find(".hover[data-commentary]").parent().detach();
            $overCount.prepend($ballItems);
          });
        }
        $(window).scrollTop(scrollPos);

        setTimeout(() => {
          $(".loader-container").hide();
          if (lazyLoaderInstance) {
            lazyLoaderInstance.refresh();
          }
        }, 300);
      }, 50);
    });
  });
})(jQuery);

$(document).ready(function () {
  let isShowingUnlock = true;
  let currentRecordIndex = 0;
  let matchRecords = $(".today-records .match-records");
  let totalRecords = matchRecords.length;
  let recordInterval;
  let mainInterval;

  $(".today-records").hide();
  $(".unlock").show();
  matchRecords.hide();

  function switchToTodayRecords() {
    $(".unlock").hide();
    $(".today-records").show();

    currentRecordIndex = 0;
    matchRecords.hide();
    matchRecords.eq(currentRecordIndex).show();

    recordInterval = setInterval(() => {
      matchRecords.eq(currentRecordIndex).hide();
      currentRecordIndex = (currentRecordIndex + 1) % totalRecords;
      matchRecords.eq(currentRecordIndex).show();
    }, 3000);
  }

  function switchToUnlock() {
    $(".today-records").hide();
    $(".unlock").show();

    if (recordInterval) {
      clearInterval(recordInterval);
    }
  }

  function startMainCycle() {
    switchToUnlock();

    setTimeout(() => {
      switchToTodayRecords();

      setTimeout(() => {
        startMainCycle();
      }, 40000);
    }, 15000);
  }

  startMainCycle();
});

$(document).ready(function () {
  function setupImageHandling($img) {
    var $parent = $img.closest(
      ".holder, .team-flag,.card-image,.image-card,.profile-pic,.video-container,.image-wrapper,.logo"
    );

    $img.css({
      opacity: "0",
      visibility: "hidden",
    });
    $parent.css("background", "white");

    var loadTimer = setTimeout(function () {
      if (!$img.data("loaded")) {
        $parent.css("background", "var(--border-color)");
        $img.css({
          opacity: "0",
          visibility: "hidden",
        });
      }
    }, 3000);

    $img.on("load", function () {
      clearTimeout(loadTimer);
      $img.data("loaded", true);
      $img.css({
        opacity: "1",
        visibility: "visible",
      });
      $parent.css("background", "transparent");

      // Remove loading HTML if image loads successfully
      $parent.find(".loading-elements").remove();
    });

    $img.on("error", function () {
      clearTimeout(loadTimer);
      $img.data("loaded", false);
      $img.css({
        opacity: "0",
        visibility: "hidden",
      });
      $parent.css("background", "var(--blur-bg)");
    });

    if ($img[0].complete) {
      if ($img[0].naturalHeight > 0) {
        $img.trigger("load");
      } else {
        $img.trigger("error");
      }
    }
  }

  $(
    ".holder img, .team-flag img,.card-image img,.image-card img,.profile-pic img,.video-container video,.image-wrapper img,.logo img"
  ).each(function () {
    setupImageHandling($(this));
  });

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      $(mutation.addedNodes)
        .find(
          ".holder img, .team-flag img,.card-image img,.image-card img,.profile-pic img,.video-container video,.image-wrapper img,.logo img"
        )
        .each(function () {
          setupImageHandling($(this));
        });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});

$(document).ready(function () {
  $(".series-form,.collapse-text").on("click", function (e) {
    e.stopPropagation();
    const $seriesList = $(this);

    const $teamRow = $seriesList.closest(".team-row");
    const $teamRowLast = $seriesList.closest(".team-row.last");
    const teamName = $teamRow.data("team");
    const $matchRows = $('tr.match-details[data-team="' + teamName + '"]');

    $teamRow.toggleClass("active");
    if ($teamRow.hasClass("active")) {
      $teamRowLast.removeClass("last");
    } else {
      $teamRowLast.addClass("last");
    }

    $matchRows.slideToggle(250);
    $icon = $seriesList.find(".angle-down");
    $icon.toggleClass("rotated");
  });

  $(".points-table .match-details").hide();
});



