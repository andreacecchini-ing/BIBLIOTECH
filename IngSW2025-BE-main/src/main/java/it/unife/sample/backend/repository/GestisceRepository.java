package it.unife.sample.backend.repository;

import it.unife.sample.backend.model.Gestisce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GestisceRepository extends JpaRepository<Gestisce, Integer> {
}