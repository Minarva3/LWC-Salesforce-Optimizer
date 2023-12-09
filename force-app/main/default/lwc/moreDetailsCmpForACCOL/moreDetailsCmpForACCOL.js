import { LightningElement, wire, api, track  } from 'lwc';
import getWeeklyDataTrends from '@salesforce/apex/LimitServiceCmpController.getWeeklyDataTrends';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
export default class MoreDetailsCmpForACCOL extends LightningElement {


    showModal = false;
    showTab = false;
    chartLoaded = false;
    chartConfiguration;
    weekelyFieldValue = true;
    quarterlyFieldValue =false;
    monthlyFieldValue = false;
    @track isChartJsInitialized;
    accOption = true;
    oppOption = false;
    caseOption = false;
    leadOption = false;
    conOption = false;
   
   
   
    // for Industry Field
    agriOption = false;
    apparelOption = false;
    bankingOption = false;
    biotechnologyOption = false;
    chemicalsOption = false;
    communicationsOption = false;
    constructionOption = false;
    consultingOption = false;
    educationOption = false;
    electronicsOption = false;
    energyOption = false;
    engineeringOption = false;
    entertainmentOption = false;
    environmentalOption = false;
    financeOption = false;
    foodOption = false;
    governmentOption = false;
    healthcareOption = false;
    hospitalityOption = false;
    insuranceOption = false;
    machineryOption = false;
    manufacturingOption = false;
    mediaOption = false;
    notForProfitOption = false;
    recreationOption = false;
    retailOption = false;
    shippingOption = false;
    technologyOption = false;
    telecommunicationsOption = false;
    tranportationOption = false;
    utilitiesOption = false;
    otherOptionIndustry = false;

    
    //for Type field
    prospectOption = false;
    customerDirectOption = false;
    customerChannelOption = false;
    channelPartnerResellerOption = false;
    installationPartnerOption = false;
    technologyPartnerOption = false;
    otherOptionType = false;
        
        

    
    industryOptions = []; // Holds the picklist options for industry field
    selectedIndustry = ''; // Holds the selected value for industry field
    typeOptions = [];       // Holds the picklist options for type field
    selectedType = '';      // Holds the selected value for type field


    @api show() {
        this.showModal = true;
    }

    handleDialogClose() {
        this.showModal = false;
    }

    // Getting industry picklist field from account
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;

    @wire(getPicklistValues, { recordTypeId:'$objectInfo.data.defaultRecordTypeId', fieldApiName:INDUSTRY_FIELD})
    industryPicklist({data, error}){
        if(data){
            console.log("Industry",data);
            this.industryOptions = [...this.generateIndustryPicklist(data)];
        }
        else if(error){
            console.error(error);
        }
    }

    //Getting type picklist field from account
    @wire(getPicklistValues, { recordTypeId:'$objectInfo.data.defaultRecordTypeId', fieldApiName:TYPE_FIELD})
    typePicklist({data, error}){
        if(data){
            console.log("Type = ",data);
            this.typeOptions = [...this.generateTypePicklist(data)];
        }
        else if(error){
            console.error(error);
        }
    }

    //generating picklist value and label of industry
    generateIndustryPicklist(data){
        return data.values.map(item => ({label: item.label, value: item.value}))
    }

    makeTabsFalse(){
        this.conOption = false;
        this.accOption = false;
        this.oppOption = false;
        this.caseOption = false;
        this.leadOption = false;
    }

    makeIndustryOptionsFalse(){
    this.agriOption = false;
    this.apparelOption = false;
    this.bankingOption = false;
    this.biotechnologyOption = false;
    this.chemicalsOption = false;
    this.communicationsOption = false;
    this.constructionOption = false;
    this.consultingOption = false;
    this.educationOption = false;
    this.electronicsOption = false;
    this.energyOption = false;
    this.engineeringOption = false;
    this.entertainmentOption = false;
    this.environmentalOption = false;
    this.financeOption = false;
    this.foodOption = false;
    this.governmentOption = false;
    this.healthcareOption = false;
    this.hospitalityOption = false;
    this.insuranceOption = false;
    this.machineryOption = false;
    this.manufacturingOption = false;
    this.mediaOption = false;
    this.notForProfitOption = false;
    this.recreationOption = false;
    this.retailOption = false;
    this.shippingOption = false;
    this.technologyOption = false;
    this.telecommunicationsOption = false;
    this.tranportationOption = false;
    this.utilitiesOption = false;
    this.otherOptionIndustry = false;
    }

