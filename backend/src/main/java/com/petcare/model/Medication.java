package com.petcare.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "medications")
@Data
public class Medication {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "pet_id", nullable = false)
    private Long petId;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String dosage;
    
    @Column(name = "quantity_remaining")
    private Integer quantityRemaining;
    
    @Column(name = "refill_date")
    private LocalDate refillDate;
    
    @Column(name = "medication_type")
    private String medicationType;
    
    private String purpose;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @Column(columnDefinition = "TEXT")
    private String notes;
}
