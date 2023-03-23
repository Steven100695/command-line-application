const prompts = require('prompts');

const api = require('./api.js');

const _discardPrompt = async () => {
    const result = await api.brand(`apple`, 1);
    const phones = result.phones;
    const displayPhone = phones.map((phone) => {
        return { title:`${phone.slug}` };
    });

    return await prompts([
        {
            type: 'select',
            name: 'phones',
            message: 'Select phones',
            choices: displayPhone
        }
    ]);
};

const search = async (args) => {
    const { type } = args;
    const { name } = args;

    // search by brand or model
    if (type == 'brand') {
        const result = await api.brand(name, 1);
    } else {
        const result = await api.model(name);
    }

}

_discardPrompt();

module.exports = {
    search
};