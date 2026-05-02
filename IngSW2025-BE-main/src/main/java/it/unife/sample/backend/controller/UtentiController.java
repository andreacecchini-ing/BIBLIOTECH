package it.unife.sample.backend.controller;

import it.unife.sample.backend.model.Utenti;
import it.unife.sample.backend.service.UtentiService;
import it.unife.sample.backend.repository.UtentiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/utenti")
public class UtentiController {

    @Autowired
    private UtentiService service;
    @Autowired
    private UtentiRepository repository;

    @GetMapping
    public List<Utenti> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Utenti> getById(@PathVariable Long id) {
        Optional<Utenti> entity = service.findById(id);
        return entity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Utenti loginData) {
    // Cerca l'utente per email nel database
        return repository.findByEmail(loginData.getEmail())
        .filter(u -> u.getPassword().equals(loginData.getPassword()))
        .map(u -> ResponseEntity.ok(u))
        .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }
    /* @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody java.util.Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        return repository.findByEmail(email)
                .filter(u -> u.getPassword().equals(password))
                .map(u -> ResponseEntity.ok(u))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }
    */

    @PostMapping
    public Utenti create(@RequestBody Utenti entity) {
        return service.save(entity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Utenti> update(@PathVariable Long id, @RequestBody Utenti entity) {
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