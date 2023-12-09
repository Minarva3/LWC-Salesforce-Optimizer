import { LightningElement, track, api } from 'lwc';
import chartjs from '@salesforce/resourceUrl/Chartjs';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import getEmailAllLimits from '@salesforce/apex/LimitServiceCmpController.getEmailAllLimits';

export default class LimitServiceCmp extends LightningElement {

    @track isChartJsInitialized;
    chart; 
    config;
    @api limitNameValue;
    @api limitMaxValue;
    @api limitRemainingValue;
    @api doughnutColor;
    
   connectedCallback() {
        this.gettingAllLimitMethod();
        console.log('=======color======='+this.doughnutColor);
    }

    gettingAllLimitMethod() {
        
                    
                    this.config = {
                        type: 'doughnut',
                        data : {
                            datasets: [{
                                label: '',               
                                data: [parseInt(this.limitMaxValue) - parseInt(this.limitRemainingValue),this.limitRemainingValue],
                                backgroundColor: [
                                this.doughnutColor,
                                '#d9d9d9',
                                ],
                                hoverOffset: 4
                            }],
                    
                            // These labels appear in the legend and in the tooltips when hovering different arcs
                            labels: ['Call Made','Call Remaining']
                        },
                        options: {
                            responsive: true,
                            legend: {
                            display: false
                            }
                        },
                        
                    };
                    
                
    }

   
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
            this.chart.canvas.parentNode.style.height = '94%';
            this.chart.canvas.parentNode.style.width = '94%';
            /*Chart.pluginService.register({
                beforeDraw: function(chart) {
                  var width = chart.chart.width,
                      height = chart.chart.height,
                      ctx = chart.chart.ctx;
                  ctx.restore();
                  var fontSize = (height / 114).toFixed(2);
                  ctx.font = fontSize + "em sans-serif";
                  ctx.textBaseline = "middle";
                  var text = "75%",
                      textX = Math.round((width - ctx.measureText(text).width) / 2),
                      textY = height / 2;
                  ctx.fillText(text, textX, textY);
                  ctx.fillText(text, textX, textY);
                  ctx.save();
                }
              });*/
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