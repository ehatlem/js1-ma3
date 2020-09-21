
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
        displayHTML(htmlText);
    }
    catch (error) {
        htmlText = createError(error);
        displayHTML(htmlText);
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

function displayHTML(html) {
    const mainContainer = document.querySelector(".main-container");
    mainContainer.innerHTML = html;
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