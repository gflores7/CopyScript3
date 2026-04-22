import { registerUser, loginUser, logout } from './auth.js';

import { createConvoy, joinConvoy, loadMembers, loadConvoys, makeHost, kickMember } from './convoys.js';

import { sendFriendRequest, loadFriends, loadRequests, loadContacts } from './friends.js';

import { sendMessage } from './messages.js';

import { shareLocation, loadGps } from './gps.js';

import { requireLogin, renderCurrentUser } from './ui.js';



const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

const createConvoyForm = document.getElementById('createConvoyForm');
const joinConvoyForm = document.getElementById('joinConvoyForm');

const friendRequestForm = document.getElementById('friendRequestForm');
const messageForm = document.getElementById('messageForm');



registerForm.addEventListener('submit', registerUser);
loginForm.addEventListener('submit', loginUser);


createConvoyForm.addEventListener('submit', createConvoy);
joinConvoyForm.addEventListener('submit', joinConvoy);


friendRequestForm.addEventListener('submit', sendFriendRequest);


messageForm.addEventListener('submit', sendMessage);



document.getElementById('logoutBtn').addEventListener('click', logout);



document.getElementById('loadMembersBtn').addEventListener('click', loadMembers);
document.getElementById('loadGpsBtn').addEventListener('click', loadGps);


document.getElementById('showFriendsBtn').addEventListener('click', loadFriends);
document.getElementById('showRequestsBtn').addEventListener('click', loadRequests);


document.getElementById('shareLocationBtn').addEventListener('click', shareLocation);





document.getElementById('loadMembersBtn').addEventListener('click', () => {
  const convoyID = document.getElementById('activeConvoySelect').value;
  if (convoyID) loadMembers(convoyID);
});

renderCurrentUser();