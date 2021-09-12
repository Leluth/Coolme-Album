package com.coolmealbum;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@ServletComponentScan
public class CoolmeAlbumApplication {

    public static void main(String[] args) {
        SpringApplication.run(CoolmeAlbumApplication.class, args);
    }
}
