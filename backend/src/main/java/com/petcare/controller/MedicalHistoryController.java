package com.petcare.controller;

import com.petcare.model.MedicalHistory;
import com.petcare.repository.MedicalHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medical-history")
public class MedicalHistoryController {

    @Autowired
    private MedicalHistoryRepository medicalHistoryRepository;

    @GetMapping
    public List<MedicalHistory> getAllMedicalHistory() {
        return medicalHistoryRepository.findAll();
    }

    @GetMapping("/pet/{petId}")
    public List<MedicalHistory> getMedicalHistoryByPetId(@PathVariable Long petId) {
        return medicalHistoryRepository.findByPetIdOrderByYearDesc(petId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalHistory> getMedicalHistoryById(@PathVariable Long id) {
        return medicalHistoryRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public MedicalHistory createMedicalHistory(@RequestBody MedicalHistory medicalHistory) {
        return medicalHistoryRepository.save(medicalHistory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicalHistory> updateMedicalHistory(@PathVariable Long id, @RequestBody MedicalHistory medicalHistory) {
        return medicalHistoryRepository.findById(id)
                .map(existing -> {
                    medicalHistory.setId(id);
                    return ResponseEntity.ok(medicalHistoryRepository.save(medicalHistory));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicalHistory(@PathVariable Long id) {
        if (medicalHistoryRepository.existsById(id)) {
            medicalHistoryRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
