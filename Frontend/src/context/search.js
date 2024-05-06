// import { fetchData } from "../api/api.js";

class search {
  constructor(searchData1, searchData2) {
    this.searchData1 = searchData1;
    this.searchData2 = searchData2;
  }

  async search_project() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        users = data.map((user) => {
          const card = searchData1.content.cloneNode(true).children[0];
          const header = card.querySelector("[data-header]");
          const body = card.querySelector("[data-body]");
          header.textContent = user.name;
          body.textContent = user.email;
          searchData2.append(card);
          return { name: user.name, email: user.email, element: card };
        });
      });
  }
}

export { search };
