const accessKey = "vrJzGZDBcUH-jTxX-v7qSph89W4O078RnSmdnII5eRk";// Access key for the Unsplash API
const searchForm = document.getElementById("search_form");
const searchBox = document.getElementById("search_box");
const searchResult = document.getElementById("search_result");
const messageDiv = document.createElement("div");

let keyword = "";
let page = 1;
const imagePaths = []; // Array to store image paths

async function searchImages() { // asyn() to search images
  
  keyword = searchBox.value;// Get the keyword from the search box
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=3`;

  // Fetch the data from the Unsplash API
  const response = await fetch(url);
  const data = await response.json();

  // Clear the search result and image paths array if this is the first page
  if (page === 1) {
    searchResult.innerHTML = "";
    imagePaths.length = 0;
  }

  const results = data.results; // Get the search results

  results.forEach((result) => {  // Loop through the search results

    // Create an image element and set its source to the small image URL
    const image = document.createElement("img");
    image.src = result.urls.small;

    // Create an anchor element to link to the full image URL
    const imageLink = document.createElement("a");
    imageLink.href = result.urls.full;
    imageLink.target = "_blank";
    imageLink.appendChild(image);

    searchResult.appendChild(imageLink);// Add the image link to the search result

    imagePaths.push(result.urls.full);
  });

  if (imagePaths.length <= 3) {//check image paths
    imagePaths.forEach((path, index) => {
      navigator.clipboard.writeText(path).then(() => {
        console.log(`Image path copied to clipboard: ${path}`);
      }).catch((error) => {
        console.log(`Error copying image path: ${error}`);
      });
    });
  }

  imagePaths.sort();//sort image paths in arr

  messageDiv.innerHTML = `Copied the first 3 image paths to the website: ${imagePaths.slice(0, 3).join(', ')}`;
  document.body.appendChild(messageDiv);
}

// Add an event listener to the search form to trigger the search on submit
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});