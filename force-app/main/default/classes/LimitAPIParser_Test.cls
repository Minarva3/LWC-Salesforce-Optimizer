@IsTest
public class LimitAPIParser_Test {
    
    // This test method should give 100% coverage
    static testMethod void testParse() {
        String json = '{'+
        '  \"AnalyticsExternalDataSizeMB\" : {'+
        '    \"Max\" : 40960,'+
        '    \"Remaining\" : 40960'+
        '  },'+
        '  \"ConcurrentAsyncGetReportInstances\" : {'+
        '    \"Max\" : 200,'+
        '    \"Remaining\" : 200'+
        '  },'+
        '  \"ConcurrentEinsteinDataInsightsStoryCreation\" : {'+
        '    \"Max\" : 5,'+
        '    \"Remaining\" : 5'+
        '  },'+
        '  \"ConcurrentEinsteinDiscoveryStoryCreation\" : {'+
        '    \"Max\" : 2,'+
        '    \"Remaining\" : 2'+
        '  },'+
        '  \"ConcurrentSyncReportRuns\" : {'+
        '    \"Max\" : 20,'+
        '    \"Remaining\" : 20'+
        '  },'+
        '  \"DailyAnalyticsDataflowJobExecutions\" : {'+
        '    \"Max\" : 60,'+
        '    \"Remaining\" : 60'+
        '  },'+
        '  \"DailyAnalyticsUploadedFilesSizeMB\" : {'+
        '    \"Max\" : 51200,'+
        '    \"Remaining\" : 51200'+
        '  },'+
        '  \"DailyApiRequests\" : {'+
        '    \"Max\" : 15000,'+
        '    \"Remaining\" : 14881'+
        '  },'+
        '  \"DailyAsyncApexExecutions\" : {'+
        '    \"Max\" : 250000,'+
        '    \"Remaining\" : 250000'+
        '  },'+
        '  \"DailyBulkApiBatches\" : {'+
        '    \"Max\" : 15000,'+
        '    \"Remaining\" : 15000,'+
        '    \"Ant Migration Tool\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    },'+
        '    \"Dataloader Bulk\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    },'+
        '    \"Dataloader Partner\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    },'+
        '    \"Force.com IDE\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    },'+
        '    \"Salesforce Mobile Dashboards\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    },'+
        '    \"Salesforce Touch\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    },'+
        '    \"Salesforce for Outlook\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    },'+
        '    \"Workbench\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    }'+
        '  },'+
        '  \"DailyBulkV2QueryFileStorageMB\" : {'+
        '    \"Max\" : 976562,'+
        '    \"Remaining\" : 976562'+
        '  },'+
        '  \"DailyBulkV2QueryJobs\" : {'+
        '    \"Max\" : 10000,'+
        '    \"Remaining\" : 10000'+
        '  },'+
        '  \"DailyDeliveredPlatformEvents\" : {'+
        '    \"Max\" : 10000,'+
        '    \"Remaining\" : 10000'+
        '  },'+
        '  \"DailyDurableGenericStreamingApiEvents\" : {'+
        '    \"Max\" : 10000,'+
        '    \"Remaining\" : 10000'+
        '  },'+
        '  \"DailyDurableStreamingApiEvents\" : {'+
        '    \"Max\" : 10000,'+
        '    \"Remaining\" : 10000'+
        '  },'+
        '  \"DailyEinsteinDataInsightsStoryCreation\" : {'+
        '    \"Max\" : 1000,'+
        '    \"Remaining\" : 1000'+
        '  },'+
        '  \"DailyEinsteinDiscoveryOptimizationJobRuns\" : {'+
        '    \"Max\" : 25,'+
        '    \"Remaining\" : 25'+
        '  },'+
        '  \"DailyEinsteinDiscoveryPredictAPICalls\" : {'+
        '    \"Max\" : 50000,'+
        '    \"Remaining\" : 50000'+
        '  },'+
        '  \"DailyEinsteinDiscoveryPredictionsByCDC\" : {'+
        '    \"Max\" : 500000,'+
        '    \"Remaining\" : 500000'+
        '  },'+
        '  \"DailyEinsteinDiscoveryStoryCreation\" : {'+
        '    \"Max\" : 100,'+
        '    \"Remaining\" : 100'+
        '  },'+
        '  \"DailyFunctionsApiCallLimit\" : {'+
        '    \"Max\" : 50000,'+
        '    \"Remaining\" : 50000'+
        '  },'+
        '  \"DailyGenericStreamingApiEvents\" : {'+
        '    \"Max\" : 10000,'+
        '    \"Remaining\" : 10000,'+
        '    \"Ant Migration Tool\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    },'+
        '    \"Dataloader Bulk\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    },'+
        '    \"Dataloader Partner\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    },'+
        '    \"Force.com IDE\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    },'+
        '    \"Salesforce Mobile Dashboards\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    },'+
        '    \"Salesforce Touch\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    },'+
        '    \"Salesforce for Outlook\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    },'+
        '    \"Workbench\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    }'+
        '  },'+
        '  \"DailyStandardVolumePlatformEvents\" : {'+
        '    \"Max\" : 10000,'+
        '    \"Remaining\" : 10000'+
        '  },'+
        '  \"DailyStreamingApiEvents\" : {'+
        '    \"Max\" : 10000,'+
        '    \"Remaining\" : 9977,'+
        '    \"Ant Migration Tool\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    },'+
        '    \"Dataloader Bulk\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    },'+
        '    \"Dataloader Partner\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    },'+
        '    \"Force.com IDE\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    },'+
        '    \"Salesforce Mobile Dashboards\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    },'+
        '    \"Salesforce Touch\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    },'+
        '    \"Salesforce for Outlook\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    },'+
        '    \"Workbench\" : {'+
        '      \"Max\" : 0,'+
        '      \"Remaining\" : 0'+
        '    }'+
        '  },'+
        '  \"DailyWorkflowEmails\" : {'+
        '    \"Max\" : 1890,'+
        '    \"Remaining\" : 1890'+
        '  },'+
        '  \"DataStorageMB\" : {'+
        '    \"Max\" : 5,'+
        '    \"Remaining\" : 5'+
        '  },'+
        '  \"DurableStreamingApiConcurrentClients\" : {'+
        '    \"Max\" : 20,'+
        '    \"Remaining\" : 20'+
        '  },'+
        '  \"FileStorageMB\" : {'+
        '    \"Max\" : 20,'+
        '    \"Remaining\" : 20'+
        '  },'+
        '  \"HourlyAsyncReportRuns\" : {'+
        '    \"Max\" : 1200,'+
        '    \"Remaining\" : 1200'+
        '  },'+
        '  \"HourlyDashboardRefreshes\" : {'+
        '    \"Max\" : 200,'+
        '    \"Remaining\" : 200'+
        '  },'+
        '  \"HourlyDashboardResults\" : {'+
        '    \"Max\" : 5000,'+
        '    \"Remaining\" : 5000'+
        '  },'+
        '  \"HourlyDashboardStatuses\" : {'+
        '    \"Max\" : 999999999,'+
        '    \"Remaining\" : 999999999'+
        '  },'+
        '  \"HourlyLongTermIdMapping\" : {'+
        '    \"Max\" : 100000,'+
        '    \"Remaining\" : 100000'+
        '  },'+
        '  \"HourlyManagedContentPublicRequests\" : {'+
        '    \"Max\" : 50000,'+
        '    \"Remaining\" : 50000'+
        '  },'+
        '  \"HourlyODataCallout\" : {'+
        '    \"Max\" : 1000,'+
        '    \"Remaining\" : 1000'+
        '  },'+
        '  \"HourlyPublishedPlatformEvents\" : {'+
        '    \"Max\" : 50000,'+
        '    \"Remaining\" : 50000'+
        '  },'+
        '  \"HourlyPublishedStandardVolumePlatformEvents\" : {'+
        '    \"Max\" : 1000,'+
        '    \"Remaining\" : 1000'+
        '  },'+
        '  \"HourlyShortTermIdMapping\" : {'+
        '    \"Max\" : 100000,'+
        '    \"Remaining\" : 100000'+
        '  },'+
        '  \"HourlySyncReportRuns\" : {'+
        '    \"Max\" : 500,'+
        '    \"Remaining\" : 500'+
        '  },'+
        '  \"HourlyTimeBasedWorkflow\" : {'+
        '    \"Max\" : 1000,'+
        '    \"Remaining\" : 1000'+
        '  },'+
        '  \"MassEmail\" : {'+
        '    \"Max\" : 10,'+
        '    \"Remaining\" : 10'+
        '  },'+
        '  \"MonthlyEinsteinDiscoveryStoryCreation\" : {'+
        '    \"Max\" : 500,'+
        '    \"Remaining\" : 500'+
        '  },'+
        '  \"MonthlyPlatformEventsUsageEntitlement\" : {'+
        '    \"Max\" : 0,'+
        '    \"Remaining\" : 0'+
        '  },'+
        '  \"Package2VersionCreates\" : {'+
        '    \"Max\" : 6,'+
        '    \"Remaining\" : 6'+
        '  },'+
        '  \"Package2VersionCreatesWithoutValidation\" : {'+
        '    \"Max\" : 500,'+
        '    \"Remaining\" : 500'+
        '  },'+
        '  \"PermissionSets\" : {'+
        '    \"Max\" : 1500,'+
        '    \"Remaining\" : 1499,'+
        '    \"CreateCustom\" : {'+
        '      \"Max\" : 1000,'+
        '      \"Remaining\" : 999'+
        '    }'+
        '  },'+
        '  \"PrivateConnectOutboundCalloutHourlyLimitMB\" : {'+
        '    \"Max\" : 0,'+
        '    \"Remaining\" : 0'+
        '  },'+
        '  \"SingleEmail\" : {'+
        '    \"Max\" : 15,'+
        '    \"Remaining\" : 15'+
        '  },'+
        '  \"StreamingApiConcurrentClients\" : {'+
        '    \"Max\" : 20,'+
        '    \"Remaining\" : 20'+
        '  }'+
        '}';
        LimitAPIParser r = LimitAPIParser.parse(json);
        System.assert(r != null);

        json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
        LimitAPIParser.AnalyticsExternalDataSizeMB objAnalyticsExternalDataSizeMB = new LimitAPIParser.AnalyticsExternalDataSizeMB(System.JSON.createParser(json));
        System.assert(objAnalyticsExternalDataSizeMB != null);
        System.assert(objAnalyticsExternalDataSizeMB.Max == null);
        System.assert(objAnalyticsExternalDataSizeMB.Remaining == null);

        json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
        LimitAPIParser objJSON2Apex = new LimitAPIParser(System.JSON.createParser(json));
        System.assert(objJSON2Apex != null);
        System.assert(objJSON2Apex.AnalyticsExternalDataSizeMB == null);
        System.assert(objJSON2Apex.ConcurrentAsyncGetReportInstances == null);
        System.assert(objJSON2Apex.ConcurrentEinsteinDataInsightsStoryCreation == null);
        System.assert(objJSON2Apex.ConcurrentEinsteinDiscoveryStoryCreation == null);
        System.assert(objJSON2Apex.ConcurrentSyncReportRuns == null);
        System.assert(objJSON2Apex.DailyAnalyticsDataflowJobExecutions == null);
        System.assert(objJSON2Apex.DailyAnalyticsUploadedFilesSizeMB == null);
        System.assert(objJSON2Apex.DailyApiRequests == null);
        System.assert(objJSON2Apex.DailyAsyncApexExecutions == null);
        System.assert(objJSON2Apex.DailyBulkApiBatches == null);
        System.assert(objJSON2Apex.DailyBulkV2QueryFileStorageMB == null);
        System.assert(objJSON2Apex.DailyBulkV2QueryJobs == null);
        System.assert(objJSON2Apex.DailyDeliveredPlatformEvents == null);
        System.assert(objJSON2Apex.DailyDurableGenericStreamingApiEvents == null);
        System.assert(objJSON2Apex.DailyDurableStreamingApiEvents == null);
        System.assert(objJSON2Apex.DailyEinsteinDataInsightsStoryCreation == null);
        System.assert(objJSON2Apex.DailyEinsteinDiscoveryOptimizationJobRuns == null);
        System.assert(objJSON2Apex.DailyEinsteinDiscoveryPredictAPICalls == null);
        System.assert(objJSON2Apex.DailyEinsteinDiscoveryPredictionsByCDC == null);
        System.assert(objJSON2Apex.DailyEinsteinDiscoveryStoryCreation == null);
        System.assert(objJSON2Apex.DailyFunctionsApiCallLimit == null);
        System.assert(objJSON2Apex.DailyGenericStreamingApiEvents == null);
        System.assert(objJSON2Apex.DailyStandardVolumePlatformEvents == null);
        System.assert(objJSON2Apex.DailyStreamingApiEvents == null);
        System.assert(objJSON2Apex.DailyWorkflowEmails == null);
        System.assert(objJSON2Apex.DataStorageMB == null);
        System.assert(objJSON2Apex.DurableStreamingApiConcurrentClients == null);
        System.assert(objJSON2Apex.FileStorageMB == null);
        System.assert(objJSON2Apex.HourlyAsyncReportRuns == null);
        System.assert(objJSON2Apex.HourlyDashboardRefreshes == null);
        System.assert(objJSON2Apex.HourlyDashboardResults == null);
        System.assert(objJSON2Apex.HourlyDashboardStatuses == null);
        System.assert(objJSON2Apex.HourlyLongTermIdMapping == null);
        System.assert(objJSON2Apex.HourlyManagedContentPublicRequests == null);
        System.assert(objJSON2Apex.HourlyODataCallout == null);
        System.assert(objJSON2Apex.HourlyPublishedPlatformEvents == null);
        System.assert(objJSON2Apex.HourlyPublishedStandardVolumePlatformEvents == null);
        System.assert(objJSON2Apex.HourlyShortTermIdMapping == null);
        System.assert(objJSON2Apex.HourlySyncReportRuns == null);
        System.assert(objJSON2Apex.HourlyTimeBasedWorkflow == null);
        System.assert(objJSON2Apex.MassEmail == null);
        System.assert(objJSON2Apex.MonthlyEinsteinDiscoveryStoryCreation == null);
        System.assert(objJSON2Apex.MonthlyPlatformEventsUsageEntitlement == null);
        System.assert(objJSON2Apex.Package2VersionCreates == null);
        System.assert(objJSON2Apex.Package2VersionCreatesWithoutValidation == null);
        System.assert(objJSON2Apex.PermissionSets == null);
        System.assert(objJSON2Apex.PrivateConnectOutboundCalloutHourlyLimitMB == null);
        System.assert(objJSON2Apex.SingleEmail == null);
        System.assert(objJSON2Apex.StreamingApiConcurrentClients == null);

        json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
        LimitAPIParser.DailyBulkApiBatches objDailyBulkApiBatches = new LimitAPIParser.DailyBulkApiBatches(System.JSON.createParser(json));
        System.assert(objDailyBulkApiBatches != null);
        System.assert(objDailyBulkApiBatches.Max == null);
        System.assert(objDailyBulkApiBatches.Remaining == null);
        System.assert(objDailyBulkApiBatches.AntMigrationTool == null);
        System.assert(objDailyBulkApiBatches.DataloaderBulk == null);
        System.assert(objDailyBulkApiBatches.DataloaderPartner == null);
        System.assert(objDailyBulkApiBatches.Force_comIDE == null);
        System.assert(objDailyBulkApiBatches.SalesforceMobileDashboards == null);
        System.assert(objDailyBulkApiBatches.SalesforceTouch == null);
        System.assert(objDailyBulkApiBatches.SalesforceforOutlook == null);
        System.assert(objDailyBulkApiBatches.Workbench == null);

        json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
        LimitAPIParser.PermissionSets objPermissionSets = new LimitAPIParser.PermissionSets(System.JSON.createParser(json));
        System.assert(objPermissionSets != null);
        System.assert(objPermissionSets.Max == null);
        System.assert(objPermissionSets.Remaining == null);
        System.assert(objPermissionSets.CreateCustom == null);
    }
}