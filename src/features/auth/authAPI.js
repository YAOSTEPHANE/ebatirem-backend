export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-Type': 'application/json' },
    });
    const data = await response.json()
    // TODO: on server it will only return some info of user (mot de passe incorrect)
    resolve({ data })
  }
  );
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await fetch('http://localhost:8080/users?email=' + email);
    const data = await response.json()
    // TODO: on server it will only return some info of user (mot de passe incorrect)
console.log({data})
    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] })
      }
      else {
        reject({ message: 'mot de passe incorrect' })
      }
    } else {
      reject({ message: 'utilisateur non trouvé' })
    }


  });
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    resolve({ data:'success' });
  }
  );
}

