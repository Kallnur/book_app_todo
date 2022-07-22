export const postRq = async (url, data, token) => {

    const loader = document.querySelector('.loader');
    loader.classList.remove('d-none');

    return await fetch(url, {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json;charset=utf-8",
            "X-Auth": token ? token : ''
        },
        body: JSON.stringify(data)
    })
    .then(resolve => {
        if (resolve.status == 200 && resolve.ok) return resolve.json();
        console.log(loader);
        loader.classList.add('d-none');

        return false
    })
}

export const putRq = async (url, data, token) => {

    const loader = document.querySelector('.loader');
    loader.classList.remove('d-none');

    return await fetch(url, {
        method: 'PUT',
        headers: { 
            "Content-Type": "application/json;charset=utf-8",
            "X-Auth": token ? token : ''
        },
        body: JSON.stringify(data)
    })
    .then(resolve => {
        if (resolve.status == 200 && resolve.ok) {
            loader.classList.add('d-none');
            return resolve.json()
        }
        

        return false
    })
}

export const getRq = async (url, token) => {

    const loader = document.querySelector('.loader');
    loader.classList.remove('d-none');

    const response = await fetch(url, {
        method: 'GET',
        headers: { 
            "Content-Type": "application/json;charset=utf-8",
            "X-Auth": token
        }
    }).then( (data) => {
        loader.classList.add('d-none');
        return data.json();
    })

    console.log(response);

    return response;
}

export const deleteBook = async (url, token) => {

    const loader = document.querySelector('.loader');
    loader.classList.remove('d-none');

    await fetch(url, {
        method: 'DELETE',
        headers: { 
            "Content-Type": "application/json;charset=utf-8",
            "X-Auth": token
        }
    }).then( () => loader.classList.add('d-none'))
}
