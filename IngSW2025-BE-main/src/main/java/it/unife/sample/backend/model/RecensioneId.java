package it.unife.sample.backend.model;

import lombok.Data;
import java.io.Serializable;

@Data
public class RecensioneId implements Serializable {
    private String isbn;
    private String username;
}