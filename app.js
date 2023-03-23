const prompts = require('prompts');

const api = require('./api.js');

let currentPage = 1;
let lastPage = 0;

//brand prompt
const _brandPrompt = async (name) => {
    const result = await api.brand(name, currentPage);
    lastPage = result.last_page;
    const phones = result.phones;
    const displayPhone = phones.map((phone) => ({ value: phone.slug }));;

    // brand search reault can be more then 1 page
    // we let the user has option to back and forward pages to see all the result
    if (currentPage == 1 && currentPage != lastPage) {
        displayPhone.push({ value: 'Next page' });
    } else {
        displayPhone.push({ value: 'Previous  page' });
        if (currentPage < lastPage) {
            displayPhone.push({ value: 'Next page' });
        }
    }

    const prompt = await prompts([
        {
            type: 'select',
            name: 'phones',
            message: 'Select phones',
            choices: displayPhone
        }
    ]);

    // User can selection next or previous page to view more results
    if (prompt.phones == 'Next page') {
        currentPage++;
        return _brandPrompt(name);
    } else if (prompt.phones == 'Previous  page') {
        currentPage--;
        return _brandPrompt(name);
    } else {
        currentPage = 1;
        return prompt;
    }
};

// model prompt
const _modelPrompt = async (name) => {
    const result = await api.model(name);
    const phones = result.phones;
    const displayPhone = phones.map((phone) => {
        return { value: phone.slug };
    });
  
    return await prompts([
        {
            type: 'select',
            name: 'phones',
            message: 'Select phones',
            choices: displayPhone,
        },
    ]);
};

// calling differernt prompts function depends on user commands
const _discardPrompt = async (type, name) => {
    if (type == 'brand') {
      return await _brandPrompt(name);
    } else {
      return await _modelPrompt(name);
    }
};

const search = async (args) => {
    const { type } = args;
    const { name } = args;

    // search phones by brands or models
    const result = await _discardPrompt(type, name);


}

search();

module.exports = {
    search
};