Feature: Google Search Cheese

  Scenario: Search Google
    Given the user has navigated to "http://www.google.ca"
    When I search Google for "cheese"
    Then I should see "cheese" in the result