Feature: Login
    Try to login to application
    and register

    Scenario Outline: Login to Cypress Real World App
        Given Open login page
        And  I can see login form
        And  Provide credentials of user "<username>" "<password>"
        Then   Sign in to app
    Examples:
            | username | password   |
            | test     | test       |
            | user     | pass123    |

