<template>
    <MdPreview
        htmlPreview
        editorId="bio-markdown"
        :modelValue="value"
        preview-theme="smart-blue"
    />
</template>

<script setup>
import {MdPreview} from "md-editor-v3";
import 'md-editor-v3/lib/style.css'

defineProps({
    value: {
        type: String,
        required: true
    }
})
</script>
