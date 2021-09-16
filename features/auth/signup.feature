Feature: Register User

@signup
@auth
@database
@business_exists
Scenario: 
    Given the user has valid inputs    
    And the business is registered
    When a new user registers for an existing business
    Then the user should be redirected to the dashboard

@signup
@auth
@database
Scenario:
    Given the user has valid inputs
    When a new user registers a new business
    Then the user should be redirected to the dashboard
