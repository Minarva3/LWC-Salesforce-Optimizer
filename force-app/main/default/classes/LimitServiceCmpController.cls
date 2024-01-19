/**************************************************************************************
Apex Class Name     : LimitServiceCmpController
Created Date        : March 2023
Function            : Access Management
* Developer                      Date                         Description
* -------------------------------------------------------------------------------------               
* Navjeet Singh                March 2023                   *	Return list of limit object for dashboard.
*************************************************************************************/
public with sharing class LimitServiceCmpController {

    //Get Daily Email Limit
    @AuraEnabled(cacheable=true)
    public static map<String,List<Limit__c>> GetAllLimits(Integer val){
        map<String,List<Limit__c>> limitMap = new map<String,List<Limit__c>>();
        try {
            Set<String> limitNameSet = new Set<String>{'SingleEmail','MassEmail','DailyWorkflowEmails'};
			limitMap = returnLimitMap(val,limitNameSet);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return limitMap;
    }
    
    //Get dough nut chart thorough api 
    @AuraEnabled(cacheable=true)
    public static List<EmailLimitWrapper> getEmailAllLimits(){
        List<EmailLimitWrapper> wrpList = new List<EmailLimitWrapper>();
        try{
            List<Limit__c> dailyLimitsRecordList = LimitsCounterService.getAllDailyLimits();
            if(!dailyLimitsRecordList.isEmpty()){
                for(Limit__c objLimit : dailyLimitsRecordList){
                    EmailLimitWrapper wrp = new EmailLimitWrapper();
                    wrp.limitName = objLimit.Limit_Name__c;
                    wrp.limitObj = objLimit;
                    wrpList.add(wrp);
                }
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return wrpList;
    }

    public class EmailLimitWrapper {
        @AuraEnabled
        public String limitName;
        @AuraEnabled
        public Limit__c limitObj;
    }

    //Get Daily Email weekly Limit
    @AuraEnabled(cacheable=true)
    public static map<String,List<Limit__c>> getBarChartLimits(){
        map<String,List<Limit__c>> limitMap = new map<String,List<Limit__c>>();
        try {
            Set<String> limitNameSet = new Set<String>{'SingleEmail','MassEmail','DailyWorkflowEmails'};
            limitMap = returnChildCmpMap(limitNameSet);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return limitMap;
    }

    //Get Storage Limit
    @AuraEnabled(cacheable=true)
    public static map<String,List<Limit__c>> getStorageLimit(Integer val){
        map<String,List<Limit__c>> limitMap = new map<String,List<Limit__c>>();
        try {
            Set<String> limitNameSet = new Set<String>{'DataStorageMB','FileStorageMB'};
            limitMap = returnLimitMap(val,limitNameSet);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return limitMap;
    }

    //Get Storage Weekly Limit
    @AuraEnabled(cacheable=true)
    public static map<String,List<Limit__c>> getStorageWeeklyLimits(){
        map<String,List<Limit__c>> limitMap = new map<String,List<Limit__c>>();
        try {
            Set<String> limitNameSet = new Set<String>{'DataStorageMB','FileStorageMB'};
            limitMap = returnChildCmpMap(limitNameSet);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return limitMap;
    }

    //Get API Limit
    @AuraEnabled(cacheable=true)
    public static map<String,List<Limit__c>> getAllAPILimits(Integer val){
        map<String,List<Limit__c>> limitMap = new map<String,List<Limit__c>>();
        try {
            Set<String> limitNameSet = new Set<String>{'DailyApiRequests'};
            limitMap = returnLimitMap(val,limitNameSet);
            system.debug('=====limitMap====='+limitMap);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return limitMap;
    }

    //get Weekly Trend API Limits
    @AuraEnabled(cacheable=true)
    public static map<String,List<Limit__c>> getWeeklyTrendAPILimits(){
        map<String,List<Limit__c>> limitMap = new map<String,List<Limit__c>>();
        try {
            Set<String> limitNameSet = new Set<String>{'DailyApiRequests'};
            limitMap = returnChildCmpMap(limitNameSet);  
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return limitMap;
    }

    //get Dashboard limit
    @AuraEnabled(cacheable=true)
    public static map<String,List<Limit__c>> getDashboardLimits(Integer val){
        map<String,List<Limit__c>> limitMap = new map<String,List<Limit__c>>();
        try {
            Set<String> limitNameSet = new Set<String>{'HourlyAsyncReportRuns','HourlySyncReportRuns','HourlyDashboardRefreshes','HourlyDashboardResults'};
            limitMap = returnLimitMap(val,limitNameSet);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return limitMap;
    }

    //get Weekly DashBoard Limits
    @AuraEnabled(cacheable=true)
    public static map<String,List<Limit__c>> getWeeklyDashboardLimits(){
        map<String,List<Limit__c>> limitMap = new map<String,List<Limit__c>>();
        try {
            Set<String> limitNameSet = new Set<String>{'HourlyAsyncReportRuns','HourlySyncReportRuns','HourlyDashboardRefreshes','HourlyDashboardResults'};
            limitMap = returnChildCmpMap(limitNameSet);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return limitMap;
    }

    //get HourlyDashboardStatuses limit
    @AuraEnabled(cacheable=true)
    public static map<String,List<Limit__c>> getHourlyDashboardPieChartLimits(){
        map<String,List<Limit__c>> limitMap = new map<String,List<Limit__c>>();
        try {
            Set<String> limitNameSet = new Set<String>{'HourlyDashboardStatuses'};
            limitMap = returnLimitMap(0,limitNameSet);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return limitMap;
    }

    //Return Parent Cmp Values
    public static map<String,List<Limit__c>> returnLimitMap(Integer val, Set<String> limitNameSet) {

		map<String,List<Limit__c>> limitMap = new map<String,List<Limit__c>>();
		Date weekStartDate;
        Date fromDate;
        if(val == 0) {
            weekStartDate = System.Today().toStartofWeek();
            fromDate = weekStartDate.adddays(7);
        } else {
            Date current = system.today().toStartofWeek();
            current = current.adddays(7*val);        
            weekStartDate = current.toStartofWeek();
            fromDate = weekStartDate.adddays(7);
        }
            
        List<Limit__c> limitList = [select id,Limit_Name__c,Max__c,Remaining__c,Limit_Type__c,createddate,Record_Date__c from Limit__c 
                                    where Record_Date__c != null AND Record_Date__c >: weekStartDate AND Record_Date__c <=:fromDate AND Limit_Name__c IN: limitNameSet];
        
        limitMap.put('Mon '+weekStartDate.adddays(+1).format(),new List<Limit__c>());
        limitMap.put('Tue '+weekStartDate.adddays(+2).format(),new List<Limit__c>());
        limitMap.put('Wed '+weekStartDate.adddays(+3).format(),new List<Limit__c>());
        limitMap.put('Thu '+weekStartDate.adddays(+4).format(),new List<Limit__c>());
        limitMap.put('Fri '+weekStartDate.adddays(+5).format(),new List<Limit__c>());
        limitMap.put('Sat '+weekStartDate.adddays(+6).format(),new List<Limit__c>());
        limitMap.put('Sun '+weekStartDate.adddays(+7).format(),new List<Limit__c>());
        
        for(Limit__c objLimit : limitList){
            system.debug('=====objLimit======'+objLimit.Record_Date__c);
            Datetime dt = objLimit.Record_Date__c;
            system.debug('=====dt======'+dt);
            //DateTime dtNew = dt.adddays(+1);
            //system.debug('=====dtNew======'+dtNew);
            String dayOfWeek = dt.format('EEEE');
            system.debug('=====dayOfWeek======'+dayOfWeek);
            Date myDate = date.newinstance(objLimit.Record_Date__c.year(), objLimit.Record_Date__c.month(), objLimit.Record_Date__c.day());
            system.debug('=====myDate======'+myDate);
            //Date myDateNew = myDate.adddays(+1);
            //system.debug('=====myDateNew======'+myDateNew);
            String DateString = myDate.month() + '/' + myDate.day() + '/' + myDate.year();
            system.debug('=====DateString======'+DateString);
            if(!limitMap.containsKey(dayOfWeek.substring(0,3)+' '+DateString)) {
                List<Limit__c> limitList2 = new List<Limit__c>();
                limitList2.add(objLimit);                      
                limitMap.put(dayOfWeek.substring(0,3)+' '+DateString,limitList2);
            } else {                       
                limitMap.get(dayOfWeek.substring(0,3)+' '+DateString).add(objLimit);		
            }
                        
        } 
		return limitMap;
	}

    //Get Current week
    public static String getWeek(Integer val){

        Date weekStartDate;
        Date weekEndDate;
        Date current = system.today().toStartofWeek();
        current = current.adddays(7*val);    
        weekStartDate = current.toStartofWeek();
        weekEndDate = weekStartDate.adddays(7);

        return weekStartDate+'#'+weekEndDate;
    }

    //Return Child Cmp Values
    public static map<String,List<Limit__c>> returnChildCmpMap(Set<String> limitNameSet) {

        map<String,List<Limit__c>> limitMap = new map<String,List<Limit__c>>();
        Date weekStartDateW1;
        Date weekEndDateW1;
        Date weekStartDateW2;
        Date weekEndDateW2;
        Date weekStartDateW3;
        Date weekEndDateW3;
        Date weekStartDateW4;
        Date weekEndDateW4;
        Date todayDate = System.Today();
        //return week 1
        String dateStringW1 = getWeek(0);
        weekStartDateW1 = date.valueOf(dateStringW1.SubStringBefore('#'));
        weekEndDateW1 = date.valueOf(dateStringW1.SubStringAfter('#'));
        //return week 2
        String dateStringW2 = getWeek(-1);
        weekStartDateW2 = date.valueOf(dateStringW2.SubStringBefore('#'));
        weekEndDateW2 = date.valueOf(dateStringW2.SubStringAfter('#'));
        //return week 3
        String dateStringW3 = getWeek(-2);
        weekStartDateW3 = date.valueOf(dateStringW3.SubStringBefore('#'));
        weekEndDateW3 = date.valueOf(dateStringW3.SubStringAfter('#'));
        //return week 4
        String dateStringW4 = getWeek(-3);
        weekStartDateW4 = date.valueOf(dateStringW4.SubStringBefore('#'));
        weekEndDateW4 = date.valueOf(dateStringW4.SubStringAfter('#'));
        
        limitMap.put('W1',new List<Limit__c>());
        limitMap.put('W2',new List<Limit__c>());
        limitMap.put('W3',new List<Limit__c>());
        limitMap.put('W4',new List<Limit__c>());
        List<Limit__c> limitList = [select id,Limit_Name__c,Max__c,Remaining__c,Limit_Type__c,createddate,Record_Date__c from Limit__c 
                                    where Record_Date__c != null AND Record_Date__c >: weekStartDateW4 AND Record_Date__c <=: todayDate AND Limit_Name__c IN: limitNameSet];
        
        for(Limit__c objLimit : limitList) {
            
            if(objLimit.Record_Date__c > weekStartDateW1 && objLimit.Record_Date__c <= weekEndDateW1) {
                if(!limitMap.containsKey('W1')) {
                    List<Limit__c> limitList2 = new List<Limit__c>();
                    limitList2.add(objLimit);                      
                    limitMap.put('W1',limitList2);
                } else {                       
                    limitMap.get('W1').add(objLimit);		
                }
            }
            if(objLimit.Record_Date__c > weekStartDateW2 && objLimit.Record_Date__c <= weekEndDateW2) {
                if(!limitMap.containsKey('W2')) {
                    List<Limit__c> limitList2 = new List<Limit__c>();
                    limitList2.add(objLimit);                      
                    limitMap.put('W2',limitList2);
                } else {                       
                    limitMap.get('W2').add(objLimit);		
                }
            }
            if(objLimit.Record_Date__c > weekStartDateW3 && objLimit.Record_Date__c <= weekEndDateW3) {
                if(!limitMap.containsKey('W3')) {
                    List<Limit__c> limitList2 = new List<Limit__c>();
                    limitList2.add(objLimit);                      
                    limitMap.put('W3',limitList2);
                } else {                       
                    limitMap.get('W3').add(objLimit);		
                }
            }
            if(objLimit.Record_Date__c > weekStartDateW4 && objLimit.Record_Date__c <= weekEndDateW4) {
                if(!limitMap.containsKey('W4')) {
                    List<Limit__c> limitList2 = new List<Limit__c>();
                    limitList2.add(objLimit);                      
                    limitMap.put('W4',limitList2);
                } else {                       
                    limitMap.get('W4').add(objLimit);		
                }
            }
        }
        return limitMap;
    }
    
    /////////////////////////////////////////////
    public static String getMonth(Integer val){

        Date monthStartDate;
        Date monthEndDate;
        Date current = system.today().toStartOfMonth();
        current = current.adddays(30*val);    
        monthStartDate = current.toStartOfMonth();
        monthEndDate = monthStartDate.adddays(30);

        return monthStartDate+'#'+monthEndDate;
    }


    @AuraEnabled(cacheable=true)
    public static map<String,List<Limit__c>> getMonthlyApiVersionCount(){
        map<String,List<Limit__c>> limitMap = new map<String,List<Limit__c>>();
        try {
            Set<String> limitNameSet = new Set<String>{'10-20','20-30','30-40','40-50','50-60'};
            limitMap = returnMonthApiVersionMap(limitNameSet);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return limitMap;
    }

    public static map<String,List<Limit__c>> returnMonthApiVersionMap(Set<String> limitNameSet) {

        map<String,List<Limit__c>> limitMap = new map<String,List<Limit__c>>();
        Date monthStartDateM1;
        Date monthEndDateM1;
        Date monthStartDateM2;
        Date monthEndDateM2;
        Date monthStartDateM3;
        Date monthEndDateM3;
        Date monthStartDateM4;
        Date monthEndDateM4;
        Date todayDate = System.Today();
        // getWeek() method is declared above
        //return month 1
        String dateStringM1 = getMonth(0);
        monthStartDateM1 = date.valueOf(dateStringM1.SubStringBefore('#'));
        monthEndDateM1 = date.valueOf(dateStringM1.SubStringAfter('#'));
        //return month 2
        String dateStringM2 = getMonth(-1);
        monthStartDateM2 = date.valueOf(dateStringM2.SubStringBefore('#'));
        monthEndDateM2 = date.valueOf(dateStringM2.SubStringAfter('#'));
        //return month 3
        String dateStringM3 = getMonth(-2);
        monthStartDateM3 = date.valueOf(dateStringM3.SubStringBefore('#'));
        monthEndDateM3 = date.valueOf(dateStringM3.SubStringAfter('#'));
        //return month 4
        String dateStringM4 = getMonth(-3);
        monthStartDateM4 = date.valueOf(dateStringM4.SubStringBefore('#'));
        monthEndDateM4 = date.valueOf(dateStringM4.SubStringAfter('#'));
        
        limitMap.put('M1',new List<Limit__c>());
        limitMap.put('M2',new List<Limit__c>());
        limitMap.put('M3',new List<Limit__c>());
        limitMap.put('M4',new List<Limit__c>());
        List<Limit__c> limitList = [select id, API_Version_Range__c, API_Version_Count__c, Record_Date__c from Limit__c 
                                    where Record_Date__c != null AND API_Version_Range__c !=null AND API_Version_Count__c !=null AND Record_Date__c >: monthStartDateM4 AND Record_Date__c <=: todayDate AND API_Version_Range__c IN: limitNameSet];
        
        for(Limit__c objLimit : limitList) {
            
            if(objLimit.Record_Date__c > monthStartDateM4 && objLimit.Record_Date__c <= monthEndDateM4) {
                if(!limitMap.containsKey('M1')) {
                    List<Limit__c> limitList2 = new List<Limit__c>();
                    limitList2.add(objLimit);                      
                    limitMap.put('M1',limitList2);
                } else {                       
                    limitMap.get('M1').add(objLimit);		
                }
            }
            if(objLimit.Record_Date__c > monthStartDateM3 && objLimit.Record_Date__c <= monthEndDateM3){
                if(!limitMap.containsKey('M2')) {
                    List<Limit__c> limitList2 = new List<Limit__c>();
                    limitList2.add(objLimit);                      
                    limitMap.put('M2',limitList2);
                } else {                       
                    limitMap.get('M2').add(objLimit);		
                }
            }
            if(objLimit.Record_Date__c > monthStartDateM2 && objLimit.Record_Date__c <= monthEndDateM2) {
                if(!limitMap.containsKey('M3')) {
                    List<Limit__c> limitList2 = new List<Limit__c>();
                    limitList2.add(objLimit);                      
                    limitMap.put('M3',limitList2);
                } else {                       
                    limitMap.get('M3').add(objLimit);		
                }
            }
            if(objLimit.Record_Date__c > monthStartDateM1 && objLimit.Record_Date__c <= monthEndDateM1) {
                if(!limitMap.containsKey('M4')) {
                    List<Limit__c> limitList2 = new List<Limit__c>();
                    limitList2.add(objLimit);                      
                    limitMap.put('M4',limitList2);
                } else {                       
                    limitMap.get('M4').add(objLimit);		
                }
            }
        }
        return limitMap;
    }

    /////////////////////////////////////////////////

// For aPIVersion

@AuraEnabled(cacheable=true)

    public static map<String,List<ApexClass>> getApexClass() {

        map<String,List<ApexClass>> limitMap = new map<String,List<ApexClass>>();

        limitMap.put('10-20',new List<ApexClass>());
        limitMap.put('20-30',new List<ApexClass>());
        limitMap.put('30-40',new List<ApexClass>());
        limitMap.put('40-50',new List<ApexClass>());
        limitMap.put('50-60',new List<ApexClass>());

        List<ApexClass> limitList = [SELECT ApiVersion FROM ApexClass];

        for(ApexClass objLimit : limitList){
            if(objLimit.ApiVersion>=10 && objLimit.ApiVersion<20){
                if(!limitMap.containsKey('10-20')){
                    List<ApexClass> limitList2 = new List<ApexClass>();
                    limitList2.add(objLimit);
                    limitMap.put('10-20',limitList2);
                }
                else{
                    limitMap.get('10-20').add(objLimit);
                }
            }

            if(objLimit.ApiVersion>=20 && objLimit.ApiVersion<30){
                if(!limitMap.containsKey('20-30')){
                    List<ApexClass> limitList2 = new List<ApexClass>();
                    limitList2.add(objLimit);
                    limitMap.put('20-30',limitList2);
                }
                else{
                    limitMap.get('20-30').add(objLimit);
                }
            }

            if(objLimit.ApiVersion>=30 && objLimit.ApiVersion<40){
                if(!limitMap.containsKey('30-40')){
                    List<ApexClass> limitList2 = new List<ApexClass>();
                    limitList2.add(objLimit);
                    limitMap.put('30-40',limitList2);
                }
                else{
                    limitMap.get('30-40').add(objLimit);
                }
            }

            if(objLimit.ApiVersion>=40 && objLimit.ApiVersion<50){
                if(!limitMap.containsKey('40-50')){
                    List<ApexClass> limitList2 = new List<ApexClass>();
                    limitList2.add(objLimit);
                    limitMap.put('40-50',limitList2);
                }
                else{
                    limitMap.get('40-50').add(objLimit);
                }
            }
            if(objLimit.ApiVersion>=50 && objLimit.ApiVersion<60){
                if(!limitMap.containsKey('50-60')){
                    List<ApexClass> limitList2 = new List<ApexClass>();
                    limitList2.add(objLimit);
                    limitMap.put('50-60',limitList2);
                }
                else{
                    limitMap.get('50-60').add(objLimit);
                }
            }
        }
        return limitMap;
        
}


// For moreDetailsCmpForApiVersion

    @AuraEnabled(cacheable=true)
    public static map<String,List<Limit__c>> getWeeklyApiVersionCount(){
        map<String,List<Limit__c>> limitMap = new map<String,List<Limit__c>>();
        try {
            Set<String> limitNameSet = new Set<String>{'10-20','20-30','30-40','40-50','50-60'};
            limitMap = returnCmpApiVersionMap(limitNameSet);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return limitMap;
    }

    public static map<String,List<Limit__c>> returnCmpApiVersionMap(Set<String> limitNameSet) {

        map<String,List<Limit__c>> limitMap = new map<String,List<Limit__c>>();
        Date weekStartDateW1;
        Date weekEndDateW1;
        Date weekStartDateW2;
        Date weekEndDateW2;
        Date weekStartDateW3;
        Date weekEndDateW3;
        Date weekStartDateW4;
        Date weekEndDateW4;
        Date todayDate = System.Today();
        // getWeek() method is declared above
        //return week 1
        String dateStringW1 = getWeek(0);
        weekStartDateW1 = date.valueOf(dateStringW1.SubStringBefore('#'));
        weekEndDateW1 = date.valueOf(dateStringW1.SubStringAfter('#'));
        //return week 2
        String dateStringW2 = getWeek(-1);
        weekStartDateW2 = date.valueOf(dateStringW2.SubStringBefore('#'));
        weekEndDateW2 = date.valueOf(dateStringW2.SubStringAfter('#'));
        //return week 3
        String dateStringW3 = getWeek(-2);
        weekStartDateW3 = date.valueOf(dateStringW3.SubStringBefore('#'));
        weekEndDateW3 = date.valueOf(dateStringW3.SubStringAfter('#'));
        //return week 4
        String dateStringW4 = getWeek(-3);
        weekStartDateW4 = date.valueOf(dateStringW4.SubStringBefore('#'));
        weekEndDateW4 = date.valueOf(dateStringW4.SubStringAfter('#'));
        
        limitMap.put('W1',new List<Limit__c>());
        limitMap.put('W2',new List<Limit__c>());
        limitMap.put('W3',new List<Limit__c>());
        limitMap.put('W4',new List<Limit__c>());
        List<Limit__c> limitList = [select id, API_Version_Range__c, API_Version_Count__c, Record_Date__c from Limit__c 
                                    where Record_Date__c != null AND API_Version_Range__c !=null AND API_Version_Count__c !=null AND Record_Date__c >: weekStartDateW4 AND Record_Date__c <=: todayDate AND API_Version_Range__c IN: limitNameSet];
        
        for(Limit__c objLimit : limitList) {
            
            if(objLimit.Record_Date__c > weekStartDateW4 && objLimit.Record_Date__c <= weekEndDateW4) {
                if(!limitMap.containsKey('W1')) {
                    List<Limit__c> limitList2 = new List<Limit__c>();
                    limitList2.add(objLimit);                      
                    limitMap.put('W1',limitList2);
                } else {                       
                    limitMap.get('W1').add(objLimit);		
                }
            }
            if(objLimit.Record_Date__c > weekStartDateW3 && objLimit.Record_Date__c <= weekEndDateW3){
                if(!limitMap.containsKey('W2')) {
                    List<Limit__c> limitList2 = new List<Limit__c>();
                    limitList2.add(objLimit);                      
                    limitMap.put('W2',limitList2);
                } else {                       
                    limitMap.get('W2').add(objLimit);		
                }
            }
            if(objLimit.Record_Date__c > weekStartDateW2 && objLimit.Record_Date__c <= weekEndDateW2) {
                if(!limitMap.containsKey('W3')) {
                    List<Limit__c> limitList2 = new List<Limit__c>();
                    limitList2.add(objLimit);                      
                    limitMap.put('W3',limitList2);
                } else {                       
                    limitMap.get('W3').add(objLimit);		
                }
            }
            if(objLimit.Record_Date__c > weekStartDateW1 && objLimit.Record_Date__c <= weekEndDateW1) {
                if(!limitMap.containsKey('W4')) {
                    List<Limit__c> limitList2 = new List<Limit__c>();
                    limitList2.add(objLimit);                      
                    limitMap.put('W4',limitList2);
                } else {                       
                    limitMap.get('W4').add(objLimit);		
                }
            }
        }
        return limitMap;
    }

    //get Weekly Data Trends
    @AuraEnabled(cacheable=true)
    public static map<String,List<DataTrendsWrapper>> getWeeklyDataTrends(){
        map<String,List<DataTrendsWrapper>> wrappMap = new map<String,List<DataTrendsWrapper>>();
        try {
            Date weekStartDateW1;
            Date weekEndDateW1;
            Date weekStartDateW2;
            Date weekEndDateW2;
            Date weekStartDateW3;
            Date weekEndDateW3;
            Date weekStartDateW4;
            Date weekEndDateW4;
            Date todayDate = System.Today();
            //return week 1
            String dateStringW1 = getWeek(0);
            weekStartDateW1 = date.valueOf(dateStringW1.SubStringBefore('#'));
            weekEndDateW1 = date.valueOf(dateStringW1.SubStringAfter('#'));
            //return week 2
            String dateStringW2 = getWeek(-1);
            weekStartDateW2 = date.valueOf(dateStringW2.SubStringBefore('#'));
            weekEndDateW2 = date.valueOf(dateStringW2.SubStringAfter('#'));
            //return week 3
            String dateStringW3 = getWeek(-2);
            weekStartDateW3 = date.valueOf(dateStringW3.SubStringBefore('#'));
            weekEndDateW3 = date.valueOf(dateStringW3.SubStringAfter('#'));
            //return week 4
            String dateStringW4 = getWeek(-3);
            weekStartDateW4 = date.valueOf(dateStringW4.SubStringBefore('#'));
            weekEndDateW4 = date.valueOf(dateStringW4.SubStringAfter('#'));

            List<Account> accList = [SELECT Id, Name, Industry, Type, Record_Date__c FROM Account 
                                    WHERE Record_Date__c != null AND Record_Date__c >: weekStartDateW4 AND Record_Date__c <=: todayDate];
            wrappMap.put('W1',new List<DataTrendsWrapper>());
            wrappMap.put('W2',new List<DataTrendsWrapper>());
            wrappMap.put('W3',new List<DataTrendsWrapper>());
            wrappMap.put('W4',new List<DataTrendsWrapper>());
            for(Account obj: accList) {
                DataTrendsWrapper objWrapp = new DataTrendsWrapper();
                objWrapp.accObj = obj;
                objWrapp.objName = 'Account';
                if(obj.Record_Date__c > weekStartDateW1 && obj.Record_Date__c <= weekEndDateW1) {
                    if(!wrappMap.containsKey('W1')) {
                        List<DataTrendsWrapper> wrapList = new List<DataTrendsWrapper>();
                        wrapList.add(objWrapp);                      
                        wrappMap.put('W1',wrapList);
                    } else {                       
                        wrappMap.get('W1').add(objWrapp);		
                    }
                }
                if(obj.Record_Date__c > weekStartDateW2 && obj.Record_Date__c <= weekEndDateW2) {
                    if(!wrappMap.containsKey('W2')) {
                        List<DataTrendsWrapper> wrapList = new List<DataTrendsWrapper>();
                        wrapList.add(objWrapp);                      
                        wrappMap.put('W2',wrapList);
                    } else {                       
                        wrappMap.get('W2').add(objWrapp);		
                    }
                }
                if(obj.Record_Date__c > weekStartDateW3 && obj.Record_Date__c <= weekEndDateW3) {
                    if(!wrappMap.containsKey('W3')) {
                        List<DataTrendsWrapper> wrapList = new List<DataTrendsWrapper>();
                        wrapList.add(objWrapp);                      
                        wrappMap.put('W3',wrapList);
                    } else {                       
                        wrappMap.get('W3').add(objWrapp);		
                    }
                }
                if(obj.Record_Date__c > weekStartDateW4 && obj.Record_Date__c <= weekEndDateW4) {
                    if(!wrappMap.containsKey('W4')) {
                        List<DataTrendsWrapper> wrapList = new List<DataTrendsWrapper>();
                        wrapList.add(objWrapp);                      
                        wrappMap.put('W4',wrapList);
                    } else {                       
                        wrappMap.get('W4').add(objWrapp);		
                    }
                }
            }

            List<Opportunity> oppList = [SELECT Id,Name,CloseDate,StageName,Record_Date__c FROM Opportunity 
                                    WHERE Record_Date__c != null AND Record_Date__c >: weekStartDateW4 AND Record_Date__c <=: todayDate];
            
            for(Opportunity obj: oppList) {
                DataTrendsWrapper objWrapp = new DataTrendsWrapper();
                objWrapp.oppObj = obj;
                objWrapp.objName = 'Opportunity';
                if(obj.Record_Date__c > weekStartDateW1 && obj.Record_Date__c <= weekEndDateW1) {
                    if(!wrappMap.containsKey('W1')) {
                        List<DataTrendsWrapper> wrapList = new List<DataTrendsWrapper>();
                        wrapList.add(objWrapp);                      
                        wrappMap.put('W1',wrapList);
                    } else {                       
                        wrappMap.get('W1').add(objWrapp);		
                    }
                }
                if(obj.Record_Date__c > weekStartDateW2 && obj.Record_Date__c <= weekEndDateW2) {
                    if(!wrappMap.containsKey('W2')) {
                        List<DataTrendsWrapper> wrapList = new List<DataTrendsWrapper>();
                        wrapList.add(objWrapp);                      
                        wrappMap.put('W2',wrapList);
                    } else {                       
                        wrappMap.get('W2').add(objWrapp);		
                    }
                }
                if(obj.Record_Date__c > weekStartDateW3 && obj.Record_Date__c <= weekEndDateW3) {
                    if(!wrappMap.containsKey('W3')) {
                        List<DataTrendsWrapper> wrapList = new List<DataTrendsWrapper>();
                        wrapList.add(objWrapp);                      
                        wrappMap.put('W3',wrapList);
                    } else {                       
                        wrappMap.get('W3').add(objWrapp);		
                    }
                }
                if(obj.Record_Date__c > weekStartDateW4 && obj.Record_Date__c <= weekEndDateW4) {
                    if(!wrappMap.containsKey('W4')) {
                        List<DataTrendsWrapper> wrapList = new List<DataTrendsWrapper>();
                        wrapList.add(objWrapp);                      
                        wrappMap.put('W4',wrapList);
                    } else {                       
                        wrappMap.get('W4').add(objWrapp);		
                    }
                }
            }

            List<Lead> leadList = [SELECT Id,Name,Record_Date__c FROM Lead 
                                    WHERE Record_Date__c != null AND Record_Date__c >: weekStartDateW4 AND Record_Date__c <=: todayDate];
            
            for(Lead obj: leadList) {
                DataTrendsWrapper objWrapp = new DataTrendsWrapper();
                objWrapp.leadObj = obj;
                objWrapp.objName = 'Lead';
                if(obj.Record_Date__c > weekStartDateW1 && obj.Record_Date__c <= weekEndDateW1) {
                    if(!wrappMap.containsKey('W1')) {
                        List<DataTrendsWrapper> wrapList = new List<DataTrendsWrapper>();
                        wrapList.add(objWrapp);                      
                        wrappMap.put('W1',wrapList);
                    } else {                       
                        wrappMap.get('W1').add(objWrapp);		
                    }
                }
                if(obj.Record_Date__c > weekStartDateW2 && obj.Record_Date__c <= weekEndDateW2) {
                    if(!wrappMap.containsKey('W2')) {
                        List<DataTrendsWrapper> wrapList = new List<DataTrendsWrapper>();
                        wrapList.add(objWrapp);                      
                        wrappMap.put('W2',wrapList);
                    } else {                       
                        wrappMap.get('W2').add(objWrapp);		
                    }
                }
                if(obj.Record_Date__c > weekStartDateW3 && obj.Record_Date__c <= weekEndDateW3) {
                    if(!wrappMap.containsKey('W3')) {
                        List<DataTrendsWrapper> wrapList = new List<DataTrendsWrapper>();
                        wrapList.add(objWrapp);                      
                        wrappMap.put('W3',wrapList);
                    } else {                       
                        wrappMap.get('W3').add(objWrapp);		
                    }
                }
                if(obj.Record_Date__c > weekStartDateW4 && obj.Record_Date__c <= weekEndDateW4) {
                    if(!wrappMap.containsKey('W4')) {
                        List<DataTrendsWrapper> wrapList = new List<DataTrendsWrapper>();
                        wrapList.add(objWrapp);                      
                        wrappMap.put('W4',wrapList);
                    } else {                       
                        wrappMap.get('W4').add(objWrapp);		
                    }
                }
            }

            List<Contact> conList = [SELECT Id,Name,Record_Date__c FROM Contact 
                                    WHERE Record_Date__c != null AND Record_Date__c >: weekStartDateW4 AND Record_Date__c <=: todayDate];
            
            for(Contact obj: conList) {
                DataTrendsWrapper objWrapp = new DataTrendsWrapper();
                objWrapp.conObj = obj;
                objWrapp.objName = 'Contact';
                if(obj.Record_Date__c > weekStartDateW1 && obj.Record_Date__c <= weekEndDateW1) {
                    if(!wrappMap.containsKey('W1')) {
                        List<DataTrendsWrapper> wrapList = new List<DataTrendsWrapper>();
                        wrapList.add(objWrapp);                      
                        wrappMap.put('W1',wrapList);
                    } else {                       
                        wrappMap.get('W1').add(objWrapp);		
                    }
                }
                if(obj.Record_Date__c > weekStartDateW2 && obj.Record_Date__c <= weekEndDateW2) {
                    if(!wrappMap.containsKey('W2')) {
                        List<DataTrendsWrapper> wrapList = new List<DataTrendsWrapper>();
                        wrapList.add(objWrapp);                      
                        wrappMap.put('W2',wrapList);
                    } else {                       
                        wrappMap.get('W2').add(objWrapp);		
                    }
                }
                if(obj.Record_Date__c > weekStartDateW3 && obj.Record_Date__c <= weekEndDateW3) {
                    if(!wrappMap.containsKey('W3')) {
                        List<DataTrendsWrapper> wrapList = new List<DataTrendsWrapper>();
                        wrapList.add(objWrapp);                      
                        wrappMap.put('W3',wrapList);
                    } else {                       
                        wrappMap.get('W3').add(objWrapp);		
                    }
                }
                if(obj.Record_Date__c > weekStartDateW4 && obj.Record_Date__c <= weekEndDateW4) {
                    if(!wrappMap.containsKey('W4')) {
                        List<DataTrendsWrapper> wrapList = new List<DataTrendsWrapper>();
                        wrapList.add(objWrapp);                      
                        wrappMap.put('W4',wrapList);
                    } else {                       
                        wrappMap.get('W4').add(objWrapp);		
                    }
                }
            }

            List<Case> caseList = [SELECT Id,Record_Date__c FROM Case 
                                    WHERE Record_Date__c != null AND Record_Date__c >: weekStartDateW4 AND Record_Date__c <=: todayDate];
            
            for(Case obj: caseList) {
                DataTrendsWrapper objWrapp = new DataTrendsWrapper();
                objWrapp.caseObj = obj;
                objWrapp.objName = 'Case';
                if(obj.Record_Date__c > weekStartDateW1 && obj.Record_Date__c <= weekEndDateW1) {
                    if(!wrappMap.containsKey('W1')) {
                        List<DataTrendsWrapper> wrapList = new List<DataTrendsWrapper>();
                        wrapList.add(objWrapp);                      
                        wrappMap.put('W1',wrapList);
                    } else {                       
                        wrappMap.get('W1').add(objWrapp);		
                    }
                }
                if(obj.Record_Date__c > weekStartDateW2 && obj.Record_Date__c <= weekEndDateW2) {
                    if(!wrappMap.containsKey('W2')) {
                        List<DataTrendsWrapper> wrapList = new List<DataTrendsWrapper>();
                        wrapList.add(objWrapp);                      
                        wrappMap.put('W2',wrapList);
                    } else {                       
                        wrappMap.get('W2').add(objWrapp);		
                    }
                }
                if(obj.Record_Date__c > weekStartDateW3 && obj.Record_Date__c <= weekEndDateW3) {
                    if(!wrappMap.containsKey('W3')) {
                        List<DataTrendsWrapper> wrapList = new List<DataTrendsWrapper>();
                        wrapList.add(objWrapp);                      
                        wrappMap.put('W3',wrapList);
                    } else {                       
                        wrappMap.get('W3').add(objWrapp);		
                    }
                }
                if(obj.Record_Date__c > weekStartDateW4 && obj.Record_Date__c <= weekEndDateW4) {
                    if(!wrappMap.containsKey('W4')) {
                        List<DataTrendsWrapper> wrapList = new List<DataTrendsWrapper>();
                        wrapList.add(objWrapp);                      
                        wrappMap.put('W4',wrapList);
                    } else {                       
                        wrappMap.get('W4').add(objWrapp);		
                    }
                }
            }
                                    
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return wrappMap;
    }

    //Data trend wrapper
    public class DataTrendsWrapper {
        
        @AuraEnabled
        public String objName;
        @AuraEnabled
        public Account accObj;
        @AuraEnabled
        public Opportunity oppObj;
        @AuraEnabled
        public Lead leadObj;
        @AuraEnabled
        public Contact conObj;
        @AuraEnabled
        public Case caseObj;
    }



}