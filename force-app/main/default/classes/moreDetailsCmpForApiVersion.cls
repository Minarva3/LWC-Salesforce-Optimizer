public with sharing class moreDetailsCmpForApiVersion {
    @AuraEnabled(Cacheable=true)
    public static List<ApexClass> getApiVersions() {
       return [Select ApiVersion, LastModifiedDate from ApexClass];
       
    }

    public static String getWeek(Integer val){

        Date weekStartDate;
        Date weekEndDate;
        Date current = system.today().toStartofWeek();
        current = current.adddays(7*val);    
        weekStartDate = current.toStartofWeek();
        weekEndDate = weekStartDate.adddays(7);

        return weekStartDate+'#'+weekEndDate;
    }

}