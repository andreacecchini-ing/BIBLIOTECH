package it.unife.sample.backend.repository;

import it.unife.sample.backend.model.Recensione;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecensioneRepository extends JpaRepository<Recensione, Integer> {
    List<Recensione> findByIsbn(String isbn);
    @Query(value = "SELECT COALESCE(ROUND(AVG(voto)), 0) AS mediaValutazione, " +
                   "FROM recensioni WHERE libro_id = :libroId", 
           nativeQuery = true)
    Integer getValutazioneMediaLibro(@Param("libroId") String libroId);
}