// package com.openclassrooms.unittests.controller;

// import static org.mockito.ArgumentMatchers.any;
// import static org.mockito.Mockito.when;

// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.junit.jupiter.MockitoExtension;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.crypto.password.PasswordEncoder;

// import com.openclassrooms.starterjwt.repository.UserRepository;
// import com.openclassrooms.starterjwt.security.jwt.JwtUtils;
// import com.openclassrooms.starterjwt.controllers.AuthController;

// @ExtendWith(MockitoExtension.class)
// class AuthControllerTest {

//     @InjectMocks
//     AuthController AuthController;

//     @Mock
//     AuthenticationManager authenticationManager;

//     @Mock
//     PasswordEncoder passwordEncoder;

//     @Mock
//     JwtUtils jwtUtils;

//     @Mock
//     UserRepository userRepository;

//     @BeforeEach
//     void setUp() {

//     }

//     @Test
//     void authenticateUser_Ok_Test() {

//         // GIVEN 
//         Authentication authentication = new UsernamePasswordAuthenticationToken("user1@email.com", "password");
//         when(authenticationManager.authenticate(any(Authentication.class))).thenReturn(authentication);

//         //
//         when(jwtUtils.generateJwtToken(authentication)).thenReturn("token");
//     }



    
// }
