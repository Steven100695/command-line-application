const prompts = require('prompts');

const api = require('./api.js');
const history = require('./history.js');

// Variable to keep track of the page
let currentPage = 1;
let lastPage = 0;

// Function to create a list of phone choices based on the phones list and the current/last page numbers
const phoneChoices = (phonesList, currentPage, lastPage) => {
    const choices = phonesList.map((phone) => ({ value: phone.slug }));
    if (currentPage == 1 && currentPage != lastPage) {
        choices.push({ value: 'Next page' });
    } else {
        choices.push({ value: 'Previous  page' });
        if (currentPage < lastPage) {
            choices.push({ value: 'Next page' });
        }
    }
    return choices;
};

// Function to prompt the user to select a brand
const _brandPrompt = async (name) => {
    try {
        // Search for phones by brand name and page number
        const result = await api.brand(name, currentPage);
        lastPage = result.last_page;
        const phonesList = result.phones;

        // Save search result to history
        history.saveSearch({ brand: name, resultCount: phonesList.length });

        // Display a list of phone choices to the user and prompt them to select one
        const prompt = await prompts([
            {
                type: 'select',
                name: 'phones',
                message: 'Select phones',
                choices: phoneChoices(phonesList, currentPage, lastPage)
            }
        ]);

        // Recursively call this function with a different page number if the user selects "Next page" or "Previous page"
        if (prompt.phones == 'Next page') {
            currentPage++;
            return await _brandPrompt(name);
        } else if (prompt.phones == 'Previous  page') {
            currentPage--;
            return await _brandPrompt(name);
        } else {
            currentPage = 1;
            return prompt;
        }
    } catch (error) {
        console.log(`Item not found or the server is having issues, please try again.`);
    }
};

// Function to prompt the user to select a phone model
const _modelPrompt = async (name) => {
    try {
        // Search for phones by model name
        const result = await api.model(name);
        const phonesList = result.phones;
        const displayPhone = phonesList.map((phone) => ({ value: phone.slug }));

        // Save search result to history
        history.saveSearch({ model: name, resultCount: phonesList });

        // Display a list of phone choices to the user and prompt them to select one
        return await prompts([
            {
                type: 'select',
                name: 'phones',
                message: 'Select phones',
                choices: displayPhone,
            },
        ]);
    } catch (error) {
        console.log(`Item not found or the server is having issues, please try again.`);
    }
};

// Function to call the right prompt function based on the search type (brand or model)
const _discardPrompt = async (type, name) => {
    if (type == 'brand') {
      return await _brandPrompt(name);
    } else {
      return await _modelPrompt(name);
    }
};

// Main search function
const search = async (args) => {
    // Extract properties from the args
    const { type } = args;
    const { name } = args;

    // Call the function to prompt the user
    const result = await _discardPrompt(type, name);

    // Call the function to get the specifications details for the selected phone
    const specsDetail = await api.itemDetail(result.phones);

}

module.exports = {
    search
};