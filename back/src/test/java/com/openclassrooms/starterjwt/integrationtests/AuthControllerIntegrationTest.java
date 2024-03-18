package com.openclassrooms.starterjwt.integrationtests;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import net.minidev.json.JSONObject;

@AutoConfigureMockMvc
@SpringBootTest
@ActiveProfiles("test")
@Sql(scripts={"classpath:testdata.sql"})
class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void authenticateUser_Ok_Test() throws Exception {

        JSONObject user1 = new JSONObject(); 
        user1.put("email", "user1@email.com");
        user1.put("password", "password");
        String jsonUser1 = user1.toString();

        MvcResult result = mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonUser1))                
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        String resultAsString = result.getResponse().getContentAsString();
        assertTrue(resultAsString.contains("user1"));
        assertTrue(resultAsString.contains("token"));
    }

    @Test
    void authenticateUser_LoginError_Test() throws Exception {

        JSONObject user1 = new JSONObject(); 
        user1.put("email", "user1@email.com");
        user1.put("password", "wrongpassword");
        String jsonUser1 = user1.toString();

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonUser1))                
                .andDo(print())
                .andExpect(status().isUnauthorized())
                .andReturn();
    }

    @Test
    void registerUser_Ok_IT() throws Exception {

        JSONObject user3 = new JSONObject();
        user3.put("email", "user3@email.com");
        user3.put("firstName", "user3");
        user3.put("lastName", "USER3");
        user3.put("password", "password");
        String jsonUser3 = user3.toString();

        MvcResult result = mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonUser3))                
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        String resultAsString = result.getResponse().getContentAsString();
        assertTrue(resultAsString.contains("User registered successfully!"));
    }

    @Test
    void registerUser_EmailAlreadyExists_IT() throws Exception {

        JSONObject user3 = new JSONObject();
        user3.put("email", "user1@email.com");
        user3.put("firstName", "user3");
        user3.put("lastName", "USER3");
        user3.put("password", "password");
        String jsonUser3 = user3.toString();

        MvcResult result = mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonUser3))                
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andReturn();

        String resultAsString = result.getResponse().getContentAsString();
        assertTrue(resultAsString.contains("Error: Email is already taken!"));
    }

}
