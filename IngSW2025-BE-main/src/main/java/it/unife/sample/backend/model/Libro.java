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
@Table(name = "libro") 
public class Libro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long isbn;
    @Column(unique = true, nullable = false)
    private String titolo;
    @Column(unique = true, nullable = false)
    private String autore;
    @Column(unique = true, nullable = false)
    private String anno;
    @Column(unique = true, nullable = false)
    private String genere;
    @Column(unique = true, nullable = false, columnDefinition = "TEXT")
    private String trama;
    
}