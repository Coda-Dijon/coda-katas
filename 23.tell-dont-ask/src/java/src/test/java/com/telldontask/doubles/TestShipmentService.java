package com.telldontask.doubles;

import com.telldontask.domain.Order;
import com.telldontask.service.ShipmentService;

public class TestShipmentService implements ShipmentService {
    private Order shippedOrder;

    @Override
    public void ship(Order order) {
        this.shippedOrder = order;
    }

    public Order getShippedOrder() {
        return shippedOrder;
    }
}
