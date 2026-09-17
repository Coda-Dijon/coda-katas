package com.onboarding.externals;

import com.onboarding.models.Contract;
import com.onboarding.models.Employee;

public interface HrSystem {
    Contract generateContract(Employee employee);
}
