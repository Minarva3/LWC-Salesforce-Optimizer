import { LightningElement, wire, api, track } from 'lwc';

import getReports from '@salesforce/apex/FetchReport.getReports';


export default class DoughnutChartReport extends LightningElement {

    
    chartLoaded = false;
     
   // chartConfiguration;
    // @track wiredReports;
    @track countArray=[]; 
    @track norunVal;
    @track recentVal;
    @track oldVal;
    @track sum=0;
    connectedCallback() {
        this.gettingCountMethod();
    }
   
     
    
    // getTotal(config) {
    //     var sum = this.config.config.data.datasets[0].data.reduce((a, b,c) => a + b +c, 0);
    //     return `${sum}`;
    // }

     gettingCountMethod(){
        this.chartLoaded = false;
        
        getReports().then(results=>{
            // this.consData = JSON.parse(JSON.stringify(data));
            // this.wiredReports = {...data};
            
            //   console.log("inside if data wire method" +JSON.stringify(this.wiredReports));
            //  let dataArray=[];
              for(var key in results)
              { 
                this.countArray.push(results[key].count);
                console.log("Count...."+results[key].count);
                console.log("...label  "+ results[key].label);
               
                    this.sum=this.sum+results[key].count;
                    console.log("Sum of all reports.."+this.sum);
                    if(results[key].label=='Number of Report that did not run'){
                        this.norunVal=results[key].count;
                        console.log("NO RUN REPORT "+this.norunVal);
                    }
                    else if(results[key].label=='Number of Recent Reports')
                    {
                      this.recentVal=results[key].count;
                        console.log('NO OF RECENT REPORTS '+this.recentVal);
                    }
                    else if(results[key].label=='Number of Old Reports')
                    {
                       this.oldVal=results[key].count;
                        console.log('NO OF Old REPORTS '+this.oldVal);
                    }

                

              
             }
             
             console.log("data in Array.."+JSON.stringify(this.countArray));  
             
                    
                //  this.chartConfiguration = {
                //             type: 'doughnut',
                 
                //             data : {
                //                    labels: [
                //                             'Number of Reports that did not run',
                //                             'Number of Old Reports',
                //                             'Number of Recent Reports'
                //                             ],
            
                //                     datasets: [{
                //                      label: [
                //                                'Number of Reports that did not run',
                //                                'Number of Recent Reports',
                //                                'Number of Old Reports'
                //                              ],  
                //                      backgroundColor: [
                //                                 'rgb(255, 99, 132)',
                //                                 'rgb(54, 162, 235)',
                //                                 'rgb(255, 205, 86)'
                //                                 ],                    
                                
                //                      data:dataArray,
                
                                     
                                           
                //                       },]
                //                     },      
                                
                //             options: {
                //                 plugins: {
                //                      doughnutlabel: {
                //                         labels:[ {
                //                             text: 'Total Reports',
                //                                 font: {
                //                                     size: '50'
                //                                        },
                //                                 color: 'grey'
                //                             },]
                //                             }
                //                          },

                //                  legend: {
                //                     display: true,
                //                     position: 'right',
                //                     labels: {
                //                         boxWidth: 10,
                //                             }
                //                         }
                //                     },
                //             };//end config
                           
                            this.error = undefined;
                            this.chartLoaded = true;
            
                         })//end then
                         .catch(error => {
                            console.log('======error========' + error);
                            this.error = error;
                            this.chartConfiguration = undefined;
                        });//end catch

 }
    

handleModal(event) {
    console.log("inside modal");
    const modal = this.template.querySelector("c-more-details-cmp-for-bar-chart");
    modal.show();
}



}