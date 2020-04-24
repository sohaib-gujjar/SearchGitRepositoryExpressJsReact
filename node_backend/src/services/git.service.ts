import fetch from 'node-fetch';
import { Bookmark } from '../entity/bookmark.entity';
import { getConnection } from 'typeorm';
var bookmarks = require('../@base/bookmarks');
var _ = require('lodash');
var globals = require('node-global-storage');

/**
 * Loads all repo from the api.
 */

export const githubRepository = async (txt: string): Promise<any> => {
    let result;
    let searchterm = "";
    let arr = txt.split(" ");
    for (var i = 0, len = arr.length; i < len; i++) {
        searchterm += "topic:" + arr[i] + "+";
    }
    searchterm = searchterm.substr(0, searchterm.length - 1);
    const api_url = 'https://api.github.com/search/repositories?q=' + searchterm;

    const getRepositories = await fetch(api_url)
        .then(res => {
            if (res.status >= 400) {
                throw new Error("Bad response from server");
            }
            return res.json();
        })
        .then(response => {
            result = response;
            try {
                _.forEach(response.items, (value: any, index: number) => {
                    if (_.find(bookmarks, function (obj: any) {
                        return obj.id.toString() === value.id.toString();
                    })) {
                        value.bookmark = true;
                    }
                    else value.bookmark = false;
                });
            } catch (error) {

            }
            return response;
        })
        .catch(error => {
            throw new Error(error)
        })

    return { result: getRepositories };
};

/**
 * endpoint to get all bookmarked repositories
 */

export const getAllBookmarkedRepositories = async function (): Promise<any> {

    /**
     * list of all bookmarks
     */
    var allBookmarks = globals.list();

    try {
        /**
         * Get repositories from database
         */
        const qb = getConnection().createQueryBuilder(Bookmark, "bookmarks");
        const result = qb.select()
            .getMany();
    } catch (error) {
        console.error("error connecting database")
    }

    // serve bookmarks from array or using global storage (non persist)
    return { result: bookmarks };
}

/**
 * Save bookmark.
 */
export const createBookmark = async function (id: string, body: any): Promise<any> {
    /**
     * Set bookmark in global
     */
    globals.set(id, body);
    // Save in bookmarks array
    bookmarks.push({
        id: id,
        repository: body
    });

    var allBookmarks = globals.list();


    try {
        /**
         * Save data in mysql
         */

        let bookmark = new Bookmark();
        bookmark.gitId = id;
        bookmark.repository = body;

        const qb = getConnection().createQueryBuilder();
        qb.insert()
            .into(Bookmark)
            .values(bookmark)
            .execute();
    } catch (error) {
        console.error("error connecting database")
    }

    return { result: allBookmarks };
};

export const reomoveBookmark = async function (id: string, body: any): Promise<any> {

    // remove from global variable
    globals.unset(id);
    // remove bookmark from global array
    _.remove(bookmarks, {
        id: id
    })

    var allBookmarks = globals.list();

    try {
        /**
         * remove from database
         */
        const qb = getConnection().createQueryBuilder(Bookmark, "bookmarks");
        const result = qb.delete()
        .where({gitId: id})
        .execute();

    } catch (error) {
        console.error("error connecting database")
    }

    return { result: allBookmarks };
};