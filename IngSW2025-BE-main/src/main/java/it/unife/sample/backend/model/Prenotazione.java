package it.unife.sample.backend.model;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "prenotazione")
@IdClass(PrenotazioneId.class)
public class Prenotazione {

    @Id
    private String isbn;
    @Id
    @Column(name = "id_biblioteca")
    private String idBiblioteca;
    @Id
    private String username;

    @Column(name = "data_prenotazione")
    private LocalDate dataPrenotazione;

    @Column(name = "data_restituzione_prevista")
    private LocalDate dataRestituzionePrevista;

    @Column(name = "data_restituzione_effettiva")
    private LocalDate dataRestituzioneEffettiva;
}