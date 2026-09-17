package com.onboarding.externals;

import com.onboarding.models.Account;
import com.onboarding.models.OnboardingResult;

public interface Payroll {
    OnboardingResult enroll(Account account);
}
