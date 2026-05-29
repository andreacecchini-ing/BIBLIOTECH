package it.unife.sample.backend.model;

import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "copia")
public class Copia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_copia;

    @Column(name = "isbn", length = 13)
    private String isbn;
    @Column(name = "id_biblioteca")
    private String idBiblioteca;

    private String copie_presenti;

    private Boolean copie_disponibili;

    /*public boolean isDisponibile(String isbn, String id_biblioteca) {
        return copie_disponibili;
    }*/
}