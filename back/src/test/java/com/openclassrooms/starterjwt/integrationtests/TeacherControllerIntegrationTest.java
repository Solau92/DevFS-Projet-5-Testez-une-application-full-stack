package com.openclassrooms.starterjwt.integrationtests;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.util.StringUtils;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@AutoConfigureMockMvc
@SpringBootTest
@Sql(scripts={"classpath:testdata.sql"})
class TeacherControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    void findById_Ok_IT() throws Exception {

        MvcResult result = mockMvc.perform(get("/api/teacher/1")
        .contentType(MediaType.APPLICATION_JSON))
        .andDo(print())
        .andExpect(status().isOk())
        .andReturn();

        String resultAsString = result.getResponse().getContentAsString();
        assertTrue(resultAsString.contains("Margot"));
    }

    @Test
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    void findById_TeacherNotFound_IT() throws Exception {

        mockMvc.perform(get("/api/teacher/10")
        .contentType(MediaType.APPLICATION_JSON))
        .andDo(print())
        .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    void findById_IncorrectIdFormat_IT() throws Exception {

        mockMvc.perform(get("/api/teacher/un")
        .contentType(MediaType.APPLICATION_JSON))
        .andDo(print())
        .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    void findAll_Ok_IT() throws Exception {

        MvcResult result = mockMvc.perform(get("/api/teacher")
        .contentType(MediaType.APPLICATION_JSON))
        .andDo(print())
        .andExpect(status().isOk())
        .andReturn();
        
        String resultAsString = result.getResponse().getContentAsString();
        int numberOfTeachers = StringUtils.countOccurrencesOf(resultAsString, "lastName");
       
        assertEquals(2, numberOfTeachers);
        assertTrue(resultAsString.contains("Margot"));
        assertTrue(resultAsString.contains("THIERCELIN"));
    }
    
}
