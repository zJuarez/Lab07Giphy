const API_KEY = 'WQ5n9w8An5ZoRAbdOYX1TJV9kmeGlsqJ';
const cities = [
    'Barcelona', 'Cancun', 'NYC', 'Tokio', 'Bruselas', 'Madrid', 'Monterrey',
    'Londres', 'Paris', 'Estambul'
];

$(document).ready(function() {
    // Start your code from here
    cities.forEach(createButton);
    const form = document.getElementById('city-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const city = document.getElementById('city-input').value;
        cities.push(city);
        createButton(city);
        document.getElementById('city-input').value = '';
    })

});

const createButton =
    (city) => {
        const button = document.createElement('button')
        button.innerHTML = city;
        button.classList.add('myButton');
        button.addEventListener('click', () => search(city))
        $('#city-buttons').append(button)
    }


const getSearchURL =
    (city) => {
        return `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${
          city}&limit=10&offset=0&rating=g&lang=es`
    }

const search = (city) => {
    $('#cities').empty()
    $.get(getSearchURL(city), (respuesta) => {
        respuesta.data.forEach((gif) => {
            const cityItem = document.createElement('div')
            cityItem.classList.add('city-item');
            const gifTitle = document.createElement('h5')
            gifTitle.innerHTML = gif.title;
            const cityImg = document.createElement('img')
            const imgUrl = gif.images.fixed_height_still.url;
            const gifUrl = gif.images.fixed_height.url;
            cityImg.dataset.imgUrl = imgUrl;
            cityImg.dataset.gifUrl = gifUrl;
            cityImg.src = imgUrl
            const gifRating = document.createElement('h6')
            gifRating.innerHTML = "Rating: " + gif.rating;
            cityItem.append(gifTitle);
            cityItem.append(cityImg);
            cityItem.append(gifRating);
            // button.addEventListener('click', () => search(city))
            $('#cities').append(cityItem)
        })
        $('img').hover(function() {
                this.src = this.dataset.gifUrl
            },
            function() {
                this.src = this.dataset.imgUrl
            })

    })

}