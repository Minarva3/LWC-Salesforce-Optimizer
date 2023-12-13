public with sharing class polarChartConfi {

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
}