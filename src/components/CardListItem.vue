<template>
    <el-card shadow="hover">
        <el-row>
            <el-col :lg="1" :md="2" :sm="2" :xs="2">[{{ index + 1 }}]</el-col>
            <el-col :lg="23" :md="22" :sm="22" :xs="22">{{ title }}</el-col>
        </el-row>
        <section class="hyp-link-box">
            <el-button
                v-for="(v, k) in linkList"
                :key="k"
                text bg
                @click="additionClickHandle(k, v)"
            >
                {{ k }}
            </el-button>
        </section>
    </el-card>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue'
defineProps({
    index: -1,
    title: '',
    linkList: {
        type: Object,
        default: () => {}
    }
})
const emits = defineEmits(['buttonClick'])

const additionClickHandle = (k, v) => {
    emits('buttonClick', k, v)
}
</script>


<style scoped lang="less">
.el-card {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }

    .el-row {
        flex-wrap: nowrap;

        .el-col {
            white-space: break-spaces;
        }
    }

    .hyp-link-box {
        margin-top: 15px;
        text-align: right;

        .el-link {
            margin-right: 8px;
        }

        el-link:last-child {
            margin-right: 0;
        }
    }
}
</style>
