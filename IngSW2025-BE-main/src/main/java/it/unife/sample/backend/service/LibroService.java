package it.unife.sample.backend.service;

import it.unife.sample.backend.model.Libro;
import it.unife.sample.backend.repository.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class LibroService{

    @Autowired
    private LibroRepository repository;

    public List<Libro> findAll() {
        return repository.findAll();
    }

    public Optional<Libro> findByIsbn(String isbn) {
        return repository.findByIsbn(isbn);
    }

    public Libro save(Libro entity) {
        return repository.save(entity);
    }

    public void deleteByIsbn(String isbn) {
        repository.deleteByIsbn(isbn);
    }

    public Page<Libro> findPaginati(int pagina, int dimensione) {
        Pageable pageable = PageRequest.of(pagina, dimensione);
        return repository.findAll(pageable);
    }

    public Page<Libro> findPaginatiFiltatiOrdinati(int pagina, int dimensione, String genere, String ordinaPer) {
        Sort sort = Sort.unsorted();

        if ("titolo".equalsIgnoreCase(ordinaPer)) {
            sort = Sort.by("titolo").ascending();
        } else if ("autore".equalsIgnoreCase(ordinaPer)) {
            sort = Sort.by("autore").ascending();
        } else if ("anno".equalsIgnoreCase(ordinaPer)) {
            sort = Sort.by("anno").ascending(); 
        }
        Pageable pageable = PageRequest.of(pagina, dimensione, sort);
        return repository.findFiltratiOrdinati(genere, pageable);
    }
}