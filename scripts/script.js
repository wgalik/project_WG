let input = document.querySelector("#tags");
let btn = document.querySelector(".confirmbtn");
let searchTable = document.querySelector(".searchTable");
let tableHead = document.querySelector(".tableHead");
let zoomIn = [...document.getElementsByClassName("zoom_in")];
let cart = [...document.getElementsByClassName("cart")];
let ban = [...document.getElementsByClassName("ban")];
let cartBtn = document.querySelector(".cartBtn");
let imageID = [];
let authors = [];
let titles = [];
let cart_imgs = [];
let cart_authors = [];
let cart_titles = [];
let cart_cost = [];
let gallery = document.querySelector("#gallery");
let galleryImage = document.querySelector(".image");
let backButton = document.querySelector(".back");
let prevButton = document.querySelector(".prev");
let nextButton = document.querySelector(".next");

btn.addEventListener("click", btnClickConfirm);

search.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    btnClickConfirm();
  }
});

function btnClickConfirm() {
  search = input.value;
  imageID.splice(0, imageID.length);
  authors.splice(0, authors.length);
  titles.splice(0, titles.length);
  api(search);
}

function api(x) {
  let apiSearch = fetch(`https://api.artic.edu/api/v1/artworks/search?q=${x}`)
    .then((res) => {
      if (res.ok) {
        res.json().then(function (res) {
          let artapi = res.data;

          let apiarray = [
            ...artapi.map((e) => {
              return e.id;
            }),
          ];
          if (apiarray.length > 0) {
            apiarray.forEach((e) => {
              fetch(`https://api.artic.edu/api/v1/artworks/${e}`).then(
                (res) => {
                  if (res.ok) {
                    res.json().then(function (res) {
                      imageID.push(res.data.image_id);
                      authors.push(res.data.artist_title);
                      titles.push(res.data.title);
                      show(apiarray);
                    });
                  }
                }
              );
            });
          } else {
            hideTable();
          }
        });
      } else {
        if (res.status == 404) alert("Unrecognized search");
        else alert("Unable to download data");
      }
    })
    .catch(function () {
      alert("No connection");
    });

  input.value = "";
}

function hideTable() {
  document.querySelector(
    "h3"
  ).innerHTML = `<span>"${search}"</span> does not exist in out database`;
  searchTable.style.display = "none";
  tableHead.style.display = "none";
}

