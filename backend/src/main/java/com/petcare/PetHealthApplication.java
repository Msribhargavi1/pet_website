package com.petcare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PetHealthApplication {

    public static void main(String[] args) {
        SpringApplication.run(PetHealthApplication.class, args);
        System.out.println("🐾 Pet Health Management Backend is running on http://localhost:8080");
        System.out.println("📊 API Documentation: http://localhost:8080/api");
        System.out.println("✅ Ready to accept requests!");
    }
}
