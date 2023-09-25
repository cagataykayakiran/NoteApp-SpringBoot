package noteApp.dto;

import lombok.Data;

@Data
public class CreateNoteRequest {

    private String content;
    private String text;
    private Long userid;
}
