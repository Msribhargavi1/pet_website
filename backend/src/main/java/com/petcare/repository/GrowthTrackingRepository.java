package com.petcare.repository;

import com.petcare.model.GrowthTracking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GrowthTrackingRepository extends JpaRepository<GrowthTracking, Long> {
    List<GrowthTracking> findByPetIdOrderByTrackingDateAsc(Long petId);
}
