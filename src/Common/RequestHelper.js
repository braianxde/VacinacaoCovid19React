let url = "https://localhost:44347/api/";
let token = sessionStorage.getItem("tokenAuthorization");

async function postRequest(path, data) {

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': token},
        body: JSON.stringify(data)
    };

    return await fetch(url + path, requestOptions)
        .then((response) => response.json());

}

async function getRequest(path, data) {
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': token},
    };
    let dataOnPath = "";

    if(data){
        dataOnPath = "/" + data;
    }

    return await fetch(url + path + dataOnPath, requestOptions)
        .then((response) => response.json());

}

async function putRequest(path, data) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': token},
        body: JSON.stringify(data)
    };

    return fetch(url + path, requestOptions)
        .then((response) => response.json());
}

async function delRequest(path, data) {
    const requestOptions = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json', 'Authorization': token},
    };

    return fetch(url + path + "/" + data, requestOptions)
        .then((response) => response.json());

}

module.exports = {
    postRequest: postRequest,
    getRequest: getRequest,
    putRequest: putRequest,
    delRequest: delRequest
};
