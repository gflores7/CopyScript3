<<<<<<< HEAD
import { api } from './api.js';

import { getCurrentUser } from './state.js';

import {
  friendRequestForm,
  friendResult,
  friendsList,
  requestsList,
  contactsList
} from './doc.js';

import { setText, requireLogin } from './ui.js';

import { selectContact } from './messages.js';



export async function sendFriendRequest(event) {
  event.preventDefault();

  if (!requireLogin()) {
    return;
  }

  const currentUser = getCurrentUser();

  const friendUsername = document.getElementById('friendUsername').value.trim();

  try {
    const data = await api('/friends/request', {
      method: 'POST',
      body: JSON.stringify({
        currentUserID: currentUser.userID,
        friendUsername: friendUsername
      })
    });

    setText(friendResult, data.message);

    friendRequestForm.reset();

    await loadRequests();

  } catch (error) {
    setText(friendResult, error.message, true);
  }
}



export async function loadFriends() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return;
  }

  try {
    const friends = await api(`/friends/list/${currentUser.userID}`);

    if (friends.length === 0) {
      friendsList.innerHTML = '<p>No friends yet.</p>';
      return;
    }

    friendsList.innerHTML = friends
      .map(function (friend) {
        return `<div>${friend.userName}</div>`;
      })
      .join('');

  } catch (error) {
    friendsList.innerHTML = `<p class="error">${error.message}</p>`;
  }
}



export async function loadRequests() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return;
  }

  try {
    const requests = await api(`/friends/requests/${currentUser.userID}`);

    if (requests.length === 0) {
      requestsList.innerHTML = '<p>No pending requests.</p>';
      return;
    }

    requestsList.innerHTML = '';

    requests.forEach(function (request) {
      const row = document.createElement('div');
      row.className = 'request-row';

      row.innerHTML = `
        <span>${request.senderName}</span>
        <div class="row gap">
          <button type="button" data-id="${request.sender_id}" data-accept="true">Accept</button>
          <button type="button" data-id="${request.sender_id}" data-accept="false">Deny</button>
        </div>
      `;

      requestsList.appendChild(row);
    });

    const buttons = requestsList.querySelectorAll('button');

    buttons.forEach(function (button) {
      button.addEventListener('click', async function () {
        const senderID = Number(button.dataset.id);
        const accept = button.dataset.accept === 'true';

        await respondToRequest(senderID, accept);
      });
    });

  } catch (error) {
    requestsList.innerHTML = `<p class="error">${error.message}</p>`;
  }
}



export async function respondToRequest(senderID, accept) {
  const currentUser = getCurrentUser();

  try {
    const data = await api('/friends/respond', {
      method: 'POST',
      body: JSON.stringify({
        sender_id: senderID,
        receiver_id: currentUser.userID,
        accept: accept
      })
    });

    setText(friendResult, data.message);

    await loadFriends();
    await loadRequests();

  } catch (error) {
    setText(friendResult, error.message, true);
  }
}



export async function loadContacts() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return;
  }

  try {
    const contacts = await api(`/users/${currentUser.userID}/contacts`);

    contactsList.innerHTML = '';

    if (contacts.length === 0) {
      contactsList.innerHTML = '<p>No contacts available.</p>';
      return;
    }

    contacts.forEach(function (contact) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'contact-btn';
      button.textContent = `${contact.first_name} ${contact.last_name} (@${contact.userName})`;

      button.addEventListener('click', function () {
        selectContact(contact);
      });

      contactsList.appendChild(button);
    });

  } catch (error) {
    contactsList.innerHTML = `<p class="error">${error.message}</p>`;
  }
=======
import { api } from './api.js';

import { getCurrentUser } from './state.js';

import {
  friendRequestForm,
  friendResult,
  friendsList,
  requestsList,
  contactsList
} from './doc.js';

import { setText, requireLogin, showChatPanel } from './ui.js';

import { selectContact } from './messages.js';

import { setSelectedGroupChat } from './groupchats.js';


export async function sendFriendRequest(event) {
  event.preventDefault();

  if (!requireLogin()) {
    return;
  }

  const currentUser = getCurrentUser();

  const friendUsername = document.getElementById('friendUsername').value.trim();

  try {
    const data = await api('/friends/request', {
      method: 'POST',
      body: JSON.stringify({
        currentUserID: currentUser.userID,
        friendUsername: friendUsername
      })
    });

    setText(friendResult, data.message);

    friendRequestForm.reset();

    await loadRequests();

  } catch (error) {
    setText(friendResult, error.message, true);
  }
}



export async function loadFriends() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return;
  }

  try {
    const friends = await api(`/friends/list/${currentUser.userID}`);

    if (friends.length === 0) {
      friendsList.innerHTML = '<p>No friends yet.</p>';
      return;
    }

    friendsList.innerHTML = friends
      .map(function (friend) {
        return `<div>${friend.userName}</div>`;
      })
      .join('');

  } catch (error) {
    friendsList.innerHTML = `<p class="error">${error.message}</p>`;
  }
}



export async function loadRequests() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return;
  }

  try {
    const requests = await api(`/friends/requests/${currentUser.userID}`);

    if (requests.length === 0) {
      requestsList.innerHTML = '<p>No pending requests.</p>';
      return;
    }

    requestsList.innerHTML = '';

    requests.forEach(function (request) {
      const row = document.createElement('div');
      row.className = 'request-row';

      row.innerHTML = `
        <span>${request.senderName}</span>
        <div class="row gap">
          <button type="button" data-id="${request.sender_id}" data-accept="true">Accept</button>
          <button type="button" data-id="${request.sender_id}" data-accept="false">Deny</button>
        </div>
      `;

      requestsList.appendChild(row);
    });

    const buttons = requestsList.querySelectorAll('button');

    buttons.forEach(function (button) {
      button.addEventListener('click', async function () {
        const senderID = Number(button.dataset.id);
        const accept = button.dataset.accept === 'true';

        await respondToRequest(senderID, accept);
      });
    });

  } catch (error) {
    requestsList.innerHTML = `<p class="error">${error.message}</p>`;
  }
}



export async function respondToRequest(senderID, accept) {
  const currentUser = getCurrentUser();

  try {
    const data = await api('/friends/respond', {
      method: 'POST',
      body: JSON.stringify({
        sender_id: senderID,
        receiver_id: currentUser.userID,
        accept: accept
      })
    });

    setText(friendResult, data.message);

    await loadFriends();
    await loadRequests();

  } catch (error) {
    setText(friendResult, error.message, true);
  }
}



export async function loadContacts() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return;
  }

  showChatPanel('Select someone to chat');
  setSelectedGroupChat(null);

  document.getElementById('leaveGroupBtn').style.display = 'none';
  
  try {
    const groupCreateBox = document.getElementById('groupCreateBox');
  if (groupCreateBox) {
      groupCreateBox.style.display = 'none';
    }

    contactsList.innerHTML = '';

    const contacts = await api(`/users/${currentUser.userID}/contacts`);

    if (contacts.length === 0) {
      contactsList.innerHTML = '<p>No contacts available.</p>';
      return;
    }

    contacts.forEach(function (contact) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'contact-btn';
      button.textContent = `${contact.first_name} ${contact.last_name} (@${contact.userName})`;

      button.addEventListener('click', function () {
        selectContact(contact);
      });

      contactsList.appendChild(button);
    });

  } catch (error) {
    contactsList.innerHTML = `<p class="error">${error.message}</p>`;
  }
>>>>>>> b62d3093348821586b713371f3f3d7db29d2d9d4
}