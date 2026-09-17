package com.onboarding;

import com.onboarding.externals.EmployeeRepository;
import com.onboarding.externals.HrSystem;
import com.onboarding.externals.ItProvisioning;
import com.onboarding.externals.Payroll;
import com.onboarding.models.AcceptedOffer;
import com.onboarding.models.Account;
import com.onboarding.models.Contract;
import com.onboarding.models.Employee;
import com.onboarding.models.OnboardingResult;
import com.onboarding.models.exceptions.AccountProvisioningException;
import com.onboarding.models.exceptions.BusinessException;
import com.onboarding.models.exceptions.ContractGenerationException;
import com.onboarding.models.exceptions.EmployeeRegistrationException;
import com.onboarding.models.exceptions.PayrollEnrollmentException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class OnboardingTest {

    // ── Test data ─────────────────────────────────────────────────────────────
    private static final AcceptedOffer OFFER =
            new AcceptedOffer("Alice", "alice@corp.com", "Engineering", LocalDate.of(2024, 1, 15));
    private static final Employee REGISTERED_EMPLOYEE = new Employee(1, "Alice", "alice@corp.com");
    private static final Contract GENERATED_CONTRACT = new Contract(100, 1, LocalDate.of(2024, 1, 15));
    private static final Account PROVISIONED_ACCOUNT = new Account(1, "alice.corp");
    private static final OnboardingResult ENROLLMENT_RESULT =
            new OnboardingResult(1, "alice.corp", LocalDate.of(2024, 1, 15));

    private EmployeeRepository employees;
    private HrSystem hr;
    private ItProvisioning it;
    private Payroll payroll;

    @BeforeEach
    void setUp() {
        employees = offer -> REGISTERED_EMPLOYEE;
        hr = employee -> GENERATED_CONTRACT;
        it = contract -> PROVISIONED_ACCOUNT;
        payroll = account -> ENROLLMENT_RESULT;
    }

    private Onboarding onboarding() {
        return new Onboarding(employees, hr, it, payroll);
    }

    // ── Happy path ────────────────────────────────────────────────────────────

    @Test
    void returnsEnrollmentWhenAllStepsSucceed() {
        var result = onboarding().onboardNewHire(OFFER);

        assertThat(result).isEqualTo(ENROLLMENT_RESULT);
    }

    // ── Failure paths ─────────────────────────────────────────────────────────

    @Test
    void throwsBusinessExceptionWhenEmployeeRegistrationFails() {
        employees = offer -> {
            throw new EmployeeRegistrationException("Duplicate employee record");
        };

        assertThatThrownBy(() -> onboarding().onboardNewHire(OFFER))
                .isInstanceOf(BusinessException.class)
                .hasMessage("Duplicate employee record");
    }

    @Test
    void throwsBusinessExceptionWhenContractGenerationFails() {
        hr = employee -> {
            throw new ContractGenerationException("Missing salary band");
        };

        assertThatThrownBy(() -> onboarding().onboardNewHire(OFFER))
                .isInstanceOf(BusinessException.class)
                .hasMessage("Missing salary band");
    }

    @Test
    void throwsBusinessExceptionWhenAccountProvisioningFails() {
        it = contract -> {
            throw new AccountProvisioningException("Login already taken");
        };

        assertThatThrownBy(() -> onboarding().onboardNewHire(OFFER))
                .isInstanceOf(BusinessException.class)
                .hasMessage("Login already taken");
    }

    @Test
    void throwsBusinessExceptionWhenPayrollEnrollmentFails() {
        payroll = account -> {
            throw new PayrollEnrollmentException("Payroll system unavailable");
        };

        assertThatThrownBy(() -> onboarding().onboardNewHire(OFFER))
                .isInstanceOf(BusinessException.class)
                .hasMessage("Payroll system unavailable");
    }
}
