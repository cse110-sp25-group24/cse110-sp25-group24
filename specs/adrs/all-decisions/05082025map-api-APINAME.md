---
title: [Users/User Profiles ADR] - [Use JWT for Session and Access Management]
status: Proposed
date: 05-10-2025
decision-makers: [Myat Thiha, Noeh Parrales, Vincent Nguyen]
---

## Summary

**One-sentence overview of the decision.**
We will use JWT for user authentication to support public/private memory cards and a draft/save/publish workflow, with a user model that includes email, password, user_cards, and user_icon, all without external dependencies.

![Image of user flowchart](userFlowChart.svg)

---

## Context and Problem Statement

Users need a secure and intuitive way to authenticate themselves, manage their personal memory cards, and control who can view them. This includes the ability to view and edit only their own cards, toggle visibility between public and private, and publish selected cards to a shared map view. The system must ensure private data remains protected while allowing users flexible control over their content.

## Considered Options

* JWT(JSON Web Token)
* OAuth
* SAML SSO

## Decision Outcome

Chosen option: Custom access control system with JWT authentication and visibility flags managed in our own backend/database logic.

### Consequences

* Good, because it enables stateless, scalable session management
* Good, because we can implement custom access logic without relying on external tools
* Good, test cases are more readable than OAuth and SAML
* Good, test cases are easy to mock, easy to create test tokens
* Bad, because we must manage token expiration and refresh manually
* Bad, because we don’t offer third-party logins like “Sign in with Google” for now
* Bad, because if a token is leaked, it can be used until it expires 


### Confirmation

* Confirm JWT is only authentication library in use
* JWT tokens should be issued on login and verified for all protected endpoints
* Code Review with other members: Do members find JWT easy to use and logic easy to implement, etc
* Schedule a re-evaluation if JWT doesn’t scale well (authentication becomes a priority)
* Test token creation, expiration, and invalid access attempts to ensure security of private/public visibility


## Pros and Cons of the Options

### JWT

Homepage: <https://www.npmjs.com/package/jsonwebtoken>

* Good, Auth logic and visibility enforcement live fully in your code
* Good, we can include custom fields (e.g., userId, role, visibilityPref) in the token payload
* Good, fewer dependencies and faster development time compared to OAuth or SAML
* Bad, we must handle token expiration, refresh tokens, and secure storage (e.g., localStorage vs. httpOnly cookies).
* Bad, users must create new credentials (no "Login with Google”)
* Bad, improper signing, verification, or storage of tokens can lead to security vulnerabilities (e.g., token leakage, forgery).		


### OAuth

Homepage: <https://oauth.net/>

* Good, quick and easy for login users 
Log in with existing accounts (Google, Github, etc.)
* Good, has built in security features that handles token refresh and password recover
* Good, trustworthy and less account management for us 
* Bad, relies on third party API’s
* Bad, more complex setting it up, configuring OAuth flows	
* Bad, for the time limit set on use, can be overly complicated to implement 


### SAML

Homepage: <https://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html/>

* Good, widely used in enterprise SSO environments
* Good, it supports strong identity federation and works will with IdPs
* Bad, SML-based format and harer to read/debug
* Bad, tests is complex and requires external tools
* Bad, unit tests are hard to construuct
* Bad, the re-direct login flow complicates integration and setup

## More Information

Comparison between JWT and OAuth:
<https://frontegg.com/blog/oauth-vs-jwt>.
