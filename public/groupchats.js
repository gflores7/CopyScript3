import { api } from './api.js';

import {
  getCurrentUser,
  setSelectedContact,
  getMessagePoll,
  setMessagePoll
} from './state.js';

import { chatTitle, messagesBox, contactsList } from './doc.js';

import { requireLogin, showChatPanel } from './ui.js';

import { escapeHtml } from './utils.js';


let selectedGroupChat = null;


export function getSelectedGroupChat() {
  return selectedGroupChat;
}

export function setSelectedGroupChat(group) {
  selectedGroupChat = group;
}

export async function loadGroupChats() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return;
  }

  showChatPanel('Select a group chat');
  setSelectedContact(null);
  messagesBox.innerHTML = '';

  const groupCreateBox = document.getElementById('groupCreateBox');
  const groupMembersPick = document.getElementById('groupMembersPick');

  
  groupCreateBox.style.display = 'block';


  contactsList.innerHTML = '';

  try {
    const groups = await api(`/groups/${currentUser.userID}`);

    if (groups.length === 0) {
      contactsList.innerHTML = '<p>No group chats yet.</p>';
    } else {
      groups.forEach(function (group) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'contact-btn';
        button.textContent = `Group: ${group.name}`;

        button.addEventListener('click', function () {
          selectGroupChat(group);
        });

        contactsList.appendChild(button);
      });
    }

  } catch (error) {
    contactsList.innerHTML = `<p class="error">${error.message}</p>`;
  }

  try {
    const contacts = await api(`/users/${currentUser.userID}/contacts`);

    groupMembersPick.innerHTML = '';

    if (contacts.length === 0) {
      groupMembersPick.innerHTML = '<p>No contacts to add.</p>';
      return;
    }

    contacts.forEach(function (contact) {
      const label = document.createElement('label');
      label.className = 'row gap';

      label.innerHTML = `
        <input type="checkbox" class="group-member-checkbox" value="${contact.userID}">
        <span>${escapeHtml(contact.first_name)} ${escapeHtml(contact.last_name)} (@${escapeHtml(contact.userName)})</span>
      `;

      groupMembersPick.appendChild(label);
    });

  } catch (error) {
    groupMembersPick.innerHTML = `<p class="error">${error.message}</p>`;
  }
}


export async function createGroup(event) {
  event.preventDefault();

  if (!requireLogin()) {
    return;
  }

  const currentUser = getCurrentUser();
  const groupNameInput = document.getElementById('groupNameInput');
  const groupName = groupNameInput.value.trim();

  const checkedBoxes = document.querySelectorAll('.group-member-checkbox:checked');
  const member_ids = Array.from(checkedBoxes).map(function (box) {
    return Number(box.value);
  });

  if (!groupName) {
    alert('Enter a group name.');
    return;
  }

  if (member_ids.length === 0) {
    alert('Pick at least one person.');
    return;
  }

  try {
    await api('/groups', {
      method: 'POST',
      body: JSON.stringify({
        name: groupName,
        created_by: currentUser.userID,
        member_ids: member_ids
      })
    });

    groupNameInput.value = '';

    document.querySelectorAll('.group-member-checkbox').forEach(function (box) {
      box.checked = false;
    });

    await loadGroupChats();

  } catch (error) {
    alert(error.message);
  }
}


export async function selectGroupChat(group) {
  selectedGroupChat = group;

  setSelectedContact(null);

  chatTitle.textContent = `Group: ${group.name}`;

  document.getElementById('leaveGroupBtn').style.display = 'block'

  await loadGroupMessages();

  const oldPoll = getMessagePoll();

  if (oldPoll) {
    clearInterval(oldPoll);
  }

  const newPoll = setInterval(loadGroupMessages, 3000);
  setMessagePoll(newPoll);
}


export async function loadGroupMessages() {
  const currentUser = getCurrentUser();

  if (!currentUser || !selectedGroupChat) {
    return;
  }

  try {
    const messages = await api(`/group-messages/${selectedGroupChat.id}`);

    if (messages.length === 0) {
      messagesBox.innerHTML = '<p>No group messages yet.</p>';
      return;
    }

    messagesBox.innerHTML = messages
      .map(function (message) {
        let who = `${message.first_name} ${message.last_name}`;
        let extraClass = '';

        if (Number(message.sender_id) === Number(currentUser.userID)) {
          who = 'You';
          extraClass = 'mine';
        }

        return `<div class="message ${extraClass}"><strong>${escapeHtml(who)}:</strong> ${escapeHtml(message.message_text)}</div>`;
      })
      .join('');

    messagesBox.scrollTop = messagesBox.scrollHeight;

  } catch (error) {
    messagesBox.innerHTML = `<p class="error">${error.message}</p>`;
  }
}

export async function sendMessage(event) {
  event.preventDefault();

  if (!requireLogin()) {
    return;
  }

  const currentUser = getCurrentUser();

  if (!selectedGroupChat) {
    alert('Select a group chat first.');
    return;
  }

  const input = document.getElementById('messageInput');
  const messageText = input.value.trim();

  if (!messageText) {
    return;
  }

  try {
    await api('/group-messages', {
      method: 'POST',
      body: JSON.stringify({
        group_id: selectedGroupChat.id,
        sender_id: currentUser.userID,
        message_text: messageText
      })
    });

    input.value = '';

    await loadGroupMessages();

  } catch (error) {
    alert(error.message);
  }
}

export async function leaveGroupChat() {
  const currentUser = getCurrentUser();

  if (!selectedGroupChat) {
    return;
  }
  
  const confirmLeave = confirm('Are you sure you want to leave this group?');

  if (!confirmLeave) {
    return;
  }

  try {
    await api('/groups/leave', {
      method: 'POST',
      body: JSON.stringify({
        group_id: selectedGroupChat.id,
        user_id: currentUser.userID
      })
    });

    setSelectedGroupChat(null);
    chatTitle.textContent = 'Select a group chat';
    messagesBox.innerHTML = '';

    document.getElementById('leaveGroupBtn').style.display = 'none';

    await loadGroupChats();

  } catch (error) {
    alert(error.message);
  }
}