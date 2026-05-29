package it.unife.sample.backend.model;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "prenotazione")
public class Prenotazione {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_prenotazione;

    private String username;

    private Integer id_copia;

    private LocalDate data_prenotazione;
    private LocalDate data_restituzione_prevista;
    private LocalDate data_restituzione_effettiva;

    private String stato;
}