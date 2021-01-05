# marvelHeroFinder

![Marvel Character Finder](./Images/mainScreenshot.jpg)
![Marvel Character Finder](./Images/mainScreenshotPart2.jpg)

[Link to site](https://anzelcapparelli.github.io/marvelHeroFinder/) <br>
[Link to Github repository](https://github.com/anzelcapparelli/marvelHeroFinder/) <br>
Google Docs: https://docs.google.com/document/d/1TFO5ftuDn2ywDt2D9T3xx9bAdlQE8Pliq6rE7zQ5ROY/edit

## Installation

Go to Github and download

---

## Description

The following code would create a page site that allows the user to enter a Marvel comic character. They can click the buttons with character names to search up any previously searched up characters or they can enter a character in the search bar.

Searching up a character brings out their profile. This should include a name, profile picture, stats radar chart, description, and GIPHY images. There is a also a link to the character Marvel Wikia page. 

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

---

## License

MIT License

Copyright (c) [2021] [Marvel Superhero Finder]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Credits
[Eric Chen](https://github.com/EricChen96) <br>
[Anzel Capparelli](GITHUB URL) <br>
[Timothy Smith](GITHUB URL)