import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ContextService {

    private _loggedInUsername: string = '';
    private _currentChatUsername: string = ''; 

    public constructor() { 
        console.log('*** context created ***');
    }

    get loggedInUsername(): string {
        let stored = localStorage.getItem('loggedInUsername')
        if (this._loggedInUsername === '' && stored !== null) {
            this._loggedInUsername = stored
        }
        return this._loggedInUsername
    }

    set loggedInUsername(username: string) {
        if (username === '') {
            localStorage.removeItem('loggedInUsername')
        } else {
            localStorage.setItem('loggedInUsername', username)
        }
        this._loggedInUsername = username
    }

    get currentChatUsername(): string {
        let stored = localStorage.getItem('currentChatUsername')
        if (this._currentChatUsername === '' && stored !== null) {
            this._currentChatUsername = stored
        }
        return this._currentChatUsername
    }

    set currentChatUsername(username: string) {
        if (username === '') {
            localStorage.removeItem('currentChatUsername')
        } else {
            localStorage.setItem('currentChatUsername', username)
        }
        this._currentChatUsername = username
    }
}
