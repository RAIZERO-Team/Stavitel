let ctx = document.getElementById("myChart");
let myChart;
let Jsondata;

fetch("data.json")
  .then(function (response) {
    if (response.status == 200) {
      return response.json();
    }
  })
  .then(function (data) {
    Jsondata = data;
    createChart(Jsondata, "line");
  });

function createChart(data, type) {
  myChart = new Chart(ctx, {
    type: type,
    data: {
      labels: data.map((row) => row.Day),
      datasets: [
        {
          label: "# of Hours",
          data: data.map((row) => row.Hours),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

function setChartType(chartType) {
  myChart.destroy();
  createChart(Jsondata, chartType);
}
