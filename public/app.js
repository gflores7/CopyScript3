import { registerUser, loginUser, logout } from './auth.js';

import { createConvoy, joinConvoy, loadMembers, loadConvoys } from './convoys.js';

import { sendFriendRequest, loadFriends, loadRequests, loadContacts } from './friends.js';

import { sendMessage, loadGroupChats, createGroup } from './groupchats.js';

import { leaveGroupChat } from './groupchats.js';

import { shareLocation, loadGps } from './gps.js';

import { requireLogin, renderCurrentUser, hideChatPanel } from './ui.js';


const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

const createConvoyForm = document.getElementById('createConvoyForm');
const joinConvoyForm = document.getElementById('joinConvoyForm');

const friendRequestForm = document.getElementById('friendRequestForm');

const messageForm = document.getElementById('messageForm');
const createGroupForm = document.getElementById('createGroupForm');



registerForm.addEventListener('submit', registerUser);
loginForm.addEventListener('submit', loginUser);


createConvoyForm.addEventListener('submit', createConvoy);
joinConvoyForm.addEventListener('submit', joinConvoy);


friendRequestForm.addEventListener('submit', sendFriendRequest);


messageForm.addEventListener('submit', sendMessage);
createGroupForm.addEventListener('submit', createGroup);




document.getElementById('logoutBtn').addEventListener('click', logout);



document.getElementById('loadMembersBtn').addEventListener('click', loadMembers);
document.getElementById('loadGpsBtn').addEventListener('click', loadGps);


document.getElementById('showFriendsBtn').addEventListener('click', loadFriends);
document.getElementById('showRequestsBtn').addEventListener('click', loadRequests);


document.getElementById('shareLocationBtn').addEventListener('click', shareLocation);


document.getElementById('showDirectBtn').addEventListener('click', loadContacts);
document.getElementById('showGroupsBtn').addEventListener('click', loadGroupChats);

document.getElementById('contactsList').innerHTML = '';
document.getElementById('groupCreateBox').style.display = 'none';

document.getElementById('leaveGroupBtn').addEventListener('click', leaveGroupChat);

renderCurrentUser();
hideChatPanel();