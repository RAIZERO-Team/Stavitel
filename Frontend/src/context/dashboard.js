class dashboard {
  constructor(
    projectAI_type,
    projectEditor_type,
    sit_visit,
    last_projects,
    project_name,
    project_type,
    project_date,
    productivityChart
  ) {
    this.projectAI_type = projectAI_type;
    this.projectEditor_type = projectEditor_type;
    this.sit_visit = sit_visit;
    this.project_type = project_type;
    this.last_projects = last_projects;
    this.project_name = project_name;
    this.project_date = project_date;
    this.productivityChart = productivityChart;
  }

  async display() {
    try {
      const url = "";
      const method = "Get";

      console.log("Done1");

      fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
          if (!data.error) {
            // window.location.href = "../View/Error/404_Not_Found.html";
          } else {
          }
        });
    } catch (error) {
    }
  }

  async chart() {
    let Jsondata;
    try {
    fetch("../app/data.json")
      .then(function (response) {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then(function (data) {
        Jsondata = data;
        // createChart(Jsondata, "line");
        // console.log(Jsondata);
        return Jsondata;
      });
    } catch (error) {
      console.log("Error")
    }
  }
}

export {dashboard};