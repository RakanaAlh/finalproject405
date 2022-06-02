let searchtxt = document.getElementById('searchField');
let searchres = document.getElementById('searchResults');
let atfirst = document.getElementById('cats');


function searchbtn() {

    searchres.InnerHTML = "";
    fetchGiphyAPI(searchtxt.value);
};

function fetchGiphyAPI(keyword) {

    if (!keyword) {
        return;
    }

    searchres.replaceChildren("")
    var url = "https://api.giphy.com/v1/gifs/search";
    var param = "api_key=LpYtgf82wWflmoCO9a595AAzY1fuW4Vg&q=" + encodeURIComponent(keyword) + "&limit=30&offset=0&rating=g&lang=en";
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4 && this.status === 200) {
            processResponse(this.responseText, false);

        }
    });

    xhr.open("GET", url + "?" + param);

    xhr.send();
}


function processResponse(responseText, show_del_icon) {
    if (show_del_icon === false) {
        var resp = JSON.parse(responseText);

    } else
        var resp = responseText;//JSON.parse(responseText);
    searchres.innerHTML = "";

    for (var i = 0; i < resp.data.length; i++) {
        var item = resp.data[i];
        if (show_del_icon === false) {
            var src = item.images.downsized_medium.url;
        } else {
            var src = item.src;
        }

        let frameElement = document.createElement("div");
        let containerDiv = document.createElement("div");

        frameElement.setAttribute('class', 'card')
        containerDiv.setAttribute('class', 'container')

        let imgElement = document.createElement("img");
        imgElement.src = src;
        imgElement.alt = item.title;
        imgElement.setAttribute('class', 'giphy_avatar')


        let buttonElement = document.createElement("i");
        if (show_del_icon === true)
            buttonElement.setAttribute('class', 'removeDB trash fa fa-trash fa-fw fa-2x');
        else
            buttonElement.setAttribute('class', 'saveDB heart fa fa-heart fa-fw fa-2x');

        buttonElement.setAttribute('data-url', src);

        frameElement.appendChild(imgElement);
        frameElement.appendChild(containerDiv);
        containerDiv.appendChild(buttonElement);

        searchres.appendChild(frameElement);

    }

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


    var saveDB = document.getElementsByClassName("saveDB");

    for (var i = 0; i < saveDB.length; i++) {
        saveDB[i].addEventListener('click', save, false);
    }

    var removeDB = document.getElementsByClassName("removeDB");

    var remove = function () {
        var url = this.getAttribute("data-url");

        const endPoint = 'https://fast-shore-71195.herokuapp.com/delete.php?src=' + url;
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                src: url,
            })
        };

        fetch(endPoint, options).then(function (response) {
            alert('Giphy removed from favourite list');
            getLikedGiphies()
        })
    };

    for (var i = 0; i < removeDB.length; i++) {
        removeDB[i].addEventListener('click', remove, false);
    }
}

function getLikedGiphies() {

    const endPoint = 'https://fast-shore-71195.herokuapp.com/read.php';
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };

    fetch(endPoint, options)
        .then(function (response) {
            response.json().then(function (data) {
                    processResponse(data, true);
                }
            )
        })
}
if(window.location.href=="https://fast-shore-71195.herokuapp.com/liked.html")
getLikedGiphies();