package it.unife.sample.backend.controller;

import it.unife.sample.backend.model.Prenotazione;
import it.unife.sample.backend.service.PrenotazioneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/username:{isbn}")
@CrossOrigin(origins = "http://localhost:4200")
public class PrenotazioneController {
    @Autowired
    private PrenotazioneService service;

    @GetMapping
    public List<Prenotazione> getAll() { return service.findAll(); }

    @PostMapping
    public Prenotazione create(@RequestBody Prenotazione b) { return service.save(b); }
}