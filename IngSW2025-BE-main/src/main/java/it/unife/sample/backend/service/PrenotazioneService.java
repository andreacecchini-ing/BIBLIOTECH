package it.unife.sample.backend.service;

import it.unife.sample.backend.model.Prenotazione;
import it.unife.sample.backend.repository.PrenotazioneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PrenotazioneService {
    @Autowired
    private PrenotazioneRepository repository;

    public List<Prenotazione> findAll() { return repository.findAll(); }
    public Prenotazione save(Prenotazione p) { return repository.save(p); }
}