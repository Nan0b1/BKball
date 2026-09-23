# BKball is a web game where you have to make a ball go up by pulling two ropes 

This project is mainly designed to work with the BKpad, but you can play anyway on every platform :) <br>
The historical french game "boule montante" inspired this project, so you may already know the gameplay.

## How to play?

You can go on [BKball's official website](https://bkball.rf.gd), it supports every modern solution: computers, phones, tablets, and even smart fridges (not tested).


## controls

The controls are very simple and independent of the keyboard you ue :)
|platform       |controls   |
|---------------|-----------|
|computer|The 2 top left/right keys are there to push or pull the rope and the bottoms corners are to change levels|
|phone/tablet | Swipe up and down the side you want to pull the rope and swipe right and left to change levels|
| BKpad       | Turn the 2 potentiometers situated in the ears :3 |


## Run it locally?

This project only uses native html, css and javascript, so you can just download the files and open them on your localhost :D


## developpement state
Actually pretty finished!

### functionalities:
- Main board where all the gameplay is situated! It uses A big *svg* element and everything is moved by the js changing some *animate* values :)
- The project is fully vanilla html, js and css! You don't have to rely on anything but on these lines of code with custom physics made from scratch
- Bug proof: Everything is controlled by small functions :)
- No security issues: the server just sends the same index.html every time
- Hand made translations, with lang.js
- A whole level editing software inside it! It is genuinely hard to design levels by just tweaking arrays in some js

### problems:
**Google**, in 2 weeks, blacklisted my website 2 times for "fishing or malicious software". LOL this thing don't even send a single bite of what the entry() function get to the server TwT
I think the repeated changes to the website are flagged but each time it is resolved so no problems :D 

### Contributing?
If you find some bugs or want to add things feel free to ask :)
Thanks to Some Minecraft Modder who helped me at the beginning, and lang.js (+ the ; in the js)