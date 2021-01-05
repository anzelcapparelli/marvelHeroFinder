# marvelHeroFinder


Google Docs: https://docs.google.com/document/d/1TFO5ftuDn2ywDt2D9T3xx9bAdlQE8Pliq6rE7zQ5ROY/edit

Deployed Site: https://anzelcapparelli.github.io/marvelHeroFinder/


![Marvel Character Finder](./Images/mainScreenshot.jpg)

[Link to site](https://anzelcapparelli.github.io/marvelHeroFinder/) <br>
[Link to Github repository](https://github.com/anzelcapparelli/marvelHeroFinder/)

## Installation

Go to Github and download

## Description

The following code would create a page site that allows the user to enter a Marvel comic character. They can click the buttons with character names to search up any previously searched up characters or they can enter a character in the search bar.

Searching up a character brings out their profile. This should include a name, profile picture, stats radar chart, description, and GIPHY images. There is a also a link to the character Marvel Wikia page. 

## Credits
Eric Chen
Anzel Capparelli
Timothy Smith

## Features

1. Fill-In Search Bar

The user can type in their character and the search bar would suggest characters within the Marvel database to search. This was done using the JQuery autocomplete code and can be found in autocomplete.js

```
$( "#searchInput" ).autocomplete({
    source: possNames,
    autoFocus: true
  });
```

2. Local Storage Search History

When the user searches up a character, the computer records their last search and search history. The search history is used to create a list of character buttons for quick access. The last search is for when the user reloads the page, it'll display their last searched character.

3. Marvel API

The profile picture, description, and wikia link are obtained from the Marvel API using JQuery. The retrieved data are then displayed.

4. Stats and Charts

The character stats radar chart was created using Superhero API and chart.js. The stats are categorized into "intelligence", "strength", "speed", "durability", "power", and "combat".

5. GIPHY Search

The GIPHY search uses the Giphy API to obtain gifs of the searched character. The search URL uses conditions to refine the search as much as possible so gifs relating to other topics are not shown. 

6. Mobile Responsiveness

The bulma framework provides mobile responsiveness features. These were used to make the site more accesible for users on different devices. It'll alter the margins and container sizes. 

## Technologies Used

API
- Marvel API
- Superhero API
- GIPHY API

Framework
- Bulma
- Chart