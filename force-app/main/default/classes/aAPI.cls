public with sharing class aAPI {
    @AuraEnabled(cacheable=true)
    public static List<ApexClass> getApexClasses() {
        List<ApexClass> apiVer =  [SELECT ApiVersion FROM ApexClass];
        return apiVer;
    }

    }