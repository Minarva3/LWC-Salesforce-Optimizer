global class moreDetailsApiVersionBatchSchedule implements Database.Batchable<sObject>, Schedulable{
    
    global Database.QueryLocator start(Database.BatchableContext BC) {

            return Database.getQueryLocator('SELECT ApiVersion FROM ApexClass');
    }

    global void execute(Database.BatchableContext BC, List<ApexClass> scope){

                List<Limit__c> recordsToInsert = new List<Limit__c>();
        
                Integer count10To20 = 0;
                Integer count20To30 = 0;
                Integer count30To40 = 0;
                Integer count40To50 = 0;
                Integer count50To60 = 0;
        
                for (ApexClass apexClass : scope) {
                    Decimal apiVersion = apexClass.ApiVersion;
        
                    if (apiVersion >= 10 && apiVersion < 20) {
                        count10To20++;
                    } else if (apiVersion >= 20 && apiVersion < 30) {
                        count20To30++;
                    } else if (apiVersion >= 30 && apiVersion < 40) {
                        count30To40++;
                    } else if (apiVersion >= 40 && apiVersion < 50) {
                        count40To50++;
                    } else if (apiVersion >= 50 && apiVersion < 60) {
                        count50To60++;
                    }
                }
        
                if (count10To20 > 0) {
                    Limit__c obj1 = new Limit__c();
                    obj1.louie976__API_Version_Range__c = '10-20';
                    obj1.louie976__API_Version_Count__c = count10To20;
                    obj1.louie976__Record_Date__c = DateTime.now();
                    recordsToInsert.add(obj1);
                }
        
                if (count20To30 > 0) {
                    Limit__c obj2 = new Limit__c();
                    obj2.louie976__API_Version_Range__c = '20-30';
                    obj2.louie976__API_Version_Count__c = count20To30;
                    obj2.louie976__Record_Date__c = DateTime.now();
                    recordsToInsert.add(obj2);
                }
        
                if (count30To40 > 0) {
                    Limit__c obj3 = new Limit__c();
                    obj3.louie976__API_Version_Range__c = '30-40';
                    obj3.louie976__API_Version_Count__c = count30To40;
                    obj3.louie976__Record_Date__c = DateTime.now();
                    recordsToInsert.add(obj3);
                }
        
                if (count40To50 > 0) {
                    Limit__c obj4 = new Limit__c();
                    obj4.louie976__API_Version_Range__c = '40-50';
                    obj4.louie976__API_Version_Count__c = count40To50;
                    obj4.louie976__Record_Date__c = DateTime.now();
                    recordsToInsert.add(obj4);
                }
        
                if (count50To60 > 0) {
                    Limit__c obj5 = new Limit__c();
                    obj5.louie976__API_Version_Range__c = '50-60';
                    obj5.louie976__API_Version_Count__c = count50To60;
                    obj5.louie976__Record_Date__c = DateTime.now();
                    recordsToInsert.add(obj5);
                }
        
                insert recordsToInsert;
            }

                global void execute(SchedulableContext SC) {
                    moreDetailsApiVersionBatchSchedule batch = new moreDetailsApiVersionBatchSchedule();
                    Database.executeBatch(batch);
                }

        
            global void finish(Database.BatchableContext context) {
                
            }
        
        
    }