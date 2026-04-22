<<<<<<< HEAD
import { api } from './api.js';

import {
  setCurrentUser,
  setSelectedContact,
  setConvoyList,
  getMessagePoll,
  setMessagePoll
} from './state.js';

import { registerForm, registerResult, loginResult } from './doc.js';

import { setText, renderCurrentUser, clearUiOnLogout } from './ui.js';

import { loadConvoys } from './convoys.js';
import { loadContacts, loadFriends, loadRequests } from './friends.js';



export async function registerUser(event) {
  event.preventDefault();

  const userName = document.getElementById('regUserName').value.trim();
  const firstName = document.getElementById('regFirstName').value.trim();
  const lastName = document.getElementById('regLastName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;

  try {
    const data = await api('/register', {
      method: 'POST',
      body: JSON.stringify({
        userName,
        first_name: firstName,
        last_name: lastName,
        email,
        password
      })
    });

    setText(registerResult, `${data.message} User ID: ${data.userID}`);
    registerForm.reset();

  } catch (error) {
    setText(registerResult, error.message, true);
  }
}



export async function loginUser(event) {
  event.preventDefault();

  const userName = document.getElementById('loginUserName').value.trim();
  const password = document.getElementById('loginPassword').value;

  try {
    const data = await api('/login', {
      method: 'POST',
      body: JSON.stringify({ userName, password })
    });

    setCurrentUser(data.user);

    renderCurrentUser();

    setText(loginResult, data.message);

    await loadConvoys();
    await loadContacts();
    await loadFriends();
    await loadRequests();

  } catch (error) {
    setText(loginResult, error.message, true);
  }
}



export function logout() {
  const poll = getMessagePoll();

  setCurrentUser(null);
  setSelectedContact(null);
  setConvoyList([]);

  localStorage.removeItem('convoyUser');

  if (poll) {
    clearInterval(poll);
  }

  setMessagePoll(null);

  renderCurrentUser();
  clearUiOnLogout();

  setText(loginResult, 'Logged out.');
=======
import { api } from './api.js';

import {
  setCurrentUser,
  setSelectedContact,
  setConvoyList,
  getMessagePoll,
  setMessagePoll
} from './state.js';

import { registerForm, registerResult, loginResult } from './doc.js';

import { setText, renderCurrentUser, clearUiOnLogout } from './ui.js';

import { loadConvoys } from './convoys.js';
import { loadContacts, loadFriends, loadRequests } from './friends.js';



export async function registerUser(event) {
  event.preventDefault();

  const userName = document.getElementById('regUserName').value.trim();
  const firstName = document.getElementById('regFirstName').value.trim();
  const lastName = document.getElementById('regLastName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;

  try {
    const data = await api('/register', {
      method: 'POST',
      body: JSON.stringify({
        userName,
        first_name: firstName,
        last_name: lastName,
        email,
        password
      })
    });

    setText(registerResult, `${data.message} User ID: ${data.userID}`);
    registerForm.reset();

  } catch (error) {
    setText(registerResult, error.message, true);
  }
}



export async function loginUser(event) {
  event.preventDefault();

  const userName = document.getElementById('loginUserName').value.trim();
  const password = document.getElementById('loginPassword').value;

  try {
    const data = await api('/login', {
      method: 'POST',
      body: JSON.stringify({ userName, password })
    });

    setCurrentUser(data.user);

    renderCurrentUser();

    setText(loginResult, data.message);

    await loadConvoys();
    await loadFriends();
    await loadRequests();

  } catch (error) {
    setText(loginResult, error.message, true);
  }
}



export function logout() {
  const poll = getMessagePoll();

  setCurrentUser(null);
  setSelectedContact(null);
  setConvoyList([]);

  localStorage.removeItem('convoyUser');

  if (poll) {
    clearInterval(poll);
  }

  setMessagePoll(null);

  renderCurrentUser();
  clearUiOnLogout();

  setText(loginResult, 'Logged out.');
>>>>>>> b62d3093348821586b713371f3f3d7db29d2d9d4
}