import { LightningElement, wire, api, track } from 'lwc';
import GetAllLimits from '@salesforce/apex/LimitServiceCmpController.GetAllLimits';

export default class BarChartTrentLineCopy1  extends LightningElement {

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
                /*let chartSingleEmail = [];
                let chartMassEmail = [];
                let chartWorkflowEmail = [];
                let chartLabel = [];
                //console.log('======data========' + JSON.stringify(data));
                for (let key in data) {

                    let finalKeyVal = '';
                    let textVal = key.substr(6, 2);
                    if(textVal.includes("/")) {
                        let resulttextValNew = textVal.substr(0,1);
                        finalKeyVal = key.substr(4, 2)+'0'+resulttextValNew;
                    } else {
                        finalKeyVal = key.substr(4, 4);
                    }
                    
                    //let result = text.substr(4, 4);
                    chartLabel.push(finalKeyVal);
                    data[key].forEach(limitObj => {
                        if (limitObj.Limit_Name__c == 'SingleEmail') {
                            chartSingleEmail.push(limitObj.Max__c - limitObj.Remaining__c);
                        }
                        if (limitObj.Limit_Name__c == 'MassEmail') {
                            chartMassEmail.push(limitObj.Max__c - limitObj.Remaining__c);
                        }
                        if (limitObj.Limit_Name__c == 'DailyWorkflowEmails') {
                            chartWorkflowEmail.push(limitObj.Max__c - limitObj.Remaining__c);
                        }

                    });
                    //this.mapData.push({value:data[key], key:key});
                }*/
                //let chartSingleEmail = [1000,1500,1200,1100,900,800,700];
                //let chartMassEmail = [1000,1500,1200,1100,900,800,700,];
                //let chartLabel = ['Mon','Tus','Wed','Thu',',Fri','Sat','Sun'];

                this.chartConfiguration = {
                    type: 'bar',
                    data: {
                        datasets: [
                            {
                                fill: false,
                                label: '',
                                backgroundColor: "#0070d2",
                                data: [1000, 1500, 1200, 1100, 900, 800, 500],
                                borderColor: "#0070d2",
                                //borderWidth: 1
                                tension: 0.4,
                                type: 'line',
                                
                                
                            },
                            {
                                type: 'bar',
                                label: '',
                                backgroundColor: "#64cafa",
                                data: [1000, 1500, 1200, 1100, 900, 800, 500],
                                borderColor: "#64cafa",
                                borderWidth: 1,
                                
                            },
                            {
                                //type: 'bar',
                                label: '',
                                backgroundColor: "#d9d9d9",
                                data: [1500,2000,1700,1500,1200,1400,1000],
                                borderColor: "#d9d9d9",
                                borderWidth: 1,
                                
                            },
                        
                       

                        ],
                        labels: ['Mon', 'Tus', 'Wed', 'Thu', ',Fri', 'Sat', 'Sun'],
                    },
                    options: {
                        //responsive: true,
                        scales: {
                            xAxes: [{
                                stacked: true,

                            }],
                            yAxes: [{
                                stacked: true,
                                beginAtZero: true
                            }]
                            
                        },
                    },
                    //Plugins: [ChartDataLabels]


                };


                console.log('data => ', data);
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