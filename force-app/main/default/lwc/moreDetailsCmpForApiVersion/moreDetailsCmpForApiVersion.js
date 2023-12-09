import { LightningElement, track, api } from 'lwc';
import getWeeklyApiVersionCount from '@salesforce/apex/LimitServiceCmpController.getWeeklyApiVersionCount';
import getMonthlyApiVersionCount from '@salesforce/apex/LimitServiceCmpController.getMonthlyApiVersionCount';
export default class MoreDetailsCmpForApiVersion extends LightningElement {

    showModal = false;
    chartLoaded = false;
    chartConfig;
    weeklyFieldValue = true;
    quarterlyFieldValue = false;
    monthlyFieldValue = false;
    @track isChartJsInitialized;

    @api show() {
        this.showModal = true;
        this.gettingWeeklyApi();
    }

    // handleModal(){
    //     this.showModal = true
    // }

    handleDialogClose() {
        this.showModal = false;
    }

    @track error;
    // @track fileDoughnutColor = '#1ab14d';
    // @track dataDoughnutColor = '#5c7cfa';


    connectedCallback() {
        this.gettingWeeklyApi();
        this.gettingMonthlyApi();

    }

    gettingWeeklyApi() {
        this.chartLoaded = false;
        getWeeklyApiVersionCount()
            .then(data => {
                
// Storing chart labels and range count in an array
                let weekChartLabel = [];
                let weekFirstRangeValues=[];
                let weekSecondRangeValues=[];
                let weekThirdRangeValues=[];
                let weekForthRangeValues=[];
                let weekFifthRangeValues=[];

    
                for (let key in data) {

                    weekChartLabel.push(key);
                    allData.push(data);
                    data[key].forEach(limitObj => {
                        if (limitObj.louie976__API_Version_Range__c == '10-20') {
                            weekFirstRangeValues.push(limitObj.louie976__API_Version_Count__c)   
                        }
                        if (limitObj.louie976__API_Version_Range__c == '20-30') {
                            weekSecondRangeValues.push(limitObj.louie976__API_Version_Count__c)
                        }
                        if (limitObj.louie976__API_Version_Range__c == '30-40') {
                            weekThirdRangeValues.push(limitObj.louie976__API_Version_Count__c)
                        }
                        if (limitObj.louie976__API_Version_Range__c == '40-50') {
                            weekForthRangeValues.push(limitObj.louie976__API_Version_Count__c)
                        }
                        if (limitObj.louie976__API_Version_Range__c == '50-60') {
                            weekFifthRangeValues.push(limitObj.louie976__API_Version_Count__c)
                        }
                       

                    });
                   
                
            }
          
          
            this.chartConfig = {

                    type: 'line',
                    data: {
                        labels: weekChartLabel,
                        datasets: [{
                            fill: false,
                            label: 'Version: 10-20',
                            data: weekFirstRangeValues,
                            backgroundColor: [
                                '#FF0000'
                            ],
                            borderColor: [
                                '#FF0000'
                            ],
                            pointBackgroundColor: '#FF0000',
                            pointBorderColor: '#FF0000'
                        },
                        {
                            fill: false,
                            label: 'Version: 20-30',
                            data: weekSecondRangeValues,
                            backgroundColor: [
                                '#0000FF'
                            ],
                            borderColor: [
                                '#0000FF'
                            ],
                            pointBackgroundColor: '#0000FF',
                            pointBorderColor: '#0000FF'
                        },
                        {
                            fill: false,
                            label: 'Version: 30-40',
                            data: weekThirdRangeValues,
                            backgroundColor: [
                                '#FFC0CB'
                            ],
                            borderColor: [
                                '#FFC0CB'
                            ],
                            pointBackgroundColor: '#FFC0CB',
                            pointBorderColor: '#FFC0CB'
                        },
                        {
                            fill: false,
                            label: 'Version: 40-50',
                            data: weekForthRangeValues,
                            backgroundColor: [
                                '#00FF00'
                            ],
                            borderColor: [
                                '#00FF00'
                            ],
                            pointBackgroundColor: '#00FF00',
                            pointBorderColor: '#00FF00'
                        },
                        {
                            fill: false,
                            label: 'Version: 50-60',
                            data: weekFifthRangeValues,
                            backgroundColor: [
                                '#FFFF00'
                            ],
                            borderColor: [
                                '#FFFF00'
                            ],
                            pointBackgroundColor: '#FFFF00',
                            pointBorderColor: '#FFFF00'
                        }
                        ]
                        
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

                    }
                };


                //console.log('data => ', data);
                this.error = undefined;
                this.chartLoaded = true;

            })
            .catch(error => {
                console.log('======error========' + JSON.stringify(error));
                this.error = error;
                this.chartConfig = undefined;
            });
        /* } catch (error) {
             console.log('===catch===error========' + JSON.stringify(error));
         }*/
    }
    // weekly End