    makeTypeOptionsFalse(){
    this.prospectOption = false;
    this.customerDirectOption = false;
    this.customerChannelOption = false;
    this.channelPartnerResellerOption = false;
    this.installationPartnerOption = false;
    this.technologyPartnerOption = false;
    this.otherOptionType = false;
    }


    handleAcc(){
        this.accOption = true;
        this.oppOption = false;
        this.caseOption = false;
        this.leadOption = false;
        this.conOption = false;
        this.makeIndustryOptionsFalse();
        this.makeTypeOptionsFalse();
        console.log("Account True", this.accOption)
        this.resetIndustryPicklist();
        this.resetTypePicklist();
        this.gettingAllLimitMethod();
    }
    handleOpp(){
        this.oppOption = true;
        this.accOption = false;
        this.caseOption = false;
        this.leadOption = false;
        this.conOption = false;
        this.makeIndustryOptionsFalse();
        this.makeTypeOptionsFalse();
        console.log("Opportunity True", this.oppOption);
        this.resetIndustryPicklist();
        this.resetTypePicklist();
        this.gettingAllLimitMethod();
    }
    handleCase(){
        this.caseOption = true;
        this.accOption = false;
        this.oppOption = false;
        this.leadOption = false;
        this.conOption = false;
        this.makeIndustryOptionsFalse();
        this.makeTypeOptionsFalse();
        console.log("Case True", this.caseOption);
        this.resetIndustryPicklist();
        this.resetTypePicklist();
        this.gettingAllLimitMethod();
    }
    handleLead(){
        this.leadOption = true;
        this.accOption = false;
        this.oppOption = false;
        this.caseOption = false;
        this.conOption = false;
        this.makeIndustryOptionsFalse();
        this.makeTypeOptionsFalse();
        console.log("Lead True", this.accOption);
        this.resetIndustryPicklist();
        this.resetTypePicklist();
        this.gettingAllLimitMethod();
    }
    handleCon(){
        this.conOption = true;
        this.accOption = false;
        this.oppOption = false;
        this.caseOption = false;
        this.leadOption = false;
        this.makeIndustryOptionsFalse();
        this.makeTypeOptionsFalse();
        console.log("Contact True", this.accOption);
        this.resetIndustryPicklist();
        this.resetTypePicklist();
        this.gettingAllLimitMethod();
    }
    
