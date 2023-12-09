public class LimitAPIParser {

    public class AnalyticsExternalDataSizeMB {
        public Integer Max {get;set;} 
        public Integer Remaining {get;set;} 

        public AnalyticsExternalDataSizeMB(JSONParser parser) {
            while (parser.nextToken() != System.JSONToken.END_OBJECT) {
                if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
                    String text = parser.getText();
                    if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
                        if (text == 'Max') {
                            Max = parser.getIntegerValue();
                        } else if (text == 'Remaining') {
                            Remaining = parser.getIntegerValue();
                        } else {
                            System.debug(LoggingLevel.WARN, 'AnalyticsExternalDataSizeMB consuming unrecognized property: '+text);
                            consumeObject(parser);
                        }
                    }
                }
            }
        }
    }
    
    public AnalyticsExternalDataSizeMB AnalyticsExternalDataSizeMB {get;set;} 
    public AnalyticsExternalDataSizeMB ConcurrentAsyncGetReportInstances {get;set;} 
    public AnalyticsExternalDataSizeMB ConcurrentEinsteinDataInsightsStoryCreation {get;set;} 
    public AnalyticsExternalDataSizeMB ConcurrentEinsteinDiscoveryStoryCreation {get;set;} 
    public AnalyticsExternalDataSizeMB ConcurrentSyncReportRuns {get;set;} 
    public AnalyticsExternalDataSizeMB DailyAnalyticsDataflowJobExecutions {get;set;} 
    public AnalyticsExternalDataSizeMB DailyAnalyticsUploadedFilesSizeMB {get;set;} 
    public AnalyticsExternalDataSizeMB DailyApiRequests {get;set;} 
    public AnalyticsExternalDataSizeMB DailyAsyncApexExecutions {get;set;} 
    public DailyBulkApiBatches DailyBulkApiBatches {get;set;} 
    public AnalyticsExternalDataSizeMB DailyBulkV2QueryFileStorageMB {get;set;} 
    public AnalyticsExternalDataSizeMB DailyBulkV2QueryJobs {get;set;} 
    public AnalyticsExternalDataSizeMB DailyDeliveredPlatformEvents {get;set;} 
    public AnalyticsExternalDataSizeMB DailyDurableGenericStreamingApiEvents {get;set;} 
    public AnalyticsExternalDataSizeMB DailyDurableStreamingApiEvents {get;set;} 
    public AnalyticsExternalDataSizeMB DailyEinsteinDataInsightsStoryCreation {get;set;} 
    public AnalyticsExternalDataSizeMB DailyEinsteinDiscoveryOptimizationJobRuns {get;set;} 
    public AnalyticsExternalDataSizeMB DailyEinsteinDiscoveryPredictAPICalls {get;set;} 
    public AnalyticsExternalDataSizeMB DailyEinsteinDiscoveryPredictionsByCDC {get;set;} 
    public AnalyticsExternalDataSizeMB DailyEinsteinDiscoveryStoryCreation {get;set;} 
    public AnalyticsExternalDataSizeMB DailyFunctionsApiCallLimit {get;set;} 
    public DailyBulkApiBatches DailyGenericStreamingApiEvents {get;set;} 
    public AnalyticsExternalDataSizeMB DailyStandardVolumePlatformEvents {get;set;} 
    public DailyBulkApiBatches DailyStreamingApiEvents {get;set;} 
    public AnalyticsExternalDataSizeMB DailyWorkflowEmails {get;set;} 
    public AnalyticsExternalDataSizeMB DataStorageMB {get;set;} 
    public AnalyticsExternalDataSizeMB DurableStreamingApiConcurrentClients {get;set;} 
    public AnalyticsExternalDataSizeMB FileStorageMB {get;set;} 
    public AnalyticsExternalDataSizeMB HourlyAsyncReportRuns {get;set;} 
    public AnalyticsExternalDataSizeMB HourlyDashboardRefreshes {get;set;} 
    public AnalyticsExternalDataSizeMB HourlyDashboardResults {get;set;} 
    public AnalyticsExternalDataSizeMB HourlyDashboardStatuses {get;set;} 
    public AnalyticsExternalDataSizeMB HourlyLongTermIdMapping {get;set;} 
    public AnalyticsExternalDataSizeMB HourlyManagedContentPublicRequests {get;set;} 
    public AnalyticsExternalDataSizeMB HourlyODataCallout {get;set;} 
    public AnalyticsExternalDataSizeMB HourlyPublishedPlatformEvents {get;set;} 
    public AnalyticsExternalDataSizeMB HourlyPublishedStandardVolumePlatformEvents {get;set;} 
    public AnalyticsExternalDataSizeMB HourlyShortTermIdMapping {get;set;} 
    public AnalyticsExternalDataSizeMB HourlySyncReportRuns {get;set;} 
    public AnalyticsExternalDataSizeMB HourlyTimeBasedWorkflow {get;set;} 
    public AnalyticsExternalDataSizeMB MassEmail {get;set;} 
    public AnalyticsExternalDataSizeMB MonthlyEinsteinDiscoveryStoryCreation {get;set;} 
    public AnalyticsExternalDataSizeMB MonthlyPlatformEventsUsageEntitlement {get;set;} 
    public AnalyticsExternalDataSizeMB Package2VersionCreates {get;set;} 
    public AnalyticsExternalDataSizeMB Package2VersionCreatesWithoutValidation {get;set;} 
    public PermissionSets PermissionSets {get;set;} 
    public AnalyticsExternalDataSizeMB PrivateConnectOutboundCalloutHourlyLimitMB {get;set;} 
    public AnalyticsExternalDataSizeMB SingleEmail {get;set;} 
    public AnalyticsExternalDataSizeMB StreamingApiConcurrentClients {get;set;} 

    public LimitAPIParser(JSONParser parser) {
        while (parser.nextToken() != System.JSONToken.END_OBJECT) {
            if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
                String text = parser.getText();
                if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
                    if (text == 'AnalyticsExternalDataSizeMB') {
                        AnalyticsExternalDataSizeMB = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'ConcurrentAsyncGetReportInstances') {
                        ConcurrentAsyncGetReportInstances = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'ConcurrentEinsteinDataInsightsStoryCreation') {
                        ConcurrentEinsteinDataInsightsStoryCreation = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'ConcurrentEinsteinDiscoveryStoryCreation') {
                        ConcurrentEinsteinDiscoveryStoryCreation = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'ConcurrentSyncReportRuns') {
                        ConcurrentSyncReportRuns = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'DailyAnalyticsDataflowJobExecutions') {
                        DailyAnalyticsDataflowJobExecutions = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'DailyAnalyticsUploadedFilesSizeMB') {
                        DailyAnalyticsUploadedFilesSizeMB = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'DailyApiRequests') {
                        DailyApiRequests = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'DailyAsyncApexExecutions') {
                        DailyAsyncApexExecutions = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'DailyBulkApiBatches') {
                        DailyBulkApiBatches = new DailyBulkApiBatches(parser);
                    } else if (text == 'DailyBulkV2QueryFileStorageMB') {
                        DailyBulkV2QueryFileStorageMB = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'DailyBulkV2QueryJobs') {
                        DailyBulkV2QueryJobs = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'DailyDeliveredPlatformEvents') {
                        DailyDeliveredPlatformEvents = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'DailyDurableGenericStreamingApiEvents') {
                        DailyDurableGenericStreamingApiEvents = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'DailyDurableStreamingApiEvents') {
                        DailyDurableStreamingApiEvents = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'DailyEinsteinDataInsightsStoryCreation') {
                        DailyEinsteinDataInsightsStoryCreation = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'DailyEinsteinDiscoveryOptimizationJobRuns') {
                        DailyEinsteinDiscoveryOptimizationJobRuns = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'DailyEinsteinDiscoveryPredictAPICalls') {
                        DailyEinsteinDiscoveryPredictAPICalls = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'DailyEinsteinDiscoveryPredictionsByCDC') {
                        DailyEinsteinDiscoveryPredictionsByCDC = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'DailyEinsteinDiscoveryStoryCreation') {
                        DailyEinsteinDiscoveryStoryCreation = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'DailyFunctionsApiCallLimit') {
                        DailyFunctionsApiCallLimit = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'DailyGenericStreamingApiEvents') {
                        DailyGenericStreamingApiEvents = new DailyBulkApiBatches(parser);
                    } else if (text == 'DailyStandardVolumePlatformEvents') {
                        DailyStandardVolumePlatformEvents = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'DailyStreamingApiEvents') {
                        DailyStreamingApiEvents = new DailyBulkApiBatches(parser);
                    } else if (text == 'DailyWorkflowEmails') {
                        DailyWorkflowEmails = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'DataStorageMB') {
                        DataStorageMB = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'DurableStreamingApiConcurrentClients') {
                        DurableStreamingApiConcurrentClients = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'FileStorageMB') {
                        FileStorageMB = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'HourlyAsyncReportRuns') {
                        HourlyAsyncReportRuns = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'HourlyDashboardRefreshes') {
                        HourlyDashboardRefreshes = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'HourlyDashboardResults') {
                        HourlyDashboardResults = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'HourlyDashboardStatuses') {
                        HourlyDashboardStatuses = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'HourlyLongTermIdMapping') {
                        HourlyLongTermIdMapping = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'HourlyManagedContentPublicRequests') {
                        HourlyManagedContentPublicRequests = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'HourlyODataCallout') {
                        HourlyODataCallout = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'HourlyPublishedPlatformEvents') {
                        HourlyPublishedPlatformEvents = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'HourlyPublishedStandardVolumePlatformEvents') {
                        HourlyPublishedStandardVolumePlatformEvents = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'HourlyShortTermIdMapping') {
                        HourlyShortTermIdMapping = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'HourlySyncReportRuns') {
                        HourlySyncReportRuns = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'HourlyTimeBasedWorkflow') {
                        HourlyTimeBasedWorkflow = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'MassEmail') {
                        MassEmail = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'MonthlyEinsteinDiscoveryStoryCreation') {
                        MonthlyEinsteinDiscoveryStoryCreation = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'MonthlyPlatformEventsUsageEntitlement') {
                        MonthlyPlatformEventsUsageEntitlement = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'Package2VersionCreates') {
                        Package2VersionCreates = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'Package2VersionCreatesWithoutValidation') {
                        Package2VersionCreatesWithoutValidation = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'PermissionSets') {
                        PermissionSets = new PermissionSets(parser);
                    } else if (text == 'PrivateConnectOutboundCalloutHourlyLimitMB') {
                        PrivateConnectOutboundCalloutHourlyLimitMB = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'SingleEmail') {
                        SingleEmail = new AnalyticsExternalDataSizeMB(parser);
                    } else if (text == 'StreamingApiConcurrentClients') {
                        StreamingApiConcurrentClients = new AnalyticsExternalDataSizeMB(parser);
                    } else {
                        System.debug(LoggingLevel.WARN, 'LimitAPIParser consuming unrecognized property: '+text);
                        consumeObject(parser);
                    }
                }
            }
        }
    }
    
    public class DailyBulkApiBatches {
        public Integer Max {get;set;} 
        public Integer Remaining {get;set;} 
        public AnalyticsExternalDataSizeMB AntMigrationTool {get;set;} 
        public AnalyticsExternalDataSizeMB DataloaderBulk {get;set;} 
        public AnalyticsExternalDataSizeMB DataloaderPartner {get;set;} 
        public AnalyticsExternalDataSizeMB Force_comIDE {get;set;} // in json: Force.com IDE
        public AnalyticsExternalDataSizeMB SalesforceMobileDashboards {get;set;} 
        public AnalyticsExternalDataSizeMB SalesforceTouch {get;set;} 
        public AnalyticsExternalDataSizeMB SalesforceforOutlook {get;set;} 
        public AnalyticsExternalDataSizeMB Workbench {get;set;} 

        public DailyBulkApiBatches(JSONParser parser) {
            while (parser.nextToken() != System.JSONToken.END_OBJECT) {
                if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
                    String text = parser.getText();
                    if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
                        if (text == 'Max') {
                            Max = parser.getIntegerValue();
                        } else if (text == 'Remaining') {
                            Remaining = parser.getIntegerValue();
                        } else if (text == 'Ant Migration Tool') {
                            AntMigrationTool = new AnalyticsExternalDataSizeMB(parser);
                        } else if (text == 'Dataloader Bulk') {
                            DataloaderBulk = new AnalyticsExternalDataSizeMB(parser);
                        } else if (text == 'Dataloader Partner') {
                            DataloaderPartner = new AnalyticsExternalDataSizeMB(parser);
                        } else if (text == 'Force.com IDE') {
                            Force_comIDE = new AnalyticsExternalDataSizeMB(parser);
                        } else if (text == 'Salesforce Mobile Dashboards') {
                            SalesforceMobileDashboards = new AnalyticsExternalDataSizeMB(parser);
                        } else if (text == 'Salesforce Touch') {
                            SalesforceTouch = new AnalyticsExternalDataSizeMB(parser);
                        } else if (text == 'Salesforce for Outlook') {
                            SalesforceforOutlook = new AnalyticsExternalDataSizeMB(parser);
                        } else if (text == 'Workbench') {
                            Workbench = new AnalyticsExternalDataSizeMB(parser);
                        } else {
                            System.debug(LoggingLevel.WARN, 'DailyBulkApiBatches consuming unrecognized property: '+text);
                            consumeObject(parser);
                        }
                    }
                }
            }
        }
    }
    
    public class PermissionSets {
        public Integer Max {get;set;} 
        public Integer Remaining {get;set;} 
        public AnalyticsExternalDataSizeMB CreateCustom {get;set;} 

        public PermissionSets(JSONParser parser) {
            while (parser.nextToken() != System.JSONToken.END_OBJECT) {
                if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
                    String text = parser.getText();
                    if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
                        if (text == 'Max') {
                            Max = parser.getIntegerValue();
                        } else if (text == 'Remaining') {
                            Remaining = parser.getIntegerValue();
                        } else if (text == 'CreateCustom') {
                            CreateCustom = new AnalyticsExternalDataSizeMB(parser);
                        } else {
                            System.debug(LoggingLevel.WARN, 'PermissionSets consuming unrecognized property: '+text);
                            consumeObject(parser);
                        }
                    }
                }
            }
        }
    }
    
    
    public static LimitAPIParser parse(String json) {
        System.JSONParser parser = System.JSON.createParser(json);
        return new LimitAPIParser(parser);
    }
    
    public static void consumeObject(System.JSONParser parser) {
        Integer depth = 0;
        do {
            System.JSONToken curr = parser.getCurrentToken();
            if (curr == System.JSONToken.START_OBJECT || 
                curr == System.JSONToken.START_ARRAY) {
                depth++;
            } else if (curr == System.JSONToken.END_OBJECT ||
                curr == System.JSONToken.END_ARRAY) {
                depth--;
            }
        } while (depth > 0 && parser.nextToken() != null);
    }
}