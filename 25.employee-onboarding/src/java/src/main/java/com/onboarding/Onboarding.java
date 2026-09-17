package com.onboarding;

import com.onboarding.externals.EmployeeRepository;
import com.onboarding.externals.HrSystem;
import com.onboarding.externals.ItProvisioning;
import com.onboarding.externals.Payroll;
import com.onboarding.models.AcceptedOffer;
import com.onboarding.models.OnboardingResult;
import com.onboarding.models.exceptions.AccountProvisioningException;
import com.onboarding.models.exceptions.BusinessException;
import com.onboarding.models.exceptions.ContractGenerationException;
import com.onboarding.models.exceptions.EmployeeRegistrationException;
import com.onboarding.models.exceptions.PayrollEnrollmentException;

public class Onboarding {
    private final EmployeeRepository employees;
    private final HrSystem hr;
    private final ItProvisioning it;
    private final Payroll payroll;

    public Onboarding(EmployeeRepository employees, HrSystem hr, ItProvisioning it, Payroll payroll) {
        this.employees = employees;
        this.hr = hr;
        this.it = it;
        this.payroll = payroll;
    }

    public OnboardingResult onboardNewHire(AcceptedOffer offer) {
        try {
            var employee = employees.register(offer);
            var contract = hr.generateContract(employee);
            var account = it.provisionAccount(contract);
            return payroll.enroll(account);
        } catch (EmployeeRegistrationException e) {
            throw new BusinessException(e.getMessage());
        } catch (ContractGenerationException e) {
            throw new BusinessException(e.getMessage());
        } catch (AccountProvisioningException e) {
            throw new BusinessException(e.getMessage());
        } catch (PayrollEnrollmentException e) {
            throw new BusinessException(e.getMessage());
        }
    }
}
