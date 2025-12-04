package com.petcare.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "diet_plan")
@Data
public class DietPlan {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "pet_id", nullable = false)
    private Long petId;
    
    @Column(name = "day_number", nullable = false)
    private Integer dayNumber;
    
    @Column(name = "meal_type", nullable = false)
    private String mealType; // breakfast, lunch, dinner
    
    @Column(columnDefinition = "TEXT", nullable = false)
    private String items;
    
    @Column(columnDefinition = "TEXT")
    private String addOns;
}
