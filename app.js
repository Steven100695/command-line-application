const prompts = require('prompts');

const api = require('./api.js');

let currentPage = 1;
let lastPage = 0;

const _discardPrompt = async (type, name) => {
    try {
        //if user choose search by brand
        if (type == `brand`) {
            const result = await api.brand(name, currentPage);
            lastPage = result.last_page;
            const phones = result.phones;
            const displayPhone = phones.map((phone) => {
                return { value: phone.slug };
            });

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

            if (prompt.phones == 'Next page') {
                currentPage++;
                return _discardPrompt(type,name);
            } else if (prompt.phones == 'Previous  page') {
                currentPage--;
                return _discardPrompt(type,name);
            } else {
                currentPage = 1;
                return prompt;
            }

        } else {
            //if user choose search by model
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
                    choices: displayPhone
                }
            ]);
        }
    } catch (error) {
        console.log(error);
    }

};

const search = async (args) => {
    const { type } = args;
    const { name } = args;

    // search by brand or model
    const result = await _discardPrompt(type, name);


}

search();

module.exports = {
    search
};