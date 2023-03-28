// TODO: add helper functions to present data in more readable formats
//       - e.g. capitalize first letter of each word
//       - e.g. handle null values in different scenarios
//       - e.g. show appearances as a list of episodes grouped by season

// capitalize function
export function capitalize(string) {
  // return the first character of the string in uppercase and the rest of the string in lowercase
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// recursive function to capitalize all words in a string
//NOTE - this function is not taking escaped characters into account - FIX THIS
//NOTE - this function is not taking null values (ofc) FIX with default 
export function capitalizeAll(string) {
  // split the string into an array of words
  const words = string.split(" ");
  // ternary operator to check if the string contains more than one word
  return words.length > 1 ? words.map((word) => capitalize(word)).join(" ") : capitalize(string);
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
    // const path = document.querySelector("#character-episodes");
    // console.log(path);
    // console.log(tableHTML);
    const container = document.querySelector("#character-episodes");
    container.insertAdjacentHTML("beforeend", tableHTML);
  }
}



// function for formatting firstAppearances into "Season x Episode x"