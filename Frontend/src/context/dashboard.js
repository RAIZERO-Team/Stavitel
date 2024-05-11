import Chart from "chart.js/auto";

class dashboard {
  constructor(
    dataUrl,
    chartType,
    xAxisLabel,
    yAxisLabel,
    chartTitle,
    chartBackgroundColor,
    chartBorderColor,
    chartElement
  ) {
    this.dataUrl = dataUrl;
    this.chartType = chartType;
    this.xAxisLabel = xAxisLabel;
    this.yAxisLabel = yAxisLabel;
    this.chartTitle = chartTitle;
    this.chartBackgroundColor = chartBackgroundColor;
    this.chartBorderColor = chartBorderColor;
    this.chartElement = chartElement;
  }

  async fetchData() {
    try {
      const response = await fetch(this.dataUrl);
      if (response.ok) {
        const data = await response.json();
        this.createChart(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  createChart(data) {
    const chartConfig = {
      type: this.chartType,
      data: {
        labels: data.map((row) => row[this.xAxisLabel]),
        datasets: [
          {
            label: this.yAxisLabel,
            data: data.map((row) => row[this.yAxisLabel]),
            backgroundColor: this.chartBackgroundColor,
            borderColor: this.chartBorderColor,
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
        plugins: {
          title: {
            display: true,
            text: this.chartTitle,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };

    this.myChart = new Chart(this.chartElement, chartConfig);
  }
}

export { dashboard };
