package pl.edu.agh.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
                .allowedOrigins("http://localhost:3000", "http://localhost:3001")
                .allowedHeaders("*");
    }
}
