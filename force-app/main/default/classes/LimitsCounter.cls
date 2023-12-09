/**************************************************************************************
Apex Class Name     : LimitsCounter
Created Date        : October 2021
Function            : Class for LimitsCounterService class.
 * Developer                      Date                         Description
 * -------------------------------------------------------------------------------------               
 * Navjeet Singh                    March 2023                      Class for LimitsCounterService class.
 *************************************************************************************/
global class LimitsCounter implements Schedulable {

//public static Boolean isCalledFromUI; 

    global void execute(SchedulableContext SC) { 
    
        try{
            List<Limit__c> dailyLimitsRecordList = LimitsCounterService.getAllDailyLimits();
            if(!dailyLimitsRecordList.isEmpty()){
                Boolean flag = LimitsCounterService.insertLimitRecords(dailyLimitsRecordList); 
            }            
        } catch(Exception e) {
            System.debug('--Error Msg--'+e.getMessage()+'--Line No--'+e.getLineNumber());
        }
    
    }
   
}