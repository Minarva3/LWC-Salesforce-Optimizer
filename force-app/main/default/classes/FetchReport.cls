public with sharing class FetchReport {

    @AuraEnabled(cacheable=true)
    public static List<DataSet> getReports(){
        Integer countNoRunReport;
        Integer countRecentReport;
        Integer countOldReport; 
        String labelnorun='Number of Report that did not run';
        String labelrecent='Number of Recent Reports';
        String labelold='Number of Old Reports';
        List<Report> rep =[SELECT Id,CreatedDate,LastRunDate,IsDeleted,LastModifiedDate from Report];
        Map<String,Integer> countList=new Map<String,Integer>();
        List<DataSet> dataSet = new List<DataSet>();
        countNoRunReport= database.countQuery('SELECT count() from Report where LastRunDate<LAST_N_MONTHS:3');
        // countList.put('Number of Report that did not run',countNoRunReport);
        countList.put(labelnorun,countNoRunReport);
        dataSet.add(new DataSet(labelnorun,countNoRunReport));
        countRecentReport=database.countQuery('SELECT count() from Report where LastRunDate>LAST_MONTH');
        // countList.put('Number of Recent Reports', countRecentReport);
        countList.put(labelrecent, countRecentReport);
        dataSet.add(new DataSet(labelrecent, countRecentReport));
        countOldReport =database.countQuery('SELECT count() from Report where LastRunDate<LAST_N_MONTHS:3  And LastRunDate=LAST_N_MONTHS:4');
        // countList.put('Number of Old Reports',countOldReport);
        countList.put(labelold,countOldReport);
        dataSet.add(new DataSet(labelold,countOldReport));
        
     
        return dataSet ;
        
    }

        public class DataSet{
        public DataSet(String label ,Integer count){
        this.label  = label ;
        this.count = count ;
         }
            @AuraEnabled
           public String label {get;set;}
            @AuraEnabled
           public Integer  count {get;set;}
        
        }
    



   
    
}