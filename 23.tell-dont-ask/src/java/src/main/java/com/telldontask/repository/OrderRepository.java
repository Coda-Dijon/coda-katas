package com.telldontask.repository;

import com.telldontask.domain.Order;

public interface OrderRepository {
    void save(Order order);

    Order getById(int orderId);
}
