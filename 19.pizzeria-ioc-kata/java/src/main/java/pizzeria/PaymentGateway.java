package pizzeria;

public interface PaymentGateway {
    boolean charge(String customerId, double amount);
}
