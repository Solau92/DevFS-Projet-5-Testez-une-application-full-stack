package com.openclassrooms.starterjwt.integrationtests;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;

@AutoConfigureMockMvc
@SpringBootTest
@Sql("testdata.sql")
class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    void findById_oK_IT() throws Exception {

        MvcResult result = mockMvc.perform(get("/api/user/2")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        String resultAsString = result.getResponse().getContentAsString();
        assertTrue(resultAsString.contains("user1@email.com"));
    }

    @Test
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    void findById_UserNotFound_IT() throws Exception {

        mockMvc.perform(get("/api/user/10")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    void findById_IncorrectFormatId_IT() throws Exception {

        mockMvc.perform(get("/api/user/deux")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "user2@email.com", password = "password")
    void savedelete_Ok_IT() throws Exception {

        mockMvc.perform(delete("/api/user/3")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    void savedelete_Unauthorized_IT() throws Exception {

        mockMvc.perform(delete("/api/user/2")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isUnauthorized())
                .andReturn();
    }

    @Test
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    void savedelete_UserNotFound_IT() throws Exception {

        mockMvc.perform(delete("/api/user/30")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNotFound())
                .andReturn();
    }

    @Test
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    void savedelete_IncorrectIdFormat_IT() throws Exception {

        mockMvc.perform(delete("/api/user/un")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andReturn();
    }

}
