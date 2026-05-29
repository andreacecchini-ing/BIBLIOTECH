package it.unife.sample.backend.controller;

import it.unife.sample.backend.model.Utente;
import it.unife.sample.backend.service.UtenteService;
import it.unife.sample.backend.repository.UtenteRepository;
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
public class UtenteController {

    @Autowired
    private UtenteService service;
    @Autowired
    private UtenteRepository repository;

    @GetMapping
    public List<Utente> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Utente> getById(@PathVariable Long id) {
        Optional<Utente> entity = service.findById(id);
        return entity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Utente loginData) {
        return repository.findByEmail(loginData.getEmail())
        .filter(u -> u.getPassword().equals(loginData.getPassword()))
        .map(u -> ResponseEntity.ok(u))
        .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    /*@PostMapping
    public Utente create(@RequestBody Utente entity) {
        return service.save(entity);
    }*/

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Utente entity) {
        if (entity.getEmail() != null && repository.findByEmail(entity.getEmail()).isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT) // 409 Conflict
                    .body("Errore: un utente con questa email esiste già.");
        }

        try {
            Utente savedUtente = service.save(entity);
            return new ResponseEntity<>(savedUtente, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Errore durante il salvataggio: i dati forniti violano un vincolo (es. email duplicata).");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Utente> update(@PathVariable Long id, @RequestBody Utente entity) {
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