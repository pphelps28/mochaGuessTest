Stories

# Pick a number, any number

Given the player starts the game

Then the computer should ask the player if their number is a random between 1 and 100

And waits for an answer, which it saves as a variable

---

# Let the computer win

Given the computer has guessed a number

When the player responds "yes" (or "y")

Then the game exits with a victory message.

# The computer guessed wrong

Given the computer has guessed a number

When the player responds "no" (or "n")

Then the computer asks if the number is higher or lower

---

# Modify your guess range

Given the computer guessed the incorrect number

When the player responds "higher" ("h") or "lower" ("l")

Then the computer modifies the range it guesses within based on if the number was higher or lower

And guesses a new number within the modified range

# Make it smarter

In the optimal solution, the game will find the correct number in no more than [log2(n)+1] guesses -- so for n=100, that's 7 guesses max. This solution is a good example of a binary search algorithm.
Given The player chooses a number between 1 and 100

Then the computer should guess the number in no more than 7 tries

---

# Extend the guess range

Given the game has not been started

When the game is first called with node index.js

Then allow the user to set the high range so it could be any number (greater than 1)

---

# Cheat Detector

Given a higher/lower response contradicts an earlier response

Then the computer complains

And asks again, or exits. e.g. But you said it was lower than 25, so it can't also be higher than 24!

# Role Reversal!

In two parts: 1. Write the reverse game, where the computer thinks of a number and the human guesses it. (Put this in a different source file so you don't mess up the first program.) 2. Combine your two programs into one, so the players (computer and human) take turns -- first one guesses, then the other, then repeat

---

# Icebox

## Refactor!

What code is shared between the two programs? Can you unify the code by extracting functions? Are your function and variable names descriptive? Can you remove any comments (without reducing clarity)?

## Test!

How could you write unit tests for a game like this? Are there any parts of the algorithm that you can extract into a function, then write tests for just that function?

References
https://www.khanacademy.org/computing/computer-science/algorithms/intro-to-algorithms/a/a-guessing-game - this page has a nice visualization of the game (click on the numbers in the box there) and nicely describes the binary search algorithm
http://www.101computing.net/guess-the-number-binary-search/
https://en.wikipedia.org/wiki/Binary_search_algorithm
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
