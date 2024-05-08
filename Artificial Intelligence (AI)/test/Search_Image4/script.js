const accessKey = "vrJzGZDBcUH-jTxX-v7qSph89W4O078RnSmdnII5eRk";
const searchform = document.getElementById("search_form");
const searchBox = document.getElementById("search_box");
const searchResult = document.getElementById("search_result");
const showMoreBtn = document.getElementById("show_more_btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);

     const data = await response.json();

    if (page == 1) {
        searchResult.innerHTML = "";
    }

    const results = data.results;

    results.map((result) => {

        const image = document.createElement("img");

        image.src = result.urls.small;

        const imageLink = document.createElement("a");

        imageLink.href = result.urls.full; 
        imageLink.target = "_blank";

        imageLink.addEventListener("click", (e) => {
            e.preventDefault();
            const imagePath = result.urls.full;//create variable imagepath fo fetch the path of image 
            navigator.clipboard.writeText(imagePath).then(() => {
                alert(`Image path copied to clipboard: ${imagePath}`);
            }).catch((error) => {
                alert(`Error copying image path: ${error}`);
            });
        });

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    });

    showMoreBtn.style.display = "block";
}

searchform.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});