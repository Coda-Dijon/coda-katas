package pizzeria;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class PizzaOrderServiceTest {

    @Test
    void places_an_order_successfully() {
        PizzaOrderService orderService = new PizzaOrderService();

        Order order = orderService.placeOrder("luke", List.of(new Pizza("Margherita", 9.5)));

        assertThat(order.customerId()).isEqualTo("luke");
        assertThat(order.items()).containsExactly(new Pizza("Margherita", 9.5));
        assertThat(order.id()).isNotBlank();
    }

    // TODO (voir facilitation/01.constat.md) :
    // Comment testeriez-vous que le Logger a bien loggé un message ?
    // Que la NotificationSender a bien envoyé une notification au bon client ?
    // Que le PaymentGateway a bien été appelé avec le bon montant ?
    // -> Avec le code actuel, c'est impossible proprement : PizzaOrderService
    //    construit lui-même toutes ses dépendances, il n'y a aucun "seam"
    //    pour y substituer un test double.
}