    //getting selected picklist value on selecting the picklist value of industry
    handleIndustryChange(event) {
        this.selectedIndustry = event.target.value;
        this.makeTabsFalse();
        this.resetTypePicklist();
        this.makeTypeOptionsFalse();
        if(this.selectedIndustry === 'Agriculture'){
        this.agriOption = true;
        this.gettingAllLimitMethod();
        }
        else{
            this.agriOption = false;
        }
        if(this.selectedIndustry === 'Apparel'){
    
        this.apparelOption = true;
        this.gettingAllLimitMethod();
        }
        else{
            this.apparelOption = false;
        }
        if(this.selectedIndustry === 'Banking'){
    
        this.bankingOption = true;
        this.gettingAllLimitMethod();
        }
        else{
            this.bankingOption = false;
        }
        if(this.selectedIndustry === 'Biotechnology'){
    
        this.biotechnologyOption = true;
        this.gettingAllLimitMethod();
        }
        else{
            this.biotechnologyOption = false;
        }
        if(this.selectedIndustry === 'Chemicals'){
    
        this.chemicalsOption = true;
        this.gettingAllLimitMethod();
        }
        else{
            this.chemicalsOption = false;
        }
        if(this.selectedIndustry === 'Communications'){
    
        this.communicationsOption = true;
        this.gettingAllLimitMethod();
        }
        else{
            this.communicationsOption = false;
        }
        if(this.selectedIndustry === 'Construction'){
    
        this.constructionOption = true;
        this.gettingAllLimitMethod();
        }
        else{
            this.constructionOption = false;
        }
        if(this.selectedIndustry === 'Consulting'){
    
        this.consultingOption = true;
        this.gettingAllLimitMethod();
        }
        else{
            this.consultingOption = false;
        }
        if(this.selectedIndustry === 'Education'){
    
        this.educationOption = true;
        this.gettingAllLimitMethod();
        }
        else{
            this.educationOption = false;
        }
        if(this.selectedIndustry === 'Electronics'){
    
        this.electronicsOption = true;
        this.gettingAllLimitMethod();
        }
        else{
            this.electronicsOption = false;
        }
        if(this.selectedIndustry === 'Energy'){
    
        this.energyOption = true;
        this.gettingAllLimitMethod();
        }
        else{
            this.energyOption = false;
        }
        if(this.selectedIndustry === 'Engineering'){
    
        this.engineeringOption = true;
        this.gettingAllLimitMethod();
        }
        else{
            this.engineeringOption = false;
        }
        if(this.selectedIndustry === 'Entertainment'){
    
        this.entertainmentOption = true;
        this.gettingAllLimitMethod();
        }
        else{
            this.entertainmentOption = false;
        }
        if(this.selectedIndustry === 'Environmental'){
    
        this.environmentalOption = true;
        this.gettingAllLimitMethod();
        }
        else{
            this.environmentalOption = false;
        }
        if(this.selectedIndustry === 'Finance'){
    
        this.financeOption = true;
        this.gettingAllLimitMethod();
        }
        else{
            this.financeOption = false;
        }
        if(this.selectedIndustry === 'Food & Beverage'){
    
        this.foodOption = true;
        this.gettingAllLimitMethod();
        }
        else{
            this.foodOption = false;
        }
        if(this.selectedIndustry === 'Government'){
    
        this.governmentOption = true;
        this.gettingAllLimitMethod();
        }
        else{
            this.governmentOption = false;
        }
        if(this.selectedIndustry === 'Healthcare'){
    
        this.healthcareOption = true;
        this.gettingAllLimitMethod();
        }
        else{
            this.healthcareOption = false;
        }
        if(this.selectedIndustry === 'Hospitality'){
    
        this.hospitalityOption = true;
        this.gettingAllLimitMethod();
        }
        else{
            this.hospitalityOption = false;
        }
        if(this.selectedIndustry === 'Insurance'){
    
        this.insuranceOption = true;
        this.gettingAllLimitMethod();
        }
        else{
            this.insuranceOption = false;
        }
        if(this.selectedIndustry === 'Machinery'){
    
        this.machineryOption = true;
        this.gettingAllLimitMethod();
        }
        else{
            this.machineryOption = false;
        }
        if(this.selectedIndustry === 'Manufacturing'){
    
        this.manufacturingOption = true;
        this.gettingAllLimitMethod();
        }
        else{
            this.manufacturingOption = false;
        }
        if(this.selectedIndustry === 'Media'){
        
            this.mediaOption = true;
            this.gettingAllLimitMethod();
            }
            else{
                this.mediaOption = false;
            }
            if(this.selectedIndustry === 'Not For Profit'){
            
                this.notForProfitOption = true;
                this.gettingAllLimitMethod();
                }
                else{
                    this.notForProfitOption = false;
                }
                if(this.selectedIndustry === 'Recreation'){
                
                    this.recreationOption = true;
                    this.gettingAllLimitMethod();
                    }
                    else{
                        this.recreationOption = false;
                    }
                    if(this.selectedIndustry === 'Retail'){
                    
                        this.retailOption = true;
                        this.gettingAllLimitMethod();
                        }
                        else{
                            this.retailOption = false;
                        }
                        if(this.selectedIndustry === 'Shipping'){
                        
                            this.shippingOption = true;
                            this.gettingAllLimitMethod();
                            }
                            else{
                                this.shippingOption = false;
                            }
                            if(this.selectedIndustry === 'Technology'){
                            
                                this.technologyOption = true;
                                this.gettingAllLimitMethod();
                                }
                                else{
                                    this.technologyOption = false;
                                }
                                if(this.selectedIndustry === 'Telecommunications'){
                                
                                    this.telecommunicationsOption = true;
                                    this.gettingAllLimitMethod();
                                    }
                                    else{
                                        this.telecommunicationsOption = false;
                                    }
                                    if(this.selectedIndustry === 'Transportation'){
                                    
                                        this.transportationOption = true;
                                        this.gettingAllLimitMethod();
                                        }
                                        else{
                                            this.transportationOption = false;
                                        }
                                        if(this.selectedIndustry === 'Utilities'){
                                        
                                            this.utilitiesOption = true;
                                            this.gettingAllLimitMethod();
                                            }
                                            else{
                                                this.utilitiesOption = false;
                                            }
                                            if(this.selectedIndustry === 'Other'){
                                            
                                                this.otherOptionIndustry = true;
                                                this.gettingAllLimitMethod();
                                                }
                                                else{
                                                    this.otherOptionIndustry = false;
                                                }
        
    }
    
