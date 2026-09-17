package com.onboarding.models;

import java.time.LocalDate;

public record Contract(int id, int employeeId, LocalDate startDate) {
}
