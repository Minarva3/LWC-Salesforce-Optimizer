import { LightningElement, api } from 'lwc';

export default class ModalApiVersion extends LightningElement {

    showModal = false

    @api show() {
        this.showModal = true;
    }

    closeHandler(){
        this.showModal = false
    }
    
    closeModal(){
        this.dispatchEvent(new CustomEvent('close')) //now in wrapper we have to listen this event
    }

    // handleSlotFooterChange(){
    //     const footerElement = this.template.querySelector('.slds-modal__footer')
    //     if(footerElement){
    //         footerElement.classList.remove('slds-hide')
    //     }
    // }

    // handleSlotHeaderChange(){
    //     const headerElement = this.template.querySelector('.slds-modal__header')
    //     if(headerElement){
    //         headerElement.classList.remove('remove_header')
    //     }
    // }
}