package it.unife.sample.backend.service;

import it.unife.sample.backend.model.Biblioteca;
import it.unife.sample.backend.repository.BibliotecaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BibliotecaService {
    @Autowired
    private BibliotecaRepository repository;

    public List<Biblioteca> findAll() { return repository.findAll(); }
    public Biblioteca save(Biblioteca b) { return repository.save(b); }
}