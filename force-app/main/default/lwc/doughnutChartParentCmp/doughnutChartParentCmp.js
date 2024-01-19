import { LightningElement, api } from 'lwc';

 import ACCOUNT_FIELD from '@salesforce/schema/Contact.AccountId';
import ACCOUNT_NAME from '@salesforce/schema/Contact.Account.Name';

export default class doughnutChartParentCmp extends LightningElement {
    // Flexipage provides recordId and objectApiName
    @api recordId;
    @api objectApiName;

    fields = [ACCOUNT_NAME];
    AccountId = [ACCOUNT_FIELD];

    get AccountId(){
        console.log("inside getter AccountId");
        return this.contact.data.fields.AccountId.value;
    }
}