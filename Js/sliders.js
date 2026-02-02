// Complete Gallery Modal Handler (for gallery page)

let modalSlider;
let imageElements = [];
let isFullscreen = false;

$(document).ready(function () {
  loadGalleryImages();
  loadSliderImages();
  initializeCommonSliders();
  imageElements = $(".image-card").toArray();

  $(".image-card").click(function () {
    const index = $(".image-card").index(this);
    openModal(index);
  });

  $(".close-btn").click(closeModal);
  $(".expand-btn").click(toggleFullscreen);

  $(document).keydown(function (e) {
    if (!$(".gallery-modal").is(":visible")) return;

    switch (e.keyCode) {
      case 27:
        if (isFullscreen) {
          exitFullscreen();
        } else {
          closeModal();
        }
        break;
      case 37:
        if (modalSlider) modalSlider.slick("slickPrev");
        break;
      case 39:
        if (modalSlider) modalSlider.slick("slickNext");
        break;
    }
  });
  $(".gallery-modal").click(function (e) {
    if (e.target === this) {
      closeModal();
    }
  });
});

function closeModal() {
  if (modalSlider) {
    modalSlider.slick("unslick");
  }

  if (isFullscreen) {
    exitFullscreen();
  }

  $(".gallery-modal").fadeOut(300);
  $("body").css("overflow", "auto");
}

function updateCaption(index) {
  const imageData = images[index];
  const caption = imageData.caption || "Cricket match moment captured";
  const source = imageData.source || "© Getty Images";

  $(".caption-text").text(caption);
  $(".caption-source").text(source);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    enterFullscreen();
  } else {
    exitFullscreen();
  }
}

function enterFullscreen() {
  const elem = document.documentElement;

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }

  $(".expand-btn i")
    .removeClass("ri-fullscreen-line")
    .addClass("ri-fullscreen-exit-line");
  isFullscreen = true;
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }

  $(".expand-btn i")
    .removeClass("ri-fullscreen-exit-line")
    .addClass("ri-fullscreen-line");
  isFullscreen = false;
}

document.addEventListener("fullscreenchange", handleFullscreenChange);
document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
document.addEventListener("msfullscreenchange", handleFullscreenChange);

function handleFullscreenChange() {
  if (
    !document.fullscreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    $(".expand-btn i")
      .removeClass("ri-fullscreen-exit-line")
      .addClass("ri-fullscreen-line");
    isFullscreen = false;
  }
}

function openGalleryModal(index = 0) {
  openModal(index);
}

function loadSliderImages() {
  const $slider = $(".modal-slider");
  $slider.empty();
  const sliderImages = images.slice(6);

  sliderImages.forEach((image) => {
    const slideItem = $("<div>").addClass("slide-item");
    const img = $("<img>")
      .attr("src", image.url)
      .attr("alt", image.alt)
      .css("width", "100%");

    slideItem.append(img);
    $slider.append(slideItem);
  });
}

