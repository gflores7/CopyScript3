import { api } from './api.js';
import { getCurrentUser, setConvoyList } from './state.js';
import { convoyResult, activeConvoySelect, membersList, gpsList } from './doc.js';
import { setText, requireLogin, getActiveConvoyID } from './ui.js';
import { loadGps } from './gps.js';

export async function loadConvoys() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

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

    convoys.forEach(convoy => {
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
  if (!requireLogin()) return;

  const currentUser = getCurrentUser();
  const convoyName = document.getElementById('convoyName').value.trim();
  const joinCode = document.getElementById('createJoinCode').value.trim();

  try {
    const data = await api('/convoys', {
      method: 'POST',
      body: JSON.stringify({ userID: currentUser.userID, name: convoyName, joinCode })
    });
    setText(convoyResult, `${data.message} Convoy ID: ${data.convoyID}`);
    document.getElementById('createConvoyForm').reset();
    await loadConvoys();
  } catch (error) {
    setText(convoyResult, error.message, true);
  }
}

export async function joinConvoy(event) {
  event.preventDefault();
  if (!requireLogin()) return;

  const currentUser = getCurrentUser();
  const joinCode = document.getElementById('joinCode').value.trim();

  try {
    const data = await api('/convoys/join', {
      method: 'POST',
      body: JSON.stringify({ userID: currentUser.userID, joinCode })
    });
    setText(convoyResult, `${data.message} Convoy ID: ${data.convoyID}`);
    document.getElementById('joinConvoyForm').reset();
    await loadConvoys();
  } catch (error) {
    setText(convoyResult, error.message, true);
  }
}

// HOST / KICK FUNCTIONS
export async function makeHost(userID, convoyID) {
  try {
    const currentUser = getCurrentUser();
    const data = await api(`/convoys/${convoyID}/host`, {
      method: 'PUT',
      body: JSON.stringify({ currentUserID: currentUser.userID, newHostID: userID })
    });
    setText(membersList, data.message);
    await loadMembers();
  } catch (error) {
    setText(membersList, error.message, true);
  }
}

export async function kickMember(userID, convoyID) {
  try {
    const currentUser = getCurrentUser();
    const data = await api(`/convoys/${convoyID}/members/${userID}`, {
      method: 'DELETE',
      body: JSON.stringify({ currentUserID: currentUser.userID })
    });
    setText(membersList, data.message);
    await loadMembers();
  } catch (error) {
    setText(membersList, error.message, true);
  }
}

// LOAD MEMBERS WITH HOST/KICK BUTTONS
export async function loadMembers() {
  const convoyID = getActiveConvoyID();
  const currentUser = getCurrentUser();
  if (!convoyID) {
    membersList.innerHTML = '<p>No active convoy selected.</p>';
    return;
  }

  try {
    const members = await api(`/convoys/${convoyID}/members`);
    membersList.innerHTML = '';

    members.forEach(member => {
      const div = document.createElement('div');
      div.className = 'member-row';
      div.textContent = `${member.userName} (${member.role})`;

      const hostMember = members.find(m => m.role === 'host');
      if (currentUser.userID === hostMember.userID && member.role !== 'host') {
        const hostBtn = document.createElement('button');
        hostBtn.textContent = 'Make Host';
        hostBtn.onclick = () => makeHost(member.userID, convoyID);
        div.appendChild(hostBtn);

        const kickBtn = document.createElement('button');
        kickBtn.textContent = 'Kick';
        kickBtn.onclick = () => kickMember(member.userID, convoyID);
        div.appendChild(kickBtn);
      }

      membersList.appendChild(div);
    });
  } catch (error) {
    membersList.innerHTML = `<p class="error">${error.message}</p>`;
  }
}