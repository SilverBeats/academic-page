<template>
    <section class="search-part">
        <!--年份选择器-->
        <SelectComponent
            placeholder="Year"
            :value="selectYears"
            :options="yearOptions"
            @change="yearChangedHandle"
        />
        <!--作者类型选择器-->
        <SelectComponent
            placeholder="Author Type"
            :value="selectAuthorTypes"
            :options="authorTypeOptions"
            @change="authorTypeChangedHandle"
        />
        <!--文章类型选择器-->
        <SelectComponent
            placeholder="Paper Type"
            :value="selectPaperTypes"
            :options="paperTypeOptions"
            @change="paperTypeChangedHandle"
        />
        <el-button type="primary" @click="filterHandle">Search</el-button>
    </section>
</template>
<script>
import SelectComponent from "@/components/SelectComponent.vue";
import {Counter} from "@/utils/tools.js";
import {toRaw} from "vue";

export default {
    name: "PaperSelectComponent",
    props: {
        papersInfoList: {
            type: Array,
            default: () => []
        },
    },
    data() {
        return {
            // 过滤所需要的options
            yearOptions: [],
            paperTypeOptions: [],
            authorTypeOptions: [],
            // 选中的值
            selectYears: '',
            selectPaperTypes: '',
            selectAuthorTypes: ''
        }
    },
    components: {SelectComponent},
    watch: {
        papersInfoList: {
            immediate: true,
            handler(newDatalist) {
                this.generateOptions()
            }
        }
    },
    methods: {
        generateOptions() {
            // 清理空值字段, 获得年份、作者类型、文章类型等字段
            const candYears = new Counter()
            const candAuthorTypes = new Counter()
            const candPaperTypes = new Counter()

            for (let paper of this.papersInfoList) {
                candYears.update(paper['year'] + '')
                for (let at of paper['authorType']) {
                    candAuthorTypes.update(at + '')
                }
                candPaperTypes.update(paper['paperType'])

                for (let key in paper['addition']) {
                    if (!paper['addition'][key]) {
                        delete paper['addition'][key]
                    }
                }
            }

            // 处理select选项
            this.yearOptions = candYears.entries().map(item => {
                return {
                    label: `${item[0]} (${item[1]})`,
                    value: item[0],
                }
            })
            this.yearOptions.sort((a, b) => b.value - a.value)

            this.authorTypeOptions = candAuthorTypes.entries().map(item => {
                let label = undefined
                if (item[0] === '1') {
                    label = '1st'
                } else if (item[0] === '2') {
                    label = '2nd'
                } else if (item[0] === '3') {
                    label = '3rd'
                } else {
                    label = `${item[0]}th`
                }
                return {
                    label: `${label} Author (${item[1]})`,
                    value: item[0],
                }
            })
            this.paperTypeOptions = candPaperTypes.entries().map(item => {
                return {
                    label: `${item[0]} (${item[1]})`,
                    value: item[0],
                }
            })
        },
        yearChangedHandle(val) {
            this.selectYears = val
        },
        authorTypeChangedHandle(val) {
            this.selectAuthorTypes = val
        },
        paperTypeChangedHandle(val) {
            this.selectPaperTypes = val
        },
        filterHandle() {
            const selectYears = toRaw(this.selectYears)
            const selectPaperTypes = toRaw(this.selectPaperTypes)
            const selectAuthorTypes = toRaw(this.selectAuthorTypes)

            // 没有过滤条件, 显示所有
            if (selectYears.length === 0 && selectPaperTypes.length === 0 && selectAuthorTypes.length === 0) {
                this.$emit('filter', this.papersInfoList)
                return
            }

            this.$emit('filter', this.papersInfoList.filter(item => {
                if (selectYears.length > 0 && selectYears.indexOf((item['year'] + '')) === -1) {
                    return false
                }
                if (selectPaperTypes.length > 0 && selectPaperTypes.indexOf((item['paperType'] + '')) === -1) {
                    return false
                }
                if (selectAuthorTypes.length > 0) {
                    // 判断当前的paper作者类型列表 和 过滤项 是否有交集
                    const set1 = new Set(selectAuthorTypes)
                    const set2 = new Set(item['authorType'].map(item => item + ''))
                    if ((set1.intersection(set2)).size === 0)
                        return false
                }
                return true
            }))
        },
    }
}
</script>
<style scoped lang="less">

.search-part {
    width: 100%;
    margin-bottom: 15px;
    display: flex;
}

@media (min-width: 993px) {
    .search-part {
        height: 60px;
        flex-direction: row;

        justify-content: flex-end;
        align-items: center;

        .el-select {
            margin-right: 5px;
        }
    }
}

</style>
