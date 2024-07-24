<template>
    <el-select
        v-model="_value"
        filterable
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
        :placeholder="placeholder"
        @change="changeHandle"
    >
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
    </el-select>
</template>

<script setup>
import {defineProps, defineEmits, ref} from 'vue'

const props = defineProps({
    value: '',
    placeholder: '',
    options: {type: Array, default: () => []},
})
const emit = defineEmits(['emitChange'])

const _value = ref(props.value)
const changeHandle = (val) => {
    emit('emitChange', val)
}
</script>
