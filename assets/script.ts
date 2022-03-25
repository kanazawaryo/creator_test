
import { _decorator, Component, Node, assetManager, ImageAsset, error, resources, Sprite, SpriteFrame, Texture2D } from 'cc';
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

    start () {
        var root = this.node;
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
        //var sprite = this.getComponent(Sprite);
        resources.preload("head2/spriteFrame", SpriteFrame);
        resources.load("head2/spriteFrame", SpriteFrame, function (err, spriteFrame) {
            if (err) {
                error(err.message || err);
                return;
            }
            spriteFrame.addRef();
            
            // 1st choice
            var node = new Node("Head Sprite");
            var sprite = node.addComponent(Sprite);
            sprite.spriteFrame = spriteFrame; 
            node.setPosition(0,0);

            node.parent = root;

            // 2nd choice
            //sprite.spriteFrame = spriteFrame;
        });
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
