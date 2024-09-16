package com.isi.book.notification;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Notification {

    private NotificationStatus status;
    private String message;
    private String bookTitle;
}
