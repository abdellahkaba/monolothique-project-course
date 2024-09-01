package com.isi.book.book;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record BookRequest(
        Integer id,
        @NotNull(message = "champ requis")
        @NotEmpty(message = "champ requis")
        String title,
        @NotNull(message = "champ requis")
        @NotEmpty(message = "champ requis")
        String authorName,
        @NotNull(message = "champ requis")
        @NotEmpty(message = "champ requis")
        String isbn,
        @NotNull(message = "103")
        @NotEmpty(message = "103")
        String synopsis,
        boolean shareable
) {
}
