package com.petcare.controller;

import com.petcare.model.PetInfo;
import com.petcare.repository.PetInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
public class PetInfoController {

    @Autowired
    private PetInfoRepository petInfoRepository;

    @GetMapping
    public List<PetInfo> getAllPets() {
        return petInfoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetInfo> getPetById(@PathVariable Long id) {
        return petInfoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public PetInfo createPet(@RequestBody PetInfo petInfo) {
        return petInfoRepository.save(petInfo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetInfo> updatePet(@PathVariable Long id, @RequestBody PetInfo petInfo) {
        return petInfoRepository.findById(id)
                .map(existing -> {
                    petInfo.setId(id);
                    return ResponseEntity.ok(petInfoRepository.save(petInfo));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Long id) {
        if (petInfoRepository.existsById(id)) {
            petInfoRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
