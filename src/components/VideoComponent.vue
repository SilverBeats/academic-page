<template>
    <video ref="videoPlayer" class="video-js"></video>
</template>


<script>
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
export default {
    name: "VideoComponent",
    props: {
        options: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            player: null
        }
    },
    mounted() {
        this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
            console.log('onPlayerReady', this);
        })
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose()
        }
    }
}
</script>
