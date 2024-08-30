const axios = require('axios');
const callAPI = require('./callAPI');
const { URL, ENDPOINTS } = require('./constants');

const hissano = ["*", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "A", "B", "C", "D", "E",
    "A/1", "B/1", "C/1", "D/1", "E/1",
    "A/2", "B/2", "C/2", "D/2", "E/2",
    "A/3", "B/3", "C/3", "D/3", "E/3",
    "A/4", "B/4", "C/4", "D/4", "E/4",
    "A/5", "B/5", "C/5",
]


const worker = async () => {
    let retries = 5;
    while (1) {
        let promises = [];
        let surveyno;
        if (retries == 0) {
            break;
        }
        try {
            const response = await axios.get(URL + ENDPOINTS.SURVEY_NUM);
            surveyno = response.data.surveyno;
        } catch (error) {
            retries--;
            console.error('Error fetching data:', error);
            continue;
        }

        if (surveyno == -1)
            break;

        for (let h of hissano) {
            promises.push(callAPI(surveyno, h));
        }

        console.log("requests sent for survey no: ", surveyno);
        await Promise.all(promises);
        console.log("all requests resolved for ", surveyno);
    }
};

worker();
