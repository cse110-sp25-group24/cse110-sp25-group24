---
title: [View Card ADR] - [Decide on specifics for how to view cards detail]
status: Proposed
date: 06-03-2025
decision-makers: [Yilong Chen, Eric Song, Myat Thiha]
---

## Summary

This ADR propose an implementation of card detail and card editing view.

## Context and Problem Statement

When we click a card in grid view, we want to see a full description, a large picture, and other card details. In this ADR, we must determine:

- How to display the card detail
- How to edit/delete cards

## Considered Options

### One HTML for one card

- When creating cards, we create a new HTML for each card, and when we click the card in grid view, we can jump to a HTML of the corresponding card.

### Reuse create card page

- When a user clicks a card in grid view, we actually go back to the create card page, but fill details for that card in it, so user can actually view the card detail, and can edit it if they like. Probably different portal leads to different functionality (clicking the edit button allows edit privilege, clicking the title will go to a view-only page)

## Decision Outcome

### Reuse create card page - Decision

- Since it's easier to implement, we are considering using this method to display card details.

## Consequences

### Positive

- One HTML for one card

  - More intuitive, can customize each card's style.

- Reuse the create card page
  - Easier to implement, easier to maintain.

### Negative

- One HTML for one card
  - Creating too many files, hard to track
- Reuse the create card page
  - View is relatively restricted(same as create card view)

### Confirmation

## Other Examples
