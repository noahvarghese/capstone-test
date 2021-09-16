Feature: Login User

@auth
@database
Scenario:
    Given the user has valid credentials 
    When the user submits their credentials
    Then the user should be redirected to the dashboard