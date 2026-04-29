package it.unife.sample.backend.controller;

import it.unife.sample.backend.model.Libri;
import it.unife.sample.backend.service.LibriService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/libri")
public class LibriController {

    @Autowired
    private LibriService service;

    @GetMapping
    public List<Libri> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Libri> getById(@PathVariable Long id) {
        Optional<Libri> entity = service.findById(id);
        return entity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Libri create(@RequestBody Libri entity) {
        return service.save(entity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Libri> update(@PathVariable Long id, @RequestBody Libri entity) {
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        return ResponseEntity.ok(service.save(entity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}   