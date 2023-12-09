public with sharing class aPIVersion {
    @AuraEnabled(cacheable=true)
    public static List<ApexClass> getApexClasses() {
        List<ApexClass> apiVer = [SELECT ApiVersion FROM ApexClass];
        return apiVer;
    }
}