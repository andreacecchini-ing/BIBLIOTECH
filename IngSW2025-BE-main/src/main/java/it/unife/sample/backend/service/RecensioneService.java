package it.unife.sample.backend.service;

import it.unife.sample.backend.model.Recensione;
import it.unife.sample.backend.repository.RecensioneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RecensioneService {
    @Autowired
    private RecensioneRepository repository;

    public List<Recensione> findAll() { return repository.findAll(); }
    public Recensione save(Recensione r) { return repository.save(r); }
    
}