import { LightningElement, wire, api, track } from 'lwc';
import chartjs from '@salesforce/resourceUrl/Chartjs';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LineChartCmp extends LightningElement {

    @api chartConfig;
   
    isChartJsInitialized;
    renderedCallback() {
        this.parentLoad();
    }

    @api parentLoad() {

        if (this.isChartJsInitialized) {
            return;
        }
        //console.log('====parent call====');
        // load chartjs from the static resource
        Promise.all([loadScript(this, chartjs)])
            .then(() => {
                //console.log('====then call===='+JSON.stringify(this.chartConfig));
                this.isChartJsInitialized = true;
                const ctx = this.template.querySelector('canvas.linechart').getContext('2d');
                this.chart = new window.Chart(ctx, JSON.parse(JSON.stringify(this.chartConfig)));
                this.chart.canvas.parentNode.style.backgroundColor = '#f8fcff';
                
                
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading Chart',
                        message: error.message,
                        variant: 'error',
                    })
                );
            });

    }

}