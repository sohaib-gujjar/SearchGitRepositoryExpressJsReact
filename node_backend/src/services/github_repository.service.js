const fetch = require('node-fetch');
var bookmarks = require('../@base/bookmarks');
var _ = require('lodash');
var globals = require('node-global-storage');

/**
 * Loads all repo from the api.
 */

let githubRepository = function (txt, callback) {
    let searchterm = "";
    let arr = txt.split(" ");
    for (var i = 0, len = arr.length; i < len; i++) {
        searchterm += "topic:" + arr[i] + "+";
    }
    searchterm = searchterm.substr(0, searchterm.length - 1);
    const api_url = 'https://api.github.com/search/repositories?q=' + searchterm;

    fetch( api_url )
    .then(res => {
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
        return res.json();
      })
    .then( response => {
        let result = response;
        try {
            _.forEach( response.items, (value, index) => {
                if(_.find(bookmarks, function(obj) {
                    return obj.id.toString() === value.id.toString();
                })) {
                    value.bookmark = true;
                }
                else value.bookmark = false;
            });
        } catch (error) {
            
        }
        callback( { result: result })
    })
    .catch( error => {
        callback( { result: error })
    })
}
/**
 * endpoint to get all bookmarked repositories
 */

let getAllBookmarkedRepositories = function (callback) {

    /**
     * list of all bookmarks
     */
    var allBookmarks = globals.list();

    // serve bookmarks from array or using global storage (non persist)
    callback( { result: bookmarks });
}

/**
 * Save bookmark.
 */

let createBookmark = function (id, body, callback, onError) {

    /**
     * Set bookmark in global
     */
    globals.set(id, body);
    // Save in bookmarks array
    bookmarks.push({
        id: id,
        repository: body
    });
    callback( { result: bookmarks });//callback({ success: true});
}

let reomoveBookmark = function (id, callback, onError) {

    // remove from global variable
    globals.unset(id);
    // remove bookmark from global array
    _.remove(bookmarks, {
        id: id
    })
    callback( { result: bookmarks });//callback({ success: true});
}

module.exports = {
    githubRepository,
    getAllBookmarkedRepositories,
    createBookmark,
    reomoveBookmark
}