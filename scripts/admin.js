let logins = [];
let passwords = [];

if (window.localStorage.getItem(`logins`)) {
  logins = JSON.parse(window.localStorage.getItem(`logins`));
  passwords = JSON.parse(window.localStorage.getItem(`passwords`));
} else {
  logins = ["admin@rentanart.com"];
  passwords = ["Admin1234"];
}
let ordered = [];
let rentalDates = [];
let purchasers = [];
let price = [];
let newItems = [];

$("#adminPanel").css("display", "none");

function showTable() {
  let index = window.localStorage.getItem(`index`);
  for (let i = 0; i < index; i++) {
    ordered.push(JSON.parse(window.localStorage.getItem(`order${i}`)));
    purchasers.push(JSON.parse(window.localStorage.getItem(`purchasers${i}`)));
    rentalDates.push(
      JSON.parse(window.localStorage.getItem(`rentalDates${i}`))
    );
    price.push(window.localStorage.getItem(`prices${i}`));
    $("tbody tr")[i].children[1].innerHTML = ordered[i].join("; ");
    $("tbody tr")[i].children[2].innerHTML = purchasers[i].join(", ");
    $("tbody tr")[i].children[3].innerHTML = rentalDates[i].join(" / ");
    $("tbody tr")[i].children[4].innerHTML = `${price[i]} USD`;
  }
}

$("#newUserBtn").on("click", addNewUser);
$("#newItemBtn").on("click", addNewItem);

$("#login").on({
  keypress: function (e) {
    if (e.keyCode === 13) {
      if (
        logins.includes($("#login").val()) &&
        passwords.includes($("#inputPassword").val()) &&
        logins.indexOf($("#login").val()) ===
          passwords.indexOf($("#inputPassword").val())
      ) {
        loadPanel();
      } else {
        alert("'Email address' or 'Password' is incorrect");
      }
    }
  },
});

$("#inputPassword").on({
  keypress: function (e) {
    if (e.keyCode === 13) {
      if (
        logins.includes($("#login").val()) &&
        passwords.includes($("#inputPassword").val()) &&
        logins.indexOf($("#login").val()) ===
          passwords.indexOf($("#inputPassword").val())
      ) {
        loadPanel();
      } else {
        alert("'Email address' or 'Password' is incorrect");
      }
    }
  },
});

function loadPanel() {
  $("#logPanel").css("display", "none");
  $("#adminPanel").css("display", "block");
  showTable();
}

function addNewUser() {
  if (
    $("#newEmail").val() != "" &&
    $("#newPassword").val() != "" &&
    /^[a-z0-9.@]*$/.test($("#newEmail").val()) &&
    /^[^!@#$%&*(){}:"';/?.>,<^\\\[\]+\-=_`~]*$/.test($("#newPassword").val()) &&
    $("#newPassword").val().length > 7 &&
    $("#newPassword").val().length < 21
  ) {
    logins.push($("#newEmail").val());
    passwords.push($("#newPassword").val());
    window.localStorage.setItem(`logins`, JSON.stringify(logins));
    window.localStorage.setItem(`passwords`, JSON.stringify(passwords));
  } else {
    alert("'Email address' or 'Password' does not meet the requirements");
  }
  $("#newEmail").val("");
  $("#newPassword").val("");
  alert("New User is added");
}

function addNewItem() {
  if (
    $("#formFile").val() != "" &&
    $("#author").val() != "" &&
    $("#title").val() != "" &&
    $("#price").val() != "" &&
    /.j(p(g))/.test($("#formFile").val()) ^
      /.j(p(e(g)))/.test($("#formFile").val()) ^
      /.p(n(g))/.test($("#formFile").val()) &&
    /^[0-9]*$/.test($("#price").val())
  ) {
    newItems.push($("#formFile").val());
    newItems.push($("#author").val());
    newItems.push($("#title").val());
    newItems.push($("#price").val());
    window.localStorage.setItem(`newItems`, newItems);
    alert("New Item is added");
  } else {
    lert("Wrong data was inserted");
  }
}
