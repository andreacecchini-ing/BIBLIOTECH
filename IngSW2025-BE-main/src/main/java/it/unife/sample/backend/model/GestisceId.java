package it.unife.sample.backend.model;

import lombok.Data;
import java.io.Serializable;

@Data
public class GestisceId implements Serializable {
    private String id_biblioteca;
    private String username;
}