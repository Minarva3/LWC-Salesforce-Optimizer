public class LimitsCounterService{ 

private static String sessionId; 

public class LimitValues{
    public Integer Max;
    public Integer Remaining;
}
//method to get current session id 
public static String getUserSessionId(){
        // Refer to the Page 
        PageReference reportPage = Page.GetSessionIdVF;
        String vfContent;
        if(Test.isRunningTest()) { 
            vfContent = blob.valueOf('Start_Of_Session_Id End_Of_Session_Id').toString();
        }else{
            vfContent = reportPage.getContent().toString();
        }
        System.debug('vfContent '+vfContent);
        // Find the position of Start_Of_Session_Id and End_Of_Session_Id 
        Integer startP = vfContent.indexOf('Start_Of_Session_Id') + 'Start_Of_Session_Id'.length(),
            endP = vfContent.indexOf('End_Of_Session_Id');
        sessionId =  vfContent.substring(startP, endP);
        return sessionId;
        }

// method to make http call  
public static String getHttpResponse(String endpoint){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setHeader('Authorization', 'Bearer ' + getUserSessionId());
        request.setHeader('Content-Type', 'application/json');
        request.setEndpoint(endpoint);
            request.setMethod('GET');
        HttpResponse response = http.send(request);
        if(response.getStatusCode() == 200) {
            return response.getbody();
        }else{
            return null;
            }
        }
        
//method to get User_Personal_Setting__c records 

 

// method to call limits API, deserialize response and return a list of Limit__c records 
public static List<Limit__c> getAllDailyLimits(){
    String endpoint = URL.getSalesforceBaseUrl().toExternalForm() + '/services/data/v55.0/limits/';
    String response = getHttpResponse(endpoint);
    if(response != null){
    System.debug('=======response======='+response);
        List<Limit__c> limitList = new List<Limit__c>();
        JSONParser parser = JSON.createParser(response);
        parser.nextToken();
        while(parser.nextToken() != System.JSONToken.END_OBJECT){
            if(parser.getCurrentToken() == System.JSONToken.FIELD_NAME){
                Limit__c lim = new Limit__c();
                lim.Limit_Name__c = parser.getText();
                lim.Limit_Type__c = 'Daily Limit';
                parser.nextToken();
                LimitValues obj = (LimitValues)parser.readValueAs(LimitValues.class);
                lim.Max__c = obj.Max;
                lim.Remaining__c = obj.Remaining;
                limitList.add(lim);
                }
            }
        return limitList;
        }else{
            return null;
        }
    
    } 

// method to get all user setting records and get a set of all objects 

 

// method to call Tooling API to get object limits, deserialize response and return a list of limit__c records 
public static List<Limit__c> getObjectLimits(List<String> objectNames){return null;} 

//method to insert Limits records 
public static Boolean insertLimitRecords(List<Limit__c> limitRecords){
    Boolean successFlag = true;
    Database.SaveResult[] srList = Database.insert(limitRecords, false);
    for (Database.SaveResult sr : srList) {
        if (sr.isSuccess()) {
            //do nothing
        }else {
            successFlag = false;    
            }
        }
     return successFlag;
    }
}