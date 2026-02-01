package com.ecommerce.demo.order.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ecommerce.demo.order.entity.Orders;
import com.ecommerce.demo.order.repository.OrderRepository;

@Service
public class OrderService {

    private final OrderRepository repo;

    public OrderService(OrderRepository repo) {
        this.repo = repo;
    }

    public Orders create(Orders order) {
        return repo.save(order);
    }

    public List<Orders> getAll() {
        return repo.findAll();
    }
}
