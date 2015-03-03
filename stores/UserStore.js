/* @flow */
"use strict"
var React = require('react/addons');
var objectAssign  = require('object-assign'),
    AppDispatcher = require('../dispatchers/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    {createStore,extractRepoNames, mergeIntoBag, isInBag} = require('../utils/StoreUtils'),
    values = require('lodash/object/values'),
    isEmpty = require('lodash/lang/isEmpty'),
    {decodeField} = require('../utils/APIUtils');

var _users: mixed = {};

var UserStore = createStore({
  getAll(){return _users},
  get(login){return _users[login]}
});

UserStore.dispatchToken = AppDispatcher.register((payload)=> {

  let {action} = payload,
      {response} = action || {},
      {entities} = response || {},
      {user} = entities || {},
      {users} = entities || [];


  if (!isEmpty(user)) {
    _users = mergeIntoBag(_users, user);
    UserStore.emitChange();
  }
  if (!isEmpty(users)) {
    _users = mergeIntoBag(_users, users);
    UserStore.emitChange();
  }
});



export default UserStore;
