
import { _decorator, Component, Node, assetManager, ImageAsset, error, resources, Sprite, SpriteFrame, Canvas, Texture2D, Slider, Vec3, AudioSource, Button } from 'cc';
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
    @property( {type: Sprite} )
    // @ts-ignore
    private demoSprite: Sprite = null;
    private position: Vec3 = new Vec3();
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
    start () {
        var root = this.node;
        this.position.x = this.demoSprite.node.position.x;
        console.log('pos', this.position);
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

        // add image from static asset
        // var sprite = this.getComponent(Sprite);
        // resources.preload("head2/spriteFrame", SpriteFrame);
        // resources.load("head2/spriteFrame", SpriteFrame, function (err, spriteFrame) {
        //     if (err) {
        //         error(err.message || err);
        //         return;
        //     }
        //     spriteFrame.addRef();
            
        //     // 1st choice
        //     var canvas = root.addComponent(Canvas);
        //     var sprite = canvas.addComponent(Sprite);
        //     sprite.spriteFrame = spriteFrame; 
            
        //     // 2nd choice
        //     //sprite.spriteFrame = spriteFrame;
        // });
    }

    onLoad() {
        this.hSlider.node.on('slide', this.callbackAnim, this);
        this.vSlider.node.on('slide', this.callbackScale, this);
        this.playButton.node.on('click', this.callbackPlay, this);
        this.pauseButton.node.on('click', this.callbackPause, this);
        this.stopButton.node.on('click', this.callbackStop, this);
    }

    callbackAnim(Slider) {
        this.demoSprite.node.setPosition(this.position.x + 400 * (Slider.progress - .5), this.position.y, this.position.z);
    }

    callbackScale(Slider) {
        this.demoSprite.node.scale = new Vec3(2 * Slider.progress, 2 * Slider.progress, this.demoSprite.node.scale.z);
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
    // update (deltaTime: number) {
    //     // [4]
    // }
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
