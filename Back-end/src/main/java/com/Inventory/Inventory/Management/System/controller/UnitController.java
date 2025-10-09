package com.Inventory.Inventory.Management.System.controller;

import com.Inventory.Inventory.Management.System.model.Unit;
import com.Inventory.Inventory.Management.System.service.UnitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/units")
public class UnitController {

    private final UnitService unitService;

    public UnitController(UnitService unitService) {
        this.unitService = unitService;
    }

    @GetMapping
    public List<Unit> list() { return unitService.listAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Unit> get(@PathVariable Long id) {
        return unitService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Unit> create(@RequestBody Unit u) {
        Unit saved = unitService.save(u);
        return ResponseEntity.created(URI.create("/api/units/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Unit> update(@PathVariable Long id, @RequestBody Unit u) {
        return unitService.findById(id).map(existing -> {
            existing.setCode(u.getCode());
            existing.setName(u.getName());
            existing.setDescription(u.getDescription());
            Unit saved = unitService.save(existing);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        unitService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
