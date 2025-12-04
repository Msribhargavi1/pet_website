package com.petcare.controller;

import com.petcare.model.Medication;
import com.petcare.repository.MedicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medications")
public class MedicationController {

    @Autowired
    private MedicationRepository medicationRepository;

    @GetMapping
    public List<Medication> getAllMedications() {
        return medicationRepository.findAll();
    }

    @GetMapping("/pet/{petId}")
    public List<Medication> getMedicationsByPetId(@PathVariable Long petId) {
        return medicationRepository.findByPetId(petId);
    }

    @GetMapping("/pet/{petId}/active")
    public List<Medication> getActiveMedicationsByPetId(@PathVariable Long petId) {
        return medicationRepository.findByPetIdAndIsActiveTrue(petId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medication> getMedicationById(@PathVariable Long id) {
        return medicationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Medication createMedication(@RequestBody Medication medication) {
        return medicationRepository.save(medication);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Medication> updateMedication(@PathVariable Long id, @RequestBody Medication medication) {
        return medicationRepository.findById(id)
                .map(existing -> {
                    medication.setId(id);
                    return ResponseEntity.ok(medicationRepository.save(medication));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedication(@PathVariable Long id) {
        if (medicationRepository.existsById(id)) {
            medicationRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
