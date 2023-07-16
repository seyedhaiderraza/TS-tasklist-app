# JS-dice-game
1. # Project summary
----------------

This is a Javascript only Project using HTML5/CSS3 to show a Finance app consisting of - login, transactions-deposit/withdrawal, transfer to, close account functionalities.

2. # Project URL
----------------

https://js-finance-app.vercel.app/

4. # Technology Stack used
-----------------
HTML5/CSS3
JavaScript: 📜 
  - DOM Manipulation,
  - EventListeners and handling
  - Array methods - push, pop, shift, unshift, slice, splice
  - functions
vercel deployment

5. # Functional Requirements/Acceptance Criteria
-----------------


HOMEPAGE NO LOGIN

GIVEN: user visits finance index page
WHEN: user views the page
THEN: user is not logged in
AND: login to get started is displayed at header


HOMEPAGE LOGIN

GIVEN: user visits finance index page
WHEN: user enters username 'jsmith' and pin 1234
THEN: user is able to log in
AND: able to see welcome back user on top header

TRANSACTIONS

GIVEN:user is logged in
WHEN: transactions is displayed on left grid
THEN: transactions display withdrawal and deposits
AND: transactions are in ascending order



TRANSFER

GIVEN: user is logged in
WHEN: user enters any full name from the test data below ( 'Jane Doe' etc)
AND: user enters amount< available amount
THEN: amount is shown as withdrawal in transaction
AND amount displayed as deposit is shown for login user jdoe pin 5678


DEPOSIT

GIVEN: user is logged in
WHEN: user enters amount > 101 $
THEN: amount is shown as deposits in transaction
AND amount displayed as deposit is shown for login user jdoe pin 5678



CLOSE Account

GIVEN: user is logged in
WHEN: user enters username and password in close account
THEN: the account temporarily gets disabled
AND: user unable to login back with the same credentials



ACCOUNT SUMMARY

GIVEN: user is logged in
WHEN: user scrolls down
THEN: the user is able to see acount summary - total deposits, total withdrawal, total interests



6. # Test Data(if any)
-----------------
 1. Transfer To : 'John Smith',
          Login : 'jsmith',
            pin : 1234,

    
2.  Transfer To :  'Jane Doe',
          Login : 'jdoe'
          pin: 5678,
    
3. Transfer To : 'Bob Johnson',
          pin: 9876,
           Login : 'bjohnson'
 4. Transfer To : 'Alice Lee',
          pin: 2468,
          Login: 'alee'
    
 5.  Transfer To : 'Tom Brown',
          pin: 1357,
          Login: 'tbrown'
 6. Transfer To :  'Sara Kim',
          pin: 3690,
          Login: 'skim'

7. # Screens
------------------
### Homepage without Login:
![image](https://github.com/seyedhaiderraza/JS-dice-game/assets/129282622/1e1f1d33-0a6f-46ef-99a7-26a24985c56f)

### HomePage with Login:
data: jsmith, 1234
![image](https://github.com/seyedhaiderraza/JS-dice-game/assets/129282622/0de0ae03-972f-4d79-a6fd-3b821d9a0da7)











