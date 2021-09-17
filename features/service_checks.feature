Feature: Routes handled accordingly

    @redirect
    Scenario: Root request redirects to frontend
        When a user has navigated to the root of the backend
        Then they should be redirected to the frontend

    @auth
    @database
    @refresh
    Scenario: Refresh of logged in page keeps user logged in
        Given the user is logged in
        When the user refreshes the page
        Then they are in the same location