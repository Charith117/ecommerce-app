package com.ecommerce.demo.product.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ecommerce.demo.product.entity.Product;
import com.ecommerce.demo.product.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<Product> getAll() {
        return repo.findAll();
    }

    public Product create(Product p) {
        return repo.save(p);
    }
    public Product getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id " + id));
    }

    public Product update(Long id, Product p) {
        Product existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existing.setName(p.getName());
        existing.setPrice(p.getPrice());
        existing.setQuantity(p.getQuantity());
        // Added fields
        existing.setDescription(p.getDescription());
        existing.setImageUrl(p.getImageUrl());
        
        return repo.save(existing);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

}
