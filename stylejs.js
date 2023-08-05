const addButtonList = document.querySelectorAll(".addContentButton");
const contentDiv = document.getElementById("cart");
const totalPrice = document.querySelector("#total");

let prices = [];

addButtonList.forEach(function (button) {
  button.clickCount = 0;
  button.addEventListener(
    "click",
    (function () {
      return function () {
        button.clickCount++;
        toastNotify();
        const cont = button.parentElement;
        const conte = cont.parentElement;

        const firstImage = conte.querySelector(
          ".carousel-inner .carousel-item:first-child img"
        );
        const firstImageUrl = firstImage.getAttribute("src");

        const content = conte.querySelector(".card-body");
        const ct = content.querySelector(".card-title");

        const ctxt = content.querySelector(".card-text");
        let p = ctxt.querySelector(".price");
        const cdtext = ctxt.innerText;
        prices.push(p.textContent);

        if (button.clickCount === 1) {
          const newDiv = document.createElement("div");
          newDiv.className = "card";
          newDiv.innerHTML = `<div class="row g-0">
          <div class="col-md-4">
            <img src="${firstImageUrl}" class="img-fluid rounded-start">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${ct.textContent}</h5>
              <p class="card-text">MRP: ₹<span class="price">${cdtext.slice(
                6
              )}</span></p>
              <div class="input-group mb-3 add">
                <button class="btn btn-outline-secondary minus" type="button" id="button-addon1">-</button>
                <input type="number" class="form-control-sm num" value="1" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                <button class="btn btn-outline-secondary plus" type="button" id="button-addon2">+</button>
              </div>
            </div>
          </div>
        </div>`;

          contentDiv.appendChild(newDiv);
        } else {
          const cards = contentDiv.querySelectorAll(".card");
          for (let i of cards) {
            const cadt = i.querySelector(".card-title");
            const titleInCart = cadt.innerText;
            if (ct.textContent == titleInCart) {
              const num = i.querySelector(".num");
              num.value++;
            }
          }
        }

        const numbers = prices.map((str) => parseFloat(str.replace(/,/g, "")));
        const sum = numbers.reduce((total, num) => total + num, 0);
        const sumWithDecimalsAndCommas = sum.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        totalPrice.textContent = sumWithDecimalsAndCommas;
      };
    })()
  );
});

// ButtonIncrementor
contentDiv.addEventListener("click", function (e) {
  const targetElement = e.target;
  const targetParent = targetElement.parentNode.parentNode; //doing
  const totalPric = targetParent.querySelector(".price").textContent;
  const num = targetElement.parentNode.querySelector(".num");

  if (targetElement.classList.contains("minus")) {
    if (num.value > 0) {
      const index = prices.indexOf(totalPric);
      if (index !== -1) {
        prices.splice(index, 1);
      }
      num.value--;
    }
  } else if (targetElement.classList.contains("plus")) {
    if (num.value < 100) {
      prices.push(totalPric);
      num.value++;
    }
  }

  const numbers = prices.map((str) => parseFloat(str.replace(/,/g, "")));
  const sum = numbers.reduce((total, num) => total + num, 0);
  const sumWithDecimalsAndCommas = sum.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  totalPrice.textContent = sumWithDecimalsAndCommas;

  if (num.value == 0) {
    addButtonList.forEach(function (button) {
      const targetVariable =
        targetElement.parentNode.previousElementSibling.previousElementSibling
          .innerText;
      const buttonVariable =
        button.previousElementSibling.previousElementSibling.innerText;
      if (buttonVariable === targetVariable) {
        button.clickCount = 0; // Reset click count
      }
      targetParent.parentNode.parentNode.parentNode.remove();
    });
  }
});

const toastBox = document.querySelector("#toastBox");

function toastNotify() {
  const toast = document.createElement("div");
  toast.className = "toastMsg";
  toast.innerHTML = `<ion-icon name="checkmark-circle" class="check"></ion-icon>Added to Cart`;
  toastBox.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

let app = angular.module("my-app", []);
app.controller("my-control", function ($scope, $sce) {
  $scope.List = [
    $sce.trustAsHtml(`<div><a>Air Jordan 1 Next Chapter</a></div>`),
    $sce.trustAsHtml(`<div><a>Nike Air Force 1 Mid '07</a></div>`),
    $sce.trustAsHtml(`<div><a>Nike Air Max 1'86 OG NRG</a></div>`),
    $sce.trustAsHtml(`<div><a>Air Jordan 7 Retro</a></div>`),
    $sce.trustAsHtml(`<div><a>Superstar Shoes</a></div>`),
    $sce.trustAsHtml(`<div><a>NMD_R1 V2 Shoes</a></div>`),
    $sce.trustAsHtml(`<div><a>Converse Chuck Taylor All Stars</a></div>`),
    $sce.trustAsHtml(`<div><a>Reebok Question Low Shoes</a></div>`),
    $sce.trustAsHtml(`<div><a>Nike Air Max 90 SE</a></div>`),
    $sce.trustAsHtml(`<div><a>BMW M Motorsport SPEEDFUSION</a></div>`),
    $sce.trustAsHtml(
      `<div><a>304 BEIGE DOODLE PRINT CANVAS HIGH-TOP SNEAKER</a></div>`
    ),
    $sce.trustAsHtml(`<div><a>706 BLACK RED GRAPHIC CHUNKY SNEAKER</a></div>`),
  ];
  $scope.test = "";

  $scope.showSearch = function () {
    $("#search").slideDown(2000);
    $("body").addClass("overlay");
  };

  $scope.hideSearch = function () {
    $("#search").slideUp(200);
    $("body").removeClass("overlay");
  };
});
