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
@Table(name = "utente") 
public class Utente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id; 

    private String nome;
    private String cognome;
    @Column(unique = true, nullable = false)
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(unique = true)
    private String cellulare;
    @Column(unique = true)
    private String indirizzo;
    private String data_nascita;
    private String password;
    private String ruolo;

    
    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }    
}