package it.unife.sample.backend.service;

import it.unife.sample.backend.model.Gestisce;
import it.unife.sample.backend.repository.GestisceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class GestisceService {
    @Autowired
    private GestisceRepository repository;

    public List<Gestisce> findAll() { return repository.findAll(); }
    public Gestisce save(Gestisce g) { return repository.save(g); }
}