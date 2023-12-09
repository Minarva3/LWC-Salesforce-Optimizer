import { LightningElement } from 'lwc';

export default class AccValidationDemo extends LightningElement {
    handleSuccess(event) {
        console.log('Account Id: ',event.detail.id);
    }    
    handleClick() {
        this.template.querySelectorAll('lightning-input-field').forEach(element => element.reportValidity());
    }    
}