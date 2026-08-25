package com.telldontask.repository;

import com.telldontask.domain.Product;

public interface ProductCatalog {
    Product getByName(String name);
}
