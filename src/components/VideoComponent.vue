<template>
    <video ref="videoPlayer" class="video-js"></video>
</template>


<script setup>
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import {defineProps, getCurrentInstance, ref, onMounted, onBeforeUnmount} from 'vue'

const props = defineProps({
    options: {
        type: Object,
        default: () => {}
    }
})

const player = ref(null)
const _this = getCurrentInstance().ctx
onMounted(() => {
    player.value = videojs(_this.$refs.videoPlayer, props.options, () => {
        console.log('onPlayerReady');
    })
})
onBeforeUnmount(() => {
    if (player.value) {
        player.value.dispose()
    }
})
</script>
