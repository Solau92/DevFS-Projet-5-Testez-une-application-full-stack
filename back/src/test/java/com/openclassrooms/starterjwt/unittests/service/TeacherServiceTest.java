package com.openclassrooms.starterjwt.unittests.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.repository.TeacherRepository;
import com.openclassrooms.starterjwt.services.TeacherService;

@ExtendWith(MockitoExtension.class)
class TeacherServiceTest {

    @InjectMocks
    TeacherService teacherService;

    @Mock
    TeacherRepository teacherRepository;

    Teacher teacher1;
    Teacher teacher2;
    List<Teacher> teachers;

    @BeforeEach
    void setUp() {

        teacher1 = new Teacher(Long.valueOf(1),
                "TEACHERLASTNAME1",
                "teacherFirstName1",
                LocalDateTime.now(), LocalDateTime.now());

        teacher2 = new Teacher(Long.valueOf(2),
                "TEACHERLASTNAME2",
                "teacherFirstName2",
                LocalDateTime.now(), LocalDateTime.now());

        teachers = new ArrayList<>();
        teachers.add(teacher1);
        teachers.add(teacher2);
    }

    @Test
    void findById_Ok_Test() {

        // GIVEN
        when(teacherRepository.findById(anyLong())).thenReturn(Optional.of(teacher1));

        // WHEN
        Teacher teacherFound = teacherService.findById(Long.valueOf(1));

        // THEN
        assertEquals(teacher1.getFirstName(), teacherFound.getFirstName());
    }

    @Test
    void findById_NotFound_Test() {

        // GIVEN
        when(teacherRepository.findById(anyLong())).thenReturn(Optional.empty());

        // WHEN
        Teacher teacherFound = teacherService.findById(Long.valueOf(1));

        // THEN
        assertEquals(null, teacherFound);
    }

    @Test
    void findById_IllegalArgumentException_Test() {

        // GIVEN
        when(teacherRepository.findById(null)).thenThrow(IllegalArgumentException.class);

        // WHEN
        // THEN
        assertThrows(IllegalArgumentException.class, () -> teacherService.findById(null));
    }

    @Test
    void findAll_Ok_Test() {

         // GIVEN
         when(teacherRepository.findAll()).thenReturn(teachers);

         // WHEN
         List<Teacher> teachersFound = teacherService.findAll();
 
         // THEN
         assertEquals(teachers.size(), teachersFound.size());
         assertTrue(teachers.contains(teacher2));
    }

}
