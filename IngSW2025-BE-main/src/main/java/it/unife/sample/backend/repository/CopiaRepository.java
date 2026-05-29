package it.unife.sample.backend.repository;

import it.unife.sample.backend.model.Copia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CopiaRepository extends JpaRepository<Copia, Integer> {
    Copia findByIsbnAndIdBiblioteca(String isbn, String idBiblioteca);
}