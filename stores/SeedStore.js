/* @flow */
"use strict"
var React = require('react');
var objectAssign  = require('object-assign'),
    AppDispatcher = require('../dispatchers/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    {createStore,extractRepoNames} = require('../utils/StoreUtils'),
    values = require('lodash/object/values'),
    isEmpty = require('lodash/lang/isEmpty'),
    {decodeField} = require('../utils/APIUtils');

var _repoNames: Array<string> = [];

var SeedStore = createStore({
  wasFetchedRecently(){ false },
  getAll(){return _repoNames}
});

SeedStore.dispatchToken = AppDispatcher.register((payload)=> {

  var action = payload.action,
      response = action.response,
      entities = response && response.entities,
      fetchedSeeds = entities && values(values(entities)[0]);

  if (fetchedSeeds && !isEmpty(fetchedSeeds)) {
    // Decode the content && parse the field to extract the repo names as an array
    _repoNames = extractRepoNames(decodeField(fetchedSeeds[0].content, 'base64'));
    // TODO: create a timestamp for when the seeds were fetched
    SeedStore.emitChange();
  }
});



module.exports = SeedStore;
