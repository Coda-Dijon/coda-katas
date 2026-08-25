package com.telldontask.usecase;

import com.telldontask.domain.Order;
import com.telldontask.domain.OrderStatus;
import com.telldontask.repository.OrderRepository;

public class OrderApprovalUseCase {
    private final OrderRepository orderRepository;

    public OrderApprovalUseCase(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public void run(OrderApprovalRequest request) {
        Order order = orderRepository.getById(request.getOrderId());

        if (order.getStatus() == OrderStatus.SHIPPED) {
            throw new ShippedOrdersCannotBeChangedException();
        }

        if (request.isApproved() && order.getStatus() == OrderStatus.REJECTED) {
            throw new RejectedOrderCannotBeApprovedException();
        }

        if (!request.isApproved() && order.getStatus() == OrderStatus.APPROVED) {
            throw new ApprovedOrderCannotBeRejectedException();
        }

        order.setStatus(request.isApproved() ? OrderStatus.APPROVED : OrderStatus.REJECTED);
        orderRepository.save(order);
    }
}
