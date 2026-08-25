package com.telldontask.doubles;

import com.telldontask.domain.Order;
import com.telldontask.repository.OrderRepository;

import java.util.ArrayList;
import java.util.List;

public class TestOrderRepository implements OrderRepository {
    private Order insertedOrder;
    private final List<Order> orders = new ArrayList<>();

    @Override
    public void save(Order order) {
        this.insertedOrder = order;
    }

    @Override
    public Order getById(int orderId) {
        return orders.stream()
                .filter(o -> o.getId() == orderId)
                .findFirst()
                .orElse(null);
    }

    public Order getSavedOrder() {
        return insertedOrder;
    }

    public void addOrder(Order order) {
        orders.add(order);
    }
}
