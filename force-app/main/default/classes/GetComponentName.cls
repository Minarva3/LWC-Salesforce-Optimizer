public with sharing class GetComponentName {
    
    @AuraEnabled(cacheable=true)
    public static List<LightningComponentBundle__c> GetCompoenent(String Sname) {
        if (Sname == null) {
            return [SELECT Name, Description__c,MasterLabel__c FROM LightningComponentBundle__c];
        } else {
            return [SELECT Name, Description__c,MasterLabel__c
            FROM LightningComponentBundle__c
            WHERE  Description__c LIKE :'%'+Sname+'%'];
        }
    }
}