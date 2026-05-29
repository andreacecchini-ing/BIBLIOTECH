package it.unife.sample.backend.controller;

import it.unife.sample.backend.model.Libro;
import it.unife.sample.backend.repository.LibroRepository;
import it.unife.sample.backend.service.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/libri")
public class LibroController {

    @Autowired
    private LibroService service;
    @Autowired
    private LibroRepository repository;

    /*
    @GetMapping()
    public List<Libro> getAll() {
        return service.findAll();
    }
    */

    @GetMapping("/{isbn}")
    public ResponseEntity<Libro> getById(@PathVariable String isbn) {
        Optional<Libro> entity = service.findByIsbn(isbn);
        return entity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    /*@GetMapping()
    public Page<Libro> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return service.findPaginati(page, size);
    }
    */

    @GetMapping()
    public Page<Libro> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String genere,
            @RequestParam(defaultValue = "") String ordinaPer) {
        
        return service.findPaginatiFiltatiOrdinati(page, size, genere, ordinaPer);
    }

    @PostMapping
    public Libro create(@RequestBody Libro entity) {
        return service.save(entity);
    }

    @PutMapping("/{isbn}")
    public ResponseEntity<Libro> update(@PathVariable String isbn, @RequestBody Libro entity) {
        if (!service.findByIsbn(isbn).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        entity.setIsbn(isbn);
        return ResponseEntity.ok(service.save(entity));
    }

    @DeleteMapping("/{isbn}")
    public ResponseEntity<Void> delete(@PathVariable String isbn) {
        if (!service.findByIsbn(isbn).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        service.deleteByIsbn(isbn);
        return ResponseEntity.noContent().build();
    }
}   