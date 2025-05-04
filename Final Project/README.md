Creative Coding Final Project – Development Process

Initial Setup:
I started the game with simple functionality. The main character just had to dodge moving villain sprites in a time-based survival game. I experimented with speeding up the villain sprites, but it got messy. I figured turning it into a shooting game would be more fun.

Sprite Creation & Visuals:
I created custom sprites for the "Game Over" message, the main character, villains, bullet, and the "poof" visual. I also found music and a background image online to give the game more personality and visual interest.

Bug Size Adjustment:
The sprites were way too small at first. The bug was originally 64px by 64px, and I think the villain’s original size was 128px by 128px. I scaled them up by about 3 or 4 times to make them easier to see and interact with during gameplay.

Collision Boxes:
While testing the game, I noticed the collision boxes were way too big. The main character would lose just by getting close to a villain. I figured this out by adding visuals to help me see the collision boxes. Once I could see the actual size, I resized the hitboxes to better match the sprite images.

Shooting Mechanic:
To make the game more interactive, I added bullets that let the player shoot villains. When a bullet hits a villain, the villain disappears and the score increases. At first, the bullets only shot in one direction, so I added logic to make them shoot in the direction the character was moving. If I had more time, I’d work on letting the player shoot in a specific direction without having to move the sprite.

Restart Bug – Sprite Duplication:
Early on, I noticed that restarting the game caused all the sprites and background elements to duplicate, which made everything messy and unplayable.
Fix: I added logic in the restartGame() function to:

Clear existing sprites by resetting arrays like villains = [] and bullets = [].

Reset the main character’s position and the score.

Stop and restart the music properly to avoid overlapping.

Sound & Music Issues:
At first, none of the sound or music worked. I realized I hadn’t included the p5.sound library. After adding it, the sounds still wouldn’t play—apparently (as far as I can tell) Chrome blocks autoplaying sound. I installed and used Live Server instead of just opening the HTML file directly in the browser, and that finally got the audio to work.

I also added buttons to control the sound, allowing the player to turn them all on or off. For future edits, I'd make controls for each specific sound. Then I added some final instructions to the game so users would know how to play.

Weird Browser Problem:
For a while, the game only worked in an incognito browser window. In a regular window, nothing worked. Clearing the browser cache eventually fixed it, but I’m still not totally sure what caused it.

