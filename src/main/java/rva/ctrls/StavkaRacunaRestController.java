package rva.ctrls;

import java.math.BigDecimal;
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
import rva.jpa.Proizvod;
import rva.jpa.Racun;
import rva.jpa.StavkaRacuna;
import rva.repository.ProizvodRepository;
import rva.repository.RacunRepository;
import rva.repository.StavkaRacunaRepository;

@RestController
@CrossOrigin
@Api(tags = {"Stavka Racuna CRUD operacije"})
public class StavkaRacunaRestController {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	@Autowired
	private StavkaRacunaRepository stavkaRacunaRepository;
	
	@Autowired
	private ProizvodRepository proizvodRepository;
	
	@Autowired
	private RacunRepository racunRepository;
	
	@GetMapping("stavkaRacuna")
	@ApiOperation(value="Vraca kolekciju stavku racuna iz baze podataka")
	public Collection<StavkaRacuna> getStavkeRacuna()
	{
		return stavkaRacunaRepository.findAll();
	}
	@GetMapping("stavkaRacuna/{id}")
	@ApiOperation(value="Vraca jednu stavku racuna iz baze podataka")
	public StavkaRacuna getStavkaRacuna(@PathVariable("id") Integer id) 
	{
		return stavkaRacunaRepository.getOne(id);
	}
	@GetMapping ("stavkeZaRacun/{id}")
	@ApiOperation(value="Vraca stavku racuna po porizvodu iz baze podataka")
	public Collection <StavkaRacuna> stavkaPoProizvodId(@PathVariable("id")Integer id)
	{
		Proizvod p=proizvodRepository.getOne(id);
		return stavkaRacunaRepository.findByProizvod(p);
	}
	
	
	@GetMapping ("stavkeZaRacunID/{id}")
	@ApiOperation(value="Vraca stavku racuna po racun id iz baze podataka")
	public Collection <StavkaRacuna> stavkaPoRacunId(@PathVariable("id")Integer id)
	{
		Racun r=racunRepository.getOne(id);
		return stavkaRacunaRepository.findByRacun(r);
	}
	
	
	@GetMapping("stavkaRacunaCena/{cena}")
	@ApiOperation(value="Vraca stavku racuna na osnovu cene iz baze podataka")
	public Collection<StavkaRacuna> stavkaRacunaCena(@PathVariable("cena") BigDecimal cena)
	{
		return stavkaRacunaRepository.findByCenaLessThanOrderById(cena);
	}
	@PostMapping("stavkaRacuna")
	@ApiOperation(value="Unosi jednu stavku racuna u bazu podataka")
	public ResponseEntity<StavkaRacuna> insertStavkaRacuna(@RequestBody StavkaRacuna stavkaRacuna)
	{
		if(!stavkaRacunaRepository.existsById(stavkaRacuna.getId())) 
		{
			stavkaRacuna.setRedniBroj(stavkaRacunaRepository.nextRBr(stavkaRacuna.getRacun().getId()));
			stavkaRacunaRepository.save(stavkaRacuna);
			return new ResponseEntity<StavkaRacuna>(HttpStatus.OK);
		}
		return new ResponseEntity<StavkaRacuna>(HttpStatus.CONFLICT);
	}
	@PutMapping("stavkaRacuna")
	@ApiOperation(value="Izmenjuje jednu stavku racuna u bazi podataka")
	public ResponseEntity<StavkaRacuna>updateStavkaRacuna(@RequestBody StavkaRacuna stavkaRacuna)
	{
		if(!stavkaRacunaRepository.existsById(stavkaRacuna.getId())) 
		{
			return new ResponseEntity<StavkaRacuna>(HttpStatus.NO_CONTENT);
		}
		stavkaRacunaRepository.save(stavkaRacuna);
		return new ResponseEntity<StavkaRacuna>(HttpStatus.OK);
		
	}
	@DeleteMapping("stavkaRacuna/{id}")
	@ApiOperation(value="Brise jednu stavku racuna iz baze podataka")
	public ResponseEntity<StavkaRacuna> deleteStavkaPorudzbine(@PathVariable("id") Integer id)
	{
		if(!stavkaRacunaRepository.existsById(id)) 
		{
			return new ResponseEntity<StavkaRacuna>(HttpStatus.NO_CONTENT);
		}
		stavkaRacunaRepository.deleteById(id);
		
		if(id==-100)
		{
			jdbcTemplate.execute(
					"INSERT INTO \"stavka_racuna\"(\"id\", \"racun\", \"redni_broj\", \"proizvod\", \"kolicina\",\"jedinica_mere\", \"cena\")"
		        			+ "VALUES (-100, 3, 1, 9, 2, 'Testkomad', 210)");
		}
		return new ResponseEntity<StavkaRacuna>(HttpStatus.OK);
	}
	
}
