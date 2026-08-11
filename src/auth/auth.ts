import { ref } from 'vue'


const savedUsername =
  sessionStorage.getItem('username') || 'משתמש'


export const currentUser = ref(savedUsername)


export const isLoggedIn = ref(
  sessionStorage.getItem('loggedIn') === 'true'
)


export function loginUser(username: string) {

  currentUser.value = username
  isLoggedIn.value = true
  console.log('username saved to sessionStorage:', username);

  sessionStorage.setItem('username', username)
  sessionStorage.setItem('loggedIn', 'true')

}


export function logoutUser() {

  currentUser.value = ''
  isLoggedIn.value = false

  sessionStorage.removeItem('username')
  sessionStorage.removeItem('loggedIn')

}

export default {
  currentUser,
  isLoggedIn,
  loginUser,
  logoutUser
}
