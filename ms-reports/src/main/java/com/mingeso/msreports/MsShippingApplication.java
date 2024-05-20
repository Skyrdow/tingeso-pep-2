package com.mingeso.msreports;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class MsShippingApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsShippingApplication.class, args);
	}

}
