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
    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;


    private String password;

    private String nome;

    private String cognome;

    @Column(unique = true)
    private String indirizzo;

    @Column(name="telefono" )
    private String cellulare;

    @Column(name = "data_nascita")
    private String dataNascita;
    
    private String ruolo;

    @Column(name = "codice_biblioteca")
    private String codiceBiblioteca;

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }    
}