import { LightningElement,wire,track,api } from 'lwc';
import chartjs from '@salesforce/resourceUrl/Chartjs';
import doughnutlabel from '@salesforce/resourceUrl/Doughnutlabel';
// import datalabels from    '@salesforce/resourceUrl/DataLabelPlugin';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
 
export default class DoughtnutChartReportChild extends LightningElement {
 
    // @api chartConfig;
    @api countArray;
    @api noRunVal;
    @api oldVal;
    @api recentVal;
    @api sumReports;
    isChartJsInitialized;
    chart;
    chartConfiguration ;
   
    connectedCallback() {
        this.displayChart();
       
    }
   
    displayChart(){
 
 
        console.log("data in Array..in child"+JSON.stringify(this.countArray));  
        console.log("No Run --Recent--Old--"+this.noRunVal+"--"+this.recentVal+" "+this.oldVal);  
       
        let totaltext = this.sumReports.toString();
        this.chartConfiguration = {
        type: 'doughnut',
 
        data : {
               labels: [
                        'Number of Reports that did not run',
                        'Number of Recent Reports',
                        'Number of Old Reports'
                       
                        ],
 
                datasets: [{
                 label: [
                           'Number of Reports that did not run',
                           'Number of Recent Reports',
                           'Number of Old Reports'
                         ],  
                 backgroundColor: [
                            '#b83232',
                            '#06b2aa',
                            '#d9d9d9'
                            ],                    
           
                 data:[parseInt(this.noRunVal),parseInt(this.recentVal),parseInt(this.oldVal)]
                // data:[10,20,30]
                // // data:[parseInt(this.noRunVal),parseInt(this.recentVal),1]
 
                 
                       
                  },]
                },      
           
        options: {
            plugins: {
                 doughnutlabel: {
                    labels:[ {
                        text: 'Total Reports',
                            font: {
                                size: '50'
                                   },
                            color: '#403e9f'
                        },
                        {
                            text: totaltext,
                                font: {
                                    size: '50'
                                       },
                                color: '#182a67'
                            }]
                        },
                       
                        // datalabels: {
                           
                        //     display: true,
                           
                       
                        //     font: {
                        //         color: 'black',
                        //         weight: 'bold',
                        //       }
                        //   }
                     },
 
             legend: {
                display: true,
                position: 'right',
                labels: {
                    boxWidth: 10,
                        }
                    }
                },
 
             
        };//end config
 
       
    }
       
           
    renderedCallback() {
        this.parentLoad();
     }
 
     @api parentLoad() {
     
        if (this.isChartJsInitialized) {
            return;
        }
   
     
       
    Promise.all([
        loadScript(this,chartjs),
        loadScript(this,doughnutlabel)
        // loadScript(this,datalabels)
    ]).then(() => {
       
        this.isChartJsInitialized = true;
        console.log("data in Array..in child"+JSON.stringify(this.countArray));  
        console.log("No Run --Recent--Old--"+this.noRunVal+"--"+this.recentVal+" "+this.oldVal);  
 
        console.log("please print ......1");
        const ctx = this.template.querySelector('canvas.doughnutChart').getContext('2d');
        this.chart = new window.Chart(ctx, this.chartConfiguration);
       
       
        this.chart.canvas.parentNode.style.height = '100%';
        this.chart.canvas.parentNode.style.width = '100%';
        console.log("please print  ......2");
       
    }).catch(error => {
        // console.log("error loading.."+error.message);
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error loading ChartJS',
                message: error,
                variant: 'error',
            }),
        );
    });
}
 
 
 
 
}