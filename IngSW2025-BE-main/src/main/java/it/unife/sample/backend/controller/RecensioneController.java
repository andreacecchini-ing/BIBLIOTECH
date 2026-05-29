package it.unife.sample.backend.controller;

import it.unife.sample.backend.model.Recensione;
import it.unife.sample.backend.service.RecensioneService;
import it.unife.sample.backend.repository.RecensioneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/recensioni")
@CrossOrigin(origins = "http://localhost:4200")
public class RecensioneController {
    @Autowired
    private RecensioneService service;
    @Autowired
    private RecensioneRepository recensioneRepository;

    @GetMapping
    public List<Recensione> getAll() { return service.findAll(); }

    @PostMapping
    public Recensione create(@RequestBody Recensione b) { return service.save(b); }

    @GetMapping("/libro/{isbn}")
    public ResponseEntity<List<Recensione>> getRecensioniByIsbn(@PathVariable String isbn) {
        List<Recensione> recensioni = recensioneRepository.findByIsbn(isbn);
        return ResponseEntity.ok(recensioni);
    }

}