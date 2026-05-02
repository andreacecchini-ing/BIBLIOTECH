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
@Table(name = "utenti") // Questo dice a Java di collegarsi alla tabella "utenti" di MySQL
public class Utenti {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // IDENTITY è perfetto per l'AUTO_INCREMENT di MySQL
    private Long id; 

    @Column(unique = true, nullable = false) // Assicura che lo username sia unico e non nullo
    private String username;
    private String nome;
    private String cognome;
    @Column(unique = true, nullable = false) // Assicura che l'email sia unica e non nulla
    private String email;
    @Column(unique = true)
    private String cellulare;
    @Column(unique = true)
    private String indirizzo;
    private String data_nascita;
    private String password;

    
    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }    
}