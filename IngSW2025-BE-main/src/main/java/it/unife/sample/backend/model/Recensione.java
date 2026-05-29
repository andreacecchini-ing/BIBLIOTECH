package it.unife.sample.backend.model;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "recensione")
public class Recensione {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_recensione;

    private String username;

    @Column(name = "ISBN", length = 13)
    private Long isbn;

    private Integer voto;

    @Column(columnDefinition = "TEXT")
    private String commento;

    private LocalDate data_recensione;
}