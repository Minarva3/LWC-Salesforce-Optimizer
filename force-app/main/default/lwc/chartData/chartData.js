import { LightningElement, wire } from 'lwc';
import getOpportunities from '@salesforce/apex/lineChart.getOpportunities';
export default class ChartData extends LightningElement {


    // now we will pass this data to child component which is "lineChartApiVersion"
    //for that first we'll mention this data in html of this js file only
    lineChartLabels=[] //we are using .length so we will make it as array
    lineChartData=[]

    @wire(getOpportunities)
    opportunityHandler({data, error}){
        if(data){
            console.log(data)
            const result = data.reduce((json, val)=>({...json, [val.StageName]:(json[val.StageName]|0)+1}), {})
            if(Object.keys(result).length){
                this.lineChartLabels = Object.keys(result)
                this.lineChartData = Object.values(result)
            }
        }
        else if(error){
            console.error(error)
        }
    }
}