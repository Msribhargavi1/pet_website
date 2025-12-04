package com.petcare.controller;

import com.petcare.model.Vaccination;
import com.petcare.repository.VaccinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vaccinations")
public class VaccinationController {

    @Autowired
    private VaccinationRepository vaccinationRepository;

    @GetMapping
    public List<Vaccination> getAllVaccinations() {
        return vaccinationRepository.findAll();
    }

    @GetMapping("/pet/{petId}")
    public List<Vaccination> getVaccinationsByPetId(@PathVariable Long petId) {
        return vaccinationRepository.findByPetIdOrderByNextDueDateAsc(petId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vaccination> getVaccinationById(@PathVariable Long id) {
        return vaccinationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Vaccination createVaccination(@RequestBody Vaccination vaccination) {
        return vaccinationRepository.save(vaccination);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vaccination> updateVaccination(@PathVariable Long id, @RequestBody Vaccination vaccination) {
        return vaccinationRepository.findById(id)
                .map(existing -> {
                    vaccination.setId(id);
                    return ResponseEntity.ok(vaccinationRepository.save(vaccination));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVaccination(@PathVariable Long id) {
        if (vaccinationRepository.existsById(id)) {
            vaccinationRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
