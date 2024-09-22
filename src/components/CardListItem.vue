<template>
    <el-card shadow="hover">
        <el-row>
            <el-col :lg="1" :md="2" :sm="2" :xs="2">[{{ index }}]</el-col>
            <el-col :lg="23" :md="22" :sm="22" :xs="22">{{ title }}</el-col>
        </el-row>
        <el-row style="font-size: small;">
            <el-col :lg="1" :md="2" :sm="2" :xs="2"></el-col>
            <el-col :lg="23" :md="22" :sm="22" :xs="22" v-html="authorList"></el-col>
        </el-row>
        <el-row style="font-size: small;">
            <el-col :lg="1" :md="2" :sm="2" :xs="2"></el-col>
            <el-col :lg="23" :md="22" :sm="22" :xs="22">{{bookTitle}} {{year}}</el-col>
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
import {defineProps, defineEmits, computed} from 'vue'
const props = defineProps({
    index: -1,
    title: String,  // 论文名称
    bookTitle: String, // 期刊或者会议名称
    paperType: String, // 类型
    authors: {  // 作者列表
        type: Array,
        default: () => []
    },
    authorPosition: Number, // 从 1 计数
    year: String | Number, // 出版时间
    linkList: {
        type: Object,
        default: () => {}
    }
})
const emits = defineEmits(['buttonClick'])
const authorList = computed(() => {
    const s = []
    for (let i = 0; i < props.authors.length; i++) {
        if (i + 1 === props.authorPosition) {
            s.push(`<strong>${props.authors[i]}</strong>`)
        } else {
            s.push(props.authors[i])
        }
    }
    return s.join(', ')
})
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
        .paper-info-col {
            font-size: small;
            display: flex;
            justify-content: left;
            align-items: center;
            flex-direction: column;
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
