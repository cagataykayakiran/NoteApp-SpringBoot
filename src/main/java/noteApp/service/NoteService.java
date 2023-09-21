package noteApp.service;

import noteApp.Entitiy.NoteEntity;
import noteApp.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public List<NoteEntity> getAllNote() {
        return noteRepository.findAll();
    }

    public NoteEntity saveNote(NoteEntity noteEntity) {
        return noteRepository.save(noteEntity);
    }

    public void deleteByIdNote(Long id) {
        noteRepository.deleteById(id);
    }

    public NoteEntity editNote(Long id, NoteEntity noteEntityDetails) {
        NoteEntity updateNoteEntity = noteRepository.findById(id).orElse(null);
        if (updateNoteEntity != null) {
            updateNoteEntity.setText(noteEntityDetails.getText());
            updateNoteEntity.setContent(noteEntityDetails.getContent());
            noteRepository.save(updateNoteEntity);
            return updateNoteEntity;
        }
        return null;
    }

    public NoteEntity getNoteById(Long id) {
        return noteRepository.findById(id).orElseThrow(() -> new NullPointerException("Note not found"));
    }
}
