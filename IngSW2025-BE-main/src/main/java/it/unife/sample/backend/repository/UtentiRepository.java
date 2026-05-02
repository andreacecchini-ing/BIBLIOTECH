package it.unife.sample.backend.repository;

import it.unife.sample.backend.model.Utenti;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
import java.util.Optional;

@Repository
public interface UtentiRepository extends JpaRepository<Utenti, Long> {

    Optional<Utenti> findByEmail(String email);
}