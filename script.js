let searchtxt = document.getElementById('searchField');
let searchres = document.getElementById('searchResults');
let atfirst = document.getElementById('cats');

fetchGiphyAPI();

function searchbtn() {

    searchres.InnerHTML = "";
    fetchGiphyAPI(searchtxt.value);
}

function fetchGiphyAPI() {


    searchres.replaceChildren("");
    var url = "https://api.giphy.com/v1/gifs/trending";
    var param = "api_key=LpYtgf82wWflmoCO9a595AAzY1fuW4Vg&limit=40&offset=0&rating=g&lang=en";
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4 && this.status === 200) {
            processResponse(this.responseText);

        }
    });

    xhr.open("GET", url + "?" + param);

    xhr.send();
}

function processResponse(responseText) {
    var resp = JSON.parse(responseText);

    for (item of resp.data) {

        // each iteration will create a div for the frame of the images and append the image and like button to it
        let frameElement = document.createElement("div");
        let containerDiv = document.createElement("div");

        frameElement.setAttribute('class', 'card')
        containerDiv.setAttribute('class', 'container')

        let imgElement = document.createElement("img");
        imgElement.src = item.images.downsized_medium.url;
        imgElement.alt = item.title;
        imgElement.setAttribute('class', 'giphy_avatar')


        let buttonElement = document.createElement("i");
        buttonElement.setAttribute('class', 'saveDB heart fa fa-heart fa-fw fa-2x');
        buttonElement.setAttribute('data-url', item.images.downsized_medium.url);

        frameElement.appendChild(imgElement);
        frameElement.appendChild(containerDiv);
        containerDiv.appendChild(buttonElement);

        searchres.appendChild(frameElement);
    }

    var saveDB = document.getElementsByClassName("saveDB");

    var save = function () {
        var url = this.getAttribute("data-url");

        const endPoint = 'https://fast-shore-71195.herokuapp.com//save.php?src=' + url;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
        };

        fetch(endPoint, options).then(function (response) {
            alert('Giphy added to favourite list');
        })


    };

    for (var i = 0; i < saveDB.length; i++) {
        saveDB[i].addEventListener('click', save, false);
    }

}

