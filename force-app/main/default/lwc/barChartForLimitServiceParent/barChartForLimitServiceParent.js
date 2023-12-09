import { LightningElement, wire, api, track } from 'lwc';
import GetAllLimits from '@salesforce/apex/LimitServiceCmpController.GetAllLimits';

export default class BarChartForLimitServiceParent extends LightningElement {

    chartLoaded = false;
    chartConfiguration;
    currentWeekCount = 0;

    connectedCallback() {
        this.gettingAllLimitMethod(this.currentWeekCount);
    }

    gettingAllLimitMethod(count) {
        //try {
        this.chartLoaded = false;
        GetAllLimits({ val: count })
            .then(data => {
                let chartSingleEmail = [];
                let chartMassEmail = [];
                let chartWorkflowEmail = [];
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
                        if (limitObj.louie976__Limit_Name__c == 'SingleEmail') {
                            chartSingleEmail.push(limitObj.louie976__Max__c - limitObj.louie976__Remaining__c);
                        }
                        if (limitObj.louie976__Limit_Name__c == 'MassEmail') {
                            chartMassEmail.push(limitObj.louie976__Max__c - limitObj.louie976__Remaining__c);
                        }
                        if (limitObj.louie976__Limit_Name__c == 'DailyWorkflowEmails') {
                            chartWorkflowEmail.push(limitObj.louie976__Max__c - limitObj.louie976__Remaining__c);
                        }

                    });
                    //this.mapData.push({value:data[key], key:key});
                }

                this.chartConfiguration = {
                    type: 'bar',
                    data: {
                        datasets: [{
                            label: 'Single Email',
                            backgroundColor: "#1589ee",
                            data: chartSingleEmail,
                        },
                        {
                            label: 'Mass Email',
                            backgroundColor: "#b83232",
                            data: chartMassEmail,
                        },
                        {
                            label: 'WorkFlow Email',
                            backgroundColor: "#403e9f",
                            data: chartWorkflowEmail,
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
                                    labelString: 'No. of Emails',
                                }

                            }],

                        },legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                boxWidth: 10,
                            }
                        }

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
        const modal = this.template.querySelector("c-more-details-cmp-for-bar-chart");
        modal.show();
    }

}