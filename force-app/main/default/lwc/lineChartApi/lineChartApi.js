import { LightningElement, api, track } from 'lwc';
import chartjs from '@salesforce/resourceUrl/Chartjs';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class LineChartApi extends LightningElement {

    chart;
    @track isChartJsInitialized;
    
    // @api chartConfig;
    
    
    renderedCallback() {

        if (this.isChartJsInitialized) {
            return;
        }
        Promise.all([loadScript(this, chartjs)])
        .then(() => {
                this.isChartJsInitialized = true;
                //console.log('====then call===='+JSON.stringify(this.chartConfig));
                console.log('chartjs Initialized')
                window.Chart.platform.disableCSSInjection = true
                const ctx = this.template.querySelector('canvas.linechart').getContext('2d');
                this.chart = new window.Chart(ctx, this.chartConfig); //JSON.parse(JSON.stringify(this.chartConfig))
                this.chart.canvas.parentNode.style.height = '100%';
                this.chart.canvas.parentNode.style.width = '100%';
            }).catch(error => {
                const errorMessage = error && error.message ? error.message : 'Unknown error';
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading ChartJS',
                        message: errorMessage,
                        variant: 'error',
                    }),
                );
            });

        }
        

        chartConfig = {
            type: 'line',
            labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            datasets: [{
              label: 'My First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          };
            
        
}