package com.telldontask.usecase;

import com.telldontask.doubles.TestOrderRepository;
import com.telldontask.domain.Order;
import com.telldontask.domain.OrderStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class OrderApprovalUseCaseTest {
    private TestOrderRepository orderRepository;
    private OrderApprovalUseCase useCase;

    @BeforeEach
    void setUp() {
        orderRepository = new TestOrderRepository();
        useCase = new OrderApprovalUseCase(orderRepository);
    }

    @Test
    void approvedExistingOrder() {
        orderRepository.addOrder(new Order(1, OrderStatus.CREATED));

        useCase.run(new OrderApprovalRequest(1, true));

        assertThat(orderRepository.getSavedOrder().getStatus()).isEqualTo(OrderStatus.APPROVED);
    }

    @Test
    void rejectedExistingOrder() {
        orderRepository.addOrder(new Order(1, OrderStatus.CREATED));

        useCase.run(new OrderApprovalRequest(1, false));

        assertThat(orderRepository.getSavedOrder().getStatus()).isEqualTo(OrderStatus.REJECTED);
    }

    @Test
    void cannotApproveRejectedOrder() {
        orderRepository.addOrder(new Order(1, OrderStatus.REJECTED));

        assertThrows(RejectedOrderCannotBeApprovedException.class,
                () -> useCase.run(new OrderApprovalRequest(1, true)));
        assertThat(orderRepository.getSavedOrder()).isNull();
    }

    @Test
    void cannotRejectApprovedOrder() {
        orderRepository.addOrder(new Order(1, OrderStatus.APPROVED));

        assertThrows(ApprovedOrderCannotBeRejectedException.class,
                () -> useCase.run(new OrderApprovalRequest(1, false)));
        assertThat(orderRepository.getSavedOrder()).isNull();
    }

    @Test
    void shippedOrdersCannotBeRejected() {
        orderRepository.addOrder(new Order(1, OrderStatus.SHIPPED));

        assertThrows(ShippedOrdersCannotBeChangedException.class,
                () -> useCase.run(new OrderApprovalRequest(1, false)));
        assertThat(orderRepository.getSavedOrder()).isNull();
    }
}
