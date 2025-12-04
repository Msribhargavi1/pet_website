package com.petcare.repository;

import com.petcare.model.Vaccination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VaccinationRepository extends JpaRepository<Vaccination, Long> {
    List<Vaccination> findByPetIdOrderByNextDueDateAsc(Long petId);
}
