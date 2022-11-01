export default class domTriggers
{
    constructor(experience)
    {
        // Setup
        this.experience = experience
        this.world = this.experience.world
        this.cameraAnimator = this.experience.world.cameraAnimator

        this.sublinkSelection = null

        // Special Buttons
        this.enterButton = document.getElementById("enterButton")

        // HTML insertion for subpages
        this.innerWebpage = document.getElementById("innerWebpage")

        // Sublinks
        this.projects = document.getElementById("projects")
        this.about = document.getElementById("about")
        this.webDev = document.getElementById("webDev")
        this.enter = document.getElementById("enter")

        // Sublink Pages
        this.projectsWrapper = document.getElementById("projectsWrapper")
        this.aboutWrapper = document.getElementById("aboutWrapper")
        this.webDevWrapper = document.getElementById("webDevWrapper")
        this.enterWrapper = document.getElementById("enterWrapper")

        this.projects.addEventListener("click", () =>
        {
            this.projectsWrapper.classList.remove("hidden")
            this.projectsWrapper.classList.add("active")
            this.aboutWrapper.classList.remove("active")
            this.webDevWrapper.classList.remove("active")
            this.enterWrapper.classList.remove("active")

            this.sublinkSelection = projects
            
            //Animation Trigger
            this.cameraAnimator.animate("projects")

            this.projectsWrapper.addEventListener('transitionend', () =>
            {
                if(this.sublinkSelection === projects)
                {
                    this.aboutWrapper.classList.add("hidden")
                    this.webDevWrapper.classList.add("hidden")
                }
            })
        })

        this.about.addEventListener("click", () =>
        {
            this.projectsWrapper.classList.remove("active")
            this.aboutWrapper.classList.remove("hidden")
            this.aboutWrapper.classList.add("active")
            this.webDevWrapper.classList.remove("active")
            this.enterWrapper.classList.remove("active")

            this.sublinkSelection = about

            //Animation Trigger
            this.cameraAnimator.animate("about")

            this.aboutWrapper.addEventListener('transitionend', () =>
            {
                if(this.sublinkSelection === about)
                {
                    this.projectsWrapper.classList.add("hidden")
                    this.webDevWrapper.classList.add("hidden")
                    this.enterWrapper.classList.add("hidden")
                }
            })
        })

        this.webDev.addEventListener("click", () =>
        {
            this.projectsWrapper.classList.remove("active")
            this.aboutWrapper.classList.remove("active")
            this.webDevWrapper.classList.remove("hidden")
            this.webDevWrapper.classList.add("active")
            this.enterWrapper.classList.remove("active")

            this.sublinkSelection = webDev
  
            //Animation Trigger
            this.cameraAnimator.animate("webDev")

            this.webDevWrapper.addEventListener('transitionend', () =>
            {
                if(this.sublinkSelection === webDev)
                {
                    this.projectsWrapper.classList.add("hidden")
                    this.aboutWrapper.classList.add("hidden")
                    this.enterWrapper.classList.add("hidden")
                }
            })
        })

        this.enter.addEventListener("click", () =>
        {
            this.projectsWrapper.classList.remove("active")
            this.aboutWrapper.classList.remove("active")
            this.webDevWrapper.classList.remove("active")
            this.enterWrapper.classList.add("active")
            this.enterWrapper.classList.remove("hidden")

            this.sublinkSelection = enter
            
            //Animation Trigger
            this.cameraAnimator.animate("enter")

            this.enterWrapper.addEventListener('transitionend', () =>
            {
                if(this.sublinkSelection === enter)
                {
                    this.projectsWrapper.classList.add("hidden")
                    this.aboutWrapper.classList.add("hidden")
                    this.webDevWrapper.classList.add("hidden")
                }
            })
        })

        this.enterButton.addEventListener("click", () =>
        {
            this.cameraAnimator.switchCameraControl("player")
        })
    }
}   