    //generating picklist value and label of type
    generateTypePicklist(data){
        return data.values.map(item => ({label: item.label, value: item.value}))
    }
    
    //getting selected picklist value on selecting the picklist value of type
    handleTypeChange(event) {
        this.selectedType = event.target.value;
        this.makeTabsFalse();
        this.resetIndustryPicklist();
        this.makeIndustryOptionsFalse();
        if(this.selectedType === 'Prospect'){
            this.prospectOption = true;
            this.gettingAllLimitMethod();
            }
            else{
                this.prospectOption = false;
            }
            if(this.selectedType === 'Customer - Direct'){
                this.customerDirectOption = true;
                this.gettingAllLimitMethod();
                }
                else{
                    this.customerDirectOption = false;
                }
                if(this.selectedType === 'Customer - Channel'){
                    this.customerChannelOption = true;
                    this.gettingAllLimitMethod();
                    }
                    else{
                        this.customerChannelOption = false;
                    }
                    if(this.selectedType === 'Channel Partner / Reseller'){
                        this.channelPartnerResellerOption = true;
                        this.gettingAllLimitMethod();
                        }
                        else{
                            this.channelPartnerResellerOption = false;
                        }
                        if(this.selectedType === 'Installation Partner'){
                            this.installationPartnerOption = true;
                            this.gettingAllLimitMethod();
                            }
                            else{
                                this.installationPartnerOption = false;
                            }
                            if(this.selectedType === 'Technology Partner'){
                                this.technologyPartnerOption = true;
                                this.gettingAllLimitMethod();
                                }
                                else{
                                    this.technologyPartnerOption = false;
                                }
                                if(this.selectedType === 'Other'){
                                    this.otherOptionType = true;
                                    this.gettingAllLimitMethod();
                                    }
                                    else{
                                        this.otherOptionType = false;
                                    }
        
    }

    resetIndustryPicklist() {
        this.selectedIndustry = ''; // Reset the selectedIndustry value
    }
    
    resetTypePicklist(){
        this.selectedType = ''; // Reset the selectedType value

    }


    connectedCallback() {
        this.gettingAllLimitMethod();
    }

