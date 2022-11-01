import gsap from "gsap"

export default class CameraAnimator
{
    constructor(experience)
    {
        this.experience = experience
        this.camera = this.experience.camera.instance
        this.scene = this.experience.scene.instance
        this.firstPerson = this.experience.firstPerson

        // Camera Positions
        this.projectsPosition = [0.584271,1.27455,-2, -0.2,0,0]
        this.aboutPosition = [0,0,0,0,0,0]
        this.webDevPosition = [0,0,0,0,0,0]
        this.enterPosition = [-1.11684,1.6,2.05323, 0, Math.PI * 0.5, 0]
        this.enter2Position = [0,0,0,0,0,0]

        this.cameraControl = true

        console.log(this.firstPerson)
    }

    animate(animation)
    {
        if(this.cameraControl === true)
        {
            if(animation === "projects")
            {
                gsap.to(this.camera.position, {duration:2, x: this.projectsPosition[0], y: this.projectsPosition[1], z: this.projectsPosition[2], ease: "sine.inOut"})
                gsap.to(this.camera.rotation, {duration:2, x: this.projectsPosition[3], y: this.projectsPosition[4], z: this.projectsPosition[5], ease: "sine.inOut"})
                console.log("projects animation triggered")
            }

            if(animation === "about")
            {
                gsap.to(this.camera.position , {duration:1, x: this.aboutPosition[0], y: this.aboutPosition[1], z: this.aboutPosition[2], ease: "sine.inOut"})
                gsap.to(this.camera.rotation, {duration:1, x: this.aboutPosition[3], y: this.aboutPosition[4], z: this.aboutPosition[5], ease: "sine.inOut"})
                console.log("about animation triggered")
            }

            if(animation === "webDev")
            {
                gsap.to(this.camera.position , {duration:1, x: this.webDevPosition[0], y: this.webDevPosition[1], z: this.webDevPosition[2], ease: "sine.inOut"})
                gsap.to(this.camera.rotation, {duration:1, x: this.webDevPosition[3], y: this.webDevPosition[4], z: this.webDevPosition[5], ease: "sine.inOut"})
                console.log("webDev animation triggered")
            }

            if(animation === "enter")
            {
                gsap.to(this.camera.position , {duration:1, x: this.enterPosition[0], y: this.enterPosition[1], z: this.enterPosition[2], ease: "sine.inOut"})
                gsap.to(this.camera.rotation, {duration:1, x: this.enterPosition[3], y: this.enterPosition[4], z: this.enterPosition[5], ease: "sine.inOut"})
                console.log("enter animation triggered")
            }
        }
    } 
    
    switchCameraControl(controller)
    {
        if(controller === "player")
        {
            this.cameraControl = false
            this.firstPerson.controlsEnabled = true
        }
        if(controller === "program")
        {
            this.cameraControl = true
            this.firstPerson.controlsEnabled = false
        }
    }
}