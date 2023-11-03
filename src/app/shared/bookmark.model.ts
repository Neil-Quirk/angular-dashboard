import {v4 as uuidv4 } from 'uuid'

export class Bookmark {
    id: string
    name: string
    url: URL

    constructor(name:string, url: string) {
        this.id = uuidv4()
        this.url = new URL(url)


        // pulls the name from the host name if you dont enter a name in the name field 
        if(!name) name = this.url.hostname
        this.name = name
    }
}