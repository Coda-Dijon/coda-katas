package com.telldontask.domain;

import java.math.BigDecimal;
import java.util.List;

public class Order {
    private final int id;
    private OrderStatus status;
    private final String currency;
    private final List<OrderItem> items;
    private BigDecimal total;
    private BigDecimal tax;

    public Order(int id, OrderStatus status, String currency, List<OrderItem> items, BigDecimal total, BigDecimal tax) {
        this.id = id;
        this.status = status;
        this.currency = currency;
        this.items = items;
        this.total = total;
        this.tax = tax;
    }

    public Order(int id, OrderStatus status) {
        this(id, status, null, null, null, null);
    }

    public int getId() {
        return id;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public String getCurrency() {
        return currency;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public BigDecimal getTax() {
        return tax;
    }

    public void setTax(BigDecimal tax) {
        this.tax = tax;
    }
}
