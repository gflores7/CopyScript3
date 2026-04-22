import { registerUser, loginUser, logout } from './auth.js';

import { createConvoy, joinConvoy, loadMembers, loadConvoys } from './convoys.js';

import { sendFriendRequest, loadFriends, loadRequests, loadContacts } from './friends.js';

<<<<<<< HEAD
import { sendMessage } from './messages.js';

import { shareLocation, loadGps } from './gps.js';

import { requireLogin, renderCurrentUser } from './ui.js';

=======
import { sendMessage, loadGroupChats, createGroup } from './groupchats.js';

import { leaveGroupChat } from './groupchats.js';

import { shareLocation, loadGps } from './gps.js';

import { requireLogin, renderCurrentUser, hideChatPanel } from './ui.js';
>>>>>>> b62d3093348821586b713371f3f3d7db29d2d9d4


const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

const createConvoyForm = document.getElementById('createConvoyForm');
const joinConvoyForm = document.getElementById('joinConvoyForm');

const friendRequestForm = document.getElementById('friendRequestForm');
<<<<<<< HEAD
const messageForm = document.getElementById('messageForm');
=======

const messageForm = document.getElementById('messageForm');
const createGroupForm = document.getElementById('createGroupForm');
>>>>>>> b62d3093348821586b713371f3f3d7db29d2d9d4



registerForm.addEventListener('submit', registerUser);
loginForm.addEventListener('submit', loginUser);


createConvoyForm.addEventListener('submit', createConvoy);
joinConvoyForm.addEventListener('submit', joinConvoy);


friendRequestForm.addEventListener('submit', sendFriendRequest);


messageForm.addEventListener('submit', sendMessage);
<<<<<<< HEAD
=======
createGroupForm.addEventListener('submit', createGroup);

>>>>>>> b62d3093348821586b713371f3f3d7db29d2d9d4



document.getElementById('logoutBtn').addEventListener('click', logout);



document.getElementById('loadMembersBtn').addEventListener('click', loadMembers);
document.getElementById('loadGpsBtn').addEventListener('click', loadGps);


document.getElementById('showFriendsBtn').addEventListener('click', loadFriends);
document.getElementById('showRequestsBtn').addEventListener('click', loadRequests);


document.getElementById('shareLocationBtn').addEventListener('click', shareLocation);


<<<<<<< HEAD
renderCurrentUser();
=======
document.getElementById('showDirectBtn').addEventListener('click', loadContacts);
document.getElementById('showGroupsBtn').addEventListener('click', loadGroupChats);

document.getElementById('contactsList').innerHTML = '';
document.getElementById('groupCreateBox').style.display = 'none';

document.getElementById('leaveGroupBtn').addEventListener('click', leaveGroupChat);

renderCurrentUser();
hideChatPanel();
>>>>>>> b62d3093348821586b713371f3f3d7db29d2d9d4
