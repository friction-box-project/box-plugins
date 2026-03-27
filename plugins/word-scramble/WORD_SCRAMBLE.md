
Game: Word Scramble

Summary: A word from the dictionary is pulled, scrambled and displayed
to the player. The object of the game is to identify as many sub-words
as possible, composed from any non-repeating subset of letters from
the original word.

Integration with FrictionBox:

This will be a FrictionBox. See BOX_IMPLEMENTATION_GUIDE.md and the
FRICIOTN_BOX's CLAUDE.md for details.


Design:

Every day there is just ONE word selected for all users to play with.
We should integrate w/ FrictionBox carefully for this.

There is a Fibonacci or exponential score distribution for guessed
word length to points. At the end of the timer interval the GameCard
is presented.

Components:

- LetterTile: An immutable letter tile, beige, styled, with rounded
  corners, with a thick, boggle or scrabble like font for each letter.
  Used to display the scrambled dictionary word at the top of the
  screen.

- We need a component for the text-area / user input, it should probably
  just be a cursor. Needs to look good on mobile and on web.

- WordBin: A bounded area where the users correct word guesses accumulated
  as WordChips.

- WordChips. Styled to a color mapping to the letter count, from some gradient.
  Rounded corners, doubled outline. Nice clean, punchy design.
  Guessing the KingWord (the originalScramble) makes for a mangnificent Golden
  WordChip which is filled in the word bin.

- GameCard: When the time elapses, the GameCard appears, it shows the WordChips,
  the Score in a large, clear font. It shows some message. It shows a share
  button.

Settings:

- Duration: The game is timed (since this is a friction box), so we
  may have 10s, 30s, 60s 2m, 5m - Letters in dictionary sample: 7-15

