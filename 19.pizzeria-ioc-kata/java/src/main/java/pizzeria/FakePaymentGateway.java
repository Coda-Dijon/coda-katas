package pizzeria;

public class FakePaymentGateway implements PaymentGateway {
    @Override
    public boolean charge(String customerId, double amount) {
        simulateNetworkLatency();
        return true;
    }

    private void simulateNetworkLatency() {
        try {
            Thread.sleep(20);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
