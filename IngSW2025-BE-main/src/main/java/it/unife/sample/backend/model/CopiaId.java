package it.unife.sample.backend.model;

import lombok.Data;
import java.io.Serializable;

@Data
public class CopiaId implements Serializable {
    private String isbn;
    private String idBiblioteca;
}