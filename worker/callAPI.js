const axios = require('axios');
const convertKanToEng = require('./convertKanToEng');
const { URL, ENDPOINTS } = require('./constants');

const sessionId = process.env.SESSION_ID || "phau4g5tiogzg4pet1qxeghs";

const myHeaders = new Headers();
myHeaders.append("Accept", "application/json, text/javascript, */*; q=0.01");
myHeaders.append("Accept-Language", "en-GB,en-US;q=0.9,en;q=0.8");
myHeaders.append("Cache-Control", "no-cache");
myHeaders.append("Connection", "keep-alive");
myHeaders.append("Content-Type", "application/json; charset=UTF-8");
myHeaders.append("Cookie", "ASP.NET_SessionId=" + sessionId);
myHeaders.append("Origin", "https://landrecords.karnataka.gov.in");
myHeaders.append("Pragma", "no-cache");
myHeaders.append("Referer", "https://landrecords.karnataka.gov.in/service53/About?dist_code=31&taluk_code=5&hobli_code=4&village_code=15&surveyno=647&surnoc=*&hissa=A%2f2&lang=kn_in");
myHeaders.append("Sec-Fetch-Dest", "empty");
myHeaders.append("Sec-Fetch-Mode", "cors");
myHeaders.append("Sec-Fetch-Site", "same-origin");
myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36");
myHeaders.append("X-Requested-With", "XMLHttpRequest");
myHeaders.append("sec-ch-ua", "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"");
myHeaders.append("sec-ch-ua-mobile", "?0");
myHeaders.append("sec-ch-ua-platform", "\"Windows\"");

let callAPI = async (surveyNo, hissano) => {
    const raw = "{'dist_code':'31','taluk_code':'5','hobli_code':'4','village_code':'15','surveyNo':'" + surveyNo
        + "','surnoc':'*','hissano':'" + hissano + "'}";

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        const result = await fetch("https://landrecords.karnataka.gov.in/service53/ds_rtc.asmx/getXml_Dsrtc", requestOptions)
        let data = await result.json();
        if (data?.d[0] == null || data.d[0].ownerdetails == null) {
            return;
        }
        data = data.d[0];
        const ownerdetails = data?.ownerdetails;
        const landdetails = data?.landdetails;
        const village = data?.village;

        const owner_full_name = convertKanToEng(ownerdetails[0].Ownername + " " + ownerdetails[0].Relation + " " + ownerdetails[0].Relative);
        const total_extent = landdetails[0].Totalextent;
        const surveyno = landdetails[0].Surveyno;
        const surnoc = landdetails[0].Surnoc;
        const hissa = landdetails[0].Hissa;
        const village_name = convertKanToEng(village[0].Villagename);
        const liablities = convertKanToEng(ownerdetails[0].Liablities);

        const row = { owner_full_name, total_extent, surveyno, surnoc, hissa, village_name, liablities }

        await sendDataToServer(row);
        console.log("result sent : ", surveyNo);
    }
    catch {
        console.log('error from landdetails api ', surveyNo, hissano);
        return false;
    }
    return true;
}

async function sendDataToServer(data) {
    try {
        await axios.post(URL + ENDPOINTS.RESULT, data);
    } catch (error) {
        console.log(data)
        console.error('Error Sending data: ', error);
    }
}

module.exports = callAPI;
