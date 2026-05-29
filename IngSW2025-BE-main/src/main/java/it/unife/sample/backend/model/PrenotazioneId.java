package it.unife.sample.backend.model;

import lombok.Data;
import java.io.Serializable;

@Data
public class PrenotazioneId implements Serializable {
    private String isbn;
    private String idBiblioteca;
    private String username;
}