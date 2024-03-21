package com.openclassrooms.starterjwt.integrationtests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.util.StringUtils;

import net.minidev.json.JSONObject;

@AutoConfigureMockMvc
@SpringBootTest
@ActiveProfiles("test")
@Sql(scripts = { "classpath:testdata.sql" })
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class SessionControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    void findById_Ok_IT() throws Exception {

        MvcResult result = mockMvc.perform(get("/api/session/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        String resultAsString = result.getResponse().getContentAsString();
        assertTrue(resultAsString.contains("session1"));
    }

    @Test
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    void findById_NotFound_IT() throws Exception {

        mockMvc.perform(get("/api/session/10")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNotFound())
                .andReturn();
    }

    @Test
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    void findById_IncorrectFormatId_IT() throws Exception {

        mockMvc.perform(get("/api/session/un")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andReturn();
    }

    @Test
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    void findAll_Ok_IT() throws Exception {

        MvcResult result = mockMvc.perform(get("/api/session")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        String resultAsString = result.getResponse().getContentAsString();
        int numberOfSessions = StringUtils.countOccurrencesOf(resultAsString, "description");

        assertEquals(2, numberOfSessions);
        assertTrue(resultAsString.contains("session1"));
        assertTrue(resultAsString.contains("session2"));
    }

    @Test
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    @Order(1)
    void create_Ok_IT() throws Exception {

        JSONObject session3 = new JSONObject();
        session3.put("name", "session3");
        session3.put("description", "session 3");
        session3.put("date", "2024-04-06");
        session3.put("teacher_id", "1");
        session3.put("users", null);
        String jsonSession3 = session3.toString();

        mockMvc.perform(post("/api/session")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonSession3))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    @Order(2)
    void update_Ok_IT() throws Exception {

        JSONObject session3updated = new JSONObject();
        session3updated.put("name", "session3");
        session3updated.put("description", "session 3 updated");
        session3updated.put("date", "2024-04-06");
        session3updated.put("teacher_id", "1");
        session3updated.put("users", null);
        String jsonSession3 = session3updated.toString();

        mockMvc.perform(put("/api/session/3")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonSession3))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    void update_IncorrectIdFormat_IT() throws Exception {

        JSONObject session3updated = new JSONObject();
        session3updated.put("name", "session3");
        session3updated.put("description", "session 3 updated");
        session3updated.put("date", "2024-04-06");
        session3updated.put("teacher_id", "1");
        session3updated.put("users", null);
        String jsonSession3 = session3updated.toString();

        mockMvc.perform(put("/api/session/trois")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonSession3))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    @Order(3)
    void savedelete_Ok_IT() throws Exception {

        mockMvc.perform(delete("/api/session/2")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    void savedelete_UserNotFound_IT() throws Exception {

        mockMvc.perform(delete("/api/session/30")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNotFound())
                .andReturn();
    }

    @Test
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    void savedelete_IncorrectIdFormat_IT() throws Exception {

        mockMvc.perform(delete("/api/session/un")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andReturn();
    }

    @Test
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    @Order(4)
    void participate_Ok_IT() throws Exception {

        mockMvc.perform(post("/api/session/1/participate/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    void participate_IncorrectItFormat_IT() throws Exception {

        mockMvc.perform(post("/api/session/un/participate/deux")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    @Order(5)
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    void noLongerParticipate_Ok_IT() throws Exception {

        mockMvc.perform(delete("/api/session/2/participate/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "yoga@studio.com", password = "test!1234")
    void noLongerParticipate_IncorrectItFormat_IT() throws Exception {

        mockMvc.perform(delete("/api/session/un/participate/deux")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

}
