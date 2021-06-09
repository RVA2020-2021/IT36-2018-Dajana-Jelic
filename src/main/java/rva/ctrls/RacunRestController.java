package rva.ctrls;

import java.sql.Date;
import java.util.Collection;

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
import rva.jpa.Racun;
import rva.repository.RacunRepository;

@RestController
@CrossOrigin
@Api(tags = {"Racun CRUD operacije"})
public class RacunRestController {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private RacunRepository racunRepository;
	
	@GetMapping("racun")
	@ApiOperation(value="Vraca kolekciju racuna iz baze podataka")
	public Collection <Racun> getRacuni()
	{
	
	 return racunRepository.findAll();	
	}
	@GetMapping("racun/{id}")
	@ApiOperation(value="Vraca jedan racun iz baze podataka")
	public Racun getRacun(@PathVariable("id") Integer id) 
	{
		return racunRepository.getOne(id);
	}
	
	@GetMapping("datum/{datum}")
	@ApiOperation(value="Vraca racun po datumu iz baze podataka")
	public Collection<Racun> getProizvodByNaziv(@PathVariable("datum") Date datum)
	{
		return racunRepository.findByDatum(datum);
	}
	
	@PostMapping("racun")
	@ApiOperation(value="Upisuje racun u bazu podataka")
	public ResponseEntity<Racun> insertRacun(@RequestBody Racun racun)
	{
		if(!racunRepository.existsById(racun.getId())) 
		{
			racunRepository.save(racun);
			return new ResponseEntity<Racun>(HttpStatus.OK);
		}
		return  new ResponseEntity<Racun>(HttpStatus.CONFLICT);
	}
	@PutMapping("racun")
	@ApiOperation(value="Izmenjuje racun iz baze podataka")
	public ResponseEntity<Racun> updateRacun(@RequestBody Racun racun)
	{
		if(!racunRepository.existsById(racun.getId())) 
		{
			return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT);
		}
		racunRepository.save(racun);
		return new ResponseEntity<Racun>(HttpStatus.OK);
		
	}
	@DeleteMapping("racun/{id}")
	@ApiOperation(value="Brise racun iz baze podataka")
	public ResponseEntity<Racun> deleteRacun(@PathVariable("id") Integer id)
	{
		if(!racunRepository.existsById(id)) 
		{
			return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT);
		}
		racunRepository.deleteById(id);
		if(id==-100) 
		{
			jdbcTemplate.execute(
					"INSERT INTO \"racun\"(\"id\", \"datum\", \"nacin_placanja\")"
		        			+ "VALUES (-100, '2020-02-08', 'kartica')");
		}
		return new ResponseEntity<Racun>(HttpStatus.OK);
		
	}	

}
