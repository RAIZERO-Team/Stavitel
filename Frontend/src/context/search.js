// import { fetchData } from "../api/api.js";

class search {
  constructor(searchProject) {
    this.searchProject = searchProject;
  }

  async search_project() {
    try {
      const url = "";
      const method = "GET";
      const data = {};

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (!responseData.error) {
        window.location.href = "../View/Workspace.html";
        return responseData; // Return error data
      } else {
        return responseData.error; // Return error data
      }
    } catch (error) {
      console.error(`Failed to insert user: ${error.message}`);
      throw error; // Rethrow the error for higher level handling
    }
  }
}

export { search };

// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((res) => res.json())
//   .then((data) => {
//     users = data.map((user) => {
//       const card = searchData1.content.cloneNode(true).children[0];
//       const header = card.querySelector("[data-header]");
//       const body = card.querySelector("[data-body]");
//       header.textContent = user.name;
//       body.textContent = user.email;
//       searchData2.append(card);
//       return { name: user.name, email: user.email, element: card };
//     });
//   });
