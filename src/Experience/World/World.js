import Environment from './Environment'
import Models from './Models'
import CameraAnimator from './CameraAnimator'
import gsap from 'gsap'

export default class World
{
    constructor(experience)
    {
        this.experience = experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.camera = this.experience.camera.instance
        this.cameraAnimator = new CameraAnimator(this.experience)

        this.resources.on('ready', () =>
        {
            // Setup on resources load   
            this.models = new Models(this.experience)
            this.environemnt = new Environment(this.experience)  
            this.experience.loadingFinished = true
        })
    }

    update()
    {  
        if(this.experience.loadingFinished === true)
        {
        }
    }
}