function show(x) {
  document.querySelector(
    "h3"
  ).innerHTML = `Searched by "<span>${search}"</span>`;
  searchTable.style.display = "block";
  tableHead.style.display = "flex";

  cart.forEach((e) => {
    if (e.classList.contains("clicked")) {
      e.classList.remove("clicked");
    }
  });

  if (
    x[0] != undefined ||
    imageID[0] != undefined ||
    authors[0] != undefined ||
    titles[0] != undefined
  ) {
    if (
      !cart_imgs.includes(
        `https://www.artic.edu/iiif/2/${imageID[0]}/full/843,/0/default.jpg`
      )
    ) {
      document.querySelector(
        `.row1 a #image`
      ).src = `https://www.artic.edu/iiif/2/${imageID[0]}/full/843,/0/default.jpg`;
      document.querySelector(
        `.row1 a #image`
      ).alt = `${authors[0]}, "${titles[0]}"`;
      document.querySelector(`.row1 #author`).innerHTML = authors[0];
      document.querySelector(`.row1 #title`).innerHTML = titles[0];
      document.querySelector(`.row1 #cost`).innerHTML = `${
        1000 + Math.floor(Math.random() * 900 + 1)
      }`;
      document.querySelector(".row1").style.display = "";
    } else {
      document.querySelector(".row1").style.display = "none";
    }
  } else {
    document.querySelector(".row1").style.display = "none";
  }

  if (
    x[1] != undefined ||
    imageID[1] != undefined ||
    authors[1] != undefined ||
    titles[1] != undefined
  ) {
    if (
      !cart_imgs.includes(
        `https://www.artic.edu/iiif/2/${imageID[1]}/full/843,/0/default.jpg`
      )
    ) {
      document.querySelector(
        `.row2 a #image`
      ).src = `https://www.artic.edu/iiif/2/${imageID[1]}/full/843,/0/default.jpg`;
      document.querySelector(
        `.row2 a #image`
      ).alt = `${authors[1]}, "${titles[1]}"`;
      document.querySelector(`.row2 #author`).innerHTML = authors[1];
      document.querySelector(`.row2 #title`).innerHTML = titles[1];
      document.querySelector(`.row2 #cost`).innerHTML = `${
        1000 + Math.floor(Math.random() * 900 + 1)
      }`;
      document.querySelector(".row2").style.display = "";
    } else {
      document.querySelector(".row2").style.display = "none";
    }
  } else {
    document.querySelector(".row2").style.display = "none";
  }

  if (
    x[2] != undefined ||
    imageID[2] != undefined ||
    authors[2] != undefined ||
    titles[2] != undefined
  ) {
    if (
      !cart_imgs.includes(
        `https://www.artic.edu/iiif/2/${imageID[2]}/full/843,/0/default.jpg`
      )
    ) {
      document.querySelector(
        `.row3 a #image`
      ).src = `https://www.artic.edu/iiif/2/${imageID[2]}/full/843,/0/default.jpg`;
      document.querySelector(
        `.row3 a #image`
      ).alt = `${authors[2]}, "${titles[2]}"`;
      document.querySelector(`.row3 #author`).innerHTML = authors[2];
      document.querySelector(`.row3 #title`).innerHTML = titles[2];
      document.querySelector(`.row3 #cost`).innerHTML = `${
        1000 + Math.floor(Math.random() * 900 + 1)
      }`;
      document.querySelector(".row3").style.display = "";
    } else {
      document.querySelector(".row3").style.display = "none";
    }
  } else {
    document.querySelector(".row3").style.display = "none";
  }

  if (
    x[3] != undefined ||
    imageID[3] != undefined ||
    authors[3] != undefined ||
    titles[3] != undefined
  ) {
    if (
      !cart_imgs.includes(
        `https://www.artic.edu/iiif/2/${imageID[3]}/full/843,/0/default.jpg`
      )
    ) {
      document.querySelector(
        `.row4 a #image`
      ).src = `https://www.artic.edu/iiif/2/${imageID[3]}/full/843,/0/default.jpg`;
      document.querySelector(
        `.row4 a #image`
      ).alt = `${authors[3]}, "${titles[3]}"`;
      document.querySelector(`.row4 #author`).innerHTML = authors[3];
      document.querySelector(`.row4 #title`).innerHTML = titles[3];
      document.querySelector(`.row4 #cost`).innerHTML = `${
        1000 + Math.floor(Math.random() * 900 + 1)
      }`;
      document.querySelector(".row4").style.display = "";
    } else {
      document.querySelector(".row4").style.display = "none";
    }
  } else {
    document.querySelector(".row4").style.display = "none";
  }

  if (
    x[4] != undefined ||
    imageID[4] != undefined ||
    authors[4] != undefined ||
    titles[4] != undefined
  ) {
    if (
      !cart_imgs.includes(
        `https://www.artic.edu/iiif/2/${imageID[4]}/full/843,/0/default.jpg`
      )
    ) {
      document.querySelector(
        `.row5 a #image`
      ).src = `https://www.artic.edu/iiif/2/${imageID[4]}/full/843,/0/default.jpg`;
      document.querySelector(
        `.row5 a #image`
      ).alt = `${authors[4]}, "${titles[4]}"`;
      document.querySelector(`.row5 #author`).innerHTML = authors[4];
      document.querySelector(`.row5 #title`).innerHTML = titles[4];
      document.querySelector(`.row5 #cost`).innerHTML = `${
        1000 + Math.floor(Math.random() * 900 + 1)
      }`;
      document.querySelector(".row5").style.display = "";
    } else {
      document.querySelector(".row5").style.display = "none";
    }
  } else {
    document.querySelector(".row5").style.display = "none";
  }

  if (
    x[5] != undefined ||
    imageID[5] != undefined ||
    authors[5] != undefined ||
    titles[5] != undefined
  ) {
    if (
      !cart_imgs.includes(
        `https://www.artic.edu/iiif/2/${imageID[5]}/full/843,/0/default.jpg`
      )
    ) {
      document.querySelector(
        `.row6 a #image`
      ).src = `https://www.artic.edu/iiif/2/${imageID[5]}/full/843,/0/default.jpg`;
      document.querySelector(
        `.row6 a #image`
      ).alt = `${authors[5]}, "${titles[5]}"`;
      document.querySelector(`.row6 #author`).innerHTML = authors[5];
      document.querySelector(`.row6 #title`).innerHTML = titles[5];
      document.querySelector(`.row6 #cost`).innerHTML = `${
        1000 + Math.floor(Math.random() * 900 + 1)
      }`;
      document.querySelector(".row6").style.display = "";
    } else {
      document.querySelector(".row6").style.display = "none";
    }
  } else {
    document.querySelector(".row6").style.display = "none";
  }

  if (
    x[6] != undefined ||
    imageID[6] != undefined ||
    authors[6] != undefined ||
    titles[6] != undefined
  ) {
    if (
      !cart_imgs.includes(
        `https://www.artic.edu/iiif/2/${imageID[6]}/full/843,/0/default.jpg`
      )
    ) {
      document.querySelector(
        `.row7 a #image`
      ).src = `https://www.artic.edu/iiif/2/${imageID[6]}/full/843,/0/default.jpg`;
      document.querySelector(
        `.row7 a #image`
      ).alt = `${authors[6]}, "${titles[6]}"`;
      document.querySelector(`.row7 #author`).innerHTML = authors[6];
      document.querySelector(`.row7 #title`).innerHTML = titles[6];
      document.querySelector(`.row7 #cost`).innerHTML = `${
        1000 + Math.floor(Math.random() * 900 + 1)
      }`;
      document.querySelector(".row7").style.display = "";
    } else {
      document.querySelector(".row7").style.display = "none";
    }
  } else {
    document.querySelector(".row7").style.display = "none";
  }

  if (
    x[7] != undefined ||
    imageID[7] != undefined ||
    authors[7] != undefined ||
    titles[7] != undefined
  ) {
    if (
      !cart_imgs.includes(
        `https://www.artic.edu/iiif/2/${imageID[7]}/full/843,/0/default.jpg`
      )
    ) {
      document.querySelector(
        `.row8 a #image`
      ).src = `https://www.artic.edu/iiif/2/${imageID[7]}/full/843,/0/default.jpg`;
      document.querySelector(
        `.row8 a #image`
      ).alt = `${authors[7]}, "${titles[7]}"`;
      document.querySelector(`.row8 #author`).innerHTML = authors[7];
      document.querySelector(`.row8 #title`).innerHTML = titles[7];
      document.querySelector(`.row8 #cost`).innerHTML = `${
        1000 + Math.floor(Math.random() * 900 + 1)
      }`;
      document.querySelector(".row8").style.display = "";
    } else {
      document.querySelector(".row8").style.display = "none";
    }
  } else {
    document.querySelector(".row8").style.display = "none";
  }

  if (
    x[8] != undefined ||
    imageID[8] != undefined ||
    authors[8] != undefined ||
    titles[8] != undefined
  ) {
    if (
      !cart_imgs.includes(
        `https://www.artic.edu/iiif/2/${imageID[8]}/full/843,/0/default.jpg`
      )
    ) {
      document.querySelector(
        `.row9 a #image`
      ).src = `https://www.artic.edu/iiif/2/${imageID[8]}/full/843,/0/default.jpg`;
      document.querySelector(
        `.row9 a #image`
      ).alt = `${authors[8]}, "${titles[8]}"`;
      document.querySelector(`.row9 #author`).innerHTML = authors[8];
      document.querySelector(`.row9 #title`).innerHTML = titles[8];
      document.querySelector(`.row9 #cost`).innerHTML = `${
        1000 + Math.floor(Math.random() * 900 + 1)
      }`;
      document.querySelector(".row9").style.display = "";
    } else {
      document.querySelector(".row9").style.display = "none";
    }
  } else {
    document.querySelector(".row9").style.display = "none";
  }

  if (
    x[9] != undefined ||
    imageID[9] != undefined ||
    authors[9] != undefined ||
    titles[9] != undefined
  ) {
    if (
      !cart_imgs.includes(
        `https://www.artic.edu/iiif/2/${imageID[9]}/full/843,/0/default.jpg`
      )
    ) {
      document.querySelector(
        `.row10 a #image`
      ).src = `https://www.artic.edu/iiif/2/${imageID[9]}/full/843,/0/default.jpg`;
      document.querySelector(
        `.row10 a #image`
      ).alt = `${authors[9]}, "${titles[9]}"`;
      document.querySelector(`.row10 #author`).innerHTML = authors[9];
      document.querySelector(`.row10 #title`).innerHTML = titles[9];
      document.querySelector(`.row10 #cost`).innerHTML = `${
        1000 + Math.floor(Math.random() * 900 + 1)
      }`;
      document.querySelector(".row10").style.display = "";
    } else {
      document.querySelector(".row10").style.display = "none";
    }
  } else {
    document.querySelector(".row10").style.display = "none";
  }

  window.scrollTo({
    top: 720,
    left: 0,
    behavior: "smooth",
  });
}

