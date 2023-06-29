const addButtonList = document.querySelectorAll(".addContentButton");
const contentDiv = document.getElementById("cart");
const totalPrice = document.querySelector("#total");
let prices = [];
addButtonList.forEach(function(button) {
  button.addEventListener("click", function() {
    const cont = button.parentElement;
     const conte = cont.parentElement;

    const firstImage = conte.querySelector(".carousel-inner .carousel-item:first-child img");
    const firstImageUrl = firstImage.getAttribute("src");


    const content = conte.querySelector(".card-body");
     const ct = content.querySelector(".card-title");
     
     const ctxt = content.querySelector(".card-text");
     let p = ctxt.querySelector(".price");
     prices.push(p.textContent);
  const newDiv = document.createElement("div");
  newDiv.className = "card mb-3";
  newDiv.innerHTML = `<div class="row g-0">
    <div class="col-md-4">
      <img src="${firstImageUrl}"
        class="img-fluid rounded-start">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${ct.textContent}</h5>
        <p class="card-text">${ctxt.textContent}</p>
      </div>
    </div>
  </div>`;
  const numbers = prices.map(str => parseFloat(str.replace(/,/g, '')));
const sum = numbers.reduce((total, num) => total + num, 0);
const sumWithDecimalsAndCommas = sum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
totalPrice.textContent = sumWithDecimalsAndCommas;
  console.log(prices);
  contentDiv.appendChild(newDiv);
  });
});