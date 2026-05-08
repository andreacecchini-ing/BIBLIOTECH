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
@Table(name = "libri") 
public class Libri {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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