package com.onboarding.externals;

import com.onboarding.models.AcceptedOffer;
import com.onboarding.models.Employee;

public interface EmployeeRepository {
    Employee register(AcceptedOffer offer);
}