    // monthly Start

    gettingMonthlyApi() {
        this.chartLoaded = false;
        getMonthlyApiVersionCount()
            .then(data => {
                
// Storing chart labels and range count in an array
                let monthChartLabel = [];
                let monthFirstRangeValues=[];
                let monthSecondRangeValues=[];
                let monthThirdRangeValues=[];
                let monthForthRangeValues=[];
                let monthFifthRangeValues=[];

    
                for (let key in data) {

                    monthChartLabel.push(key);
                    data[key].forEach(limitObj => {
                        if (limitObj.louie976__API_Version_Range__c == '10-20') {
                            monthFirstRangeValues.push(limitObj.louie976__API_Version_Count__c)   
                        }
                        if (limitObj.louie976__API_Version_Range__c == '20-30') {
                            monthSecondRangeValues.push(limitObj.louie976__API_Version_Count__c)
                        }
                        if (limitObj.louie976__API_Version_Range__c == '30-40') {
                            monthThirdRangeValues.push(limitObj.louie976__API_Version_Count__c)
                        }
                        if (limitObj.louie976__API_Version_Range__c == '40-50') {
                            monthForthRangeValues.push(limitObj.louie976__API_Version_Count__c)
                        }
                        if (limitObj.louie976__API_Version_Range__c == '50-60') {
                            monthFifthRangeValues.push(limitObj.louie976__API_Version_Count__c)
                        }
                       

                    });
                   
                
            }
            

                this.chartConfig = {

                    type: 'line',
                    data: {
                        labels: monthChartLabel,
                        datasets: [{
                            fill: false,
                            label: 'Version: 10-20',
                            data: monthFirstRangeValues,
                            backgroundColor: [
                                '#FF0000'
                            ],
                            borderColor: [
                                '#FF0000'
                            ],
                            pointBackgroundColor: '#FF0000',
                            pointBorderColor: '#FF0000'
                        },
                        {
                            fill: false,
                            label: 'Version: 20-30',
                            data: monthSecondRangeValues,
                            backgroundColor: [
                                '#0000FF'
                            ],
                            borderColor: [
                                '#0000FF'
                            ],
                            pointBackgroundColor: '#0000FF',
                            pointBorderColor: '#0000FF'
                        },
                        {
                            fill: false,
                            label: 'Version: 30-40',
                            data: monthThirdRangeValues,
                            backgroundColor: [
                                '#FFC0CB'
                            ],
                            borderColor: [
                                '#FFC0CB'
                            ],
                            pointBackgroundColor: '#FFC0CB',
                            pointBorderColor: '#FFC0CB'
                        },
                        {
                            fill: false,
                            label: 'Version: 40-50',
                            data: monthForthRangeValues,
                            backgroundColor: [
                                '#00FF00'
                            ],
                            borderColor: [
                                '#00FF00'
                            ],
                            pointBackgroundColor: '#00FF00',
                            pointBorderColor: '#00FF00'
                        },
                        {
                            fill: false,
                            label: 'Version: 50-60',
                            data: monthFifthRangeValues,
                            backgroundColor: [
                                '#FFFF00'
                            ],
                            borderColor: [
                                '#FFFF00'
                            ],
                            pointBackgroundColor: '#FFFF00',
                            pointBorderColor: '#FFFF00'
                        }
                        ]
                        
                    },
                    options: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                boxWidth: 10,
                            },
                            
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
                this.chartConfig = undefined;
            });
        /* } catch (error) {
             console.log('===catch===error========' + JSON.stringify(error));
         }*/
    }

    // monthly End


    

    handleRadioChange(event) {
        console.log("inside radio handler");
        const selectedOption = event.target.value;
        console.log("Value  " + selectedOption);

        if (selectedOption == 'weeklyRadio') {
            this.weeklyFieldValue = true;
            this.monthlyFieldValue = false;
            this.quarterlyFieldValue = false;
            this.gettingWeeklyApi();
            console.log("week");
        } else {
            this.weeklyFieldValue = false;
        }

        if (selectedOption == 'monthlyRadio') {
            this.monthlyFieldValue = true;
            this.weeklyFieldValue = false;
            this.quarterlyFieldValue = false;
            this.gettingMonthlyApi();
            console.log("month");
        } else {
            this.monthlyFieldValue = false;
        }

        if (selectedOption == 'quarterlyRadio') {
            this.quarterlyFieldValue = true;
            this.weeklyFieldValue = false;
            this.monthlyFieldValue = false;
            this.gettingWeeklyApi();
            console.log("quarterly");
        } else {
            this.quarterlyFieldValue = false;

        }
    }
}