package com.petcare.repository;

import com.petcare.model.Medication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MedicationRepository extends JpaRepository<Medication, Long> {
    List<Medication> findByPetIdAndIsActiveTrue(Long petId);
    List<Medication> findByPetId(Long petId);
}
