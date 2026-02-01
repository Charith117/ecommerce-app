package com.ecommerce.demo.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.demo.order.entity.Orders;


public interface OrderRepository extends JpaRepository<Orders, Long> {
}