/////////////////////////////////////////////

zoomIn.forEach((e, i) => {
  e.addEventListener("click", function () {
    if ((i === 0) ^ (i === 1)) {
      gallery.style.display = "block";
      galleryImage.style.backgroundImage = `url(https://www.artic.edu/iiif/2/${imageID[0]}/full/843,/0/default.jpg)`;
    } else if ((i === 2) ^ (i === 3)) {
      gallery.style.display = "block";
      galleryImage.style.backgroundImage = `url(https://www.artic.edu/iiif/2/${imageID[1]}/full/843,/0/default.jpg)`;
    } else if ((i === 4) ^ (i === 5)) {
      gallery.style.display = "block";
      galleryImage.style.backgroundImage = `url(https://www.artic.edu/iiif/2/${imageID[2]}/full/843,/0/default.jpg)`;
    } else if ((i === 6) ^ (i === 7)) {
      gallery.style.display = "block";
      galleryImage.style.backgroundImage = `url(https://www.artic.edu/iiif/2/${imageID[3]}/full/843,/0/default.jpg)`;
    } else if ((i === 8) ^ (i === 9)) {
      gallery.style.display = "block";
      galleryImage.style.backgroundImage = `url(https://www.artic.edu/iiif/2/${imageID[4]}/full/843,/0/default.jpg)`;
    } else if ((i === 10) ^ (i === 11)) {
      gallery.style.display = "block";
      galleryImage.style.backgroundImage = `url(https://www.artic.edu/iiif/2/${imageID[5]}/full/843,/0/default.jpg)`;
    } else if ((i === 12) ^ (i === 13)) {
      gallery.style.display = "block";
      galleryImage.style.backgroundImage = `url(https://www.artic.edu/iiif/2/${imageID[6]}/full/843,/0/default.jpg)`;
    } else if ((i === 14) ^ (i === 15)) {
      gallery.style.display = "block";
      galleryImage.style.backgroundImage = `url(https://www.artic.edu/iiif/2/${imageID[7]}/full/843,/0/default.jpg)`;
    } else if ((i === 16) ^ (i === 17)) {
      gallery.style.display = "block";
      galleryImage.style.backgroundImage = `url(https://www.artic.edu/iiif/2/${imageID[8]}/full/843,/0/default.jpg)`;
    } else if ((i === 18) ^ (i === 19)) {
      gallery.style.display = "block";
      galleryImage.style.backgroundImage = `url(https://www.artic.edu/iiif/2/${imageID[9]}/full/843,/0/default.jpg)`;
    }
  });
});

