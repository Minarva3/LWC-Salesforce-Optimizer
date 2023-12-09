import { LightningElement, wire, api, track } from 'lwc';
import chartjs from '@salesforce/resourceUrl/Chartjs';
import { loadScript } from 'lightning/platformResourceLoader';

export default class MoreDetailsComponentCopy2 extends LightningElement {


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

  @track singleEmailData;
  @track massEmailData;
  @track workflowEmailData;
  @track error;

  connectedCallback() {
      this.gettingAllLimitMethod();
      this.gettingWeeklyLimits();
  }

  gettingAllLimitMethod() {
      getEmailAllLimits()
          .then(data => {

              for (let key in data) {

                  if (data[key].limitName == 'SingleEmail') {
                      this.singleEmailData = data[key].limitObj;
                  }
                  if (data[key].limitName == 'MassEmail') {
                      this.massEmailData = data[key].limitObj;
                  }
                  if (data[key].limitName == 'DailyWorkflowEmails') {
                      this.workflowEmailData = data[key].limitObj;
                  }
              }
              //console.log('======singleEmailData========' + JSON.stringify(this.singleEmailData));
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
          getBarChartLimits()
              .then(data => {
                  let chartSingleEmail = [];
                  let chartMassEmail = [];
                  let chartWorkflowEmail = [];
                  let chartLabel = [];
                  let sumSingleValue = 0;
                  let sumMassValue = 0;
                  let sumWorkflowValue = 0;
                  console.log('======Weekly========' + JSON.stringify(data));
                  for (let key in data) {

                      chartLabel.push(key);
                      data[key].forEach(limitObj => {
                          if (limitObj.Limit_Name__c == 'SingleEmail') {
                              sumSingleValue += limitObj.Max__c - limitObj.Remaining__c;
                          }
                          if (limitObj.Limit_Name__c == 'MassEmail') {
                              sumMassValue += limitObj.Max__c - limitObj.Remaining__c;   
                          }
                          if (limitObj.Limit_Name__c == 'DailyWorkflowEmails') {
                              sumWorkflowValue += limitObj.Max__c - limitObj.Remaining__c;                             
                          }

                      });
                      //this.mapData.push({value:data[key], key:key});
                      //console.log('=====sumSingleValue======'+sumSingleValue);
                      
                      chartSingleEmail.push(sumSingleValue);
                      chartMassEmail.push(sumMassValue);
                      chartWorkflowEmail.push(sumWorkflowValue);
                      
                      sumSingleValue = 0;
                      sumMassValue = 0;
                      sumWorkflowValue = 0;
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
                       }

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