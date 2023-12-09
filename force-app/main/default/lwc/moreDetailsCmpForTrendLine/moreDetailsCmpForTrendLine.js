import { LightningElement, wire, api, track } from 'lwc';
import chartjs from '@salesforce/resourceUrl/Chartjs';
import { loadScript } from 'lightning/platformResourceLoader';
import getEmailAllLimits from '@salesforce/apex/LimitServiceCmpController.getEmailAllLimits';
import getWeeklyTrendAPILimits from '@salesforce/apex/LimitServiceCmpController.getWeeklyTrendAPILimits';

export default class MoreDetailsCmpForTrendLine extends LightningElement {


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

    @track dataApiRequest;
    @track dataDoughnutColor = '#5c7cfa';
    //@track fileStorageMB;
    @track error;

    connectedCallback() {
        this.gettingAllLimitMethod();
        this.gettingWeeklyLimits();
    }

    gettingAllLimitMethod() {
        getEmailAllLimits()
            .then(data => {

                for (let key in data) {

                    if (data[key].limitName == 'DailyApiRequests') {
                        this.dataApiRequest = data[key].limitObj;
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
        getWeeklyTrendAPILimits()
            .then(data => {
                let chartDataApiRequestBlue = [];
                let chartDataApiRequestGray = [];
                //let chartWorkflowEmail = [];
                let chartLabel = [];
                let sumDataBlue = 0;
                let sumDataGray = 0;
                //let sumWorkflowValue = 0;
                //console.log('======Weekly========' + JSON.stringify(data));
                for (let key in data) {

                    chartLabel.push(key);
                    data[key].forEach(limitObj => {
                        
                        if (limitObj.louie976__Limit_Name__c == 'DailyApiRequests') {
                            //console.log('======key====='+key);
                            sumDataBlue += limitObj.louie976__Max__c - limitObj.louie976__Remaining__c;
                            sumDataGray += limitObj.louie976__Remaining__c;
                        }

                    });
                    //console.log('======sumDataBlue====='+sumDataBlue);

                    chartDataApiRequestBlue.push(sumDataBlue);
                    chartDataApiRequestGray.push(sumDataGray);
                    //console.log('======chartDataApiRequestBlue====='+chartDataApiRequestBlue);

                    sumDataBlue = 0;
                    sumDataGray = 0;

                }

                this.chartConfiguration = {
                    type: 'bar',
                    data: {
                        datasets: [{
                            fill: false,
                            label: '',
                            backgroundColor: "#0070d2",
                            data: chartDataApiRequestBlue,
                            borderColor: "#0070d2",
                            //borderWidth: 1
                            tension: 0.4,
                            type: 'line'
                            
                        },
                            
                        {
                            type: 'bar',
                            label: '',
                            backgroundColor: "#64cafa",
                            data: chartDataApiRequestBlue,
                            borderColor: "#64cafa",
                            borderWidth: 1,
                            
                        },
                        {
                            type: 'bar',
                            label: '',
                            backgroundColor: "#d9d9d9",
                            data: chartDataApiRequestGray,
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
                    },
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