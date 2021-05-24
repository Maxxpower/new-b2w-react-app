export const showSpinner = () =>{
    const loaderContainer = document.getElementById('loaderContainer');
    loaderContainer.classList.remove('hidden');
}

export const hideSpinner = () =>{
    const loaderContainer = document.getElementById('loaderContainer');
    loaderContainer.classList.add('hidden');
}