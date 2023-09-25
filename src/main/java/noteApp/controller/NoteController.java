package noteApp.controller;


import noteApp.Entitiy.NoteEntity;
import noteApp.dto.CreateNoteRequest;
import noteApp.service.NoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping("/notes")
    public ResponseEntity<List<NoteEntity>> allNotes() {
        return ResponseEntity.ok(noteService.getAllNote());
    }

    @GetMapping("/notes/{id}")
    public ResponseEntity<List<NoteEntity>> getNoteById(@PathVariable Long id) {
        return ResponseEntity.ok(noteService.getNoteByUserId(id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteNote(@PathVariable Long id) {
        noteService.deleteByIdNote(id);
        return ResponseEntity.ok("Note successfully deleted");
    }

    @PostMapping("/save")
    public ResponseEntity<NoteEntity> saveNote(@RequestBody CreateNoteRequest createNoteRequest) {
        return ResponseEntity.ok(noteService.saveNote(createNoteRequest));
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<NoteEntity> editNote(@PathVariable Long id, @RequestBody NoteEntity noteEntityDetails) {
        return ResponseEntity.ok(noteService.editNote(id,noteEntityDetails));
    }


}
