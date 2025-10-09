package com.Inventory.Inventory.Management.System.service;

import com.Inventory.Inventory.Management.System.model.Unit;
import com.Inventory.Inventory.Management.System.repository.UnitRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UnitService {
    private final UnitRepository unitRepository;

    public UnitService(UnitRepository unitRepository) {
        this.unitRepository = unitRepository;
    }

    public List<Unit> listAll() { return unitRepository.findAll(); }
    public Optional<Unit> findById(Long id) { return unitRepository.findById(id); }
    public Unit save(Unit u) { return unitRepository.save(u); }
    public void delete(Long id) { unitRepository.deleteById(id); }
}
