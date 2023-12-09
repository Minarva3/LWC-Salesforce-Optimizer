import { LightningElement, wire, api, track } from 'lwc';
import getWeeklyDataTrends from '@salesforce/apex/LimitServiceCmpController.getWeeklyDataTrends';

export default class DataTrendsCmp extends LightningElement {

    chartLoaded = false;
    chartConfiguration;
    //currentWeekCount = 0;

    connectedCallback() {
        this.gettingAllLimitMethod();
    }

    gettingAllLimitMethod() {
        //try {
        this.chartLoaded = false;
        getWeeklyDataTrends()
            .then(data => {
                console.log('======wrapper data========' + JSON.stringify(data));
                    let accountCount = [];
                    let oppCount = [];
                    let leadCount = [];
                    let conCount = [];
                    let caseCount = [];
                    let chartLabel = [];
                    let sumOfAccount = 0;
                    let sumOfOpp = 0;
                    let sumOfLead = 0;
                    let sumOfContact = 0;
                    let sumOfCase = 0;
                    
                for (let key in data) {

                    chartLabel.push(key);
                    data[key].forEach(dataTrendsWrapp => {
                        if(dataTrendsWrapp.objName == 'Account') {
                            sumOfAccount = sumOfAccount+1;
                        }
                        if(dataTrendsWrapp.objName == 'Opportunity') {
                            sumOfOpp = sumOfOpp+1;
                        }
                        if(dataTrendsWrapp.objName == 'Lead') {
                            sumOfLead = sumOfLead+1;
                        }
                        if(dataTrendsWrapp.objName == 'Contact') {
                            sumOfContact = sumOfContact+1;
                        }
                        if(dataTrendsWrapp.objName == 'Case') {
                            sumOfCase = sumOfCase+1;
                        }
                    });

                    accountCount.push(sumOfAccount);
                    oppCount.push(sumOfOpp);
                    leadCount.push(sumOfLead);
                    conCount.push(sumOfContact);
                    caseCount.push(sumOfCase);
                    sumOfAccount = 0;
                    sumOfOpp = 0;
                    sumOfLead = 0;
                    sumOfContact = 0;
                    sumOfCase = 0;
                    
                }


                this.chartConfiguration = {
                    type: 'bar',
                    data: {
                        datasets: [{
                            label: 'Account',
                            backgroundColor: "#403e9f",
                            data: accountCount,
                        },
                        {
                            label: 'Opportunity',
                            backgroundColor: "#0070d2",
                            data: oppCount,
                        },
                        {
                            label: 'Lead',
                            backgroundColor: "#1589ee",
                            data: leadCount,
                        },
                        {
                            label: 'Contact',
                            backgroundColor: "#d9d9d9",
                            data: conCount,
                        },
                        {
                            label: 'Case',
                            backgroundColor: "#182a67",
                            data: caseCount,
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
                                ticks: {
                                    beginAtZero: true
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Trends',
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

    //Open popup 
    handleModal(event) {
        console.log("inside modal");
        const modal = this.template.querySelector("c-more-details-cmp-for-a-c-c-o-l");
        modal.show();
    }

}