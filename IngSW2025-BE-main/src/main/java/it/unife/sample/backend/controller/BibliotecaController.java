package it.unife.sample.backend.controller;

import it.unife.sample.backend.model.Biblioteca;
import it.unife.sample.backend.service.BibliotecaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/biblioteche")
@CrossOrigin(origins = "http://localhost:4200")
public class BibliotecaController {
    @Autowired
    private BibliotecaService service;

    @GetMapping
    public List<Biblioteca> getAll() { return service.findAll(); }

    @PostMapping
    public Biblioteca create(@RequestBody Biblioteca b) { return service.save(b); }
}