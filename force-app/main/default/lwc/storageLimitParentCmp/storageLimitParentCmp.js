import { LightningElement, wire, api, track } from 'lwc';
import getStorageLimit from '@salesforce/apex/LimitServiceCmpController.getStorageLimit';

export default class StorageLimitParentCmp extends LightningElement {

    chartLoaded = false;
    chartConfiguration;
    currentWeekCount = 0;

    connectedCallback() {
        this.gettingAllLimitMethod(this.currentWeekCount);
    }

    gettingAllLimitMethod(count) {
        try {
            this.chartLoaded = false;
            getStorageLimit({ val: count })
                .then(data => {
                    let dataStorageMB = [];
                    let fileStorageMB = [];
                    let chartLabel = [];
                    //console.log('======dataStorageMB========' + JSON.stringify(data));
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
                            if (limitObj.louie976__Limit_Name__c == 'FileStorageMB') {
                                
                                fileStorageMB.push({y:limitObj.louie976__Max__c - limitObj.louie976__Remaining__c,x:0});
                            }
                            if (limitObj.louie976__Limit_Name__c == 'DataStorageMB') {
                                
                                dataStorageMB.push({y:limitObj.louie976__Max__c - limitObj.louie976__Remaining__c,x:0});
                            }
                        });
                        //this.mapData.push({value:data[key], key:key});
                    }
                    //console.log('=====dataStorageMB==='+dataStorageMB);
                    
                    this.chartConfiguration = {
                       
                        type: 'line',
                        data: {
                            datasets: [{
                                fill: false,
                                label: 'Data Storage MB',
                                data: dataStorageMB,
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
                                data: fileStorageMB,
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
                                display: true,
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
                            scales: {
                                yAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'MB Used',
                                    }
    
                                }],
    
                            }
                        }
                    };
                    this.error = undefined;
                    this.chartLoaded = true;

                })
                .catch(error => {
                    console.log('======error========' + JSON.stringify(error));
                    this.error = error;
                    this.chartConfiguration = undefined;
                });
        } catch (error) {
            console.log('===catch===error========' + JSON.stringify(error));
        }
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
        const modal = this.template.querySelector("c-more-details-cmp-for-storage-limit");
        modal.show();
    }


}