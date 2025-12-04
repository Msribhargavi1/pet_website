package com.petcare.controller;

import com.petcare.model.DietPlan;
import com.petcare.repository.DietPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diet-plan")
public class DietPlanController {

    @Autowired
    private DietPlanRepository dietPlanRepository;

    @GetMapping
    public List<DietPlan> getAllDietPlans() {
        return dietPlanRepository.findAll();
    }

    @GetMapping("/pet/{petId}")
    public List<DietPlan> getDietPlanByPetId(@PathVariable Long petId) {
        return dietPlanRepository.findByPetIdOrderByDayNumberAscMealTypeAsc(petId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DietPlan> getDietPlanById(@PathVariable Long id) {
        return dietPlanRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public DietPlan createDietPlan(@RequestBody DietPlan dietPlan) {
        return dietPlanRepository.save(dietPlan);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DietPlan> updateDietPlan(@PathVariable Long id, @RequestBody DietPlan dietPlan) {
        return dietPlanRepository.findById(id)
                .map(existing -> {
                    dietPlan.setId(id);
                    return ResponseEntity.ok(dietPlanRepository.save(dietPlan));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDietPlan(@PathVariable Long id) {
        if (dietPlanRepository.existsById(id)) {
            dietPlanRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
