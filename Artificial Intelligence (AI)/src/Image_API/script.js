const accessKey = "vrJzGZDBcUH-jTxX-v7qSph89W4O078RnSmdnII5eRk";
const searchForm = document.getElementById("search_form");
const searchBox = document.getElementById("search_box");
const searchResult = document.getElementById("search_result");

const messageDiv = document.createElement("div");

let keyword = "";
let page = 1;
const imagePaths = [];

async function searchImages() {
  keyword = searchBox.value.trim();

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=3`;

  const response = await fetch(url);

  const data = await response.json();

  if (page === 1) {
    searchResult.innerHTML = "";
    imagePaths.length = 0;
  }

  const results = data.results;

  results.forEach((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;

    const imageLink = document.createElement("a");
    imageLink.href = result.urls.full;
    imageLink.appendChild(image);

    searchResult.appendChild(imageLink);

    imagePaths.push(result.urls.full);
  });

  if (imagePaths.length <= 6) {
    imagePaths.forEach((path, index) => {
      navigator.clipboard.writeText(path).then(() => {
        console.log(`Image path copied to clipboard: ${path}`);
      }).catch((error) => {
        console.log(`Error copying image path: ${error}`);
      });
    });
  }

  imagePaths.sort();

  messageDiv.innerHTML = `Copied the first 3 image paths to the clipboard: ${imagePaths.slice(0, 3).join(', ')}`;
  document.body.appendChild(messageDiv);
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

async function searchImagesWithKeyword(keyword) {
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=3`;

  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    searchResult.innerHTML = "";
    imagePaths.length = 0;
  }
  const results = data.results; 

  results.forEach((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;
    const imageLink = document.createElement("a");
    imageLink.href = result.urls.full;
    imageLink.appendChild(image);

    searchResult.appendChild(imageLink);

    imagePaths.push(result.urls.full);
  });

  if (imagePaths.length <= 6) {
    imagePaths.forEach((path, index) => {
      navigator.clipboard.writeText(path).then(() => {
        console.log(`Image path copied to clipboard: ${path}`);
      }).catch((error) => {
        console.log(`Error copying image path: ${error}`);
      });
    });
  }

  imagePaths.sort();

  messageDiv.innerHTML = `Copied the first 3 image paths to the clipboard: ${imagePaths.slice(0, 3).join(', ')}`;
  document.body.appendChild(messageDiv);
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const keyword = searchBox.value.trim();
  page = 1;
  searchImagesWithKeyword(keyword);
});