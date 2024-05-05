/* 
   I will target the canvas element and i will store it in
   the `ctx` variable. 
*/		
let ctx = document.getElementById('myChart');
 
/*
   Next i will create two global variables, the `myChart` variable
   and the `JsonData` variable. We are going assign to them values that
   we create inside the functions that we will use down the script.
*/
let myChart;
let Jsondata;
 
/*
   Next we are going to send a get request to the `data.json`
   file to retrieve the file's data.
*/
fetch("data.json")
.then(function(response){
   if(response.status == 200){
      return response.json();
   }
})
.then(function(data){ 
   /*
      Assigning the data from the JSON file to the `jsonData`
      global variable.	
   */
   Jsondata = data;
 
   /*
      Calling the `createChart` function to create the chart
      from the json data.
      The function takes two parameters. The first parameter holds
      the json data, and the second the chart type.
      Here we initiating the chart type to `bar`.
   */
   createChart(Jsondata, 'bar');
});	
 
/*
   Next we have the createChart function.
*/
function createChart(data, type){
   // Inside the function we create a new instance of the Chart object.
   // The constructor takes the canvas element `ctx`, 
   // as its first argument, and an object with the Chart.js properties.
   myChart = new Chart(ctx, {
      // Setting the chart's type to the `type` parameter.
      type: type, 
      data: {
         
         // Creating an array from the `months` from the json data
         // using the `map` method and assign it to the labels
         // property.
         labels: data.map(row => row.month), 
         
         datasets: [{
            label: '# of Income',
            
            // Creating an array from the `incomes` from the json data
            // using the `map` method and assign it to the data
            // property.
            data: data.map(row => row.income),
            
            borderWidth: 1
        }]
      },
      options: {
         scales: {
            y: {
               beginAtZero: true
            }
         },
         // Making the chart responsive.
         responsive: true,
         maintainAspectRatio: false,
      }
   });
}
 
/*
   The `setChartType` function will dynamically change the chart type
   depending on which button we click on in the index file.
*/
function setChartType(chartType){
   // To change the chart type we have first to destroy the current
   // chart object. 
   myChart.destroy();
 
   // Next we render a new one passing-in, the `Jsondata`
   // and the `chartType` that the button sends.
   createChart(Jsondata, chartType);
}