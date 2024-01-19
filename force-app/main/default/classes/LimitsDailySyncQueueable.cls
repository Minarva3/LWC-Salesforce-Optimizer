global class LimitsDailySyncQueueable implements Queueable, Database.AllowsCallouts  {
	
    global static void execute(QueueableContext  context){
        String endpoint = URL.getOrgDomainUrl().toExternalForm() + '/services/data/v58.0/limits/';
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endpoint);
        request.setMethod('GET');
        request.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId());
		request.setHeader('Content-Type', 'application/json');
        
        Http http = new Http();
        HttpResponse response = http.send(request);

        if (response.getStatusCode() == 200) {
			
            Map<String, Object> limitData = (Map<String, Object>)JSON.deserializeUntyped(response.getBody());
			List<Limit__c> limitsToUpsert = new List<Limit__c>();
			List<String> limitNames = new List<String>();

            Map<String,Limit__c> existingLimitMap = new Map<String,Limit__c>();
            List<Limit__c> existingLimits = [SELECT Id,Limit_Name__c, Max__c, Remaining__c FROM Limit__c];
            
            if(!existingLimits.isEmpty()){
                for(Limit__c existinglimit : existingLimits){
                    existingLimitMap.put(existinglimit.Limit_Name__c,existinglimit);
                }
            }
            
            
            for (String limitName : limitData.keySet()) {
                Map<String, Object> values = (Map<String, Object>)limitData.get(limitName);

                Integer max = (Integer)values.get('Max');
                Integer remaining = (Integer)values.get('Remaining');
				Limit__c limitRecord;
                
                if(existingLimitMap.containsKey(limitName)){
                    limitRecord = existingLimitMap.get(limitName);
                    limitRecord.Max__c = max;
                    limitRecord.Remaining__c = remaining;
                }
                else{
                     limitRecord = new Limit__c(
                        Limit_Name__c = limitName,
                        Limit_Name_Ext__c = limitName,
                        Max__c = max,
                        Remaining__c = remaining,
                        Limit_Type__c = 'Daily Limit',
                        Record_Date__c = System.now()
                    );
                }
                limitsToUpsert.add(limitRecord);
                limitNames.add(limitName);
                
                List<Database.UpsertResult> upsertResults=Database.upsert(limitsToUpsert, Limit__c.Fields.Limit_Name_Ext__c, false);
                
                List<Id> listOfIds = new List<Id>();
                for (Integer i = 0; i < upsertResults.size(); i++) {
                    if (!upsertResults[i].success) {
                        System.debug('Failed to upsert record for ' + limitNames[i] + ': ' + upsertResults[i].getErrors()[0].getMessage());
                    }
                }
            }
            
        } else {
            System.debug('Failed to fetch limits. HTTP Status: ' + response.getStatusCode());
        }
    }
}