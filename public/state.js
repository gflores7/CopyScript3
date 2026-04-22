<<<<<<< HEAD
export const API = '/api';

let currentUser = null;
let selectedContact = null;
let convoyList = [];
let messagePoll = null;

export function getCurrentUser() {
  return currentUser;
}

export function setCurrentUser(user) {
  currentUser = user;
}


export function getSelectedContact() {
  return selectedContact;
}

export function setSelectedContact(contact) {
  selectedContact = contact;
}


export function getConvoyList() {
  return convoyList;
}

export function setConvoyList(list) {
  convoyList = list;
}


export function getMessagePoll() {
  return messagePoll;
}

export function setMessagePoll(poll) {
  messagePoll = poll;
=======
export const API = '/api';

let currentUser = null;
let selectedContact = null;
let selectedChat = null;
let convoyList = [];
let messagePoll = null;

export function getCurrentUser() {
  return currentUser;
}

export function setCurrentUser(user) {
  currentUser = user;
}


export function getSelectedContact() {
  return selectedContact;
}

export function setSelectedContact(contact) {
  selectedContact = contact;
}

export function getSelectedChat() {
  return selectedChat;
}

export function setSelectedChat(chat) {
  selectedChat = chat;
}

export function getConvoyList() {
  return convoyList;
}

export function setConvoyList(list) {
  convoyList = list;
}


export function getMessagePoll() {
  return messagePoll;
}

export function setMessagePoll(poll) {
  messagePoll = poll;
>>>>>>> b62d3093348821586b713371f3f3d7db29d2d9d4
}