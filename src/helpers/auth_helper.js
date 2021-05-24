export default () =>{
    const token = JSON.parse(localStorage.getItem('b2wGinToken'));

    if(token){
        return token;
    }
    return {};
}