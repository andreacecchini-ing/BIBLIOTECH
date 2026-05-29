package it.unife.sample.backend.model;

import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "biblioteca")
public class Biblioteca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id_biblioteca;

    private String nome;
    private String indirizzo;
    private String citta;
}