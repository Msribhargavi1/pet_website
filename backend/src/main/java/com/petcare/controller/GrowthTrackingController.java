package com.petcare.controller;

import com.petcare.model.GrowthTracking;
import com.petcare.repository.GrowthTrackingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/growth-tracking")
public class GrowthTrackingController {

    @Autowired
    private GrowthTrackingRepository growthTrackingRepository;

    @GetMapping
    public List<GrowthTracking> getAllGrowthTracking() {
        return growthTrackingRepository.findAll();
    }

    @GetMapping("/pet/{petId}")
    public List<GrowthTracking> getGrowthTrackingByPetId(@PathVariable Long petId) {
        return growthTrackingRepository.findByPetIdOrderByTrackingDateAsc(petId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GrowthTracking> getGrowthTrackingById(@PathVariable Long id) {
        return growthTrackingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public GrowthTracking createGrowthTracking(@RequestBody GrowthTracking growthTracking) {
        return growthTrackingRepository.save(growthTracking);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GrowthTracking> updateGrowthTracking(@PathVariable Long id, @RequestBody GrowthTracking growthTracking) {
        return growthTrackingRepository.findById(id)
                .map(existing -> {
                    growthTracking.setId(id);
                    return ResponseEntity.ok(growthTrackingRepository.save(growthTracking));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrowthTracking(@PathVariable Long id) {
        if (growthTrackingRepository.existsById(id)) {
            growthTrackingRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
