function globalObj(){

    console.log('globalObj: i am here')

    const isNode = typeof process === 'object' && process.versions && !!process.versions.node;

    console.log('isNode? ')
    console.log(isNode)

    return isNode ? global : window;
 }


class Auth {
  static loggedIn() {
    return !!sessionStorage.jwt;

    // if(globalObj()["sessionStorage"] === undefined){
    //   return false;
    // }
    // else{
    //   return !!(globalObj()["sessionStorage"].jwt);
    // }
  }

  static logOut() {
    console.log('logging out...')
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('activeLanguage');
  }
}

export default Auth;
