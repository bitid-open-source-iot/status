import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ComponentsService {

    public data: any[] = [];

    constructor(private api: ApiService) { };

    public async add(params: any) {
        return await this.api.post(environment.status, '/status/components/add', params);
    };

    public async get(params: any) {
        return await this.api.post(environment.status, '/status/components/get', params);
    };

    public async load(params: any) {
        return await this.api.put(environment.status, '/status/components/load', params);
    };

    public async list(params: any) {
        return await this.api.post(environment.status, '/status/components/list', params);
    };

    public async update(params: any) {
        return await this.api.post(environment.status, '/status/components/update', params);
    };

    public async delete(params: any) {
        return await this.api.post(environment.status, '/status/components/delete', params);
    };

}