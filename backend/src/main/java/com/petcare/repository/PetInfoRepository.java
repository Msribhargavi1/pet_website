package com.petcare.repository;

import com.petcare.model.PetInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetInfoRepository extends JpaRepository<PetInfo, Long> {
}
