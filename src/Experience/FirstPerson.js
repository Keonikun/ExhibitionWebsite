import * as THREE from 'three'
import { Vector3 } from 'three'
import { PointerLockControls } from './Utils/PointerLockControls.js'

export default class FirstPerson
{
    constructor(experience)
    {
        this.experience = experience
        this.scene = this.experience.scene
        this.camera = this.experience.camera.instance
        this.resources = this.experience.resources
        this.models = null
        this.renderer = this.experience.renderer.instance

        // speed is a placeholder, actual speed is controlled by playerSpeed and playerSprintSpeed
        this.player = { speed: 0, height: 1.6, playerSpeed: 0.02, playerSprintSpeed: 0.025, walking: false }
        this.playerWalkingCount = 0
        

        this.cameraDirection = new THREE.Vector3()
        this.controlsEnabled = false

        this.collisionDistance = 0.5

        this.collisionMin = new THREE.Vector3(-1000,-1000,-1000)
        this.collisionMax = new THREE.Vector3(1000,1000,1000)

        // Audio Reciever
        this.playerListener = new THREE.AudioListener()
        this.camera.add(this.playerListener)

        

        // Footsteps Speaker
        this.footstepsSpeakerGeo = new THREE.BoxGeometry(1,1,1)
        this.footstepsSpeakerMat = new THREE.MeshPhongMaterial({color: 0xffffff})
        this.footstepsSpeaker = new THREE.Mesh(this.footstepsSpeakerGeo, this.footstepsSpeakerMat)
        this.scene.add(this.footstepsSpeaker)

        this.footstepsAudio = new THREE.PositionalAudio( this.playerListener )
        this.footstepsSpeaker.add(this.footstepsAudio)



        this.resources.on('ready', () =>
        {
            this.models = this.experience.world.models
            
            // Footstep Output
            // this.footstepsAudio.setBuffer(this.resources.items.footsteps)
            // this.footstepsAudio.setRefDistance(1)
            // this.footstepsAudio.play()

            console.log(this.models)

        })

        this.setRayCaster()
        this.setKeyListener()
        this.setPointerLockControls()
    }

    setRayCaster()
    {
        this.detectFloor = new THREE.Raycaster()
        this.floorDirection = new THREE.Vector3( this.camera.getWorldPosition.x, -1, this.camera.getWorldPosition.z )
        this.detectNorth = new THREE.Raycaster()
        this.northDirection = new THREE.Vector3(this.camera.getWorldPosition.x,this.camera.getWorldPosition.y,1)
        this.detectEast = new THREE.Raycaster()
        this.eastDirection = new THREE.Vector3(1,this.camera.getWorldPosition.y,this.camera.getWorldPosition.z)
        this.detectSouth = new THREE.Raycaster()
        this.southDirection = new THREE.Vector3(this.camera.getWorldPosition.x,this.camera.getWorldPosition.y,-1)
        this.detectWest = new THREE.Raycaster()
        this.westDirection = new THREE.Vector3(-1,this.camera.getWorldPosition.y,this.camera.getWorldPosition.z)  
    }

    collisionDetection()
    {
        this.cameraPositionMod = this.camera.position
        this.cameraPositionMod.y - 0.6
        this.northDirectionMod = this.northDirection
        this.northDirectionMod.y - 0.6
        this.eastDirectionMod = this.eastDirection
        this.eastDirectionMod.y - 0.6
        this.southDirectionMod = this.southDirection
        this.southDirectionMod.y - 0.6
        this.westDirectionMod = this.westDirection
        this.westDirectionMod.y - 0.6

        this.detectFloor.set(this.cameraPositionMod, this.floorDirection)
        this.detectNorth.set(this.cameraPositionMod, this.northDirectionMod)
        this.detectEast.set(this.cameraPositionMod, this.eastDirectionMod)
        this.detectSouth.set(this.cameraPositionMod, this.southDirectionMod)
        this.detectWest.set(this.cameraPositionMod, this.westDirectionMod)

        this.floorDetection = this.detectFloor.intersectObjects(this.models.physMesh.scene.children, true)
        this.northDetection = this.detectNorth.intersectObjects(this.models.physMesh.scene.children, true)
        this.eastDetection = this.detectEast.intersectObjects(this.models.physMesh.scene.children, true)
        this.southDetection = this.detectSouth.intersectObjects(this.models.physMesh.scene.children, true)
        this.westDetection = this.detectWest.intersectObjects(this.models.physMesh.scene.children, true)
    }

