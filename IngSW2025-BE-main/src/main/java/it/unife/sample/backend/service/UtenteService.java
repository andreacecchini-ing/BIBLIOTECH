package it.unife.sample.backend.service;

import it.unife.sample.backend.model.Utente;
import it.unife.sample.backend.repository.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UtenteService{

    @Autowired
    private UtenteRepository repository;

    public List<Utente> findAll() {
        return repository.findAll();
    }

    public Optional<Utente> findById(Long id) {
        return repository.findById(id);
    }

    public Utente save(Utente entity) {
        return repository.save(entity);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}