<<<<<<< HEAD
import { api } from './api.js';

import { getCurrentUser, setConvoyList } from './state.js';

import {
  convoyResult,
  createConvoyForm,
  joinConvoyForm,
  activeConvoySelect,
  membersList,
  gpsList
} from './doc.js';

import { setText, requireLogin, getActiveConvoyID } from './ui.js';

import { loadGps } from './gps.js';



export async function loadConvoys() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return;
  }

  try {
    const convoys = await api(`/convoys/by-user/${currentUser.userID}`);

    setConvoyList(convoys);

    activeConvoySelect.innerHTML = '';

    if (convoys.length === 0) {
      const option = document.createElement('option');
      option.value = '';
      option.textContent = 'No convoys yet';
      activeConvoySelect.appendChild(option);

      membersList.innerHTML = '';
      gpsList.innerHTML = '';
      return;
    }

    convoys.forEach(function (convoy) {
      const option = document.createElement('option');
      option.value = convoy.convoyID;
      option.textContent = `${convoy.name} (${convoy.joinCode})`;
      activeConvoySelect.appendChild(option);
    });

    await loadMembers();
    await loadGps();

  } catch (error) {
    setText(convoyResult, error.message, true);
  }
}



export async function createConvoy(event) {
  event.preventDefault();

  if (!requireLogin()) {
    return;
  }

  const currentUser = getCurrentUser();

  const convoyName = document.getElementById('convoyName').value.trim();
  const joinCode = document.getElementById('createJoinCode').value.trim();

  try {
    const data = await api('/convoys', {
      method: 'POST',
      body: JSON.stringify({
        userID: currentUser.userID,
        name: convoyName,
        joinCode: joinCode
      })
    });

    setText(convoyResult, `${data.message} Convoy ID: ${data.convoyID}`);

    createConvoyForm.reset();

    await loadConvoys();

  } catch (error) {
    setText(convoyResult, error.message, true);
  }
}



export async function joinConvoy(event) {
  event.preventDefault();

  if (!requireLogin()) {
    return;
  }

  const currentUser = getCurrentUser();

  const joinCode = document.getElementById('joinCode').value.trim();

  try {
    const data = await api('/convoys/join', {
      method: 'POST',
      body: JSON.stringify({
        userID: currentUser.userID,
        joinCode: joinCode
      })
    });

    setText(convoyResult, `${data.message} Convoy ID: ${data.convoyID}`);

    joinConvoyForm.reset();

    await loadConvoys();

  } catch (error) {
    setText(convoyResult, error.message, true);
  }
}



export async function loadMembers() {
  const convoyID = getActiveConvoyID();

  if (!convoyID) {
    membersList.innerHTML = '<p>No active convoy selected.</p>';
    return;
  }

  try {
    const members = await api(`/convoys/${convoyID}/members`);

    if (members.length === 0) {
      membersList.innerHTML = '<p>No members found.</p>';
      return;
    }

    membersList.innerHTML = members
      .map(function (member) {
        return `<div>${member.userName} - ${member.role}</div>`;
      })
      .join('');

  } catch (error) {
    membersList.innerHTML = `<p class="error">${error.message}</p>`;
  }
=======
import { api } from './api.js';

import { getCurrentUser, setConvoyList } from './state.js';

import {
  convoyResult,
  createConvoyForm,
  joinConvoyForm,
  activeConvoySelect,
  membersList,
  gpsList
} from './doc.js';

import { setText, requireLogin, getActiveConvoyID } from './ui.js';

import { loadGps } from './gps.js';



export async function loadConvoys() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return;
  }

  try {
    const convoys = await api(`/convoys/by-user/${currentUser.userID}`);

    setConvoyList(convoys);

    activeConvoySelect.innerHTML = '';

    if (convoys.length === 0) {
      const option = document.createElement('option');
      option.value = '';
      option.textContent = 'No convoys yet';
      activeConvoySelect.appendChild(option);

      membersList.innerHTML = '';
      gpsList.innerHTML = '';
      return;
    }

    convoys.forEach(function (convoy) {
      const option = document.createElement('option');
      option.value = convoy.convoyID;
      option.textContent = `${convoy.name} (${convoy.joinCode})`;
      activeConvoySelect.appendChild(option);
    });

    await loadMembers();
    await loadGps();

  } catch (error) {
    setText(convoyResult, error.message, true);
  }
}



export async function createConvoy(event) {
  event.preventDefault();

  if (!requireLogin()) {
    return;
  }

  const currentUser = getCurrentUser();

  const convoyName = document.getElementById('convoyName').value.trim();
  const joinCode = document.getElementById('createJoinCode').value.trim();

  try {
    const data = await api('/convoys', {
      method: 'POST',
      body: JSON.stringify({
        userID: currentUser.userID,
        name: convoyName,
        joinCode: joinCode
      })
    });

    setText(convoyResult, `${data.message} Convoy ID: ${data.convoyID}`);

    createConvoyForm.reset();

    await loadConvoys();

  } catch (error) {
    setText(convoyResult, error.message, true);
  }
}



export async function joinConvoy(event) {
  event.preventDefault();

  if (!requireLogin()) {
    return;
  }

  const currentUser = getCurrentUser();

  const joinCode = document.getElementById('joinCode').value.trim();

  try {
    const data = await api('/convoys/join', {
      method: 'POST',
      body: JSON.stringify({
        userID: currentUser.userID,
        joinCode: joinCode
      })
    });

    setText(convoyResult, `${data.message} Convoy ID: ${data.convoyID}`);

    joinConvoyForm.reset();

    await loadConvoys();

  } catch (error) {
    setText(convoyResult, error.message, true);
  }
}



export async function loadMembers() {
  const convoyID = getActiveConvoyID();

  if (!convoyID) {
    membersList.innerHTML = '<p>No active convoy selected.</p>';
    return;
  }

  try {
    const members = await api(`/convoys/${convoyID}/members`);

    if (members.length === 0) {
      membersList.innerHTML = '<p>No members found.</p>';
      return;
    }

    membersList.innerHTML = members
      .map(function (member) {
        return `<div>${member.userName} - ${member.role}</div>`;
      })
      .join('');

  } catch (error) {
    membersList.innerHTML = `<p class="error">${error.message}</p>`;
  }
>>>>>>> b62d3093348821586b713371f3f3d7db29d2d9d4
}