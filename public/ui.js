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
  chatTitle,
  chatPanel
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
  hideChatPanel();
}



export function showChatPanel(title = 'Select someone to chat') {
  chatPanel.style.display = 'block';
  chatTitle.textContent = title;
  messagesBox.innerHTML = '';
}

export function hideChatPanel() {
  chatPanel.style.display = 'none';
  chatTitle.textContent = '';
  messagesBox.innerHTML = '';
}