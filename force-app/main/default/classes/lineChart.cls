public with sharing class lineChart {
    @AuraEnabled(Cacheable = true)
    public static List<Opportunity> getOpportunities(){
        return [SELECT StageName from Opportunity];
    }
}