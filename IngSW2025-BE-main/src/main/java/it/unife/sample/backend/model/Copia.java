package it.unife.sample.backend.model;

import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "copia")
@IdClass(CopiaId.class)
public class Copia {

    @Id
    private String isbn;
    @Id
    @Column(name = "id_biblioteca")
    private String idBiblioteca;

    @Column(name = "num_copie_presenti")
    private String copiePresenti;

    @Column(name = "num_copie_disponibili")
    private Boolean copieDisponibili;

    /*public boolean isDisponibile(String isbn, String id_biblioteca) {
        return copie_disponibili;
    }*/
}