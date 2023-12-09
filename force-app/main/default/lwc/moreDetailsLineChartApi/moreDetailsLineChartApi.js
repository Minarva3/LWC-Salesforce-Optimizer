import { LightningElement, track, api } from 'lwc';
import chartjs from '@salesforce/resourceUrl/Chartjs';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class MoreDetailsLineChartApi extends LightningElement {

    chart;
    @track isChartJsInitialized;
    
    @api chartConfig;
    
    
    renderedCallback() {
        this.load();
    }
    
    @api load(){
        if (this.isChartJsInitialized) {
            return;
        }

        this.isChartJsInitialized = true;
        Promise.all([loadScript(this, chartjs)])
        .then(() => {
                //console.log('====then call===='+JSON.stringify(this.chartConfig));
                console.log('chartjs Initialized')
                window.Chart.platform.disableCSSInjection = true
                const ctx = this.template.querySelector('canvas.linechart').getContext('2d');
                this.chart = new window.Chart(ctx, JSON.parse(JSON.stringify(this.chartConfig))); //JSON.parse(JSON.stringify(this.chartConfig))
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
}