    gettingAllLimitMethod() {
        //try {
        this.chartLoaded = false;
        getWeeklyDataTrends()
            .then(data => {
                console.log('======wrapper data========' + JSON.stringify(data));
                
                // for tabs 
                    let accountCount = [];
                    let oppCount = [];
                    let leadCount = [];
                    let conCount = [];
                    let caseCount = [];
                    let chartLabel = [];


                    let sumOfAccount = 0;
                    let sumOfOpp = 0;
                    let sumOfLead = 0;
                    let sumOfContact = 0;
                    let sumOfCase = 0;
                    

                    // for industry options
                    let agriCount = [];
                    let apparelOptioncount = [];
                    let bankingOptioncount = [];
                    let biotechnologyOptioncount = [];
                    let chemicalsOptioncount = [];
                    let communicationsOptioncount = [];
                    let constructionOptioncount = [];
                    let consultingOptioncount = [];
                    let educationOptioncount = [];
                    let electronicsOptioncount = [];
                    let energyOptioncount = [];
                    let engineeringOptioncount = [];
                    let entertainmentOptioncount = [];
                    let environmentalOptioncount = [];
                    let financeOptioncount = [];
                    let foodOptioncount = [];
                    let governmentOptioncount = [];
                    let healthcareOptioncount = [];
                    let hospitalityOptioncount = [];
                    let insuranceOptioncount = [];
                    let machineryOptioncount = [];
                    let manufacturingOptioncount = [];
                    let mediaOptioncount = [];
                    let notForProfitOptioncount = [];
                    let recreationOptioncount = [];
                    let retailOptioncount = [];
                    let shippingOptioncount = [];
                    let technologyOptioncount = [];
                    let telecommunicationsOptioncount = [];
                    let tranportationOptioncount = [];
                    let utilitiesOptioncount = [];


                    let sumOfAgri = 0;
                    let sumOfApparel = 0;
                    let sumOfBanking = 0;
                    let sumOfBiotechnology = 0;
                    let sumOfChemicals = 0;
                    let sumOfCommunications = 0;
                    let sumOfConstruction = 0;
                    let sumOfConsulting = 0;
                    let sumOfEducation = 0;
                    let sumOfElectronics = 0;
                    let sumOfEnergy = 0;
                    let sumOfEngineering = 0;
                    let sumOfEntertainment = 0;
                    let sumOfEnvironmental = 0;
                    let sumOfFinance = 0;
                    let sumOfFood = 0;
                    let sumOfGovernment = 0;
                    let sumOfHealthcare = 0;
                    let sumOfHospitality = 0;
                    let sumOfInsurance = 0;
                    let sumOfMachinery = 0;
                    let sumOfManufacturing = 0;
                    let sumOfMedia = 0;
                    let sumOfNotForProfit = 0;
                    let sumOfRecreation = 0;
                    let sumOfRetail = 0;
                    let sumOfShipping = 0;
                    let sumOfTechnology = 0;
                    let sumOfTelecommunications = 0;
                    let sumOfTransportation = 0;
                    let sumOfUtilities = 0;
                    let sumOfOtherIndustry = 0;
                    
                    
                    
                    //for Type Opt[]
                    let prospectOptionCount = [];
                    let customerDirectOptionCount = [];
                    let customerChannelOptionCount = [];
                    let channelPartnerResellerOptionCount = [];
                    let installationPartnerOptionCount = [];
                    let technologyPartnerOptionCount = [];
                    let otherOptionTypeCount = [];
                    let otherOptionIndustrycount = [];
                    

                    let sumOfProspect = 0;
                    let sumOfCustomerDirect = 0;
                    let sumOfCustomerChannel = 0;
                    let sumOfChannelPartnerReseller = 0;
                    let sumOfInstallationPartner = 0;
                    let sumOfTechnologyPartner = 0;
                    let sumOfOtherType = 0;


                    
                for (let key in data) {

                    chartLabel.push(key);
                    data[key].forEach(dataTrendsWrapp => {

                        if(dataTrendsWrapp.objName == 'Account') {
                            sumOfAccount += 1;
                        }
                        if(dataTrendsWrapp.objName == 'Opportunity') {
                            sumOfOpp += 1;
                            
                        }
                        if(dataTrendsWrapp.objName == 'Lead') {
                            sumOfLead += 1;
                        }
                        if(dataTrendsWrapp.objName == 'Contact') {
                            sumOfContact += 1;
                        }
                        if(dataTrendsWrapp.objName == 'Case') {
                            sumOfCase += 1;
                        }
                        if(dataTrendsWrapp.objName == 'Account') {
                            if(dataTrendsWrapp.accObj.Industry === 'Agriculture') {
                                sumOfAgri += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Apparel') {
                                sumOfApparel += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Banking') {
                                sumOfBanking += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Biotechnology') {
                                sumOfBiotechnology += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Chemicals') {
                                sumOfChemicals += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Communications') {
                                sumOfCommunications += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Construction') {
                                sumOfConstruction += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Consulting') {
                                sumOfConsulting += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Education') {
                                sumOfEducation += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Electronics') {
                                sumOfElectronics += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Energy') {
                                sumOfEnergy += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Engineering') {
                                sumOfEngineering += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Entertainment') {
                                sumOfEntertainment += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Environmental') {
                                sumOfEnvironmental += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Finance') {
                                sumOfFinance += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Food') {
                                sumOfFood += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Government') {
                                sumOfGovernment += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Healthcare') {
                                sumOfHealthcare += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Hospitality') {
                                sumOfHospitality += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Insurance') {
                                sumOfInsurance += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Machinery') {
                                sumOfMachinery += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Manufacturing') {
                                sumOfManufacturing += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Media') {
                                sumOfMedia += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'NotForProfit') {
                                sumOfNotForProfit += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Recreation') {
                                sumOfRecreation += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Retail') {
                                sumOfRetail += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Shipping') {
                                sumOfShipping += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Technology') {
                                sumOfTechnology += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Telecommunications') {
                                sumOfTelecommunications += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Transportation') {
                                sumOfTransportation += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Utilities') {
                                sumOfUtilities += 1;
                            }
                            if(dataTrendsWrapp.accObj.Industry === 'Other') {
                                sumOfOtherIndustry += 1;
                            }                                                   // condition For Industry over
                                                                                // condition for Type Started below

                            if(dataTrendsWrapp.accObj.Type === 'Prospect') {
                                sumOfProspect += 1;
                            }
                            if(dataTrendsWrapp.accObj.Type === 'Customer - Direct') {
                                sumOfCustomerDirect += 1;
                            }
                            if(dataTrendsWrapp.accObj.Type === 'Customer - Channel') {
                                sumOfCustomerChannel += 1;
                            }
                            if(dataTrendsWrapp.accObj.Type === 'Channel Partner / Reseller') {
                                sumOfChannelPartnerReseller += 1;
                            }
                            if(dataTrendsWrapp.accObj.Type === 'Installation Partner') {
                                sumOfInstallationPartner += 1;
                            }
                            if(dataTrendsWrapp.accObj.Type === 'Technology Partner') {
                                sumOfTechnologyPartner += 1;
                            }
                            if(dataTrendsWrapp.accObj.Type === 'Other') {
                                sumOfOtherType += 1;
                            }
                        }
                    });
                    
                    accountCount.push(sumOfAccount);
                    oppCount.push(sumOfOpp);
                    leadCount.push(sumOfLead);
                    conCount.push(sumOfContact);
                    caseCount.push(sumOfCase);

                    
                    sumOfAccount = 0;
                    sumOfOpp = 0;
                    sumOfLead = 0;
                    sumOfContact = 0;
                    sumOfCase = 0;
                    
                    
//-----------------------------------Pushing into an array for Industry Options----------------------------------
                           
                    agriCount.push(sumOfAgri);
                    apparelOptioncount.push(sumOfApparel);
                    bankingOptioncount.push(sumOfBanking);
                    biotechnologyOptioncount.push(sumOfBiotechnology);
                    chemicalsOptioncount.push(sumOfChemicals);
                    communicationsOptioncount.push(sumOfCommunications);
                    constructionOptioncount.push(sumOfConstruction);
                    consultingOptioncount.push(sumOfConsulting);
                    educationOptioncount.push(sumOfEducation);
                    electronicsOptioncount.push(sumOfElectronics);
                    energyOptioncount.push(sumOfEnergy);
                    engineeringOptioncount.push(sumOfEngineering);
                    entertainmentOptioncount.push(sumOfEntertainment);
                    environmentalOptioncount.push(sumOfEnvironmental);
                    financeOptioncount.push(sumOfFinance);
                    foodOptioncount.push(sumOfFood);
                    governmentOptioncount.push(sumOfGovernment);
                    healthcareOptioncount.push(sumOfHealthcare);
                    hospitalityOptioncount.push(sumOfHospitality);
                    insuranceOptioncount.push(sumOfInsurance);
                    machineryOptioncount.push(sumOfMachinery);
                    manufacturingOptioncount.push(sumOfManufacturing);
                    mediaOptioncount.push(sumOfMedia);
                    notForProfitOptioncount.push(sumOfNotForProfit);
                    recreationOptioncount.push(sumOfRecreation);
                    retailOptioncount.push(sumOfRetail);
                    shippingOptioncount.push(sumOfShipping);
                    technologyOptioncount.push(sumOfTechnology);
                    telecommunicationsOptioncount.push(sumOfTelecommunications);
                    tranportationOptioncount.push(sumOfTransportation);
                    utilitiesOptioncount.push(sumOfUtilities);
                    otherOptionIndustrycount.push(sumOfOtherIndustry);

                    

                    sumOfAgri = 0;
                    sumOfApparel = 0;
                    sumOfBanking = 0;
                    sumOfBiotechnology = 0;
                    sumOfChemicals = 0;
                    sumOfCommunications = 0;
                    sumOfConstruction = 0;
                    sumOfConsulting = 0;
                    sumOfEducation = 0;
                    sumOfElectronics = 0;
                    sumOfEnergy = 0;
                    sumOfEngineering = 0;
                    sumOfEntertainment = 0;
                    sumOfEnvironmental = 0;
                    sumOfFinance = 0;
                    sumOfFood = 0;
                    sumOfGovernment = 0;
                    sumOfHealthcare = 0;
                    sumOfHospitality = 0;
                    sumOfInsurance = 0;
                    sumOfMachinery = 0;
                    sumOfManufacturing = 0;
                    sumOfMedia = 0;
                    sumOfNotForProfit = 0;
                    sumOfRecreation = 0;
                    sumOfRetail = 0;
                    sumOfShipping = 0;
                    sumOfTechnology = 0;
                    sumOfTelecommunications = 0;
                    sumOfTransportation = 0;
                    sumOfUtilities = 0;
                    sumOfOtherIndustry = 0;


                    
//---------------------------pushing into an array for Type Options------------------------------------------

                    prospectOptionCount.push(sumOfProspect);
                    customerDirectOptionCount.push(sumOfCustomerDirect);
                    customerChannelOptionCount.push(sumOfCustomerChannel);
                    channelPartnerResellerOptionCount.push(sumOfChannelPartnerReseller);
                    installationPartnerOptionCount.push(sumOfInstallationPartner);
                    technologyPartnerOptionCount.push(sumOfTechnologyPartner);
                    otherOptionTypeCount.push(sumOfOtherType);
                    


                    sumOfProspect = 0;
                    sumOfCustomerDirect = 0;
                    sumOfCustomerChannel = 0;
                    sumOfChannelPartnerReseller = 0;
                    sumOfInstallationPartner = 0;
                    sumOfTechnologyPartner = 0;
                    sumOfOtherType = 0;
                    
                    
                }
                // console.log("Account Count",accountCount);
                // console.log("Opp Count",oppCount);
                // console.log("lead Count",leadCount);
                // console.log("Case Count",caseCount);
                // console.log("Contact Count",conCount);
                // console.log("Chartlabel", chartLabel);
                // console.log("Agri Count",agriCount);

                let datasets = [];

//------------------------------------------for Tabs---------------------------------------------

                if (this.accOption) {
                    console.log("1",this.accOption);
                    datasets.splice(0); //to remove all data from an array before pushing another
                    console.log("account1", datasets);
                    
                    datasets.push({
                        fill: false,
                        label: 'Account',
                        data: accountCount,
                        backgroundColor: ['#FF0000'],
                        borderColor: ['#FF0000'],
                        pointBackgroundColor: '#FF0000',
                        pointBorderColor: '#FF0000'
                    });

                    console.log("account2", datasets)

                                       
                }
                if(this.oppOption){
                    console.log("2",this.oppOption);
                    datasets.splice(0);
                    console.log("Opportunity1", datasets);
                    datasets.push({
                        fill: false,
                        label: 'Opportunity',
                        data: oppCount,
                        backgroundColor: ['#308755'],
                        borderColor: ['#308755'],
                        pointBackgroundColor: '#308755',
                        pointBorderColor: '#308755'
                    });

                    console.log("Opportunity2", datasets);
                    
                }
                if(this.caseOption){
                    console.log("3",this.caseOption)
                    datasets.splice(0);
                    console.log("Case1", datasets);
                    datasets.push({
                        fill: false,
                        label: 'Case',
                        data: caseCount,
                        backgroundColor: ['#183ca5'],
                        borderColor: ['#183ca5'],
                        pointBackgroundColor: '#183ca5',
                        pointBorderColor: '#183ca5'
                    });
                    console.log("Case2", datasets);
                    
                }
                if(this.leadOption){
                    datasets.splice(0);
                    console.log("Lead1", datasets);
                    datasets.push({
                        fill: false,
                        label: 'Lead',
                        data: leadCount,
                        backgroundColor: ['#a59d18'],
                        borderColor: ['#a59d18'],
                        pointBackgroundColor: '#a59d18',
                        pointBorderColor: '#a59d18'
                    });
                    console.log("Lead2", datasets);
                    
                }
                if(this.conOption){
                    datasets.splice(0);
                    console.log("Contact1", datasets);
                    datasets.push({

                        fill: false,
                        label: 'Contact',
                        data: conCount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                    console.log("Contact2", datasets);
                }

//-------------------------------------for industry---------------------------------------
                if(this.agriOption){
                    
                    datasets.splice(0);
                    console.log("Agriculture1", datasets);
                    datasets.push({

                        fill: false,
                        label: 'Agriculture',
                        data: agriCount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                    console.log("Agriculture2", datasets);
                }
                if(this.apparelOption){
                    
                    datasets.splice(0);
                    console.log("Apparel1", datasets);
                    datasets.push({

                        fill: false,
                        label: 'Apparel',
                        data: apparelOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                    console.log("Apparel2", datasets);
                }
                if(this.bankingOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Banking',
                        data: bankingOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.biotechnologyOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Biotechnology',
                        data: biotechnologyOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });  
                }
                if(this.chemicalsOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Chemicals',
                        data: chemicalsOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.communicationsOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Communications',
                        data: communicationsOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.constructionOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Construction',
                        data: constructionOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.consultingOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Consulting',
                        data: consultingOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.educationOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Education',
                        data: educationOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.electronicsOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Electronics',
                        data: electronicsOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.energyOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Energy',
                        data: energyOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.engineeringOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Engineering',
                        data: engineeringOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.entertainmentOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Entertainment',
                        data: entertainmentOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.environmentalOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Environmental',
                        data: environmentalOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.financeOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Finance',
                        data: financeOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.foodOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Food & Beverage',
                        data: foodOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.governmentOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Government',
                        data: governmentOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.healthcareOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Healthcare',
                        data: healthcareOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.hospitalityOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Hospitality',
                        data: hospitalityOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.insuranceOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Insurance',
                        data: insuranceOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.machineryOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Machinery',
                        data: machineryOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.manufacturingOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Manufacturing',
                        data: manufacturingOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.mediaOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Media',
                        data: mediaOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.notForProfitOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Not For Profit',
                        data: notForProfitOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.recreationOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Recreation',
                        data: recreationOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.retailOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Retail',
                        data: retailOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.shippingOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Shipping',
                        data: shippingOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.technologyOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Technology',
                        data: technologyOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.telecommunicationsOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Telecommunications',
                        data: telecommunicationsOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.transportationOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Transportation',
                        data: tranportationOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.utilitiesOption){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Utilities',
                        data: utilitiesOptioncount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.otherOptionIndustry){
                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Other',
                        data: otherOptionIndustrycount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }


//---------------------------------for Type-----------------------------------------
        
                if(this.prospectOption){
                                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Prospect',
                        data: prospectOptionCount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.customerDirectOption){
                                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Customer - Direct',
                        data: customerDirectOptionCount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.customerChannelOption){
                                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Customer - Channel',
                        data: customerChannelOptionCount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.channelPartnerResellerOption){
                                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Channel Partner / Reseller',
                        data: channelPartnerResellerOptionCount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.installationPartnerOption){
                                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Installation Partner',
                        data: installationPartnerOptionCount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.technologyPartnerOption){
                                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Technology Partner',
                        data: technologyPartnerOptionCount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
                if(this.otherOptionType){
                                    
                    datasets.splice(0);
                    datasets.push({

                        fill: false,
                        label: 'Other',
                        data: otherOptionTypeCount,
                        backgroundColor: ['#05c3e8'],
                        borderColor: ['#05c3e8'],
                        pointBackgroundColor: '#05c3e8',
                        pointBorderColor: '#05c3e8'
                    });
                }
        


                console.log("DAAAAATAAAAAAAAAA",datasets);
                
                this.chartConfiguration = {
                    type: 'line',
                    data: {
                        datasets: datasets,
                        labels: chartLabel,
                    },
                    options: {
                        
                        /*responsive: false,
                        legend: {
                           display: true,
                           position: 'top',
                           onClick: null
                        },*/

                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Trends',
                                }

                            }],

                        },
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                boxWidth: 10,
                            }
                        },

                    }

                }  
              
               
                this.error = undefined;
                this.chartLoaded = true;

            })
            .catch(error => {
                console.log('======error========' + JSON.stringify(error));
                this.error = error;
                this.chartConfiguration = undefined;
            });
        
    }

    handleRadioChange(event) {
        console.log("inside radio handler");
        const selectedOption = event.target.value;
        console.log("Value  " + selectedOption);

        if (selectedOption === 'weeklyRadio') {
            this.weekelyFieldValue = true;
            this.gettingAllLimitMethod();
            console.log("week");
        } else {
            this.weekelyFieldValue = false;
        }

        if (selectedOption === 'monthlyRadio') {
            this.monthlyFieldValue = true;
            this.gettingAllLimitMethod();
            console.log("month");
        } else {
            this.monthlyFieldValue = false;
        }

        if (selectedOption === 'quarterlyRadio') {
            this.quarterlyFieldValue = true;
            this.gettingAllLimitMethod();
            console.log("quarterly");
        } else {
            this.quarterlyFieldValue = false;

        }
    }

    
}