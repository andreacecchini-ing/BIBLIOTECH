package it.unife.sample.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "libri") // Questo dice a Java di collegarsi alla tabella "libri" di MySQL
public class Libri {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // IDENTITY è perfetto per l'AUTO_INCREMENT di MySQL
    private Long id; 
    @Column(unique = true, nullable = false)
    private String titolo;
    @Column(unique = true, nullable = false)
    private String autore;
    @Column(unique = true, nullable = false)
    private String anno;
    @Column(unique = true, nullable = false)
    private String genere;
}