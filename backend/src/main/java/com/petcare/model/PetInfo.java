package com.petcare.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "pet_info")
@Data
public class PetInfo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String breed;
    
    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;
    
    private String gender;
    
    private String color;
    
    @Column(name = "microchip_id")
    private String microchipId;
    
    @Column(name = "image_path")
    private String imagePath;
    
    @Column(columnDefinition = "TEXT")
    private String notes;
}
