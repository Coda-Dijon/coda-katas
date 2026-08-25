package com.telldontask.usecase;

import com.telldontask.doubles.TestOrderRepository;
import com.telldontask.doubles.TestShipmentService;
import com.telldontask.domain.Order;
import com.telldontask.domain.OrderStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class OrderShipmentUseCaseTest {
    private TestOrderRepository orderRepository;
    private TestShipmentService shipmentService;
    private OrderShipmentUseCase useCase;

    @BeforeEach
    void setUp() {
        orderRepository = new TestOrderRepository();
        shipmentService = new TestShipmentService();
        useCase = new OrderShipmentUseCase(orderRepository, shipmentService);
    }

    @Test
    void shipApprovedOrder() {
        Order initialOrder = new Order(1, OrderStatus.APPROVED);
        orderRepository.addOrder(initialOrder);

        useCase.run(new OrderShipmentRequest(1));

        assertThat(orderRepository.getSavedOrder().getStatus()).isEqualTo(OrderStatus.SHIPPED);
        assertThat(shipmentService.getShippedOrder()).isSameAs(initialOrder);
    }

    @Test
    void createdOrdersCannotBeShipped() {
        orderRepository.addOrder(new Order(1, OrderStatus.CREATED));

        assertThrows(OrderCannotBeShippedException.class, () -> useCase.run(new OrderShipmentRequest(1)));
        assertThat(orderRepository.getSavedOrder()).isNull();
        assertThat(shipmentService.getShippedOrder()).isNull();
    }

    @Test
    void rejectedOrdersCannotBeShipped() {
        orderRepository.addOrder(new Order(1, OrderStatus.REJECTED));

        assertThrows(OrderCannotBeShippedException.class, () -> useCase.run(new OrderShipmentRequest(1)));
        assertThat(orderRepository.getSavedOrder()).isNull();
        assertThat(shipmentService.getShippedOrder()).isNull();
    }

    @Test
    void shippedOrdersCannotBeShippedAgain() {
        orderRepository.addOrder(new Order(1, OrderStatus.SHIPPED));

        assertThrows(OrderCannotBeShippedTwiceException.class, () -> useCase.run(new OrderShipmentRequest(1)));
        assertThat(orderRepository.getSavedOrder()).isNull();
        assertThat(shipmentService.getShippedOrder()).isNull();
    }
}