backButton.addEventListener("click", function () {
  gallery.style.display = "none";
});

prevButton.addEventListener("click", function () {
  let index = 0;

  for (let i = 0; i <= imageID.length; i++) {
    if (galleryImage.style.backgroundImage.includes(imageID[i])) {
      nextButton.style.display = "block";
      index = i;
      break;
    }
  }
  if (index === 0) {
    prevButton.style.display = "none";
    return;
  }

  index--;

  galleryImage.style.backgroundImage = `url(https://www.artic.edu/iiif/2/${imageID[index]}/full/843,/0/default.jpg)`;

  if (index === 0) {
    prevButton.style.display = "none";
  }

  if (index >= 0) {
    nextButton.style.display = "block";
  }
});

nextButton.addEventListener("click", function () {
  let index = 0;

  for (let i = 0; i < imageID.length; i++) {
    if (galleryImage.style.backgroundImage.includes(imageID[i])) {
      index = i;
      break;
    }
  }

  if (index === imageID.length - 1) {
    nextButton.style.display = "none";
    return;
  }

  index++;

  galleryImage.style.backgroundImage = `url(https://www.artic.edu/iiif/2/${imageID[index]}/full/843,/0/default.jpg)`;

  if (index === imageID.length - 1) {
    nextButton.style.display = "none";
  }

  if (index > 0) {
    prevButton.style.display = "block";
  }
});

