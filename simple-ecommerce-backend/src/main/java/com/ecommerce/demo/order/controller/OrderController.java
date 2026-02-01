package com.ecommerce.demo.order.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.demo.order.entity.Orders;
import com.ecommerce.demo.order.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")

public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    // Create order
    @PostMapping
    public Orders create(@RequestBody Orders order) {
        return service.create(order);
    }

    // Get all orders
    @GetMapping
    public List<Orders> getAll() {
        return service.getAll();
    }
}
