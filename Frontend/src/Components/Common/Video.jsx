// taken from https://github.com/videojs/video.js/blob/master/docs/guides/react.md
import React from "react";
import videojs from "video.js";

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log("onPlayerReady", this);
    });

    if (this.videoNode) {
      this.videoNode.setAttribute("webkit-playsinline", true);
      this.videoNode.setAttribute("playsinline", true);
    }
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <div data-vjs-player>
        <video ref={node => (this.videoNode = node)} className="video-js vjs-theme-fantasy"  data-setup='{"fluid": true}' />
      </div>
    );
  }
}
