

function initializeCommonSliders() {
  $(".common-slider").each(function () {
    const $slider = $(this);

    // Skip if this is the tab slider to avoid conflicts
    if ($slider.hasClass("tab-slider")) {
      return;
    }

    let settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: true,
      swipe: true,
      touchMove: true,
      prevArrow:
        '<div class="icon flex justify-center slick-prev"><i class="ri-arrow-left-s-line"></i></div>',
      nextArrow:
        '<div class="icon flex justify-center slick-next"><i class="ri-arrow-right-s-line"></i></div>',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
          },
        },
      ],
    };

    if ($slider.hasClass("no-auto-play")) {
      settings.autoplay = false;
      settings.infinite = false;
    }

    if ($slider.hasClass("slides-2")) {
      settings.slidesToShow = 2;
      settings.slidesToScroll = 2;
      settings.responsive[0].settings.slidesToShow = 1;
      settings.responsive[0].settings.slidesToScroll = 1;
    }

    if ($slider.hasClass("slides-3")) {
      settings.infinite = false;
      settings.slidesToShow = 3;
      settings.slidesToScroll = 3;
      settings.responsive = [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
          },
        },
      ];
    }

    if ($slider.hasClass("slides-5")) {
      settings.infinite = false;
      settings.slidesToShow = 5;
      settings.slidesToScroll = 1;
      settings.responsive = [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
          },
        },
      ];
    }

    if ($slider.hasClass("slides-9")) {
      settings.infinite = false;
      settings.slidesToShow = 9;
      settings.slidesToScroll = 1;
      settings.centerMode = false;
      settings.variableWidth = false;
      settings.responsive = [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 8,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
          },
        },
        {
          breakpoint: 550,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
          },
        },
      ];
    }

    if ($slider.hasClass("slow-auto")) {
      settings.autoplaySpeed = 6000;
    }

    if ($slider.hasClass("fast-auto")) {
      settings.autoplaySpeed = 2000;
    }

    if ($slider.hasClass("no-arrows")) {
      settings.arrows = false;
    }

    if ($slider.hasClass("no-dots")) {
      settings.dots = false;
    }

    $slider.slick(settings);
  });

  $(".common-slider").on(
    "beforeChange",
    function (event, slick, currentSlide, nextSlide) {
      $(".slide-item").removeClass("active");
    }
  );

  $(".common-slider").on("afterChange", function (event, slick, currentSlide) {
    $(".slide-item").eq(currentSlide).addClass("active");
  });
}

// Tab slider functionality
function initializeTabSlider() {
  let currentTab = 0;
  const totalTabs = 3;
  let isAnimating = false;

  // Initialize
  updateNavigation();

  // Navigation event handlers
  $("#prev-btn").on("click", function (e) {
    e.preventDefault();
    if (!isAnimating && currentTab > 0) {
      navigateToTab(currentTab - 1);
    }
  });

  $("#next-btn").on("click", function (e) {
    e.preventDefault();
    if (!isAnimating && currentTab < totalTabs - 1) {
      navigateToTab(currentTab + 1);
    }
  });

  function navigateToTab(newTab) {
    if (newTab === currentTab || isAnimating) return;

    isAnimating = true;

    // Hide current tab
    $(`#tab-${currentTab}`).removeClass("active");

    // Show new tab
    currentTab = newTab;
    $(`#tab-${currentTab}`).addClass("active");

    updateNavigation();

    // Reset animation flag
    setTimeout(() => {
      isAnimating = false;
    }, 100);
  }

  function updateNavigation() {
    $("#page-indicator").text(`${currentTab + 1} / ${totalTabs}`);

    // Update button states
    if (currentTab === 0) {
      $("#prev-btn").prop("disabled", true);
    } else {
      $("#prev-btn").prop("disabled", false);
    }

    if (currentTab === totalTabs - 1) {
      $("#next-btn").prop("disabled", true);
    } else {
      $("#next-btn").prop("disabled", false);
    }
  }
}

// Document ready function
$(document).ready(function () {
  initializeCommonSliders();
  initializeTabSlider();
});




