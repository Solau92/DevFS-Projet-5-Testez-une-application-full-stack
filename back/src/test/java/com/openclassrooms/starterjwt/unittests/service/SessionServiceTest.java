package com.openclassrooms.starterjwt.unittests.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.openclassrooms.starterjwt.exception.BadRequestException;
import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;
import com.openclassrooms.starterjwt.services.SessionService;

@ExtendWith(MockitoExtension.class)
class SessionServiceTest {

    @InjectMocks
    SessionService sessionService;

    @Mock
    SessionRepository sessionRepository;

    @Mock
    UserRepository userRepository;

    Session session1;
    Session session2;
    Session session3;
    List<Session> sessions;

    User user1;
    User user2;

    @SuppressWarnings("deprecation")
    @BeforeEach
    void setUp() {

        user1 = new User("user1@email.com",
                "LASTNAME1",
                "FirstName1",
                "password",
                false);
        user1.setId(Long.valueOf(1));

        user2 = new User("user2@email.com",
                "LASTNAME2",
                "FirstName2",
                "password",
                false);
        user2.setId(Long.valueOf(2));

        List<User> users = new ArrayList<>();
        users.add(user1);
        users.add(user2);

        Teacher teacher1 = new Teacher(Long.valueOf(1),
                "TEACHERLASTNAME1",
                "teacherFirstName1",
                LocalDateTime.now(), LocalDateTime.now());

        session1 = new Session(Long.valueOf(1),
                "session1",
                new Date(LocalDate.now().getYear(), LocalDate.now().getMonthValue(),
                        (LocalDate.now().getDayOfMonth() - 1)),
                "session 1",
                teacher1,
                users,
                LocalDateTime.now().minusDays(1), LocalDateTime.now().minusDays(1));

        session2 = new Session(Long.valueOf(2),
                "session2",
                new Date(LocalDate.now().getYear(), LocalDate.now().getMonthValue(),
                        (LocalDate.now().getDayOfMonth() - 2)),
                "session 2",
                teacher1,
                users,
                LocalDateTime.now().minusDays(2), LocalDateTime.now().minusDays(3));

        session3 = new Session(Long.valueOf(3),
                "session3",
                new Date(LocalDate.now().getYear(), LocalDate.now().getMonthValue(),
                        (LocalDate.now().getDayOfMonth() - 3)),
                "session 3",
                teacher1,
                users,
                LocalDateTime.now().minusDays(3), LocalDateTime.now().minusDays(3));

        sessions = new ArrayList<>();
        sessions.add(session1);
        sessions.add(session2);
    }

    @Test
    void create_Ok_Test() {

        // GIVEN
        when(sessionRepository.save(any(Session.class))).thenReturn(session3);

        // WHEN
        Session sessionSaved = sessionService.create(session3);

        // THEN
        assertEquals(session3.getDescription(), sessionSaved.getDescription());
    }

    @Test
    void create_IllegalArgumentException_Test() {

        // GIVEN
        when(sessionRepository.save(null)).thenThrow(IllegalArgumentException.class);

        // WHEN
        // THEN
        assertThrows(IllegalArgumentException.class, () -> sessionService.create(null));
    }

    @Test
    void delete_Ok_Test() {

        // GIVEN
        // WHEN
        sessionService.delete(session1.getId());

        // THEN
        verify(sessionRepository, Mockito.times(1)).deleteById(session1.getId());
    }

    @Test
    void delete_IllegalArgumentException_Test() {

        // GIVEN
        doThrow(IllegalArgumentException.class).when(sessionRepository).deleteById(null);

        // WHEN
        // THEN
        assertThrows(IllegalArgumentException.class, () -> sessionService.delete(null));
    }

    @Test
    void findAll_Ok_Test() {

        // GIVEN
        when(sessionRepository.findAll()).thenReturn(sessions);

        // WHEN
        List<Session> sessionsFound = sessionService.findAll();

        // THEN
        assertEquals(sessions.size(), sessionsFound.size());
        assertTrue(sessionsFound.contains(session2));
    }

    @Test
    void getById_Ok_Test() {

        // GIVEN
        when(sessionRepository.findById(anyLong())).thenReturn(Optional.of(session1));

        // WHEN
        Session sessionFound = sessionService.getById(Long.valueOf(1));

        // THEN
        assertEquals(session1.getDescription(), sessionFound.getDescription());
    }

