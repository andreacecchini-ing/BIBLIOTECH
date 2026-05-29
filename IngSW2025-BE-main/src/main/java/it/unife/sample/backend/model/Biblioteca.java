package it.unife.sample.backend.model;

import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "biblioteca")
public class Biblioteca {

    @Id
    @Column(name = "id_biblioteca", unique = true, nullable = false)
    private String idBiblioteca;

    @Column(unique = true, nullable = false)
    private String nome;

    private String indirizzo;
    
    private String citta;
}