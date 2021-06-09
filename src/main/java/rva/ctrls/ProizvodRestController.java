package rva.ctrls;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Proizvod;
import rva.repository.ProizvodRepository;


@CrossOrigin
@RestController
@Api(tags = {"Proizvod CRUD operacije"})
public class ProizvodRestController {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private ProizvodRepository proizvodRepository;
	
	
	@GetMapping("proizvod")
	@ApiOperation(value="Vraca kolekciju proizvoda iz baze podataka")
	public Collection <Proizvod> getProizvodi()
	{
	
	 return proizvodRepository.findAll();	
	}
	
	@GetMapping("proizvod/{id}")
	@ApiOperation(value="Vraca jedan proizvod iz baze podataka")
	public Proizvod getProizvod(@PathVariable("id") Integer id) 
	{
		return proizvodRepository.getOne(id);
	}
	
	@GetMapping("proizvodNaziv/{naziv}")
	@ApiOperation(value="Vraca  proizvod po nazivu iz baze podataka")
	public Collection<Proizvod> getProizvodByNaziv(@PathVariable("naziv") String naziv)
	{
		return proizvodRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("proizvod")
	@ApiOperation(value="Unosi proizvod u baze podataka")
	public ResponseEntity<Proizvod> insertProizvod(@RequestBody Proizvod proizvod)
	{
		if(!proizvodRepository.existsById(proizvod.getId())) 
		{
			proizvodRepository.save(proizvod);
			return new ResponseEntity<Proizvod>(HttpStatus.OK);
		}
		return new ResponseEntity<Proizvod>(HttpStatus.CONFLICT);	
	}
	@PutMapping("proizvod")
	@ApiOperation(value="Izmenjuje proizvoda u baze podataka")
	public ResponseEntity<Proizvod> updateProizvod(@RequestBody Proizvod proizvod )
	{
		if(!proizvodRepository.existsById(proizvod.getId())) 
		{
			return new ResponseEntity<Proizvod>(HttpStatus.NO_CONTENT);
		}
		proizvodRepository.save(proizvod);
		return new ResponseEntity<Proizvod>(HttpStatus.OK);
	}
	
	
	@DeleteMapping("proizvod/{id}")
	@ApiOperation(value=" Brise proizvod iz baze podataka")
	public ResponseEntity <Proizvod>deleteProizvod(@PathVariable("id") Integer id) 
	{
		if(!proizvodRepository.existsById(id))
        {
        	return new ResponseEntity<Proizvod>(HttpStatus.NO_CONTENT);
	    }
		jdbcTemplate.execute("DELETE FROM stavka_racuna WHERE proizvod=" + id);
        proizvodRepository.deleteById(id);
        if(id == -100) 
        {
        	jdbcTemplate.execute(
        			"INSERT INTO \"proizvod\"(\"id\", \"naziv\", \"proizvodjac\")"
        			+ "VALUES (-100, 'Naziv Test', 3)");
        	
        }
		return new ResponseEntity<Proizvod>(HttpStatus.OK);
		
	}

}