cart.forEach((e, i) => {
  e.addEventListener("click", function () {
    switch (i) {
      case 0:
        if (
          !cart_imgs.includes(
            document.querySelector(".row1 a #image").getAttribute("src")
          )
        ) {
          cart_imgs.push(
            document.querySelector(".row1 a #image").getAttribute("src")
          );
          cart_authors.push(
            document.querySelector(`.row1 #author`).textContent
          );
          cart_titles.push(document.querySelector(`.row1 #title`).textContent);
          cart_cost.push(
            Number(document.querySelector(`.row1 #cost`).textContent)
          );
          e.classList.add("clicked");
        }
        break;
      case 1:
        if (
          !cart_imgs.includes(
            document.querySelector(".row2 a #image").getAttribute("src")
          )
        ) {
          cart_imgs.push(
            document.querySelector(".row2 a #image").getAttribute("src")
          );
          cart_authors.push(
            document.querySelector(`.row2 #author`).textContent
          );
          cart_titles.push(document.querySelector(`.row2 #title`).textContent);
          cart_cost.push(
            Number(document.querySelector(`.row2 #cost`).textContent)
          );
          e.classList.add("clicked");
        }
        break;
      case 2:
        if (
          !cart_imgs.includes(
            document.querySelector(".row3 a #image").getAttribute("src")
          )
        ) {
          cart_imgs.push(
            document.querySelector(".row3 a #image").getAttribute("src")
          );
          cart_authors.push(
            document.querySelector(`.row3 #author`).textContent
          );
          cart_titles.push(document.querySelector(`.row3 #title`).textContent);
          cart_cost.push(
            Number(document.querySelector(`.row3 #cost`).textContent)
          );
          e.classList.add("clicked");
        }
        break;
      case 3:
        if (
          !cart_imgs.includes(
            document.querySelector(".row4 a #image").getAttribute("src")
          )
        ) {
          cart_imgs.push(
            document.querySelector(".row4 a #image").getAttribute("src")
          );
          cart_authors.push(
            document.querySelector(`.row4 #author`).textContent
          );
          cart_titles.push(document.querySelector(`.row4 #title`).textContent);
          cart_cost.push(
            Number(document.querySelector(`.row4 #cost`).textContent)
          );
          e.classList.add("clicked");
        }
        break;
      case 4:
        if (
          !cart_imgs.includes(
            document.querySelector(".row5 a #image").getAttribute("src")
          )
        ) {
          cart_imgs.push(
            document.querySelector(".row5 a #image").getAttribute("src")
          );
          cart_authors.push(
            document.querySelector(`.row5 #author`).textContent
          );
          cart_titles.push(document.querySelector(`.row5 #title`).textContent);
          cart_cost.push(
            Number(document.querySelector(`.row5 #cost`).textContent)
          );
          e.classList.add("clicked");
        }
        break;
      case 5:
        if (
          !cart_imgs.includes(
            document.querySelector(".row6 a #image").getAttribute("src")
          )
        ) {
          cart_imgs.push(
            document.querySelector(".row6 a #image").getAttribute("src")
          );
          cart_authors.push(
            document.querySelector(`.row6 #author`).textContent
          );
          cart_titles.push(document.querySelector(`.row6 #title`).textContent);
          cart_cost.push(
            Number(document.querySelector(`.row6 #cost`).textContent)
          );
          e.classList.add("clicked");
        }
        break;
      case 6:
        if (
          !cart_imgs.includes(
            document.querySelector(".row7 a #image").getAttribute("src")
          )
        ) {
          cart_imgs.push(
            document.querySelector(".row7 a #image").getAttribute("src")
          );
          cart_authors.push(
            document.querySelector(`.row7 #author`).textContent
          );
          cart_titles.push(document.querySelector(`.row7 #title`).textContent);
          cart_cost.push(
            Number(document.querySelector(`.row7 #cost`).textContent)
          );
          e.classList.add("clicked");
        }
        break;
      case 7:
        if (
          !cart_imgs.includes(
            document.querySelector(".row8 a #image").getAttribute("src")
          )
        ) {
          cart_imgs.push(
            document.querySelector(".row8 a #image").getAttribute("src")
          );
          cart_authors.push(
            document.querySelector(`.row8 #author`).textContent
          );
          cart_titles.push(document.querySelector(`.row8 #title`).textContent);
          cart_cost.push(
            Number(document.querySelector(`.row8 #cost`).textContent)
          );
          e.classList.add("clicked");
        }
        break;
      case 8:
        if (
          !cart_imgs.includes(
            document.querySelector(".row9 a #image").getAttribute("src")
          )
        ) {
          cart_imgs.push(
            document.querySelector(".row9 a #image").getAttribute("src")
          );
          cart_authors.push(
            document.querySelector(`.row9 #author`).textContent
          );
          cart_titles.push(document.querySelector(`.row9 #title`).textContent);
          cart_cost.push(
            Number(document.querySelector(`.row9 #cost`).textContent)
          );
          e.classList.add("clicked");
        }
        break;
      case 9:
        if (
          !cart_imgs.includes(
            document.querySelector(".row10 a #image").getAttribute("src")
          )
        ) {
          cart_imgs.push(
            document.querySelector(".row10 a #image").getAttribute("src")
          );
          cart_authors.push(
            document.querySelector(`.row10 #author`).textContent
          );
          cart_titles.push(document.querySelector(`.row10 #title`).textContent);
          cart_cost.push(
            Number(document.querySelector(`.row10 #cost`).textContent)
          );
          e.classList.add("clicked");
        }
        break;
    }
  });
});

