import { LightningElement, wire, api, track } from 'lwc';

import getHourlyDashboardPieChartLimits from '@salesforce/apex/LimitServiceCmpController.getHourlyDashboardPieChartLimits';

export default class HourlyPie  extends LightningElement {

    chartLoaded = false;
    chartConfiguration;
    // isChartJsInitialized;
    // chartConfig;

    connectedCallback() {
       
        
        this.gettingAllLimitMethod();
     //   this.parentLoad();
        
    }
    gettingAllLimitMethod() {
        //try {
        this.chartLoaded = false;
        getHourlyDashboardPieChartLimits()
            .then(data => {
                let dataHourlyDashboardStatuses = [];
                let chartLabel = [];
                //console.log('======getHourlyDashboardPieChartLimits========' + JSON.stringify(data));
                for (let key in data) {
                    //console.log('======getHourlyDashboardPieChartLimits========' + key);
                    let finalKeyVal = '';
                    let textVal = key.substr(6, 2);
                    if (textVal.includes("/")) {
                        let resulttextValNew = textVal.substr(0, 1);
                        finalKeyVal = key.substr(4, 2) + '0' + resulttextValNew;
                    } else {
                        finalKeyVal = key.substr(4, 4);
                    }

                    //let result = text.substr(4, 4);
                    chartLabel.push(finalKeyVal);
                    data[key].forEach(limitObj => {
                        if (limitObj.Limit_Name__c == 'HourlyDashboardStatuses') {
                            dataHourlyDashboardStatuses.push(limitObj.Max__c - limitObj.Remaining__c);
                        }

                    });
                    //this.mapData.push({value:data[key], key:key});
                }


                

                this.chartConfiguration = {
                    type: 'pie',
                    data: {
                        datasets: [{
                            labels: '',
                            backgroundColor: [
                                '#06b2aa',
                                '#0070d2',
                                '#d9d9d9',
                                '#fb8b2f',
                                '#b83232',
                                '#706e6b',
                                '#75b9f5',
                            ],
                            
                            data: dataHourlyDashboardStatuses,
                        },

                        ],
                         labels: chartLabel,
                        // labels:['Mon','Tue','Wed','Thrus','Fri','Sat','Sun'],
                    },
                    // Plugins:[LabelPlugin],
                    options: {
                        /*responsive: false,
                        legend: {
                           display: true,
                           position: 'top',
                           onClick: null
                        },*/

                        /*scales: {
                            yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'No. of Emails',
                                }

                            }],

                        }*/
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                boxWidth: 10,
                            }
                        },

                        // Plugins:{
                        //     labels:{
                        //         render:'labels',
                        //         position:outside,
                        //     }
                        // }
                        

                    },
                   

                };


                //console.log('data => ', data);
                this.error = undefined;
                // this.chartConfig = this.chartConfiguration;
                this.chartLoaded = true;
                
            })
            .catch(error => {
                console.log('======error========' + JSON.stringify(error));
                this.error = error;
                this.chartConfiguration = undefined;
            });
        /* } catch (error) {
             console.log('===catch===error========' + JSON.stringify(error));
         }*/


    }

    
    }
    // parentLoad() {

    //     if (this.isChartJsInitialized) {
    //         return;
    //     }
        
    //     // load chartjs from the static resource
    //     Promise.all([loadScript(this, chartjs)])
    //     .then(() => {
            
           
    //         this.isChartJsInitialized = true;
    //         const ctx = this.template.querySelector('canvas.barChart').getContext('2d');
    //         this.chart = new window.Chart(ctx, JSON.parse(JSON.stringify(this.chartConfig)));

    //     })
        
    //     .catch(error => {
    //         this.dispatchEvent(
    //             new ShowToastEvent({
    //                 title: 'Error loading Chart',
    //                 message: error.message,
    //                 variant: 'error',
    //             })
    //         );
    //     });

    // }