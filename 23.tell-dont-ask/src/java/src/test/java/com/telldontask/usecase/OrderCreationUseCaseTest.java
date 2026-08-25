package com.telldontask.usecase;

import com.telldontask.doubles.InMemoryProductCatalog;
import com.telldontask.doubles.TestOrderRepository;
import com.telldontask.domain.Category;
import com.telldontask.domain.Order;
import com.telldontask.domain.OrderStatus;
import com.telldontask.domain.Product;
import com.telldontask.repository.ProductCatalog;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class OrderCreationUseCaseTest {
    private TestOrderRepository orderRepository;
    private ProductCatalog productCatalog;
    private OrderCreationUseCase useCase;

    @BeforeEach
    void setUp() {
        Category food = new Category("food", BigDecimal.TEN);

        productCatalog = new InMemoryProductCatalog(List.of(
                new Product("salad", new BigDecimal("3.56"), food),
                new Product("tomato", new BigDecimal("4.65"), food)
        ));

        orderRepository = new TestOrderRepository();
        useCase = new OrderCreationUseCase(orderRepository, productCatalog);
    }

    @Test
    void sellMultipleItems() {
        Map<String, Integer> items = new LinkedHashMap<>();
        items.put("salad", 2);
        items.put("tomato", 3);

        useCase.run("john doe", items);

        Order insertedOrder = orderRepository.getSavedOrder();
        assertThat(insertedOrder.getStatus()).isEqualTo(OrderStatus.CREATED);
        assertThat(insertedOrder.getTotal()).isEqualByComparingTo("23.20");
        assertThat(insertedOrder.getTax()).isEqualByComparingTo("2.13");
        assertThat(insertedOrder.getCurrency()).isEqualTo("EUR");
        assertThat(insertedOrder.getItems()).hasSize(2);

        assertThat(insertedOrder.getItems().get(0).getProduct().getName()).isEqualTo("salad");
        assertThat(insertedOrder.getItems().get(0).getProduct().getPrice()).isEqualByComparingTo("3.56");
        assertThat(insertedOrder.getItems().get(0).getQuantity()).isEqualTo(2);
        assertThat(insertedOrder.getItems().get(0).getTaxedAmount()).isEqualByComparingTo("7.84");
        assertThat(insertedOrder.getItems().get(0).getTax()).isEqualByComparingTo("0.72");

        assertThat(insertedOrder.getItems().get(1).getProduct().getName()).isEqualTo("tomato");
        assertThat(insertedOrder.getItems().get(1).getProduct().getPrice()).isEqualByComparingTo("4.65");
        assertThat(insertedOrder.getItems().get(1).getQuantity()).isEqualTo(3);
        assertThat(insertedOrder.getItems().get(1).getTaxedAmount()).isEqualByComparingTo("15.36");
        assertThat(insertedOrder.getItems().get(1).getTax()).isEqualByComparingTo("1.41");
    }

    @Test
    void unknownProduct() {
        Map<String, Integer> items = Map.of("unknown product", 0);

        assertThrows(UnknownProductException.class, () -> useCase.run("john doe", items));
    }
}
