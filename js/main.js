// all ID's are called here
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('search-btn');
const bookContainer = document.getElementById('book-container')
const totalResults = document.getElementById('totalResults')
const errorDiv = document.getElementById('error');

// added addEventListener to searchBtn
searchBtn.addEventListener('click', function () {
    const searchText = searchInput.value;
    // clear section
    bookContainer.innerHTML = '';
    totalResults.innerText = '';
    searchInput.value = '';


    // blank search handel
    if (searchText == "") {
        errorDiv.classList.add('bg-danger')
        errorDiv.innerText = 'Please  Enter A Book Name!!'
        return;
    }

    //fetch dynamic search url
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => showData(data))

})

const showData = data => {
    // error handeling on no results
    if (data.numFound === 0) {
        errorDiv.innerText = "No Result's Found"
        errorDiv.classList.add('bg-danger')
    } else {
        errorDiv.innerText = '';
        errorDiv.classList.remove('bg-danger')
    }
    // captured data.docs into dataArray
    const dataArray = data.docs.slice(0, 20);

    // applied forEach on dataArray
    dataArray.forEach(element => {
        //created a div 
        const div = document.createElement('div');
        //add class to div
        div.classList.add('col-md-3');
        //set innerHTML to div
        div.innerHTML = `
            <div class="rounded overflow-hidden border p-2">
                <img style="height: 400px;" src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="w-100" alt="No Image Found" />
            </div>
            <div class="py-2 d-flex justify-content-between  align-items-center d-md-block text-md-center ">
                <h1>${element.title.slice(0, 20)}</h1>
                <h4>Author: ${element.author_name[0]}</h4>
                <h5>First Publish Year: ${element.first_publish_year}</h5>
                <h5>Publisher: ${element.publisher[0]}</h5>
            </div>
        
        `;
        //append div to bookContainer
        bookContainer.appendChild(div);

        // pass total resultsto error div

        errorDiv.innerHTML = `<p class="text-white bg-success  py-2">Results Found: ${data.numFound} | Result's Showd : ${dataArray.length} </p>`;
    });


}