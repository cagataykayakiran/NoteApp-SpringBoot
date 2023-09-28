package noteApp.service;

import lombok.RequiredArgsConstructor;
import noteApp.entity.NoteEntity;
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

    public List<NoteEntity> getAllNote() {
        return noteRepository.findAll();
    }

    public NoteEntity saveNote(CreateNoteRequest createNoteRequest) {
        User user = userRepository.findById(createNoteRequest.getUserid()).
                orElseThrow(() -> new UsernameNotFoundException("User not found"));
        NoteEntity note = NoteEntity.builder()
                .content(createNoteRequest.getContent())
                .text(createNoteRequest.getText())
                .user(user)
                .build();
        return noteRepository.save(note);
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

    public List<NoteEntity> getNoteByUserId(Long id) {
        return noteRepository.findByUser_Id(id);
    }
}
