package com.openclassrooms.unittests.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import com.openclassrooms.starterjwt.controllers.UserController;
import com.openclassrooms.starterjwt.dto.UserDto;
import com.openclassrooms.starterjwt.mapper.UserMapper;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.services.UserService;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @InjectMocks
    UserController userController;

    @Mock
    UserService userService;

    @Mock
    UserMapper userMapper;

    // TODO : nettoyer 
    // @Mock
    // SecurityContextHolder securityContextHolder;
    // @Mock
    // SecurityContext securityContext;
    // @Mock
    // Authentication authentication;
    // @Mock
    // UserDetails userDetails1;

    User user1;
    UserDto userDto1;

    @BeforeEach
    void setUp() {

        user1 = new User("user1@email.com",
                "LASTNAME1",
                "FirstName1",
                "password",
                false);
        user1.setId(Long.valueOf(1));

        userDto1 = new UserDto(Long.valueOf(user1.getId()),
                user1.getEmail(),
                user1.getLastName(),
                user1.getFirstName(),
                user1.isAdmin(),
                user1.getPassword(),
                LocalDateTime.now(),
                LocalDateTime.now());

    }

    @Test
    void findById_Ok_Test() {

        // GIVEN
        when(userService.findById(anyLong())).thenReturn(user1);
        when(userMapper.toDto(any(User.class))).thenReturn(userDto1);

        // WHEN
        ResponseEntity<?> response = userController.findById(String.valueOf(user1.getId()));

        // THEN
        assertEquals(userDto1, response.getBody());
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void findById_UserNull_Test() {

        // GIVEN
        when(userService.findById(anyLong())).thenReturn(null);

        // WHEN
        ResponseEntity<?> response = userController.findById(String.valueOf(10));

        // THEN
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void findById_NumberFormatException_Test() {

        // GIVEN
        when(userService.findById(anyLong())).thenThrow(NumberFormatException.class);

        // WHEN
        ResponseEntity<?> response = userController.findById(String.valueOf(10));

        // THEN
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    // TODO : faire marcher (pb : sécurité)
    @Disabled
    @Test
    void savedelete_Ok_Test() {

        // GIVEN
        when(userService.findById(anyLong())).thenReturn(user1);
        // Quid sécurité :
        // UserDetails userDetails = (UserDetails)
        // SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // WHEN
        ResponseEntity<?> response = userController.save(String.valueOf(user1.getId()));

        // THEN
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void savedelete_UserNull_Test() {

        // GIVEN
        when(userService.findById(anyLong())).thenReturn(null);

        // WHEN
        ResponseEntity<?> response = userController.save(String.valueOf(10));

        // THEN
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());

    }

    // TODO : faire marcher (pb : sécurité)
    @Disabled
    @Test
    void savedelete_Unauthorize_Test() {

        // GIVEN
        when(userService.findById(anyLong())).thenReturn(user1);
        // Quid sécurité :
        // UserDetails userDetails = (UserDetails)
        // SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // WHEN
        ResponseEntity<?> response = userController.save(String.valueOf(1));

        // THEN
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());

    }

    // TODO : faire marcher (pb : sécurité)
    @Disabled
    @Test
    void save_NumberFormatException_Test() {

        // GIVEN
        when(userService.findById(anyLong())).thenReturn(user1);
        doThrow(NumberFormatException.class).when(userService).delete(anyLong());
        // Quid sécurité :
        // UserDetails userDetails = (UserDetails)
        // SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // WHEN
        ResponseEntity<?> response = userController.save(String.valueOf(1));

        // THEN
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    // GIVEN

    // WHEN

    // THEN

}
