package rva.ctrls;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldRestController {
	
	/*
	 * @RequestMapping - predstavlja anotaciju koja se mo�e koristiti i na nivou klase i na
	 * nivou metode. Slu�i za mapiranje web zahteva na odre�ene klase ili metode. U zagradi
	 * se navodi deo URI-ja koji predstavlja putanju. U slu�aju metode helloWorld(), 
	 * @RequestMapping("/") ozna�ava da �e ova metoda biti pozvana kada se u browseru unese
	 * adresa localhost:8084 
	 */
	
	@RequestMapping("/")
	public String helloWorld() {
		return "Hello World!";
	}
	
	@RequestMapping("/zbir")
	public String zbir() {
		long x = Math.round(Math.random() * 10);
		long y = Math.round(Math.random() * 10);
		return x+" + "+y+" = " + (x+y);
	}
	

}
