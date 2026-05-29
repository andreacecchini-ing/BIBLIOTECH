package it.unife.sample.backend.model;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "recensione")
@IdClass(RecensioneId.class)
public class Recensione {

    @Id
    private String isbn;
    @Id
    private String username;

    private Integer voto;

    @Column(columnDefinition = "TEXT")
    private String commento;
    
    @Column(name = "data_recensione")
    private LocalDate dataRecensione;
}