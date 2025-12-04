package com.petcare.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "vaccinations")
@Data
public class Vaccination {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "pet_id", nullable = false)
    private Long petId;
    
    @Column(nullable = false)
    private String name;
    
    @Column(name = "vaccination_date")
    private LocalDate vaccinationDate;
    
    @Column(name = "next_due_date")
    private LocalDate nextDueDate;
    
    @Column(name = "reminder_method")
    private String reminderMethod;
    
    private String veterinarian;
    
    private String hospital;
    
    @Column(columnDefinition = "TEXT")
    private String notes;
}
