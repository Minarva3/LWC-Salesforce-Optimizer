import { LightningElement, api, track } from 'lwc';
import chartjs from '@salesforce/resourceUrl/Chartjs';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class PolarAreaChart extends LightningElement {

@api config
@track isChartJsInitialized;



    renderedCallback() {

        if (this.isChartJsInitialized) {
            return;
        }
        
        this.isChartJsInitialized = true;
        Promise.all([
            loadScript(this, chartjs)
        ]).then(() => {
            console.log('chart loaded successfully')
            window.Chart.platform.disableCSSInjection = true;
            const ctx = this.template.querySelector('canvas.polarchart').getContext('2d');
            console.log("line number 23"+ctx)
            this.chart = new window.Chart(ctx, JSON.parse(JSON.stringify(this.config)));
            console.log("Not chartingline number 25" + this.chart)
            
            this.chart.canvas.parentNode.style.height = '100%';
            this.chart.canvas.parentNode.style.width = '100%';
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading ChartJS',
                    message: error.message,
                    variant: 'error',
                }),
            );
        });
    }
}