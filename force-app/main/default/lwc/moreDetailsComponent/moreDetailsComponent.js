import { LightningElement ,api,track} from 'lwc';


export default class MoreDetailsComponent extends LightningElement {

    doughnutType;
    showModal = false;
    
  @api show() {
    this.showModal = true;
    console.log("before chart");
    
  }
  
  
  handleDialogClose() {
    this.showModal = false;
  }

  
}