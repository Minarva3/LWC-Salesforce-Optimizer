import { LightningElement, track } from 'lwc';
import getApexClass from '@salesforce/apex/polarChartConfi.getApexClass';
export default class PolarChartConfi extends LightningElement {

    
    chartLoaded = false;
    chartConfig;

    connectedCallback(){
        this.load();
    }

    load(){
        this.chartLoaded = false;
        getApexClass()
        .then(data => {

            let chartLabels = [];
            let chartData = [];

            for(let key in data){

                chartLabels.push(key);
                chartData.push(data[key].length)

            }
            console.log(chartLabels)
            console.log(chartData)
        this.chartConfig = {
            type: 'polarArea',
            data : {
              labels: chartLabels,
                datasets: [{
                    label: 'API Version',               
                    data: chartData,
                    
                    backgroundColor: [
            
                        'rgb(255, 0, 0, 0.8)',
                        'rgb(51, 255, 51, 0.8)',
                        'rgb(255, 255, 0, 0.8)',
                        'rgb(201, 203, 207, 0.8)',
                        'rgb(0, 0, 255, 0.8)',
                    
                    ],
                    
                
                    hoverOffset: 4
        
                }],
        
                // These labels appear in the legend and in the tooltips when hovering different arcs
            },
        
            options: {
                scale: {
                    ticks: {
                      min: 0,
                      max: 200,
                      stepSize: 20, // Adjust the value for the desired step size
                    },
                  },
            },
            
        };

        this.error = undefined;
        this.chartLoaded = true;

    }).catch(error=>{
            console.log('======error========' + JSON.stringify(error));
                    this.error = error;
                    this.chartConfiguration = undefined;
        })
    
    }
}