    @Test
    void getById_NotFound_Test() {

        // GIVEN
        when(sessionRepository.findById(anyLong())).thenReturn(Optional.empty());

        // WHEN
        Session sessionFound = sessionService.getById(Long.valueOf(10));

        // THEN
        assertEquals(null, sessionFound);
    }

    @Test
    void getById_IllegalArgumentException_Test() {

        // GIVEN
        when(sessionRepository.findById(null)).thenThrow(IllegalArgumentException.class);

        // WHEN
        // THEN
        assertThrows(IllegalArgumentException.class, () -> sessionService.getById(null));
    }

    @Test
    void update_Ok_Test() {

        // GIVEN
        session2.setDescription("session 2 updated");
        when(sessionRepository.save(any(Session.class))).thenReturn(session2);

        // WHEN
        Session sessionUpdated = sessionService.update(session2.getId(), session2);

        // THEN
        assertEquals(session2.getDescription(), sessionUpdated.getDescription());
    }

    @Test
    void update_SessionNull_Test() {

        // GIVEN
        // WHEN
        // THEN
        assertThrows(NullPointerException.class, () -> sessionService.update(Long.valueOf(1), null));
    }

    @Test
    void participate_Ok_Test() {

        // GIVEN

        User user3 = new User("user3@email.com",
                "LASTNAME3",
                "FirstName3",
                "password",
                false);
        user3.setId(Long.valueOf(3));

        when(sessionRepository.findById(anyLong())).thenReturn(Optional.of(session1));
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user3));

        when(sessionRepository.save(any(Session.class))).thenReturn(session1);

        // WHEN
        sessionService.participate(session1.getId(), user3.getId());

        // THEN
        assertEquals(3, session1.getUsers().size());
    }

    @Test
    void participate_SessionNotFound_Test() {

        // GIVEN
        when(sessionRepository.findById(anyLong())).thenReturn(Optional.empty());

        // WHEN
        // THEN
        assertThrows(NotFoundException.class, () -> sessionService.participate(Long.valueOf(10), Long.valueOf(1)));
    }

    @Test
    void participate_UserNotFound_Test() {

        // GIVEN
        when(userRepository.findById(anyLong())).thenReturn(Optional.empty());

        // WHEN
        // THEN
        assertThrows(NotFoundException.class, () -> sessionService.participate(Long.valueOf(10), Long.valueOf(1)));
    }

    @Test
    void participate_UserAndSessionNotFound_Test() {

        // GIVEN
        when(userRepository.findById(anyLong())).thenReturn(Optional.empty());
        when(sessionRepository.findById(anyLong())).thenReturn(Optional.empty());

        // WHEN
        // THEN
        assertThrows(NotFoundException.class, () -> sessionService.participate(Long.valueOf(10), Long.valueOf(10)));
    }

    @Test
    void participate_BadRequestException_Test() {

        // GIVEN
        when(sessionRepository.findById(anyLong())).thenReturn(Optional.of(session1));
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user1));

        // WHEN
        // THEN
        assertThrows(BadRequestException.class, () -> sessionService.participate(session1.getId(), user1.getId()));
    }

    @Test
    void noLongerParticipate_Ok_Test() {

        // GIVEN
        when(sessionRepository.findById(anyLong())).thenReturn(Optional.of(session1));

        // WHEN
        sessionService.noLongerParticipate(session1.getId(), user1.getId());

        // THEN
        verify(sessionRepository, Mockito.times(1)).save(session1);
    }

    @Test
    void noLongerParticipate_SessionNotFoundException_Test() {

        // GIVEN
        when(sessionRepository.findById(anyLong())).thenReturn(Optional.empty());

        // WHEN
        // THEN
        assertThrows(NotFoundException.class,
                () -> sessionService.noLongerParticipate(Long.valueOf(10), Long.valueOf(1)));
    }

    @Test
    void noLongerParticipate_BadRequestException_Test() {

        // GIVEN

        User user3 = new User("user3@email.com",
                "LASTNAME3",
                "FirstName3",
                "password",
                false);
        user3.setId(Long.valueOf(3));

        when(sessionRepository.findById(anyLong())).thenReturn(Optional.of(session1));

        // WHEN
        // THEN
        assertThrows(BadRequestException.class,
                () -> sessionService.noLongerParticipate(session1.getId(), user3.getId()));
    }

}
