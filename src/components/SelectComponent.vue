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

<script>
export default {
    name: "SelectComponent",
    props: {
        value: '',
        placeholder: '',
        options: Array
    },
    data() {
        return {
            _value: this.value
        }
    },
    methods: {
        changeHandle(val) {
            this.$emit('change', val)
        }
    }
}
</script>
