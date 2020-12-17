import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
    providedIn: 'root'
})

export class ComponentsService {

    public data: any[] = [];

    constructor(private api: ApiService, private localstorage: LocalstorageService) { };

    public async add(params: any) {
        return await this.api.post(environment.status, '/status/components/add', params);
    };

    public async get(params: any) {
        return await this.api.post(environment.status, '/status/components/get', params);
    };

    public async list(params: any) {
        return await this.api.post(environment.status, '/status/components/list', params);
    };

    public async load(params: any) {
        return await this.api.post(environment.status, '/status/components/data', params);
    };

    public async share(params: any) {
        return await this.api.post(environment.status, '/status/components/share', params);
    };

    public async update(params: any) {
        return await this.api.post(environment.status, '/status/components/update', params);
    };

    public async delete(params: any) {
        return await this.api.post(environment.status, '/status/components/delete', params);
    };

    public async unsubscribe(params: any) {
        return await this.api.post(environment.status, '/status/components/unsubscribe', params);
    };

    public async updatesubscriber(params: any) {
        return await this.api.post(environment.status, '/status/components/updatesubscriber', params);
    };

}