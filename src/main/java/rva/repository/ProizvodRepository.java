package rva.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import rva.jpa.Proizvod;
import java.util.Collection;

public interface ProizvodRepository extends JpaRepository <Proizvod, Integer>{
	
	Collection<Proizvod> findByNazivContainingIgnoreCase(String naziv);

}
