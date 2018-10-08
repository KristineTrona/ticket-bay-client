# Ticket-bay client

## Introduction

Ticket-bay project was built as a part of the Codaisseur learning programme.

This project uses  React & Redux on the front-end and connects to the back-end server, which you can also find on https://github.com/KristineTrona/ticket-bay-server. 

You can find the deployed version of the full app on https://ticket-bay-client.herokuapp.com/

## Motivation

The purpose of this app is to provide a market place for selling tickets to events in Amsterdam.

- Users are able to sign up and log in to their account.
- Without logging in it is possible to view events (shows only events that have not happened yet), view tickets that are sold for these events and view the comments made on the tickets if there are any.
- Logged in users are also able to add new events, add new tickets to events and add new comments to the tickets.
- They are also able to edit the ticket info for the tickets they have created.
- There is a basic risk calculation algorithm in place for tickets:
    - if the ticket is the only ticket of the author, add 10%
    - if the ticket price is lower than the average ticket price for that event, that's a risk
      if a ticket is X% cheaper than the average price, add X% to the risk
      if a ticket is X% more expensive than the average price, deduct X% from the risk
    - if the ticket was added during business hours (9-17), deduct 10% from the risk, if not, add 10% to the risk
    - if there are >3 comments on the ticket, add 5% to the risk
    
The minimal risk is 5% and the maximum risk is 95%. The risk level is also indicated by colours: red, yellow and green when a list of tickets is displayed. 
