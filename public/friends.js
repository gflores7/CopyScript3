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
let showingBlocked = false;


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

  if (!currentUser) return;

  try {

    
    if (showingBlocked) {
      const blocked = await api(`/friends/blocked/${currentUser.userID}`);

      if (blocked.length === 0) {
        friendsList.innerHTML = '<p>No blocked users.</p>';
        return;
      }

      friendsList.innerHTML = blocked
        .map(function (user) {
          return `
            <div class="friend-row">
              <span>${user.userName}</span>
              <div class="friend-actions">
                <button class="unblock-btn" data-id="${user.userID}">Unblock</button>
              </div>
            </div>
          `;
        })
        .join('');

      // unblock buttons only
      friendsList.querySelectorAll('.unblock-btn')
        .forEach(btn => {
          btn.addEventListener('click', async function () {
            await unblockUser(Number(btn.dataset.id));
          });
        });

      return;
    }

    
    const friends = await api(`/friends/list/${currentUser.userID}`);

    if (friends.length === 0) {
      friendsList.innerHTML = '<p>No friends yet.</p>';
      return;
    }

    friendsList.innerHTML = friends
      .map(function (friend) {
        return `
          <div class="friend-row">
            <span>${friend.userName}</span>
            <div class="friend-actions">
              <button class="remove-btn" data-id="${friend.userID}">Unadd</button>
              <button class="block-btn" data-id="${friend.userID}">Block</button>
            </div>
          </div>
        `;
      })
      .join('');

    friendsList.querySelectorAll('.remove-btn')
      .forEach(btn => {
        btn.addEventListener('click', async function () {
          await removeFriend(Number(btn.dataset.id));
        });
      });

    friendsList.querySelectorAll('.block-btn')
      .forEach(btn => {
        btn.addEventListener('click', async function () {
          await blockUser(Number(btn.dataset.id));
        });
      });

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
}

async function removeFriend(friendID) {
  const currentUser = getCurrentUser();

  try {
    const data = await api('/friends/remove', {
      method: 'POST',
      body: JSON.stringify({
        currentUserID: currentUser.userID,
        friendID: friendID
      })
    });

    setText(friendResult, data.message);
    await loadFriends();

  } catch (error) {
    setText(friendResult, error.message, true);
  }
}

async function blockUser(friendID) {
  const currentUser = getCurrentUser();

  try {
    const data = await api('/friends/block', {
      method: 'POST',
      body: JSON.stringify({
        currentUserID: currentUser.userID,
        targetUserID: friendID
      })
    });

    setText(friendResult, data.message);
    await loadFriends();

  } catch (error) {
    setText(friendResult, error.message, true);
  }
}

async function unblockUser(friendID) {
  const currentUser = getCurrentUser();

  try {
    const data = await api('/friends/unblock', {
      method: 'POST',
      body: JSON.stringify({
        currentUserID: currentUser.userID,
        targetUserID: friendID
      })
    });

    setText(friendResult, data.message);
    await loadFriends();

  } catch (error) {
    setText(friendResult, error.message, true);
  }
}
document.getElementById('toggleBlockedBtn')
  .addEventListener('click', async function () {
    showingBlocked = !showingBlocked;

    this.textContent = showingBlocked
      ? 'Show Friends'
      : 'Show Blocked Users';

    await loadFriends();
  });