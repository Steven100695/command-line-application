const fs = require('fs').promises;
const path = require('path');

const saveSearch = async (search, resultCount) => {
    try {
        // Get the absolute path to the searchHistory.json file
        const searchHistoryPath = path.join(__dirname, 'searchHistory.json');

        // Check if searchHistory.json exists, create it if it doesn't
        const fileExists = await fs.access(searchHistoryPath)
            .then(() => true)
            .catch(() => false);

        if (!fileExists) {
            await fs.writeFile(searchHistoryPath, '[]', 'utf-8');
        }

        // Read the previous searches from the JSON file
        let data = await fs.readFile(searchHistoryPath, 'utf-8');
        // Created empty array because it could not read an empty file
        let searches = [];
        if (data) {
            try {
                searches = JSON.parse(data);
            } catch (error) {
                console.error(`Error parsing search history: ${error}`);
            }
        }
        // Add the new search to the array
        searches.push({ search, resultCount });
  
        // Write the updated array to the searchHistory.json file
        await fs.writeFile(searchHistoryPath, JSON.stringify(searches, null, 2));

        //   console.log(`Search saved: ${JSON.stringify(search)}`);
    } catch (error) {
        console.error(`Error saving search: ${error}`);
    }
};

module.exports = {
  saveSearch
};