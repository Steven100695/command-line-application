const superagent = require('superagent');
const base = 'https://phone-specs-api.azharimm.dev';

const brand = async (brandName, page) => {
    // https://phone-specs-api.azharimm.dev/brands/apple-phones-48?page=1
    // Every brand and phones have their own id, we need those IDs for our API link.
    // Since the user will have no idea what those IDs are, we need to find it ourself.
    try {
        // First, we list all the brand
        const brandURL = `${base}/brands`;
        const res = await superagent.get(brandURL);
        // Next, we find the requsted brands object by finding the brand name
        const brand = res.body.data.find((brand) => brand.brand_name.toLowerCase().includes(brandName.toLowerCase()));
        // Get the object brand_id
        const brandId = brand.brand_id;

        // Voila! We got our link.
        const brandNameURL = `${base}/brands/${brandName}-phones-${brandId}?page=${page}`;
        const resquest = await superagent.get(brandNameURL);
        console.log(resquest.body);
    } catch (error) {
        console.log(error);
    }
};

const model = async (modelsName) => {
    // https://phone-specs-api.azharimm.dev/search?query=iPhone_12_pro_max
    try {
        const modelURL = `${base}/search?query=${modelsName}`;
        console.log(modelURL);

        const res = await superagent.get(modelURL);
        console.log(res.body);

        return res.body;
    } catch (error) {
        console.log(error);
    }
};

model('apple ipad pro 12');