import { LightningElement, wire, api, track } from 'lwc';
import chartjs from '@salesforce/resourceUrl/Chartjs';
import { loadScript } from 'lightning/platformResourceLoader';
import getEmailAllLimits from '@salesforce/apex/LimitServiceCmpController.getEmailAllLimits';
import getWeeklyDashboardLimits from '@salesforce/apex/LimitServiceCmpController.getWeeklyDashboardLimits';

export default class MoreDetailsCmpForDashboard extends LightningElement {

    showModal = false;
    chartLoaded = false;
    chartConfiguration;
    weekelyFieldValue = true;
    quarterlyFieldValue =false;
    monthlyFieldValue = false;
    @track isChartJsInitialized;

    @api show() {
        this.showModal = true;
    }

    handleDialogClose() {
        this.showModal = false;
    }

    @track dataHourlyDashboardResults;
    @track dataHourlySyncReportRuns;
    @track dataHourlyDashboardRefreshes;
    @track dataHourlyAsyncReportRuns;
    @track error;
    @track dataDoughnutColorRed = '#b83232';
    @track dataDoughnutColorNavyBlue = '#4e4459';
    @track dataDoughnutColorOrange = '#fb8b2f';
    @track dataDoughnutColorBlue = '#0070d2';

    connectedCallback() {
        this.gettingAllLimitMethod();
        this.gettingWeeklyLimits();
    }

    gettingAllLimitMethod() {
        getEmailAllLimits()
            .then(data => {

                for (let key in data) {

                    if (data[key].limitName == 'HourlyDashboardResults') {
                        this.dataHourlyDashboardResults = data[key].limitObj;
                    }
                    if (data[key].limitName == 'HourlySyncReportRuns') {
                        this.dataHourlySyncReportRuns = data[key].limitObj;
                    }
                    if (data[key].limitName == 'HourlyDashboardRefreshes') {
                        this.dataHourlyDashboardRefreshes = data[key].limitObj;
                    }
                    if (data[key].limitName == 'HourlyAsyncReportRuns') {
                        this.dataHourlyAsyncReportRuns = data[key].limitObj;
                    }
                }
                
            })
            .catch(error => {
                console.log('======error========' + JSON.stringify(error));
                this.error = error;

            });
    }

    gettingWeeklyLimits() {
        //try {
            this.chartLoaded = false;
            getWeeklyDashboardLimits()
                .then(data => {
                    let chartHourlyDashboardResults = [];
                    let chartHourlySyncReportRuns = [];
                    let chartHourlyDashboardRefreshes = [];
                    let chartHourlyAsyncReportRuns = [];
                    let chartLabel = [];
                    let sumHourlyDashboardResults = 0;
                    let sumHourlySyncReportRuns = 0;
                    let sumHourlyDashboardRefreshes = 0;
                    let sumHourlyAsyncReportRuns = 0;
                    //console.log('======Weekly========' + JSON.stringify(data));
                    for (let key in data) {

                        chartLabel.push(key);
                        data[key].forEach(limitObj => {
                            if (limitObj.Limit_Name__c == 'HourlyDashboardResults') {
                                sumHourlyDashboardResults += limitObj.Max__c - limitObj.Remaining__c;
                            }
                            if (limitObj.Limit_Name__c == 'HourlySyncReportRuns') {
                                sumHourlySyncReportRuns += limitObj.Max__c - limitObj.Remaining__c;   
                            }
                            if (limitObj.Limit_Name__c == 'HourlyDashboardRefreshes') {
                                sumHourlyDashboardRefreshes += limitObj.Max__c - limitObj.Remaining__c;                             
                            }
                            if (limitObj.Limit_Name__c == 'HourlyAsyncReportRuns') {
                                sumHourlyAsyncReportRuns += limitObj.Max__c - limitObj.Remaining__c;                             
                            }

                        });
                        //this.mapData.push({value:data[key], key:key});
                        //console.log('=====sumSingleValue======'+sumSingleValue);
                        
                        chartHourlyDashboardResults.push(sumHourlyDashboardResults);
                        chartHourlySyncReportRuns.push(sumHourlySyncReportRuns);
                        chartHourlyDashboardRefreshes.push(sumHourlyDashboardRefreshes);
                        chartHourlyAsyncReportRuns.push(sumHourlyAsyncReportRuns);
                        
                        sumHourlyDashboardResults = 0;
                        sumHourlySyncReportRuns = 0;
                        sumHourlyDashboardRefreshes = 0;
                        sumHourlyAsyncReportRuns = 0;
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
                            legend: {
                                display: false,
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

    handleRadioChange(event) {
        console.log("inside radio handler");
        const selectedOption = event.target.value;
        console.log("Value  " + selectedOption);

        if (selectedOption == 'weeklyRadio') {
            this.weekelyFieldValue = true;
            this.gettingWeeklyLimits();
            console.log("week");
        } else {
            this.weekelyFieldValue = false;
        }

        if (selectedOption == 'monthlyRadio') {
            this.monthlyFieldValue = true;
            this.gettingWeeklyLimits();
            console.log("month");
        } else {
            this.monthlyFieldValue = false;
        }

        if (selectedOption == 'quarterlyRadio') {
            this.quarterlyFieldValue = true;
            this.gettingWeeklyLimits();
            console.log("quarterly");
        } else {
            this.quarterlyFieldValue = false;

        }
    }


}