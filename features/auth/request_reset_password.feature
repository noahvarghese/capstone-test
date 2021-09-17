Feature: Request Reset Password

@auth
@database
@request_reset_password
Scenario: Request Reset Password Works
    Given the user is registered
    When the user requests to reset their password
    Then a token should be created
    And it should have an expiry
    And the user should receive an email