package it.unife.sample.backend.repository;

import it.unife.sample.backend.model.Libro;
import it.unife.sample.backend.model.Utente;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

@Repository
public interface LibroRepository extends JpaRepository<Libro, Long> {

    @Query("SELECT l FROM Libro l WHERE :genere = '' OR l.genere = :genere")
    Page<Libro> findFiltratiOrdinati(@Param("genere") String genere, Pageable pageable);
    /*
    @Query("SELECT DISTINCT l FROM Libro l " +
       "JOIN Copia c ON l.isbn = c.isbn " +
       "WHERE (:idBiblio IS NULL OR c.idBiblio = :idBiblio) " +
       "AND c.numCopieDisponibili > 0")
    Page<Libro> findLibriDisponibili(@Param("idBiblio") Long idBiblio, Pageable pageable);
    */


}