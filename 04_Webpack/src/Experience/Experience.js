import Sizes from './Utils/Sizes.js'


export default class Experience
{
    constructor(canvas)
    {
        // Global access
        window.experience = this

        // Options
        this.canvas = canvas

        // Setup
        this.sizes = new Sizes()

        console.log(this.sizes.width)
        console.log(this.sizes.height)
        console.log(this.sizes.pixelRatio)
    
        // Resize event
        this.sizes.on('resize', () =>
        {
            console.log('A resize occurred')
        })
    
    }
}