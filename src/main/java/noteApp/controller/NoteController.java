package noteApp.controller;


import noteApp.Entitiy.NoteEntity;
import noteApp.service.NoteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }


    @GetMapping("/notes")
    public List<NoteEntity> allNotes() {
        return noteService.getAllNote();
    }

    @GetMapping("/notes/{id}")
    public Optional<NoteEntity> getNoteById(@PathVariable Long id) {
        return noteService.getNoteById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteNote(@PathVariable Long id) {
        noteService.deleteByIdNote(id);
    }

    @PostMapping("/save")
    public NoteEntity saveNote(@RequestBody NoteEntity noteEntity) {
        return noteService.saveNote(noteEntity);
    }

    @PutMapping("/edit/{id}")
    public NoteEntity editNote(@PathVariable Long id, @RequestBody NoteEntity noteEntityDetails) {
        return noteService.editNote(id,noteEntityDetails);
    }


}
