package com.openclassrooms.unittests.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.openclassrooms.starterjwt.controllers.SessionController;
import com.openclassrooms.starterjwt.dto.SessionDto;
import com.openclassrooms.starterjwt.mapper.SessionMapper;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.services.SessionService;

@ExtendWith(MockitoExtension.class)
class SessionControllerTest {

    @InjectMocks
    SessionController sessionController;

    @Mock
    SessionService sessionService;

    @Mock
    SessionMapper sessionMapper;

    Session session1;
    Session session2;
    Session session3;
    List<Session> sessions;

    User user1;
    User user2;

    SessionDto sessionDto1; 
    SessionDto sessionDto2;
    List<SessionDto> sessionsDto;

    @SuppressWarnings("deprecation")
    @BeforeEach
    void setUp() {

        // Users and list of users
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

        // Sessions and list of sessions

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

        // SessionDtos and list of sessionDtos

        List<Long> usersIds = new ArrayList<>();
        usersIds.add(user1.getId());
        usersIds.add(user2.getId());
       
        sessionDto1 = new SessionDto(Long.valueOf(1),
        "session1",
        new Date(LocalDate.now().getYear(), LocalDate.now().getMonthValue(),
                (LocalDate.now().getDayOfMonth() - 1)),
        teacher1.getId(),
        "session 1",
        usersIds,
        LocalDateTime.now().minusDays(1), LocalDateTime.now().minusDays(1));

        sessionDto2 = new SessionDto(Long.valueOf(2),
        "session2",
        new Date(LocalDate.now().getYear(), LocalDate.now().getMonthValue(),
                (LocalDate.now().getDayOfMonth() - 2)),
        teacher1.getId(),
        "session 2",
        usersIds,
        LocalDateTime.now().minusDays(2), LocalDateTime.now().minusDays(2));

        sessionsDto = new ArrayList<>();
        sessionsDto.add(sessionDto1);
        sessionsDto.add(sessionDto2);
    }

    @Test
    void findById_Ok_Test() {

        // GIVEN 
        when(sessionService.getById(anyLong())).thenReturn(session1);
        when(sessionMapper.toDto(any(Session.class))).thenReturn(sessionDto1);

        // WHEN 
        ResponseEntity<?> response = sessionController.findById(String.valueOf(session1.getId()));

        // THEN
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(sessionDto1, response.getBody());
    }

    @Test
    void findById_UserNotFound_Test() {

        // GIVEN 
        when(sessionService.getById(anyLong())).thenReturn(null);

        // WHEN 
        ResponseEntity<?> response = sessionController.findById(String.valueOf(10));

        // THEN
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void findById_NumberFormatException_Test() {

        // GIVEN 
        when(sessionService.getById(anyLong())).thenThrow(NumberFormatException.class);

        // WHEN 
        ResponseEntity<?> response = sessionController.findById(String.valueOf(10));

        // THEN
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void findAll_Ok_Test() {

        // GIVEN 
        when(sessionService.findAll()).thenReturn(sessions);
        when(sessionMapper.toDto(sessions)).thenReturn(sessionsDto);

        // WHEN 
        ResponseEntity<?> response = sessionController.findAll();

        // THEN   
        assertEquals(HttpStatus.OK, response.getStatusCode());     
        assertEquals(sessionsDto, response.getBody());
    }

    @Test
    void create_Ok_Test() {

        // GIVEN 
        when(sessionService.create(any(Session.class))).thenReturn(session1);
        when(sessionMapper.toEntity(any(SessionDto.class))).thenReturn(session1);
        when(sessionMapper.toDto(any(Session.class))).thenReturn(sessionDto1);

        // WHEN 
        ResponseEntity<?> response = sessionController.create(sessionDto1);

        // THEN
        assertEquals(HttpStatus.OK, response.getStatusCode());     
        assertEquals(sessionDto1, response.getBody());
    }

    @Test
    void update_Ok_Test() {

        // GIVEN 
        session1.setDescription("session 1 updated");
        sessionDto1.setDescription("session 1 updated");

        when(sessionService.update(anyLong(), any(Session.class))).thenReturn(session1);
        when(sessionMapper.toEntity(any(SessionDto.class))).thenReturn(session1);
        when(sessionMapper.toDto(any(Session.class))).thenReturn(sessionDto1);

        // WHEN 
        ResponseEntity<?> response = sessionController.update(String.valueOf(session1.getId()), sessionDto1);

        // THEN
        assertEquals(HttpStatus.OK, response.getStatusCode());     
        assertEquals(sessionDto1, response.getBody());
    }

    @Test
    void update_NumberFormatException_Test() {

        // GIVEN 
        when(sessionService.update(anyLong(), any(Session.class))).thenThrow(NumberFormatException.class);
        when(sessionMapper.toEntity(any(SessionDto.class))).thenReturn(session1);
        
        // WHEN 
        ResponseEntity<?> response = sessionController.update(String.valueOf(1), sessionDto1);

        // THEN
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());     
    }

    @Test
    void savedelete_Ok_Test() {

        // GIVEN 
        when(sessionService.getById(anyLong())).thenReturn(session1);

        // WHEN 
        ResponseEntity<?> response = sessionController.save(String.valueOf(session1.getId()));

        // THEN
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void savedelete_SessionNotFound_Test() {
        
        // GIVEN 
        when(sessionService.getById(anyLong())).thenReturn(null);

        // WHEN 
        ResponseEntity<?> response = sessionController.save(String.valueOf(10));

        // THEN
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void savedelete_NumberFormatException_Test() {
        
        // GIVEN 
        when(sessionService.getById(anyLong())).thenThrow(NumberFormatException.class);

        // WHEN 
        ResponseEntity<?> response = sessionController.save(String.valueOf(10));

        // THEN
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void participate_Ok_Test() {

        // GIVEN 
        // WHEN 
        ResponseEntity<?> response = sessionController.participate(String.valueOf(session1.getId()), String.valueOf(user1.getId()));

        // THEN
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void participate_NumberFormatException_Test() {

        // GIVEN 
        doThrow(NumberFormatException.class).when(sessionService).participate(anyLong(), anyLong());

        // WHEN 
        ResponseEntity<?> response = sessionController.participate(String.valueOf(session1.getId()), String.valueOf(user1.getId()));

        // THEN
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void noLongerParticipate_Ok_Test() {

        // GIVEN 
        // WHEN 
        ResponseEntity<?> response = sessionController.noLongerParticipate(String.valueOf(session1.getId()), String.valueOf(user1.getId()));

        // THEN
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void noLongerparticipate_NumberFormatException_Test() {

        // GIVEN 
        doThrow(NumberFormatException.class).when(sessionService).noLongerParticipate(anyLong(), anyLong());

        // WHEN 
        ResponseEntity<?> response = sessionController.noLongerParticipate(String.valueOf(session1.getId()), String.valueOf(user1.getId()));

        // THEN
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
    
}
