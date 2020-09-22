
const url = "https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating";

async function getData() {
    try {
        const response = await fetch(url);
        const results = await response.json();
        const data = results.results;
        let htmlText = "";

        for (let i = 0; i < data.length; i++) {
            if (i === 8) {
                break;
            } else {
                htmlText += createHTML(data[i]);
            }
        }
        displayHTML(true, htmlText);
    }
    catch (error) {
        htmlText = createError(error);
        displayHTML(false, htmlText);
    }
}

getData();

function createHTML(dataObj) {
    let html = "";
    html = `
    <div class="flex-item">
        <ul>
            <li>Name: ${dataObj.name}</li>
            <li>Rating: ${dataObj.rating}</li>
            <li>Tags: ${dataObj.tags.length}</li>
        </ul>
    </div>`;
    return html;
}

function displayHTML(success, html) {
    const mainContainer = document.querySelector(".main-container");
    mainContainer.innerHTML = html;

    const flexItem = document.querySelectorAll(".flex-item");

    if (success) {
        flexItem.forEach(x => x.style.background = "rgba(144,238,144, 0.5)");
    } else {
        flexItem.forEach(x => x.style.background = "rgba(255,0,0, 0.5)");
    }

}

function createError(error) {
    let html = "";
    html = `
    <div class="flex-item">
        <h1>There was an error:</h1>
        <p>${error}</p>
    </div>`;
    return html;
}