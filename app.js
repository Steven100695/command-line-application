const prompts = require('prompts');

const api = require('./api.js');

let currentPage = 1;
let lastPage = 0;

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

//brand prompt
const _brandPrompt = async (name) => {
    try {
        // Brand search reault can be more than 1 page
        // Therefore we nee to keep tracking the page number
        // and give users the option to view different pages result
        const result = await api.brand(name, currentPage);
        lastPage = result.last_page;
        const phonesList = result.phones;

        //
        const prompt = await prompts([
            {
                type: 'select',
                name: 'phones',
                message: 'Select phones',
                choices: phoneChoices(phonesList, currentPage, lastPage)
            }
        ]);

        // Recalling the function with different page number
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
        console.log(error);
    }
};

// model prompt
const _modelPrompt = async (name) => {
    try {
        const result = await api.model(name);
        const phones = result.phones;
        const displayPhone = phones.map((phone) => ({ value: phone.slug }));

        return await prompts([
            {
                type: 'select',
                name: 'phones',
                message: 'Select phones',
                choices: displayPhone,
            },
        ]);
    } catch (error) {
        console.log(error);
    }
};

// calling differernt prompts function depends on user commands
const _discardPrompt = async (type, name) => {
    if (type == 'brand') {
      return await _brandPrompt(name);
    } else {
      return await _modelPrompt(name);
    }
};

//search function
const search = async () => {
    // const { type } = args;
    // const { name } = args;

    // search phones by brands or models
    const result = await _discardPrompt('model', 'iphone 12');

}

search();

module.exports = {
    search
};