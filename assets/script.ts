
import { _decorator, Component, Animation, Node, assetManager, game, tween, instantiate, director, Prefab, error, resources, Sprite, SpriteFrame, Canvas, Texture2D, Slider, Vec3, Vec2, AudioSource, Button, Label } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = script
 * DateTime = Wed Mar 23 2022 17:00:45 GMT+0900 (Japan Standard Time)
 * Author = Rui
 * FileBasename = script.ts
 * FileBasenameNoExtension = script
 * URL = db://assets/script.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */


@ccclass('script')
export class script extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    @property( {type: Canvas} )
    private root: Canvas = null;
    
    @property( {type: Slider} )
    private vSlider: Slider = null;
    @property( {type: Slider} )
    private hSlider: Slider = null;
    @property( {type: AudioSource})
    private audioSource: AudioSource = null;
    @property( {type: Button })
    private playButton: Button = null;
    @property( {type: Button })
    private pauseButton: Button = null;
    @property( {type: Button })
    private stopButton: Button = null;

    @property( {type: Sprite })
    private apple: Sprite = null;
    private anim: Animation = null;
    private rotation: Vec3 = null;

    onLoad() {console.log('onLoad')
        // add image from static asset
        var self = this;
        const root = this.root = director.getScene().getComponentInChildren(Canvas);
        // resources.preload("image/apple/spriteFrame", SpriteFrame);
        // resources.load("image/apple/spriteFrame", SpriteFrame, function (err, spriteFrame) {
        //     if (err) {
        //         error(err.message || err);
        //         return;
        //     }
        //     spriteFrame.addRef();

        //     // 1st choice
        //     var sprite = root.node.addComponent(Sprite);
        //     sprite.spriteFrame = spriteFrame;
            
        //     self.apple = sprite;
        // });

        resources.load("prefab/spriteFrame", Prefab, (err, prefab) => {
            if (err) {
                error(err.message || err);
                return;
            }
            console.log("load sprite")
            prefab.addRef();

            const parent = instantiate(prefab);
            parent.parent = root.node;

            self.apple = parent.getComponent(Sprite);
            self.anim = parent.getComponent(Animation);
            //self.rotation = self.apple.node.eulerAngles;
            //tween(this.rotation).by(4, new Vec3(0, 0, 360)).repeatForever().start();


            console.log('apple', self.apple)
        });

        resources.load("prefab/Slider", Prefab, (err, prefab) => {
            if (err) {
                error(err.message || err);
                return;
            }

            prefab.addRef();

            const hSliderParent = instantiate(prefab);
            hSliderParent.setPosition(0, -200);
            hSliderParent.parent = root.node;

            const hSlider = hSliderParent.getComponent(Slider);
            hSlider.node.on('slide', self.callbackAnim, self);
            hSlider.progress = .5;
            self.hSlider = hSlider;

            const vSliderParent = instantiate(prefab);
            vSliderParent.setPosition(200, 0);
            vSliderParent.parent = root.node;

            const vSlider = vSliderParent.getComponent(Slider);
            vSlider.node.on('slide', self.callbackScale, self);
            vSlider.direction = 1;
            vSlider.progress = .5;
            self.vSlider = vSlider;
        });

        resources.load("prefab/Button", Prefab, (err, prefab) => {
            if (err) {
                error(err.message || err);
                return;
            }

            const playParent = instantiate(prefab);
            playParent.setPosition(-150, 200);
            playParent.parent = root.node;
            const playBtn = playParent.getComponent(Button);
            playBtn.node.on('click', self.callbackPlay, self);
            const playLabel = playParent.getComponentInChildren(Label);
            playLabel.string = "Play";

            const pauseParent = instantiate(prefab);
            pauseParent.setPosition(0, 200);
            pauseParent.parent = root.node;
            const pauseBtn = pauseParent.getComponent(Button);
            pauseBtn.node.on('click', self.callbackPause, self);
            const pauseLabel = pauseParent.getComponentInChildren(Label);
            pauseLabel.string = "Pause";

            const stopParent = instantiate(prefab);
            stopParent.setPosition(150, 200);
            stopParent.parent = root.node;
            const stopBtn = stopParent.getComponent(Button);
            stopBtn.node.on('click', self.callbackStop, self);
            const stopLabel = stopParent.getComponentInChildren(Label);
            stopLabel.string = "Stop";

            const poses = [new Vec2(-150, -150), new Vec2(0, -150), new Vec2(150, -150), new Vec2(300, -150)];
            const cbs = [self.callbackPlayAnim, self.callbackPauseAnim, self.callbackResumeAnim, self.callbackStopAnim];
            const strs = ["Play", "Pause", "Resume", "Stop"];
            for (var i=0; i<4; i++) {
                const parent = instantiate(prefab);
                parent.setPosition(poses[i].x, poses[i].y);
                parent.parent = root.node;
                const btn = parent.getComponent(Button);
                btn.node.on('click', cbs[i], self);
                parent.getComponentInChildren(Label).string = strs[i];
            }
        });

        resources.load("prefab/audio", Prefab, (err, prefab) => {
            if (err) {
                error(err.message || err);
                return;
            }

            const audioParent = instantiate(prefab);
            audioParent.parent = root.node;
            this.audioSource = audioParent.getComponent(AudioSource);
        });
    }
    
    start () {
        //this.demoSprite.scale = 3;
        // [3]

        // Remote texture url with file extensions
        // let imageUrl = "http://localhost/assets/image/head1.png";
        // assetManager.loadRemote<ImageAsset>(imageUrl, {isCrossOrigin: true}, function (err, imageAsset) {
            
        //     const spriteFrame = new SpriteFrame();
        //     const texture = new Texture2D();
        //     texture.image = imageAsset;
        //     spriteFrame.texture = texture;
            
        //     const node = new Node("New Sprite");
        //     const sprite = node.addComponent(Sprite);
        //     sprite.spriteFrame = spriteFrame;
        //     node.parent = root;
        // });

        // assetManager.loadAny({'url': imageUrl}, {isCrossOrigin: true}, function (err, imageAsset) {
            
        //     const spriteFrame = new SpriteFrame();
        //     const texture = new Texture2D();
        //     texture.image = imageAsset;
        //     spriteFrame.texture = texture;
            
        //     const node = new Node("New Sprite");
        //     const sprite = node.addComponent(Sprite);
        //     sprite.spriteFrame = spriteFrame;
        //     node.parent = root;
        // });

        // Remote Audio
        // var audioUrl = "http://localhost/assets/audio/background.mp3";
        // assetManager.loadRemote(audioUrl, function (err, audioClip) {
        //     // play audio clip
        //     cc.audioEngine.play(audioClip);
        // });

    }

    callbackAnim(slider) {
        this.apple.node.setPosition(400 * (slider.progress - .5), 0);
    }

    callbackScale(slider) {
        this.apple.node.scale = new Vec3(2 * slider.progress, 2 * slider.progress);
    }

    callbackPlay(button) {
        console.log('play')
        this.audioSource.play();
    }
    callbackPause(button) {
        console.log('pause')
        this.audioSource.pause();
    }
    callbackStop(button) {
        console.log('stop')
        this.audioSource.stop();
    }
    callbackPlayAnim(button) {
        this.anim.play();
    }
    callbackPauseAnim(button) {
        this.anim.pause();
    }
    callbackResumeAnim(button) {
        this.anim.resume();
    }
    callbackStopAnim(button) {
        this.anim.stop();
    }
    update (deltaTime: number) {
        if (this.apple == null)
            return;
        
        //this.apple.node.eulerAngles = this.rotation;
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
