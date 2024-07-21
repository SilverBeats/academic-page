<template>
    <el-card shadow="hover">
        <el-row>
            <el-col :md="1" :xs="2">[{{ index + 1 }}]</el-col>
            <el-col :md="23" :xs="22">
                {{title }}
            </el-col>
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

<script>
export default {
    name: "CardListItem",
    props: {
        index: -1,
        title: '',
        linkList: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        additionClickHandle(k ,v) {
            this.$emit('buttonClick', k, v)
        }
    }
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
