package com.telldontask.usecase;

import com.telldontask.domain.Order;
import com.telldontask.domain.OrderStatus;
import com.telldontask.repository.OrderRepository;
import com.telldontask.service.ShipmentService;

public class OrderShipmentUseCase {
    private final OrderRepository orderRepository;
    private final ShipmentService shipmentService;

    public OrderShipmentUseCase(OrderRepository orderRepository, ShipmentService shipmentService) {
        this.orderRepository = orderRepository;
        this.shipmentService = shipmentService;
    }

    public void run(OrderShipmentRequest request) {
        Order order = orderRepository.getById(request.getOrderId());

        if (order.getStatus() == OrderStatus.CREATED || order.getStatus() == OrderStatus.REJECTED) {
            throw new OrderCannotBeShippedException();
        }

        if (order.getStatus() == OrderStatus.SHIPPED) {
            throw new OrderCannotBeShippedTwiceException();
        }

        shipmentService.ship(order);

        order.setStatus(OrderStatus.SHIPPED);
        orderRepository.save(order);
    }
}
