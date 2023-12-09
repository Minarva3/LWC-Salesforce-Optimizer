import { LightningElement, api } from 'lwc';
import chartJs from '@salesforce/resourceUrl/Chartjs';
import {loadScript} from 'lightning/platformResourceLoader';
export default class LineChartApiVersion extends LightningElement {

    isChartJsInitialized
    chart

    // we will catch parent component data from parent component "chartData.html"

    @api chartData
    @api chartLabels
    @api type
    @api chartHeading

    // now we'll put these to configs

    renderedCallback(){
        if(this.isChartJsInitialized){
            return;
        }
        loadScript(this, chartJs).then(()=>{
            console.log('ChartJs Loaded Successfully')
            this.isChartJsInitialized = true
            this.loadCharts()
        }).catch(error=>{
            console.error(error)
        })
    }

    loadCharts(){
        window.Chart.platform.disableCSSInjection = true //in chart Js library only will do this line bcoz it automaticall inject css 
        const canvas = document.createElement('canvas')
        this.template.querySelector('div.chart').appendChild(canvas)// this line will create this tag<canvas></canvas> dynamically in html file between first div
        const ctx = canvas.getContext('2d')
        this.chart = new window.Chart(ctx, this.config())
    }

    config(){
        return {
            type: this.type,
            data: {
              labels: this.chartLabels ? this.chartLabels:[], //it will check if labels are there or use empty array
              datasets: [{
                // fill : false,
                label: this.chartHeading,
                data: this.chartData ? this.chartData:[],  
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(201, 203, 207, 0.2)',
                  'rgba(100, 102, 255, 0.2)',
                  'rgba(201, 100, 207, 0.2)'
                ],
                
                // backgroundColor: [
                //   '#FF0000'
                //               ],
                // borderColor: [
                //                 '#FF0000'
                //             ],
                // pointBackgroundColor: '#FF0000',
                //             pointBorderColor: '#FF0000',
                borderWidth: 1
              }
              // {
              //   fill : false,
              //   label: '# of Votes',
              //   data: [2, 4, 6, 8, 10, 12],
              //   // backgroundColor: [
              //   //                 '#0000FF'
              //   //             ],
              //   borderColor: [
              //                   '#0000FF'
              //               ],
              //   pointBackgroundColor: '#0000FF',
              //               pointBorderColor: '#0000FF',
              //   borderWidth: 2
              // },
              // {
              //   fill : false,
              //   label: '# of Votes',
              //   data: [3, 5, 7, 9, 11, 13],
              //   // backgroundColor: [
              //   //                 '#FFC0CB'
              //   //             ],
              //   borderColor: [
              //                   '#FFC0CB'
              //               ],
              //   pointBackgroundColor: '#FFC0CB',
              //               pointBorderColor: '#FFC0CB',
              //   borderWidth: 2
              // },
              // {
              //   fill : false,
              //   label: '# of Votes',
              //   data: [4, 5, 7, 10, 14, 16],
              //   // backgroundColor: [
              //   //                 '#00FF00'
              //   //             ],
              //   borderColor: [
              //                   '#00FF00'
              //               ],
              //   pointBackgroundColor: '#00FF00',
              //               pointBorderColor: '#00FF00',
              //   borderWidth: 2
              // },
              // {
              //   fill : false,
              //   label: '# of Votes',
              //   data: [2, 3, 6, 9, 11, 15],
              //   // backgroundColor: [
              //   //                 '#FFFF00'
              //   //             ],
              //   borderColor: [
              //                   '#FFFF00'
              //               ],
              //   pointBackgroundColor: '#FFFF00',
              //               pointBorderColor: '#FFFF00',
              //   borderWidth: 2
              // }
            ]},
            options: {
              responsive: true,
              legend:{
                position:'right'
              },
              animation:{
                animateScale: true,
                animateRotate: true
              }
              
            }
          }
    }

}