package com.onboarding.models;

import java.time.LocalDate;

public record AcceptedOffer(String name, String email, String department, LocalDate startDate) {
}
