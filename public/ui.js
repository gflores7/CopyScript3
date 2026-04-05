import { getCurrentUser } from './state.js';

import {
  loginResult,
  currentUserEl,
  activeConvoySelect,
  contactsList,
  membersList,
  gpsList,
  friendsList,
  requestsList,
  messagesBox,
  chatTitle
} from './doc.js';



export function setText(element, text, isError = false) {
  element.textContent = text;

  if (isError) {
    element.classList.add('error');
  } else {
    element.classList.remove('error');
  }
}



export function requireLogin() {
  const user = getCurrentUser();

  if (!user) {
    setText(loginResult, 'Please log in first.', true);
    return false;
  }

  return true;
}



export function getActiveConvoyID() {
  const value = activeConvoySelect.value;

  if (!value) {
    return null;
  }

  return Number(value);
}



export function renderCurrentUser() {
  const user = getCurrentUser();

  if (user) {
    currentUserEl.textContent =
      `Logged in as ${user.first_name} ${user.last_name} (@${user.userName})`;
  } else {
    currentUserEl.textContent = 'Not logged in.';
  }
}



export function clearUiOnLogout() {
  activeConvoySelect.innerHTML = '';

  contactsList.innerHTML = '';
  membersList.innerHTML = '';
  gpsList.innerHTML = '';

  friendsList.innerHTML = '';
  requestsList.innerHTML = '';

  messagesBox.innerHTML = '';
  chatTitle.textContent = 'Select someone to chat';
}