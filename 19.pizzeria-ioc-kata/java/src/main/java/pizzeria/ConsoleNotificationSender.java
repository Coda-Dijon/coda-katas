package pizzeria;

public class ConsoleNotificationSender implements NotificationSender {
    @Override
    public void send(String customerId, String message) {
        System.out.println("[NOTIFY -> " + customerId + "] " + message);
    }
}
