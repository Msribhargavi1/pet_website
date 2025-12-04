package com.petcare.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "medical_history")
@Data
public class MedicalHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "pet_id", nullable = false)
    private Long petId;
    
    @Column(nullable = false)
    private Integer year;
    
    @Column(nullable = false)
    private String condition;
    
    @Column(columnDefinition = "TEXT")
    private String treatment;
    
    @Column(name = "visit_date")
    private LocalDate visitDate;
    
    private String hospital;
    
    private String veterinarian;
    
    @Column(columnDefinition = "TEXT")
    private String notes;
}
