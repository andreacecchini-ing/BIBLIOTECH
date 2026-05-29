package it.unife.sample.backend.model;

import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "gestisce")
@IdClass(GestisceId.class)
public class Gestisce{
    @Id
    private String id_biblioteca;   
    @Id
    private String username;
}