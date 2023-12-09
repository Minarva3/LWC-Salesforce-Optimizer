import { LightningElement, track } from 'lwc';
import chartjs from '@salesforce/resourceUrl/Chartjs';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DailyWorkflowMailChart extends LightningElement {

    @track isChartJsInitialized;
    chart; 
    pieChartData;
    x;
    y;
   
   config = {
    type: 'doughnut',
    data : {
        datasets: [{
            label: 'My First Dataset',               
            data: [100,260],
            backgroundColor: [
            'rgb(0, 0, 255)',
            'rgb(128, 128, 128)',
            ],
            hoverOffset: 4
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
       
    }
};

    renderedCallback() {

        

        if (this.isChartJsInitialized) {
            return;
        }
        this.isChartJsInitialized = true;

        Promise.all([
            loadScript(this, chartjs)
        ]).then(() => {
            const ctx = this.template.querySelector('canvas.linechart').getContext('2d');
            this.chart = new window.Chart(ctx, this.config);
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