function initializeCommonSliders() {
  $(".common-slider").each(function () {
    const $slider = $(this);

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

    if ($slider.hasClass("slides-8")) {
      settings.infinite = false;
      settings.slidesToShow = 8;
      settings.slidesToScroll = 4;
      settings.centerMode = false;
      settings.variableWidth = false;
      settings.responsive = [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
            arrows: true,
          },
        },
        {
          breakpoint: 550,
          settings: {
            slidesToShow: 2,
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

function openModal(index) {
  const slidesHtml = images
    .map((image, i) => {
      return `<div class="image-wrapper">
              <img class="modal-image" src="${image.url}" alt="${image.alt}">
          </div>`;
    })
    .join("");

  $(".modal-slider").html(slidesHtml);

  modalSlider = $(".modal-slider").slick({
    dots: false,
    arrows: false,
    infinite: false,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: index,
    fade: false,
    cssEase: "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
    prevArrow: '<div class="slick-prev slide-left"></div>',
    nextArrow: '<div class="slick-next slide-right"></div>',

    onBeforeChange: function (slider, currentSlide, nextSlide) {
      var direction =
        nextSlide > currentSlide ||
        (currentSlide === slider.slideCount - 1 && nextSlide === 0)
          ? "slide-from-right"
          : "slide-from-left";

      $(slider.$slider)
        .removeClass("slide-from-left slide-from-right slide-complete")
        .addClass("sliding " + direction);

      $(slider.$slides).removeClass("active-slide previous-slide");
      $(slider.$slides.eq(currentSlide)).addClass("active-slide");
      $(slider.$slides.eq(nextSlide)).addClass("next-slide");
    },

    onAfterChange: function (slider, currentSlide) {
      $(slider.$slider)
        .removeClass("sliding slide-from-left slide-from-right")
        .addClass("slide-complete");

      $(slider.$slides).removeClass("active-slide next-slide previous-slide");
      $(slider.$slides.eq(currentSlide)).addClass("active-slide");

      setTimeout(function () {
        $(slider.$slider).removeClass("slide-complete");
      }, 50);
    },

    onInit: function (slider) {
      $(slider.$slider).removeClass(
        "sliding slide-from-left slide-from-right slide-complete"
      );
      $(slider.$slides.eq(slider.currentSlide)).addClass("active-slide");
    },
  });

  modalSlider.on(
    "beforeChange",
    function (event, slick, currentSlide, nextSlide) {
      updateCaption(nextSlide);
      var direction =
        nextSlide > currentSlide ||
        (currentSlide === slick.slideCount - 1 && nextSlide === 0)
          ? "slide-from-right"
          : "slide-from-left";
      $(this).data("slide-direction", direction);
    }
  );

  $(".prev-btn")
    .off("click")
    .click(function () {
      $(".modal-slider")
        .removeClass("slide-from-right slide-complete")
        .addClass("sliding slide-from-left");

      modalSlider.slick("slickPrev");
      setTimeout(function () {
        $(".modal-slider").removeClass("sliding slide-from-left");
      }, 900);
    });
  $(".next-btn")
    .off("click")
    .click(function () {
      $(".modal-slider")
        .removeClass("slide-from-left slide-complete")
        .addClass("sliding slide-from-right");

      modalSlider.slick("slickNext");

      setTimeout(function () {
        $(".modal-slider").removeClass("sliding slide-from-right");
      }, 900);
    });
  modalSlider.on("swipe", function (event, slick, direction) {
    if (direction === "left") {
      $(".modal-slider")
        .removeClass("slide-from-left slide-complete")
        .addClass("sliding slide-from-right");
    } else if (direction === "right") {
      $(".modal-slider")
        .removeClass("slide-from-right slide-complete")
        .addClass("sliding slide-from-left");
    }
  });

  $(".gallery-modal").fadeIn(300);
  $("body").css("overflow", "hidden");
  updateCaption(index);
}

class HeaderMatchesSlider {
  constructor() {
    this.$slider = $(".matches-slider");
    this.$prevBtn = $(".prevBtn");
    this.$nextBtn = $(".nextBtn");
    this.$categories = $(".matches-category");

    this.init();
  }

  init() {
    this.$slider.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      infinite: false,
      adaptiveHeight: true,
    });

    this.$nextBtn.on("click", () => this.$slider.slick("slickNext"));
    this.$prevBtn.on("click", () => this.$slider.slick("slickPrev"));

    $(document).on("click", ".matches-category", (e) => {
      e.preventDefault();
      const category = $(e.target).data("category");

      this.$categories.removeClass("active");
      $(e.target).addClass("active");

      if (this.$slider.slick.slideCount != 4) {
        this.$prevBtn.addClass("hidden");
        this.$nextBtn.addClass("hidden");
      } 

      this.filterMatches(category);
    });

    this.filterMatches("all");

    this.$slider.on("afterChange", (event, slick, currentSlide) => {
      this.updateButtons(slick, currentSlide);
    });
  }

  filterMatches(category) {
    if (category === "all") {
      this.$slider.find(".match-card").removeClass("hidden");
    } else {
      this.$slider.find(".match-card").each(function () {
        const $card = $(this);
        if ($card.data("category") === category) {
          $card.removeClass("hidden");
        } else {
          $card.addClass("hidden");
        }
      });
    }
    this.$slider.slick("slickGoTo", 0);

    const slick = this.$slider.slick("getSlick");
    this.updateButtons(slick, 0);
  }

  updateButtons(slick, currentSlide) {
    this.$prevBtn.prop("disabled", currentSlide === 0);
    const lastSlide = slick.slideCount - slick.options.slidesToShow;
    this.$nextBtn.prop("disabled", currentSlide >= lastSlide);
  }
}

$(document).ready(function () {
  new HeaderMatchesSlider();
});
