let aboutbtn = document.querySelector("#aboutbtn");
let quote = document.querySelector("#quote");
let pres = document.querySelector(".pres");
let mySkills = document.querySelectorAll("#my-skills");
let clickToShowSkill = document.querySelector("#click-to-show-skill");
let welcome = document.querySelector("#welcome");
let navlinks = document.querySelectorAll(".navlinks");
let svgs = document.querySelectorAll(".svg");
let portrait = document.querySelector(".portrait");
let svgContainer = document.querySelector("#svg-container");
let cards = document.querySelectorAll(".card");
let cardContainer = document.querySelector(".card-container");
let mail = document.querySelector("#mail");

// tableau de quotes
const quotes = [
  "“We cannot solve problems with the kind of thinking we employed when we came up with them.”   — Albert Einstein",
  "“Learn as if you will live forever, live like you will die tomorrow.”   — Mahatma Gandhi",
  "“Stay away from those people who try to disparage your ambitions. Small minds will always do that, but great minds will give you a feeling that you can become great too.”   — Mark Twain",
  "“When you give joy to other people, you get more joy in return. You should give a good thought to happiness that you can give out.”   — Eleanor Roosevelt",
  "“When you change your thoughts, remember to also change your world.”  — Norman Vincent Peale",
  "“It is only when we take chances, when our lives improve. The initial and the most difficult risk that we need to take is to become honest.    — Walter Anderson",
  "“Nature has given us all the pieces required to achieve exceptional wellness and health, but has left it to us to put these pieces together.”  — Diane McLaren",
];

//! Affiche une citation au hasard à chaque connection
// retourne un random number
function getRandomNum(min, max) {
  return Math.random() * (max - min + 1) + min;
}
// définit le min et max selon le nombre de quotes dans le tableau
let randomResult = getRandomNum(0, 5);
// Affiche une quote
function randomQuoteDisplay() {
  if (randomResult >= 7) {
    quote.textContent = `${quotes[2]}`;
  } else {
    quote.textContent = `${quotes[Math.round(randomResult)]}`;
    console.log(quotes.length);
  }
}
randomQuoteDisplay();

// function changeText() {
//   quote.classList.add("hidden");
//   pres.classList.remove("hidden");
// }

let slideInLogos = function () {
  let delay = 0;
  svgs.forEach((svg) => {
    delay = delay + 300;
    setTimeout(() => {
      svg.classList.remove("hidden");
      svg.classList.add("slidein");
    }, delay);
  });
};
let slideInCards = function () {
  console.log("slidein appelé");
  let delay = 0;
  cards.forEach((card) => {
    delay = delay + 300;
    setTimeout(() => {
      card.classList.remove("hidden");
      card.classList.add("slidein");
    }, delay);
  });
};

const animateElements = {
  hide(elm) {
    elm.classList.remove("show"); //
    elm.classList.add("hidden");
  },
  appear(elm) {
    elm.classList.remove("hidden");
    elm.classList.add("show");
  },
  toggleDisplay(elm) {
    elm.classList.toggle("hidden");
  },
  slideInLogos() {
    slideInLogos();
  },
  slideInCards() {
    slideInCards();
  },
  slideInMail() {
    mail.classList.remove("hidden");
    mail.classList.add("slidein");
  },
  scrollToTop(elm, trigger) {
    elm.addEventListener(trigger, () => {
      window.scrollTo(0, 0);
    });
  },
  hideAllELm() {
    quote.classList.add("hidden");
    pres.classList.remove("show");
    pres.classList.add("hidden");
    portrait.classList.remove("show");
    portrait.classList.add("hidden");
    svgs.forEach((svg) => {
      svg.classList.add("hidden");
    });
    cards.forEach((card) => {
      card.classList.add("hidden");
    });
  },
  changeWelcomeTextInNav() {
    for (const navlink of navlinks) {
      navlink.addEventListener("click", (event) => {
        if (event.target.textContent != "contact") {
          welcome.textContent = event.target.textContent;
          console.log(event.target.textContent);
        } else {
          welcome.textContent = "Let's work together";
        }
      });
    }
  },
};

navlinks[0].addEventListener("click", function () {
  animateElements.appear(quote),
    animateElements.appear(portrait),
    animateElements.hide(pres);
  animateElements.hide(mail);
  cards.forEach((card) => {
    animateElements.hide(card);
  });
});
navlinks[1].addEventListener("click", function () {
  animateElements.hide(quote), animateElements.hide(mail);
  cards.forEach((card) => {
    card.classList.add("hidden");
  });
  animateElements.appear(portrait),
    setTimeout(() => {
      animateElements.appear(pres);
    }, 1000);
});
navlinks[2].addEventListener("click", animateElements.slideInLogos);
navlinks[2].addEventListener("click", function () {
  animateElements.hide(mail);
  cards.forEach((card) => {
    animateElements.hide(card);
  });
});
navlinks[3].addEventListener("click", function () {
  svgs.forEach((svg) => {
    animateElements.hide(svg);
  });
  animateElements.slideInCards, animateElements.hide(mail);
});
navlinks[3].addEventListener("click", animateElements.slideInCards);
animateElements.changeWelcomeTextInNav(navlinks[1], "click", welcome);
navlinks[4].addEventListener("click", animateElements.hideAllELm);
navlinks[4].addEventListener("click", animateElements.slideInMail);
