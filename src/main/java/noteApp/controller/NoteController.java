package noteApp.controller;


import noteApp.entity.Note;
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
    public ResponseEntity<List<Note>> allNotes() {
        return ResponseEntity.ok(noteService.getAllNote());
    }

    @GetMapping("/notes/{id}")
    public ResponseEntity<List<Note>> getNoteById(@PathVariable Long id) {
        return ResponseEntity.ok(noteService.getNoteByUserId(id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteNote(@PathVariable Long id) {
        noteService.deleteByIdNote(id);
        return ResponseEntity.ok("Note successfully deleted");
    }

    @PostMapping("/save")
    public ResponseEntity<Note> saveNote(@RequestBody CreateNoteRequest createNoteRequest) {
        return ResponseEntity.ok(noteService.saveNote(createNoteRequest));
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Note> editNote(@PathVariable Long id, @RequestBody Note noteDetails) {
        return ResponseEntity.ok(noteService.editNote(id, noteDetails));
    }


}
