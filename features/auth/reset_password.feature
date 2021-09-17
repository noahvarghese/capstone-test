Feature: Reset Password

@auth
@database
@reset_password
Scenario: Reset Password Valid Token Resets Token and Expiry
    Given the user is registered
    And the user has requested to reset their password
    When they reset their password
    Then their password is reset
    And the token is cleared
    And the token expiry is cleared
    And the user should receive an email