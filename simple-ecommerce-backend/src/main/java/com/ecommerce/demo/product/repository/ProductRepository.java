package com.ecommerce.demo.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.demo.product.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
