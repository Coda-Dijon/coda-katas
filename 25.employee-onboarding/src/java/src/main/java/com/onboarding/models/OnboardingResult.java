package com.onboarding.models;

import java.time.LocalDate;

public record OnboardingResult(int employeeId, String login, LocalDate enrolledAt) {
}
