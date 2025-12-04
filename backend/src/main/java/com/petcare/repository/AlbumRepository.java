package com.petcare.repository;

import com.petcare.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
    List<Album> findByPetIdOrderByYearDescUploadDateDesc(Long petId);
    List<Album> findByPetIdAndYear(Long petId, Integer year);
}
