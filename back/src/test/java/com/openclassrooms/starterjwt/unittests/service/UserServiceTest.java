package com.openclassrooms.starterjwt.unittests.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyLong;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;

import java.util.Optional;

import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;
import com.openclassrooms.starterjwt.services.UserService;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @InjectMocks
    UserService userService;

    @Mock
    UserRepository userRepository;

    User user1;

    @BeforeEach
    void setUp() {

        user1 = new User("user1@email.com",
                "LASTNAME1",
                "FirstName1",
                "password",
                false);
    }

    @Test
    void findById_Ok_Test() {

        // GIVEN
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user1));

        // WHEN
        User userFound = userService.findById(Long.valueOf(1));

        // THEN
        assertEquals(user1.getFirstName(), userFound.getFirstName());
    }

    @Test
    void findById_NotFound_Test() {

        // GIVEN
        when(userRepository.findById(anyLong())).thenReturn(Optional.empty());

        // WHEN
        User userFound = userService.findById(Long.valueOf(10));

        // THEN
        assertEquals(null, userFound);
    }

    @Test
    void findById_IllegalArgumentException_Test() {

        // GIVEN
        when(userRepository.findById(null)).thenThrow(IllegalArgumentException.class);

        // WHEN
        // THEN
        assertThrows(IllegalArgumentException.class, () -> userService.findById(null));
    }

    @Test
    void delete_Ok_Test() {

        // GIVEN
        // WHEN
        userService.delete(user1.getId());

        // THEN
        verify(userRepository, Mockito.times(1)).deleteById(user1.getId());
    }

    @Test
    void delete_IllegalArgumentException_Test() {

        // GIVEN
        doThrow(IllegalArgumentException.class).when(userRepository).deleteById(null);

        // WHEN
        // THEN
        assertThrows(IllegalArgumentException.class, () -> userService.delete(null));
    }

}
