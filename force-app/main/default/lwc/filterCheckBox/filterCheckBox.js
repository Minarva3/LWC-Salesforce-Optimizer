import { LightningElement, track } from 'lwc';

export default class FilterCheckBox extends LightningElement {

    @track value = [];
    @track selectedoption = [];
    @track showModal=false;
    @track isEmailApi = true;
    @track isAPILimit = true;
    @track isStroageLimit = true;
    @track isDashboardLimit =true;
    @track isAPIVersion = true;
    @track isReportLimit = true;
    @track isDataTrendLimit = true;
    @track isHourlyDashboardLimit = true;
    @track handleShowSelection = false;
    @track handleShowSelectioninModel =false;
 
    handleClearFilters() {
     
        this.value = [];
        this.isEmailApi = true;
        this.isAPILimit = true;
        this.isStroageLimit = true;
        this.isDashboardLimit = true;
        this.isAPIVersion = true;
        this.isReportLimit = true;
        this.isDataTrendLimit = true;
        this.isHourlyDashboardLimit = true;
    }
 
    get options() {
        return [
            { label: 'Email', value: 'c/aAPI' },
            { label: 'API Limit', value: 'c/c/barChartForLimitServiceParent' },
            { label: 'Storage Limit', value: 'Storage Limit' },
            { label: 'Dashboard Limit', value: 'Dashboard Limit' },
            { label: 'API Version', value: 'API Version Limit' },
            { label: 'Report Limit', value: 'Report Limit' },
            { label: 'Data Trends Limit', value: 'Data Trend Limit' },
            { label: 'Hourly Dashboard Limit', value: 'Hourly Dashboard Limit' },
        ];
    }
 
    handleChange(e) {
        this.value = e.detail.value;
   
        // Check if all checkboxes are deselected
        const allDeselected = this.value.length === 0;
   
         this.isEmailApi = allDeselected || this.value.includes('Email Limit');
        this.isAPILimit = allDeselected || this.value.includes('API Limit');
        this.isStroageLimit = allDeselected || this.value.includes('Storage Limit');
        this.isDashboardLimit = allDeselected || this.value.includes('Dashboard Limit');
        this.isAPIVersion = allDeselected || this.value.includes('API Version Limit');
        this.isReportLimit = allDeselected || this.value.includes('Report Limit');
        this.isDataTrendLimit = allDeselected || this.value.includes('Data Trend Limit');
        this.isHourlyDashboardLimit = allDeselected || this.value.includes('Hourly Dashboard Limit');
    }
 
    get selectedValues() {
        this.selectedoption = this.value;
        return this.value.join(' ,');
    }
 
    get showEmailApi() {
        return this.isEmailApi;
    }
 
    get showAPILimit() {
        return this.isAPILimit;
    }
 
    get showStorageLimit() {
        return this.isStroageLimit;
    }
 
    get showDashboardLimit() {
        return this.isDashboardLimit;
    }
 
    get showAPIVersion() {
        return this.isAPIVersion;
    }
 
    get showReportLimit() {
        return this.isReportLimit;
    }
 
    get showDataTrendLimit() {
        return this.isDataTrendLimit;
    }
 
    get showHourlyDashboardLimit() {
        return this.isHourlyDashboardLimit;
    }
 
    handleclick() {
        this.showModal=true;
        this.handleShowSelectioninModel=true;
    }
 
    handleDialogClose() {
        this.showModal=false;
        this.handleShowSelection = true;
    }
 
 
    removeSelectedValue(event) {
        //alert(event.target.dataset.value);
        const selectedValue = event.target.dataset.value;
        if(selectedValue == 'Email Limit'){
            this.isEmailApi = false;
        }// Access the 'data-value' attribute
        const index = this.value.indexOf(selectedValue);
        switch (selectedValue) {
            case 'Email Limit':
                this.isEmailApi = false;
                break;
            case 'API Limit':
                this.isAPILimit = false;
                break;
            case 'Storage Limit':
                this.isStroageLimit = false;
                break;
            case 'Dashboard Limit':
                this.isDashboardLimit = false;
            break;
            case 'API Version Limit':
                this.isAPIVersion = false;
            break;
            case 'Report Limit':
                this.isReportLimit = false;
            break;
            case 'Data Trend Limit':
                this.isDataTrendLimit= false;
            break;
            case 'Hourly Dashboard Limit':
                this.isHourlyDashboardLimit = false;
            break;
            // Add more cases for other values as needed
            default:
                // Handle default case if needed
                break;
        }
        if (index !== -1) {
            this.value.splice(index, 1);
        }
        // Update the necessary logic or properties after removing the value
    }
    removeSelectedValue(event) {
        const selectedValue = event.target.dataset.value;
     
        // Access the 'data-value' attribute
        const index = this.value.indexOf(selectedValue);
     
        // Check if all pills are removed
        const allPillsRemoved = this.value.length === 1;
     
        switch (selectedValue) {
            case 'Email Limit':
                this.isEmailApi = allPillsRemoved || false;
                break;
            case 'API Limit':
                this.isAPILimit = allPillsRemoved || false;
                break;
            case 'Storage Limit':
                this.isStroageLimit = allPillsRemoved || false;
                break;
            case 'Dashboard Limit':
                this.isDashboardLimit = allPillsRemoved || false;
                break;
            case 'API Version Limit':
                this.isAPIVersion = allPillsRemoved || false;
                break;
            case 'Report Limit':
                this.isReportLimit = allPillsRemoved || false;
                break;
            case 'Data Trend Limit':
                this.isDataTrendLimit = allPillsRemoved || false;
                break;
            case 'Hourly Dashboard Limit':
                this.isHourlyDashboardLimit = allPillsRemoved || false;
                break;
            // Add more cases for other values as needed
            default:
                // Handle default case if needed
                break;
        }
     
        if (index !== -1) {
            this.value.splice(index, 1);
        }
     
        // Check if all pills are removed, then set all model flags to true
        if (allPillsRemoved) {
            this.isEmailApi = true;
            this.isAPILimit = true;
            this.isStroageLimit = true;
            this.isDashboardLimit = true;
            this.isAPIVersion = true;
            this.isReportLimit = true;
            this.isDataTrendLimit = true;
            this.isHourlyDashboardLimit = true;
        }
    }
}
