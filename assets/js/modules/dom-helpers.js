// capitalize function
export function capitalize(string) {
  // check if the string is null
  if (string === null) {
    return "No data available";
  }
  // return the first character of the string in uppercase and the rest of the string in lowercase
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function capitalizeAll(string) {
  // Check if the string is null
  if (string === null) {
    return "No data available";
  } 

  // define separator in the string
  let separator = " ";
  if (string.includes(", ")) {
    separator = ", ";
  }

  // Split the string into an array of words
  let words = string.split(separator);

  // Loop through each word and check if it has escaped quotes
  words = words.map((word) => {
    if (word.charAt(0) === '"' && word.charAt(word.length - 1) === '"') {
      // If the word has escaped quotes, capitalize the text between them
      const escapedWord = word.substring(1, word.length - 1);
      return `"${capitalize(escapedWord)}"`;
    } else {
      // If the word doesn't have escaped quotes, capitalize it normally
      return capitalize(word);
    }
  });

  // Join the words array back into a string and return it
  return words.join(" ");
}

// formatting nickname / hair color / catchphrase / religion / occupation / voiced by
export function generalFormatting(key, value, gender, name) {
  console.log(`GeneralFormatting: ${key}, ${value}, ${gender}, ${name}`);
  if (value === null) {
    return `No ${key} data available`;
  } else if (gender === "male") {
    return `His ${key} is ${value}`;
  } else if (gender === "female") {
    return `Her ${key} is ${value}`;
  } else {
    return `${name}'s ${key} is ${value}`;
  }
}

// format occupation
export function formatOccupation(occupation, gender, name) {
  console.log(`formatOccupation: ${occupation}, ${gender}, ${name}`);
  if (occupation === null) {
    return `No occupation data available`;
} else if (gender === "male" && occupation === "Student") {
    return `He is a student at South Park Elementary`;
} else if (gender === "female" && occupation === "Student") {
    return `She is a student at South Park Elementary`;
} else if (gender === "male") {
    return `He is a ${occupation}`;
} else if (gender === "female") {
    return `She is a ${occupation}`;
} else if (gender === null && occupation === "Student") {
    return `${name} are students at South Park Elementary`;
} else {
    return `${name} is a ${occupation}`;
}
}

// format voiced by
export function formatVoicedBy(voicedBy, gender, name) {
  if (voicedBy === null) {
    return `No voice actor data available`;
  } else if (gender === "male") {
    return `He is voiced by ${voicedBy}`;
  } else if (gender === "female") {
    return `She is voiced by ${voicedBy}`;
  } else {
    return `${name} is voiced by ${voicedBy}`;
  }
}


// formatting age
export function formatAge(age, gender, name) {
  if (age === null) {
    return `No age data available`;
  } else if (gender === "male") {
    return `He is ${age} years old`;
  } else if (gender === "female") {
    return `She is ${age} years old`;
  } else {
    return `${name} are ${age} years old`;
  }
}

// formatting gender
export function formatGender (gender) {
  if (gender === null) {
    return `No gender data available`;
  } else if (gender === "male") {
    return `He identifies as male`;
  } else if (gender === "female") {
    return `She identifies as female`;
  }
}

// function for formatting schoolgrade number into e.g. 1st, 2nd, 3rd, 4th, 5th etc
export function formatSchoolGrade (number) {
    if (number === null) {
        return "No School Grade";
    } else if (number === 1) {
        return `${number}st Grade`;
    } else if (number === 2) {
        return `${number}nd Grade`;
    } else if (number === 3) {
        return `${number}rd Grade`;
    } else {
        return `${number}th Grade`;
    }
    
}

// function for formatting episodes from a comma separated string of sxxexx into episodes grouped by seasons
// should output: Season 1: episode x, episode y, episode z, Season 2: episode x, episode y, episode z etc
export function formatEpisodes(string) {
  if (string === null) {
    const noEpisodes = /*html*/ `
        <p>No episode data available</p>
    `;
    const container = document.querySelector("#character-episodes");
    container.insertAdjacentHTML("beforeend", noEpisodes);
  } else {
    // split the string into an array of episodes
    const episodes = string.split(", ");
    // create an object to store the episodes by season
    const episodesBySeason = {};
    // loop through the episodes array
    episodes.forEach((episode) => {
      // split each episode into an array of season and episode number
      const seasonEpisode = episode.split("e");
      const season = parseInt(seasonEpisode[0].substring(1), 10);
      const episodeNum = parseInt(seasonEpisode[1], 10);
      // add the episode to the episodesBySeason object
      if (!episodesBySeason[season]) {
        episodesBySeason[season] = [];
      }
      episodesBySeason[season].push(episodeNum);
    });
    // create the HTML table
    const tableHTML = /*html*/ `
      <table>
        <thead>
          <tr>
            <th>Season</th>
            <th>Episodes</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(episodesBySeason).map(([season, episodes]) => {
              episodes.sort((a, b) => a - b);
              const episodeList = episodes.join(", ");
              return `
                <tr>
                  <td>Season ${season}</td>
                  <td>Episodes ${episodeList}</td>
                </tr>
              `;
            }).join("")}
        </tbody>
      </table>
    `;
    // insert the HTML table into the DOM
    const container = document.querySelector("#character-episodes");
    container.insertAdjacentHTML("beforeend", tableHTML);
  }
}

// function for formatting firstAppearances from sxxexx into character appears for the first time in Season x Episode x"
export function formatFirstAppearance(episode, character) {
  if (episode === null) {
    return "No data available";
  } else {
    // split the string into an array of season and episode number
    const seasonEpisode = episode.split("e");
    const season = parseInt(seasonEpisode[0].substring(1), 10);
    const episodeNum = parseInt(seasonEpisode[1], 10);
    return `${character} appears for the first time on the show in season ${season} episode ${episodeNum}.`;
  }
}

// function for formatting number of appearances into a string
export function formatAppearances(number, character) {
  if (number === null) {
    return "No data available";
  } else if (number === 1) {
    return `${character} appears in ${number} episode of the show.`;
  } else {
    return `${character} appears in ${number} episodes of the show.`;
  }
}