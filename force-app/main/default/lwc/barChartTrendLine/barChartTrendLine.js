import { LightningElement, wire, api, track } from 'lwc';
import getAllAPILimits from '@salesforce/apex/LimitServiceCmpController.getAllAPILimits';

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
        getAllAPILimits({ val: count })
            .then(data => {
                let chartDataForBlue = [];
                let chartDataForGray = [];
                let chartLabel = [];
                console.log('======data= getAllAPILimits=======' + JSON.stringify(data));
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
                        //console.log('======limitObj=======' +limitObj);
                        //console.log('======Limit_Name__c=======' + limitObj.louie976__Limit_Name__c);
                        if (limitObj.louie976__Limit_Name__c == 'DailyApiRequests') {
                            //console.log('======Max=======' + limitObj.louie976__Max__c);
                            chartDataForBlue.push(limitObj.louie976__Max__c - limitObj.louie976__Remaining__c);
                            chartDataForGray.push(limitObj.louie976__Remaining__c);
                        }
                       
                    });
                    //this.mapData.push({value:data[key], key:key});
                }
                //let chartSingleEmail = [1000,1500,1200,1100,900,800,700];
                //let chartMassEmail = [1000,1500,1200,1100,900,800,700,];
                //let chartLabel = ['Mon','Tus','Wed','Thu',',Fri','Sat','Sun'];
                //console.log('======chartLabel=======' + chartLabel);
                //console.log('======chartDataForBlue=======' + chartDataForBlue);
                //console.log('======chartDataForGray=======' + chartDataForGray);
                this.chartConfiguration = {
                    type: 'bar',
                    data: {
                        datasets: [{
                            fill: false,
                            label: '',
                            backgroundColor: "#0070d2",
                            data: chartDataForBlue,
                            borderColor: "#0070d2",
                            //borderWidth: 1
                            tension: 0.4,
                            type: 'line'
                            
                        },
                            
                        {
                            type: 'bar',
                            label: '',
                            backgroundColor: "#64cafa",
                            data: chartDataForBlue,
                            borderColor: "#64cafa",
                            borderWidth: 1,
                            
                        },
                        {
                            type: 'bar',
                            label: '',
                            backgroundColor: "#d9d9d9",
                            data: chartDataForGray,
                            borderColor: "#d9d9d9",
                            borderWidth: 1,
                            
                        },
                        

                        ],
                        labels: chartLabel,
                    },
                    options: {
                        //responsive: true,
                        scales: {
                            xAxes: [{
                                stacked: true,

                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'No. Of APIs',
                                },
                                stacked: true,
                                beginAtZero: true
                            }]
                            
                        },
                        legend: {
                            display: false,
                            position: 'top',
                            labels: {
                                boxWidth: 10,
                            }
                        },
                    }
                    
                    //Plugins: [ChartDataLabels]


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
        const modal = this.template.querySelector("c-more-details-cmp-for-trend-line");
        modal.show();
    }

}