package com.petcare.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "album")
@Data
public class Album {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "pet_id", nullable = false)
    private Long petId;
    
    @Column(name = "image_path", nullable = false)
    private String imagePath;
    
    @Column(nullable = false)
    private Integer year;
    
    @Column(name = "upload_date")
    private LocalDate uploadDate;
    
    private String caption;
    
    private String location;
    
    @Column(name = "media_type")
    private String mediaType; // photo, video
    
    private String category;
}
