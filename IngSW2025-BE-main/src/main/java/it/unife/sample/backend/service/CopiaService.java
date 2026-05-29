package it.unife.sample.backend.service;

import it.unife.sample.backend.model.Copia;
import it.unife.sample.backend.repository.CopiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CopiaService {
    @Autowired
    private CopiaRepository repository;

    public List<Copia> findAll() { return repository.findAll(); }
    public Copia save(Copia c) { return repository.save(c); }

    public boolean isDisponibile(String isbn, String id_biblioteca) {
        Copia copia = repository.findByIsbnAndIdBiblioteca(isbn, id_biblioteca);
        return (copia != null && copia.getCopie_disponibili());
    }
}