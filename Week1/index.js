import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

async function initializeCode() {
  // dog api
  const urlDogImg =
    "https://dog.ceo/api/breed/terrier/westhighland/images/random";
  const dogImg = await fetch(urlDogImg);
  const imgJSON = await dogImg.json();

  // wikipedia summary
  const urlSummary =
    "https://en.wikipedia.org/api/rest_v1/page/summary/West_Highland_White_Terrier";
  const dogSummary = await fetch(urlSummary);
  const summaryJSON = await dogSummary.json();

  //create html instruments
  const divContainer = document.body.appendChild(document.createElement('div'))
  const newDiv = document.body.appendChild(document.createElement("div"));
  const newHeader1 = newDiv.appendChild(document.createElement("h1"));
  const newHeaderText = document.createTextNode("Westhighland Terrier");
  const newContentDiv = newDiv.appendChild(document.createElement("div"));
  const newP = newContentDiv.appendChild(document.createElement("p"));
  const newPText = document.createTextNode(summaryJSON.extract);
  const newImgDiv = newContentDiv.appendChild(document.createElement("div"));
  const newImg = newImgDiv.appendChild(document.createElement("img"));

  // container div
  divContainer.setAttribute('class', 'container')

  // first div
  newDiv.setAttribute("class", "wiki-item");

  // header1
  newHeader1.setAttribute("class", "wiki-header");
  newHeader1.appendChild(newHeaderText);

  // content div
  newContentDiv.setAttribute("class", "wiki-content");

  // paragraph
  newP.setAttribute("class", "wiki-text");
  newP.appendChild(newPText);

  // imageDiv and image
  newImgDiv.setAttribute("class", "img-container");
  newImg.setAttribute("class", "wiki-img");
  newImg.setAttribute("src", imgJSON.message);
}

for (let i = 0; i < 5; i++) {
  initializeCode();
}
