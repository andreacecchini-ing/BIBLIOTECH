package it.unife.sample.backend.service;

import it.unife.sample.backend.model.Libri;
import it.unife.sample.backend.repository.LibriRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class LibriService{

    @Autowired
    private LibriRepository repository;

    public List<Libri> findAll() {
        return repository.findAll();
    }

    public Optional<Libri> findById(Long id) {
        return repository.findById(id);
    }

    public Libri save(Libri entity) {
        return repository.save(entity);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}