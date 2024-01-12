package noteApp.service;

import lombok.RequiredArgsConstructor;
import noteApp.entity.Note;
import noteApp.entity.User;
import noteApp.dto.CreateNoteRequest;
import noteApp.repository.NoteRepository;
import noteApp.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;

    public List<Note> getAllNote() {
        return noteRepository.findAll();
    }

    public Note saveNote(CreateNoteRequest createNoteRequest) {
        User user = userRepository.findById(createNoteRequest.getUserid()).
                orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Note note = Note.builder()
                .content(createNoteRequest.getContent())
                .text(createNoteRequest.getText())
                .user(user)
                .build();
        return noteRepository.save(note);
    }

    public void deleteByIdNote(Long id) {
        noteRepository.deleteById(id);
    }

    public Note editNote(Long id, Note noteDetails) {
        Note updateNote = noteRepository.findById(id).orElse(null);
        if (updateNote != null) {
            updateNote.setText(noteDetails.getText());
            updateNote.setContent(noteDetails.getContent());
            noteRepository.save(updateNote);
            return updateNote;
        }
        return null;
    }

    public List<Note> getNoteByUserId(Long id) {
        return noteRepository.findByUser_Id(id);
    }
}
