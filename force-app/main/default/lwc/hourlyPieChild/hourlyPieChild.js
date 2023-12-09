import { LightningElement, wire, api, track } from 'lwc';
import chartjs from '@salesforce/resourceUrl/Chartjs';
// import LabelPlugin from '@salesforce/resourceUrl/LabelPlugin';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class HourlyPieChild extends LightningElement {

    @api chartConfig;
   
    isChartJsInitialized;
    renderedCallback() {
        this.parentLoad();
    }

    @api parentLoad() {

        if (this.isChartJsInitialized) {
            return;
        }
        
        // load chartjs from the static resource
        // Promise.all([loadScript(this, chartjs),
        //              loadScript(this, LabelPlugin )])
          Promise.all([loadScript(this, chartjs)])
            .then(() => {
                this.isChartJsInitialized = true;
                const ctx = this.template.querySelector('canvas.barChart').getContext('2d');
                this.chart = new window.Chart(ctx, JSON.parse(JSON.stringify(this.chartConfig)));
                
            })
            .catch(error => {
             console.log("error while loading.."+error.message),
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