package it.unife.sample.backend.controller;

import it.unife.sample.backend.model.Copia;
import it.unife.sample.backend.service.CopiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/copie")
@CrossOrigin(origins = "http://localhost:4200")
public class CopiaController {
    @Autowired
    private CopiaService service;

    @GetMapping
    public List<Copia> getAll() { return service.findAll(); }

    @PostMapping
    public Copia create(@RequestBody Copia b) { return service.save(b); }
    
    @GetMapping("/disponibile/{isbn}&&{id_biblioteca}")
    public boolean isDisponibile(@PathVariable String isbn, @PathVariable String id_biblioteca) {
        return service.isDisponibile(isbn, id_biblioteca);
    }
}