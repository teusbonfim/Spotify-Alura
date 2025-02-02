const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${encodeURIComponent(searchTerm)}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result))
        .catch((error) => console.error('Erro ao buscar os artistas:', error));
}

function displayResults(result) {
    resultPlaylist.classList.add("hidden");
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    if (result.length > 0) {
        artistName.innerText = result[0].name;
        artistImage.src = result[0].urlImg;
        resultArtist.classList.remove('hidden');
    } else {
        resultArtist.classList.add('hidden');
    }
}

document.addEventListener('input', function () {
    if (!searchInput) return;

    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }
    
    requestApi(searchTerm);
});
