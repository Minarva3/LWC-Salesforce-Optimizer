import { LightningElement, wire, api, track } from 'lwc';
import getDashboardLimits from '@salesforce/apex/LimitServiceCmpController.getDashboardLimits';

export default class DashboardLimitParentCmp extends LightningElement {

    chartLoaded = false;
    chartConfiguration;
    currentWeekCount = 0;

    connectedCallback() {
        this.gettingAllLimitMethod(this.currentWeekCount);
    }

    gettingAllLimitMethod(count) {
        //try {
        this.chartLoaded = false;
        getDashboardLimits({ val: count })
            .then(data => {
                let chartHourlyDashboardResults = [];
                let chartHourlySyncReportRuns = [];
                let chartHourlyDashboardRefreshes = [];
                let chartHourlyAsyncReportRuns = [];
                let chartLabel = [];
                //console.log('======data========' + JSON.stringify(data));
                for (let key in data) {

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
                        if (limitObj.Limit_Name__c == 'HourlyDashboardResults') {
                            chartHourlyDashboardResults.push(limitObj.louie976__Max__c - limitObj.louie976__Remaining__c);
                        }
                        if (limitObj.Limit_Name__c == 'HourlySyncReportRuns') {
                            chartHourlySyncReportRuns.push(limitObj.louie976__Max__c - limitObj.louie976__Remaining__c);
                        }
                        if (limitObj.Limit_Name__c == 'HourlyDashboardRefreshes') {
                            chartHourlyDashboardRefreshes.push(limitObj.louie976__Max__c - limitObj.louie976__Remaining__c);
                        }
                        if (limitObj.Limit_Name__c == 'HourlyAsyncReportRuns') {
                            chartHourlyAsyncReportRuns.push(limitObj.louie976__Max__c - limitObj.louie976__Remaining__c);
                        }

                    });
                    //this.mapData.push({value:data[key], key:key});
                }

                this.chartConfiguration = {
                    type: 'bar',
                    data: {
                        datasets: [{
                            label: 'HourlyDashboardResults',
                            backgroundColor: "#b83232",
                            data: chartHourlyDashboardResults,
                        },
                        {
                            label: 'HourlySyncReportRuns',
                            backgroundColor: "#4e4459",
                            data: chartHourlySyncReportRuns,
                        },
                        {
                            label: 'HourlyDashboardRefreshes',
                            backgroundColor: "#fb8b2f",
                            data: chartHourlyDashboardRefreshes,
                        },
                        {
                            label: 'HourlyAsyncReportRuns',
                            backgroundColor: "#0070d2",
                            data: chartHourlyAsyncReportRuns,
                        },
                        ],
                        labels: chartLabel,
                    },
                    options: {
                        /*responsive: false,
                        legend: {
                           display: true,
                           position: 'top',
                           onClick: null
                        },*/

                        scales: {
                            yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Range',
                                }

                            }],

                        },
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                boxWidth: 10,
                            }
                        },

                    }

                };


                //console.log('data => ', data);
                this.error = undefined;
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

    /*@wire(GetAllLimits)
    GetAllLimits({ error, data }) {
        if (error) {
            console.log('======error========'+JSON.stringify(error));
            this.error = error;
            this.chartConfiguration = undefined;
        } else if (data) {
            let chartSingleEmail = [];
            let chartMassEmail = [];
            let chartWorkflowEmail= [];
            let chartLabel = [];
            console.log('======data========'+JSON.stringify(data));
            for (let key in data) {

                chartLabel.push(key);
                data[key].forEach(limitObj => {
                    if(limitObj.Limit_Name__c == 'SingleEmail'){
                        chartSingleEmail.push(limitObj.Max__c-limitObj.Remaining__c);
                    }
                    if(limitObj.Limit_Name__c == 'MassEmail'){
                        chartMassEmail.push(limitObj.Max__c-limitObj.Remaining__c);
                    }
                    if(limitObj.Limit_Name__c == 'DailyWorkflowEmails'){
                        chartWorkflowEmail.push(limitObj.Max__c-limitObj.Remaining__c);
                    }
                    
                });
                //this.mapData.push({value:data[key], key:key});
            }

            this.chartConfiguration = {
                type: 'bar',
                data: {
                    datasets: [{
                            label: 'Single Email',
                            backgroundColor: "#87CEEB",
                            data: chartSingleEmail,
                        },
                        {
                            label: 'Mass Email',
                            backgroundColor: "#000080",
                            data: chartMassEmail,
                        },
                        {
                            label: 'WorkFlow Email',
                            backgroundColor: "#800000",
                            data: chartWorkflowEmail,
                        },
                    ],
                    labels: chartLabel,
                },
                options: {},
                
            };

            
            console.log('data => ', data);
            this.error = undefined;
        }
    }*/

    prev() {
        this.currentWeekCount = this.currentWeekCount - 1;
        this.gettingAllLimitMethod(this.currentWeekCount);

    }

    next() {
        this.currentWeekCount = this.currentWeekCount + 1;
        this.gettingAllLimitMethod(this.currentWeekCount);

    }
    //Open popup 
    handleModal(event) {
        console.log("inside modal");
        const modal = this.template.querySelector("c-more-details-cmp-for-dashboard");
        modal.show();
    }

}