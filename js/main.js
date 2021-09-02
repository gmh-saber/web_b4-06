// all ID's are called here
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('search-btn');
const bookContainer = document.getElementById('book-container')
const errorDiv = document.getElementById('error');
const spinner = document.getElementById('spiner')

// added addEventListener to searchBtn
searchBtn.addEventListener('click', () => {
    spinner.classList.remove('d-none')
    const searchText = searchInput.value;
    // clear section
    bookContainer.innerHTML = '';
    errorDiv.textContent = '';
    searchInput.value = '';


    // blank search handel
    if (searchText == "") {
        spinner.classList.add('d-none');
        errorDiv.classList.add('bg-danger')
        errorDiv.innerHTML = `<p class="py-2">Please  Enter A Book Name!!</p>`
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
        spinner.classList.add('d-none');
        errorDiv.innerHTML = `<p class="py-2">No Result's Found</p>`;
        errorDiv.classList.add('bg-danger')
    } else {
        errorDiv.textContent = '';
        errorDiv.classList.remove('bg-danger')
    }
    // captured data.docs into dataArray
    const dataArray = data.docs.slice(0, 20);

    // applied forEach on dataArray
    dataArray.forEach(element => {
        spinner.classList.add('d-none');
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
                <h1>${element.title}</h1>
                <h4>Author: ${element.author_name[0]}</h4>
                <h5>First Publish Year: ${element.first_publish_year}</h5>
                <h5>Publisher: ${element.publisher[0]}</h5>
            </div>
        
        `;
        //append div to bookContainer
        bookContainer.appendChild(div);

        // pass total resultsto error div

        errorDiv.innerHTML = `<p class="text-white bg-success  py-2">Results Found: ${data.numFound}</p>`;
    });


}