ban.forEach((e, i) => {
  e.addEventListener("click", function () {
    switch (i) {
      case 0:
        if (
          cart_imgs.includes(
            document.querySelector(".row1 a #image").getAttribute("src")
          )
        ) {
          let a = cart_imgs.indexOf(
            document.querySelector(".row1 a #image").getAttribute("src")
          );
          cart_imgs.splice(a, 1);
          cart_authors.splice(a, 1);
          cart_titles.splice(a, 1);
          cart_cost.splice(a, 1);
          cart[0].classList.remove("clicked");
        }
        break;
      case 1:
        if (
          cart_imgs.includes(
            document.querySelector(".row2 a #image").getAttribute("src")
          )
        ) {
          let a = cart_imgs.indexOf(
            document.querySelector(".row2 a #image").getAttribute("src")
          );
          cart_imgs.splice(a, 1);
          cart_authors.splice(a, 1);
          cart_titles.splice(a, 1);
          cart_cost.splice(a, 1);
          cart[1].classList.remove("clicked");
        }
        break;
      case 2:
        if (
          cart_imgs.includes(
            document.querySelector(".row3 a #image").getAttribute("src")
          )
        ) {
          let a = cart_imgs.indexOf(
            document.querySelector(".row3 a #image").getAttribute("src")
          );
          cart_imgs.splice(a, 1);
          cart_authors.splice(a, 1);
          cart_titles.splice(a, 1);
          cart_cost.splice(a, 1);
          cart[2].classList.remove("clicked");
        }
        break;
      case 3:
        if (
          cart_imgs.includes(
            document.querySelector(".row4 a #image").getAttribute("src")
          )
        ) {
          let a = cart_imgs.indexOf(
            document.querySelector(".row4 a #image").getAttribute("src")
          );
          cart_imgs.splice(a, 1);
          cart_authors.splice(a, 1);
          cart_titles.splice(a, 1);
          cart_cost.splice(a, 1);
          cart[3].classList.remove("clicked");
        }
        break;
      case 4:
        if (
          cart_imgs.includes(
            document.querySelector(".row5 a #image").getAttribute("src")
          )
        ) {
          let a = cart_imgs.indexOf(
            document.querySelector(".row5 a #image").getAttribute("src")
          );
          cart_imgs.splice(a, 1);
          cart_authors.splice(a, 1);
          cart_titles.splice(a, 1);
          cart_cost.splice(a, 1);
          cart[4].classList.remove("clicked");
        }
        break;
      case 5:
        if (
          cart_imgs.includes(
            document.querySelector(".row6 a #image").getAttribute("src")
          )
        ) {
          let a = cart_imgs.indexOf(
            document.querySelector(".row6 a #image").getAttribute("src")
          );
          cart_imgs.splice(a, 1);
          cart_authors.splice(a, 1);
          cart_titles.splice(a, 1);
          cart_cost.splice(a, 1);
          cart[5].classList.remove("clicked");
        }
        break;
      case 6:
        if (
          cart_imgs.includes(
            document.querySelector(".row7 a #image").getAttribute("src")
          )
        ) {
          let a = cartToStorage.indexOf(
            document.querySelector(".row7 a #image").getAttribute("src")
          );
          cart_imgs.splice(a, 1);
          cart_authors.splice(a, 1);
          cart_titles.splice(a, 1);
          cart_cost.splice(a, 1);
          cart[6].classList.remove("clicked");
        }
        break;
      case 7:
        if (
          cart_imgs.includes(
            document.querySelector(".row8 a #image").getAttribute("src")
          )
        ) {
          let a = cart_imgs.indexOf(
            document.querySelector(".row8 a #image").getAttribute("src")
          );
          cart_imgs.splice(a, 1);
          cart_authors.splice(a, 1);
          cart_titles.splice(a, 1);
          cart_cost.splice(a, 1);
          cart[7].classList.remove("clicked");
        }
        break;
      case 8:
        if (
          cart_imgs.includes(
            document.querySelector(".row9 a #image").getAttribute("src")
          )
        ) {
          let a = cart_imgs.indexOf(
            document.querySelector(".row9 a #image").getAttribute("src")
          );
          cart_imgs.splice(a, 1);
          cart_authors.splice(a, 1);
          cart_titles.splice(a, 1);
          cart_cost.splice(a, 1);
          cart[8].classList.remove("clicked");
        }
        break;
      case 9:
        if (
          cart_imgs.includes(
            document.querySelector(".row10 a #image").getAttribute("src")
          )
        ) {
          let a = cart_imgs.indexOf(
            document.querySelector(".row10 a #image").getAttribute("src")
          );
          cart_imgs.splice(a, 1);
          cart_authors.splice(a, 1);
          cart_titles.splice(a, 1);
          cart_cost.splice(a, 1);
          cart[9].classList.remove("clicked");
        }
        break;
    }
  });
});

cartBtn.addEventListener("click", sentToLocalStorage);

function sentToLocalStorage() {
  window.localStorage.setItem("cart_imgs", JSON.stringify(cart_imgs));
  window.localStorage.setItem("cart_authors", JSON.stringify(cart_authors));
  window.localStorage.setItem("cart_titles", JSON.stringify(cart_titles));
  window.localStorage.setItem("cart_cost", JSON.stringify(cart_cost));
  cart_imgs.length = 0;
  cart_authors.length = 0;
  cart_titles.length = 0;
  cart_cost.length = 0;
  window.open("cart.html");
}
