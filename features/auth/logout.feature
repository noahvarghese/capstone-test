Feature: Logout

@auth
@database
@logout
Scenario: Logout
    Given the user is logged in
    When the user logs out
    Then the user should be redirected to the login page