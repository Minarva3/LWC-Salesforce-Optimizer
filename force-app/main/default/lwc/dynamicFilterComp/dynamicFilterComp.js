import { LightningElement, api } from 'lwc';
import getLWCComponent from '@salesforce/apex/GetComponentName.GetCompoenent';
// import GetCompoenentMultiple from '@salesforce/apex/GetCompoenentName.GetCompoenentMultiple';
 
export default class DynamicTestComponent extends LightningElement {
    @api Sname = '';
    @api MSname = [];
    @api componentConstructor = [];
    showModal = false;
    selectedValue = [];
 
    get options() {
        return [
            {label: 'Select All', value:'Limit'},
            { label: 'Communication Limits', value: 'Communication' },
            { label: 'Storage and Versioning', value: 'Storage and Versioning' },
            { label: 'Reporting and Trends', value: 'Reporting and Trends' },
            { label: 'Additional', value: '' },
        ];
    }
 
    connectedCallback() {
        this.loadComponents();
    }
 
    handleInputChange(event) {
        this.Sname = event.detail.value;
        this.loadComponents();
    }
 
    // async loadComponents() {
    //     try {
    //         let data;
    //         if (this.MSname.length === 0) {
    //             data = await getLWCComponent({ Sname: this.Sname });
    //         } else {
    //             data = await GetCompoenentMultiple({ MSname: this.MSname });
    //             console.log(data);
    //             console.log('Inside GetCompoenentMultiple');
    //         }
    //         if (data) {
    //             console.log('Inside GetCompoenentMultiple If found');
    //             const componentNames = data.map(comp => comp.MasterLabel__c);
    //             console.log('ComponentNames: ', this.componentNames)
    //             const imports = componentNames.map(componentName => import(`c/${componentName}`));
    //             const modules = await Promise.all(imports);
    //             this.componentConstructor = modules.map(module => module.default);
    //         }
    //     } catch (error) {
    //         console.error('Error loading components:', error);
    //     }
    // }
 
    // handleCheckGroup(e) {
    //     this.selectedValue = e.detail.value;
    //     this.MSname = this.selectedValue; // Copy selected values to MSname array
    //     console.log('MSname', this.MSname);
    //         this.loadComponents();
    // }
    async loadComponents() {
        try {
            let data = [];
            if (Array.isArray(this.Sname) && this.Sname.length > 0) {
                // Handle array case
                const promises = this.Sname.map(async name => {
                    const result = await getLWCComponent({ Sname: name });
                    data.push(...result);
                });
                await Promise.all(promises);
            } else {
                // Handle string case
                data = await getLWCComponent({ Sname: this.Sname });
            }
   
            const componentNames = data.map(comp => comp.MasterLabel__c);
            const imports = componentNames.map(componentName =>
                import(`c/${componentName}`)
            );
            const modules = await Promise.all(imports);
            this.componentConstructor = modules.map(module => module.default);
        } catch (error) {
            console.error('Error loading components:', error);
        }
    }
 
   
    handleCheckGroup(e) {
        this.selectedValue = e.detail.value;
        if (this.selectedValue.length === 0) {
            this.Sname = ''; // If no checkboxes selected, load all components
        } else {
            this.Sname = this.selectedValue.slice(); // Use a copy of the array
        }
        this.loadComponents();
    }
 
    handleclick() {
        this.showModal = !this.showModal;
    }
 
    clearFilter(){
        this.selectedValue = [];
        this.Sname='';
        this.loadComponents();
    }
}