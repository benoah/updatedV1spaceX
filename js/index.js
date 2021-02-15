// import files
import createCompanyList from "./createCompanyList.js";
import createRocketCards from "./createRocketCards.js";
import displayNextLaunch from "./displayNextLaunch.js";
// api calls
let NEXT_LAUNCH = `https://api.spacexdata.com/v4/launches/next`;
export const ROCKETS_URL = `https://api.spacexdata.com/v4/rockets`;
let ABOUT_URL = `https://api.spacexdata.com/v4/company`;
const UPCOMING_LAUNCH_URL = `https://api.spacexdata.com/v4/launches/upcoming`;
let launchesArray;



// functions to grab data
async function getNextLaunch() {
    try {
        const response = await fetch(NEXT_LAUNCH);
        const json = await response.json();
        let data = json;
        displayNextLaunch(data);
    } catch (error) {
        console.log(error);
        // displayMessage("error", error, "container");
    }
}
getNextLaunch();


async function getRockets() {
    try {
        const response = await fetch(ROCKETS_URL);
        const json = await response.json();
        let data = json;
        let rocketsArray = data;
        createRocketCards(rocketsArray);
    } catch (error) {
        console.log(error);
        // displayMessage("error", error, "container");
    }
}
getRockets();


// asyn function that is going to fetch
async function getCompanyInformation() {
    try {
        const response = await fetch(ABOUT_URL);
        const json = await response.json();
        let data = json;
        createCompanyList(data);
    } catch (error) {
        console.log(error);
        // displayMessage("error", error, "container");
    }
}
getCompanyInformation();




fetch(UPCOMING_LAUNCH_URL)
    .then((response) => response.json())
    .then((data) => {
        launchesArray = data;
        displayLanuches(launchesArray);
    })
    .catch((error) => console.log(error));


function displayLanuches(launches) {
    const upcomingLaunchesContainer = document.querySelector(".upcominlaunh");



    launches.forEach(launch => {




        let launchDate = new Date(launch.date_local);
        let year = launchDate.getFullYear();
        let hour = launchDate.getHours();
        let min = launchDate.getMinutes();
        let month = { month: 'long' };
        let day = launchDate.getMinutes() + 1;


        console.log(launch);



        upcomingLaunchesContainer.innerHTML += `
    
            <div class="col-lg-3 col-md-3">
                <div class="event_details">
                    <div class="d-flex mb-4">
                    <div class="date"><span>${day}</span>${new Intl.DateTimeFormat("en-US", month).format(launchDate)} </div>
                    <div class="time-location">
                    <p><span class="ti-time mr-2"></span> ${hour}:${min} AM</p>
                    <p><span class="ti-location-pin mr-2"></span> ${year}</p>
                    <p><span class="ti-location-pin mr-2"></span> ${launch.name}</p>
                    </div>
                    </div>
                    <div class="row">
                    <div class="col-sm eventtext">
                    Flight nr:
                    ${launch.flight_number}
                  </div>
                  <div class="col-sm eventtext">
                  Name:${launch.name}
                  </div>
                  </div>
                </div>
                </div>`;
    });
}
