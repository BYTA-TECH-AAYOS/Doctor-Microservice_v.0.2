package com.bytatech.ayoos.doctor.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the SlotStatus entity.
 */
public class SlotStatusDTO implements Serializable {

    private Long id;

    private String status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SlotStatusDTO slotStatusDTO = (SlotStatusDTO) o;
        if (slotStatusDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), slotStatusDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SlotStatusDTO{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
