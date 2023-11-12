/*
    Demonstrate how to create a line chart
*/ 

async function getData(){
    //const response = await fetch('/rp_Nielsen/data/Trial_1.csv')
    const response = await fetch('../data/Trial_1.csv');   // Double period moves up one folder
    const data = await response.text();     // CSV is in text format
    // console.log(data);

    const xTime = [];
    const y0_0V = []; 
    const y2_5V = [];
    const y3_0V = [];
    const y3_5V = [];
    const y4_0V = [];
    const y4_5V = [];
    const y5_0V = [];

    // \n - new line character
    // split('\n') will separate table into array of individual rows
    // slice(start, end) - return new array starting at index start and going up to but not including index end.
    const table = data.split('\n').slice(1);
    // console.log(table);

    table.forEach(row =>{
        const columns = row.split(',');     
        const time = columns[0];        
        xTime.push(time);            

        const V0_0 = parseFloat(columns[1]);    
        y0_0V.push(V0_0);        

        const V2_5 = parseFloat(columns[2]);  
        y2_5V.push(V2_5);

        const V3_0 = parseFloat(columns[3]);    
        y3_0V.push(V3_0);        

        const V3_5 = parseFloat(columns[4]);  
        y3_5V.push(V3_5);

        const V4_0 = parseFloat(columns[5]);    
        y4_0V.push(V4_0);        

        const V4_5 = parseFloat(columns[6]);  
        y4_5V.push(V4_5);

        const V5_0 = parseFloat(columns[7]);    
        y5_0V.push(V5_0);  

        // console.log(year, temp, nhTemp, shTemp)
    });
    return{xTime, y0_0V, y2_5V, y3_0V, y3_5V, y4_0V, y4_5V, y5_0V};
}   

async function createChart(){
    const data = await getData();   // createChart will wait until getData is finished processing
    const ctx = document.getElementById('graph1');
    const myChart = new Chart(ctx, {
        type: 'line', 
        data: {
            labels: data.xTime,
            datasets: [
                {
                    label: 'Hydrogen Generation For 0.0V Condition (mL)',
                    data: data.y0_0V,
                    fill: false,
                    backgroundColor: 'rgba(255, 0, 221, 0.2)',
                    borderColor: 'rgba(255, 0, 221, 1)',
                    bordWidth: 1
                },
                {
                    label: 'Hydrogen Generation For 2.5V Condition (mL)',
                    data: data.y2_5V,
                    fill: false,
                    backgroundColor: 'rgba(0, 255, 255, 0.2)',
                    borderColor: 'rgba(0, 255, 255, 1)',
                    bordWidth: 1
                },
                {
                    label: 'Hydrogen Generation For 3.0V Condition (mL)',
                    data: data.y3_0V,
                    fill: false,
                    backgroundColor: 'rgba(235, 235, 21, 0.2)',
                    borderColor: 'rgba(235, 235, 21, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Hydrogen Generation For 3.5V Condition (mL)',
                    data: data.y3_5V,
                    fill: false,
                    backgroundColor: 'rgba(255, 170, 0, 0.2)',
                    borderColor: 'rgba(255, 170, 0, 1)',
                    bordWidth: 1
                },
                {
                    label: 'Hydrogen Generation For 4.0V Condition (mL)',
                    data: data.y4_0V,
                    fill: false,
                    backgroundColor: 'rgba(255, 0, 34, 0.2)',
                    borderColor: 'rgba(255, 0, 34, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Total Hydrogen Generation For 4.5V Condition (mL)',
                    data: data.y4_5V,
                    fill: false,
                    backgroundColor: 'rgba(0, 255, 72, 0.2)',
                    borderColor: 'rgba(0, 255, 72, 1)',
                    bordWidth: 1
                },
                {
                    label: 'Hydrogen Generation For 5.0V Condition (mL)',
                    data: data.y5_0V,
                    fill: false,
                    backgroundColor: 'rgba(0, 24, 255, 0.2)',
                    borderColor: 'rgba(0, 24, 255, 1)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,       // Re-size based on screen size
            scales: {               // Display options for x and y axis
                x: {
                    title: {
                        display: true,
                        text: 'Time (hours:minutes:seconds)',   // X-axis title
                        font: {         // Font properties
                            size: 20
                        }
                    },
                    ticks: {
                        callback: function(val, index){
                                // Labeling of tick marks can be controlled by code and font size
                                return index % 4 === 0 ? this.getLabelForValue(val) : '';
                        },
                        font: {
                            size: 10
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Hydrogen Generation (mL)',
                        font: {
                            size: 20
                        },
                    },
                    ticks: {
                        maxTicksLimit: data.y5_0V.length/10,
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {          // Display options
                title: {
                    display: true,
                    text: 'Hydrogen Generation from Seawater Electrolysis vs Time',
                    font: {
                        size: 24
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: 'start', 
                    position: 'bottom'
                }
            }
        }
    });
}

createChart();