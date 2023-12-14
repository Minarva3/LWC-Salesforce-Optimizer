global class LimitsDailySyncSchedulableApex implements Schedulable {
    
    global void execute(SchedulableContext sc) {
        System.enqueueJob(new LimitsDailySyncQueueable());
    }

}