package com.telldontask.doubles;

import com.telldontask.domain.Product;
import com.telldontask.repository.ProductCatalog;

import java.util.List;

public class InMemoryProductCatalog implements ProductCatalog {
    private final List<Product> products;

    public InMemoryProductCatalog(List<Product> products) {
        this.products = products;
    }

    @Override
    public Product getByName(String name) {
        return products.stream()
                .filter(p -> p.getName().equals(name))
                .findFirst()
                .orElse(null);
    }
}
