import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class LocalstorageService {

    constructor() { };

    public clear() {
        window.localStorage.clear();
    };

    public get(key) {
        return window.localStorage.getItem(key);
    };

    public remove(key) {
        window.localStorage.removeItem(key);
    };

    public getObject(key) {
        return JSON.parse(window.localStorage.getItem(key) || '{}');
    };
    
    public set(key, value) {
        window.localStorage.setItem(key, value);
    };

    public setObject(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value || {}));
    };

}