    setKeyListener()
    {
        this.keyboard = {}

        this.keyDown = (event) =>
        {
            this.keyboard[event.keyCode] = true
            console.log(this.keyboard)
        }

        this.keyUp = (event) =>
        {
            this.keyboard[event.keyCode] = false
        }

        window.addEventListener('keydown', this.keyDown)
        window.addEventListener('keyup', this.keyUp)
    }

    setPointerLockControls()
    {    
        this.pointerLockControls = new PointerLockControls(this.camera, this.renderer.domElement)

        
        document.querySelector('canvas.webgl').addEventListener('click', () =>
        {
            if(this.controlsEnabled === true)
            {
                if(this.pointerLockControls.isLocked === false)
                {
                    this.pointerLockControls.lock()
                    this.controlsEnabled = true
                    ("hello")
                }
                else if(this.pointerLockControls.isLocked === true)
                {
                    this.raycastFromCamera()
                }
            }
            
        })
        
    }

    raycastFromCamera()
    {
        this.camRay = new THREE.Raycaster()
        this.camRayCoords = new THREE.Vector2(0,0)
        this.camRay.setFromCamera(this.camRayCoords, this.camera)
        this.camRayIntersect = this.camRay.intersectObjects(this.scene.children, true)
        // if(this.camRayIntersect[0] != null)
        // {
        //     this.trigger('interaction')
        // }   
    }

    update()
    {
        if(this.controlsEnabled === true)
        {
            this.vector = this.camera.getWorldDirection(this.cameraDirection)
            this.yAngle = Math.atan2(this.vector.x, this.vector.z)
            
            if(this.keyboard[87])
            {
                this.camera.position.x -= -Math.sin(this.yAngle) * this.player.speed
                this.camera.position.z += Math.cos(this.yAngle) * this.player.speed
            }
            if(this.keyboard[83])
            {
                this.camera.position.x += -Math.sin(this.yAngle) * this.player.speed
                this.camera.position.z -= Math.cos(this.yAngle) * this.player.speed
            }
            if(this.keyboard[65])
            {
                this.camera.position.x -= Math.sin(this.yAngle - Math.PI/2) * this.player.speed
                this.camera.position.z -= Math.cos(this.yAngle - Math.PI/2) * this.player.speed
            }
            if(this.keyboard[68])
            {
                this.camera.position.x -= -Math.sin(this.yAngle - Math.PI/2) * this.player.speed
                this.camera.position.z += Math.cos(this.yAngle - Math.PI/2) * this.player.speed
            }
            if(this.keyboard[16])
            {
                this.player.speed = this.player.playerSprintSpeed
            }
            else
            {
                this.player.speed = this.player.playerSpeed
            }
            if(this.keyboard[87] || this.keyboard[873] || this.keyboard[65] || this.keyboard[68])
            {
                this.player.walking = true
            }
            else
            {
                this.player.walking = false
            }
        }

        if(this.player.walking === true)
        {
            this.playerWalkingCount++
        }

        if(this.controlsEnabled === true)
        {
            this.collisionDetection()
            
            if(this.floorDetection[0] != null)
            {
                if(this.floorDetection[0].distance <= 1.7)
                {
                    this.camera.position.y = this.floorDetection[0].point.y + 1.6
                }
                else if(this.floorDetection[0].distance > 1.7)
                {
                    this.camera.position.y -= 0.1
                }
            }
            
            if(this.northDetection[0] != null)
            {
                if(this.northDetection[0].distance <= this.collisionDistance)
                {
                    this.collisionMax.z = this.northDetection[0].point.z - this.collisionDistance 
                }
                else
                {
                    this.collisionMax.z = 1000
                }
            }
            else
            {
                this.collisionMax.z = 1000
            }

            if(this.eastDetection[0] != null)
            {
                if(this.eastDetection[0].distance <= this.collisionDistance)
                {
                    this.collisionMax.x = this.eastDetection[0].point.x - this.collisionDistance
                }
                else
                {
                    this.collisionMax.x = 1000
                }
            }
            else
            {
                this.collisionMax.x = 1000
            }

            if(this.southDetection[0] != null)
            {
                if(this.southDetection[0].distance <= this.collisionDistance)
                {
                    this.collisionMin.z = this.southDetection[0].point.z + this.collisionDistance 
                }
                else
                {
                    this.collisionMin.z = -1000
                }
            }
            else
            {
                this.collisionMin.z = -1000
            }
            
            if(this.westDetection[0] != null)
            {
                if(this.westDetection[0].distance <= this.collisionDistance)
                {
                    this.collisionMin.x = this.westDetection[0].point.x + this.collisionDistance
                }
                else
                {
                    this.collisionMin.x = -1000
                }
            }
            else
            {
                this.collisionMin.x = -1000
            }
            
            this.camera.position.clamp(this.collisionMin, this.collisionMax)
        }
    }
}