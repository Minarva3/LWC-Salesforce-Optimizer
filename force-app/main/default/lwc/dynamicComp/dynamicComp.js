import { LightningElement,api } from 'lwc';

export default class DynamicComp extends LightningElement {

   
        @api component;
    
        get dynamicComponent() {
            return this.component;
        }
}