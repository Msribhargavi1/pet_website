package com.petcare.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "growth_tracking")
@Data
public class GrowthTracking {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "pet_id", nullable = false)
    private Long petId;
    
    @Column(name = "tracking_date", nullable = false)
    private LocalDate trackingDate;
    
    @Column(nullable = false)
    private Double weight;
    
    @Column(nullable = false)
    private Double height;
    
    @Column(name = "age_months")
    private Integer ageMonths;
    
    @Column(columnDefinition = "TEXT")
    private String notes;
}
