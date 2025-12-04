package com.petcare.controller;

import com.petcare.model.Album;
import com.petcare.repository.AlbumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/album")
public class AlbumController {

    @Autowired
    private AlbumRepository albumRepository;

    @GetMapping
    public List<Album> getAllAlbums() {
        return albumRepository.findAll();
    }

    @GetMapping("/pet/{petId}")
    public List<Album> getAlbumByPetId(@PathVariable Long petId) {
        return albumRepository.findByPetIdOrderByYearDescUploadDateDesc(petId);
    }

    @GetMapping("/pet/{petId}/year/{year}")
    public List<Album> getAlbumByPetIdAndYear(@PathVariable Long petId, @PathVariable Integer year) {
        return albumRepository.findByPetIdAndYear(petId, year);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Album> getAlbumById(@PathVariable Long id) {
        return albumRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Album createAlbum(@RequestBody Album album) {
        return albumRepository.save(album);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Album> updateAlbum(@PathVariable Long id, @RequestBody Album album) {
        return albumRepository.findById(id)
                .map(existing -> {
                    album.setId(id);
                    return ResponseEntity.ok(albumRepository.save(album));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlbum(@PathVariable Long id) {
        if (albumRepository.existsById(id)) {
            albumRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
