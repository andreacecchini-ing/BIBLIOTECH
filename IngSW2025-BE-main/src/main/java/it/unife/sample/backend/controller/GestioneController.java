package it.unife.sample.backend.controller;

import it.unife.sample.backend.model.Gestisce;
import it.unife.sample.backend.service.GestisceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/gestioni")
@CrossOrigin(origins = "http://localhost:4200")
public class GestioneController {
    @Autowired
    private GestisceService service;

    @GetMapping
    public List<Gestisce> getAll() { return service.findAll(); }

    @PostMapping
    public Gestisce create(@RequestBody Gestisce g) { return service.save(g); }
}