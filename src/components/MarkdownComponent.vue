<template>
    <MdPreview
        htmlPreview
        editorId="bio-markdown"
        :modelValue="value"
        preview-theme="smart-blue"
    />
</template>

<script>
import {MdPreview} from "md-editor-v3";
import 'md-editor-v3/lib/style.css'

export default {
    name: 'MarkdownComponent',
    props: {
        value: {
            type: String,
            required: true
        }
    },
    components: {MdPreview},
}


</script>
