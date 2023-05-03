let imgs = [];
let authors = [];
let titles = [];
let costs = [];
let trs = [];
let clearbtn = [];
let currencyCodes = [];
let currencyMid = [];
let order = [];
let rentalDates = [];
let purchasers = [];
let prices;
let currencyList = document.querySelector(".currencyList");
let multiplier = document.querySelector(".multiplier");
let tbody = document.querySelector("tbody");
let summary = document.querySelector(".summary");
let sum;
let startDate = document.querySelector("#startDate");
let endDateDiv = document.querySelector(".endDate");
let endDate = document.querySelector("#endDate");
let startDateValue = new Date().getTime();
let endDateValue = new Date().getTime();
let result = 1;
let index = 0;
let orderBtn = document.querySelector("#orderBtn");


startDate.addEventListener("change", function () {
  endDateDiv.style.opacity = 1;
  endDate.min = `${startDate.value}`;
});
endDate.addEventListener("change", sumUpdate);
currencyList.addEventListener("change", summaryByCurrency);

orderBtn.addEventListener("click", orderConfirmation);

window.addEventListener("load", function () {
	endDateDiv.style.opacity = 0;
  axios({
    method: "GET",
    url: "http://api.nbp.pl/api/exchangerates/tables/a/today/?format=json",
  })
    .then(function (response) {
      let currency = response.data[0].rates;

      currencyCodes = [
        ...currency.map((e) => {
          return e.code;
        }),
      ];
      currencyMid = [
        ...currency.map((e) => {
          return e.mid;
        }),
      ];
      showCart();
      showTable(imgs);
      sumUpdate();
      addToCurrencyList(currencyCodes);
    })
    .catch(function (error) {
      if (error.response)
        if (error.response.status == 404) alert("Unrecognized search");
        else alert("Unable to download data");
      else alert("No connection");
    });
});

function showCart() {
  imgs = JSON.parse(window.localStorage.getItem("cart_imgs"));
  authors = JSON.parse(window.localStorage.getItem("cart_authors"));
  titles = JSON.parse(window.localStorage.getItem("cart_titles"));
  costs = JSON.parse(window.localStorage.getItem("cart_cost"));
  localStorage.removeItem("cart_imgs");
  localStorage.removeItem("cart_authors");
  localStorage.removeItem("cart_titles");
  localStorage.removeItem("cart_cost");
}

function showTable(x) {
  x.forEach((e, i) => {
    let tr = document.createElement("tr");
    tbody.appendChild(tr);
    let th = document.createElement("th");
    th.innerHTML = i + 1;
    let td1 = document.createElement("td");
    td1.innerHTML = `<img class='img-fluid img-thumbnail' src='${imgs[i]}' alt='${authors[i]}, ${titles[i]}' />`;
    let td2 = document.createElement("td");
    td2.innerHTML = authors[i];
    let td3 = document.createElement("td");
    td3.innerHTML = titles[i];
    let td4 = document.createElement("td");
    td4.classList.add("td4");
    td4.innerHTML = costs[i];
    let td5 = document.createElement("td");
    td5.innerHTML = '<i class="fa-solid fa-ban"></i>';
    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
  });
  trs = [...document.querySelectorAll("tbody tr")];
  for (let i = 0; i < trs.length; i++) {
    if (i % 2 == 0) {
      trs[i].classList.add("table-transparent");
    } else {
      trs[i].classList.add("table-warning");
    }
  }

  clearbtn = [...document.querySelectorAll("td i")];
  clearbtn.forEach((e, i) => {
    e.addEventListener("click", function () {
      imgs.splice(i, 1);
      authors.splice(i, 1);
      titles.splice(i, 1);
      costs.splice(i, 1);
      tbody.innerHTML = "";
      showTable(imgs);
      sumUpdate();
    });
  });
}

function sumUpdate() {
  sum = 0;
  for (let i = 0; i < costs.length; i++) {
    sum += costs[i];
  }

  let month;
  let day = new Date().getDate();
  if (new Date().getMonth() == 0) {
    month = "01";
  } else if (new Date().getMonth() == 1) {
    month = "02";
  } else if (new Date().getMonth() == 2) {
    month = "03";
  } else if (new Date().getMonth() == 3) {
    month = "04";
  } else if (new Date().getMonth() == 4) {
    month = "05";
  } else if (new Date().getMonth() == 5) {
    month = "06";
  } else if (new Date().getMonth() == 6) {
    month = "07";
  } else if (new Date().getMonth() == 7) {
    month = "08";
  } else if (new Date().getMonth() == 8) {
    month = "09";
  } else if (new Date().getMonth() == 9) {
    month = "10";
  } else if (new Date().getMonth() == 10) {
    month = "11";
  } else if (new Date().getMonth() == 11) {
    month = "12";
  }

  if (day <= 9) {
    day = `0${day}`;
  } else {
    day = new Date().getDate();
  }
  startDate.min = `${new Date().getFullYear()}-${month}-${day}`;
  if (startDate.value != "") {
    startDateValue = new Date(startDate.value).getTime();
    endDateValue = new Date(endDate.value).getTime();
    startDate.min = `${new Date().getFullYear()}-${month}-${day}`;
    endDate.min = `${startDate.value}`;
    if (startDateValue === endDateValue) {
      alert("'End date' can't be the same as 'Start date'!");
    }
    result = (endDateValue - startDateValue) / 1000 / 60 / 60 / 24;
  }
  summary.innerHTML = `<strong>${sum * result} USD</strong>`;
  summaryByCurrency();
}

function addToCurrencyList(x) {
  x.forEach((e) => {
    let option = document.createElement("option");
    option.text = e;
    currencyList.add(option);
  });
}

function summaryByCurrency() {
  let i = currencyCodes.indexOf(currencyList.value);
  if (currencyList.value != "Open this select menu") {
    multiplier.innerHTML = `<strong>${Math.floor(
      sum * result * currencyMid[i]
    )} ${currencyList.value}</strong>`;
  }
}

function orderConfirmation() {
  if (startDate.value != "" && endDate.value != "") {
    rentalDates.push(startDate.value);
    rentalDates.push(endDate.value);
    authors.forEach((e, i) => {
      order.push(`${e}, "${titles[i]}"`);
    });
    prices = sum * result;
    purchasers.push(document.querySelector("#validationCustom01").value);
    purchasers.push(document.querySelector("#validationCustom03").value);
    purchasers.push(document.querySelector("#validationCustom07").value);
    purchasers.push(document.querySelector("#validationCustom05").value);
    purchasers.push(document.querySelector("#validationCustom04").value);

    if (window.localStorage.getItem("index")) {
      index = window.localStorage.getItem("index");
    }
    window.localStorage.setItem(`order${index}`, JSON.stringify(order));
    window.localStorage.setItem(
      `rentalDates${index}`,
      JSON.stringify(rentalDates)
    );
    window.localStorage.setItem(
      `purchasers${index}`,
      JSON.stringify(purchasers)
    );
    window.localStorage.setItem(`prices${index}`, prices);

    index++;
    window.localStorage.setItem("index", index);
    alert("Order placed, window will be closed");
    window.close();
  } else {
    alert("You need to set 'Start date' and 'End date'!");
  }
}

(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
