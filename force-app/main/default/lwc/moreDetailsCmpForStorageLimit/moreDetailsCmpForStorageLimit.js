import { LightningElement, wire, api, track } from 'lwc';
import getEmailAllLimits from '@salesforce/apex/LimitServiceCmpController.getEmailAllLimits';
import getStorageWeeklyLimits from '@salesforce/apex/LimitServiceCmpController.getStorageWeeklyLimits';

export default class MoreDetailsCmpForStorageLimit extends LightningElement {

    showModal = false;
    chartLoaded = false;
    chartConfiguration;
    weekelyFieldValue = true;
    quarterlyFieldValue = false;
    monthlyFieldValue = false;
    @track isChartJsInitialized;

    @api show() {
        this.showModal = true;
    }

    handleDialogClose() {
        this.showModal = false;
    }

    @track dataStorageMB;
    @track fileStorageMB;
    //@track workflowEmailData;
    @track error;
    @track fileDoughnutColor = '#1ab14d';
    @track dataDoughnutColor = '#5c7cfa';

    connectedCallback() {
        this.gettingAllLimitMethod();
        this.gettingWeeklyLimits();
    }

    gettingAllLimitMethod() {
        getEmailAllLimits()
            .then(data => {
                //console.log('======fileStorageMB data========' + JSON.stringify(data));
                for (let key in data) {

                    if (data[key].limitName == 'DataStorageMB') {
                        this.dataStorageMB = data[key].limitObj;
                    }
                    if (data[key].limitName == 'FileStorageMB') {
                        this.fileStorageMB = data[key].limitObj;
                    }
                    //if (data[key].limitName == 'DailyWorkflowEmails') {
                    //this.workflowEmailData = data[key].limitObj;
                    //}
                }
                //console.log('======fileStorageMB========' + JSON.stringify(this.fileStorageMB));
                //console.log('======massEmailData========' + JSON.stringify(this.massEmailData));
                //console.log('======workflowEmailData========' + JSON.stringify(this.workflowEmailData));
            })
            .catch(error => {
                console.log('======error========' + JSON.stringify(error));
                this.error = error;

            });
    }

    gettingWeeklyLimits() {
        //try {
        this.chartLoaded = false;
        getStorageWeeklyLimits()
            .then(data => {
                let chartDataStorageMB = [];
                let chartFileStorageMB = [];
                //let chartWorkflowEmail = [];
                let chartLabel = [];
                let sumDataStorageMB = 0;
                let sumFileStorageMB = 0;
                //let sumWorkflowValue = 0;
                //console.log('======Storage line========' + JSON.stringify(data));
                for (let key in data) {

                    chartLabel.push(key);
                    data[key].forEach(limitObj => {
                        if (limitObj.Limit_Name__c == 'DataStorageMB') {
                            sumDataStorageMB += limitObj.Max__c - limitObj.Remaining__c;
                        }
                        if (limitObj.Limit_Name__c == 'FileStorageMB') {
                            sumFileStorageMB += limitObj.Max__c - limitObj.Remaining__c;
                        }
                        //if (limitObj.Limit_Name__c == 'DailyWorkflowEmails') {
                        //sumWorkflowValue += limitObj.Max__c - limitObj.Remaining__c;
                        //}

                    });
                    //this.mapData.push({value:data[key], key:key});
                    //console.log('=====sumSingleValue======'+sumSingleValue);

                    chartDataStorageMB.push({ y: sumDataStorageMB, x: 0 });
                    chartFileStorageMB.push({ y: sumFileStorageMB, x: 0 });
                    //chartWorkflowEmail.push(sumWorkflowValue);

                    sumDataStorageMB = 0;
                    sumFileStorageMB = 0;
                    //sumWorkflowValue = 0;
                }





                this.chartConfiguration = {

                    type: 'line',
                    data: {
                        datasets: [{
                            fill: false,
                            label: 'Data Storage MB',
                            data: chartDataStorageMB,
                            backgroundColor: [
                                '#0070d2'
                            ],
                            borderColor: [
                                '#0070d2'
                            ],
                            pointBackgroundColor: '#0070d2',
                            pointBorderColor: '#0070d2'
                        },
                        {
                            fill: false,
                            label: 'File Storage MB',
                            data: chartFileStorageMB,
                            backgroundColor: [
                                '#1ab14d'
                            ],
                            borderColor: [
                                '#1ab14d'
                            ],
                            pointBackgroundColor: '#1ab14d',
                            pointBorderColor: '#1ab14d'
                        }
                        ],
                        labels: chartLabel,
                    },
                    options: {
                        legend: {
                            display: false,
                            position: 'top',
                            labels: {
                                boxWidth: 10,
                            }
                        },
                        /*scales: {
                            xAxes: [{
                                type: 'linear',
                                ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 140,
                                    stepSize: 10
                                }
                            }],
                            yAxes: [{
                                type: 'linear',
                                ticks: {
                                    autoSkip: true,
                                    suggestedMin: 0,
                                    suggestedMax: 100,
                                    stepSize: 5,
                                    callback: function (value) {
                                        return value + '%';
                                    }
                                }
                            }]
                        },*/

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