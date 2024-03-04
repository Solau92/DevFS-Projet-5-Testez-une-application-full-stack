package com.openclassrooms.unittests.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.openclassrooms.starterjwt.controllers.TeacherController;
import com.openclassrooms.starterjwt.dto.TeacherDto;
import com.openclassrooms.starterjwt.mapper.TeacherMapper;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.services.TeacherService;

@ExtendWith(MockitoExtension.class)
class TeacherControllerTest {

    @InjectMocks
    TeacherController teacherController;

    @Mock
    TeacherService teacherService;

    @Mock
    TeacherMapper teacherMapper;

    Teacher teacher1;
    Teacher teacher2;
    List<Teacher> teachers;

    TeacherDto teacherDto1;
    TeacherDto teacherDto2;
    List<TeacherDto> teachersDto;

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

        teacherDto1 = new TeacherDto(Long.valueOf(1),
                "TEACHERLASTNAME1",
                "teacherFirstName1",
                LocalDateTime.now(), LocalDateTime.now());

        teacherDto2 = new TeacherDto(Long.valueOf(2),
                "TEACHERLASTNAME2",
                "teacherFirstName2",
                LocalDateTime.now(), LocalDateTime.now());

        teachersDto = new ArrayList<>();
        teachersDto.add(teacherDto1);
        teachersDto.add(teacherDto2);

    }

    @Test
    void findById_Ok_Test() {

        // GIVEN
        when(teacherService.findById(anyLong())).thenReturn(teacher1);
        when(teacherMapper.toDto(any(Teacher.class))).thenReturn(teacherDto1);

        // WHEN
        ResponseEntity<?> response = teacherController.findById(String.valueOf(teacher1.getId()));

        // THEN
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(teacherDto1, response.getBody());
    }

    @Test
    void findById_TeacherNotFound_Test() {

        // GIVEN
        when(teacherService.findById(anyLong())).thenReturn(null);

        // WHEN
        ResponseEntity<?> response = teacherController.findById(String.valueOf(10));

        // THEN
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void findById_NumberFormatException_Test() {

        // GIVEN
        when(teacherService.findById(anyLong())).thenThrow(NumberFormatException.class);

        // WHEN
        ResponseEntity<?> response = teacherController.findById(String.valueOf(10));

        // THEN
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void findAll_Ok_Test() {

        // GIVEN
        when(teacherService.findAll()).thenReturn(teachers);
        when(teacherMapper.toDto(teachers)).thenReturn(teachersDto);

        // WHEN
        ResponseEntity<?> response = teacherController.findAll();

        // THEN
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(teachersDto, response.getBody());
    }

}
