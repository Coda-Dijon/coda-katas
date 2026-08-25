package com.telldontask.domain;

import java.math.BigDecimal;

public class Product {
    private final String name;
    private final BigDecimal price;
    private final Category category;

    public Product(String name, BigDecimal price, Category category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Category getCategory() {
        return category;
    }
}
