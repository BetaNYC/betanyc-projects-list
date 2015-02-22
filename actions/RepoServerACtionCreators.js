'use strict';

var AppDispatcher = require('dispatchers/AppDispatcher'),
    ActionTypes = require('constants/ActionTypes'),
    GithubAPI = require('apis/GithubAPI');

var RepoServerActionCreators = {
  handleSeedReposSuccess(response) {
    
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_SEEDS_SUCCESS,
      response: response
    });

  },

  handleSeedReposError(err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_SEEDS_ERROR
    });
  },

  handleRepoSearchSuccess(response) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_REPO_SEARCH_SUCCESS,
      response: response
    });
  },

  handleRepoSearchError(...err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_REPO_SEARCH_ERROR
    });
  }

};

module.exports = RepoServerActionCreators;