import EventEmitter from './EventEmitter.js'

export default class Resources extends EventEmitter
{
    constructor()
    {
        super()

        // Options
        this.sources = sources

        // Setup
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0
    }
}