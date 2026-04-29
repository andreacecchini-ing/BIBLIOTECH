package it.unife.sample.backend.service;

import it.unife.sample.backend.model.Utenti;
import it.unife.sample.backend.repository.UtentiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UtentiService{

    @Autowired
    private UtentiRepository repository;

    public List<Utenti> findAll() {
        return repository.findAll();
    }

    public Optional<Utenti> findById(Long id) {
        return repository.findById(id);
    }

    public Utenti save(Utenti entity) {
        return repository.save(entity);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}