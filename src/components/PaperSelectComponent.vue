<template>
    <section class="search-part">
        <!--年份选择器-->
        <SelectComponent
            placeholder="Year"
            :value="selectYears"
            :options="yearOptions"
            @emitChange="yearChangedHandle"
        />
        <!--作者类型选择器-->
        <SelectComponent
            placeholder="Author Type"
            :value="selectAuthorTypes"
            :options="authorTypeOptions"
            @emitChange="authorTypeChangedHandle"
        />
        <!--文章类型选择器-->
        <SelectComponent
            placeholder="Paper Type"
            :value="selectPaperTypes"
            :options="paperTypeOptions"
            @emitChange="paperTypeChangedHandle"
        />
        <el-button type="primary" @click="filterHandle">Search</el-button>
    </section>
</template>
<script setup>
import SelectComponent from "@/components/SelectComponent.vue";
import {Counter} from "@/utils/tools.js";
import {defineProps, ref, watch, defineEmits} from "vue";

const props = defineProps({
    papersInfoList: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['filter'])

// 过滤所需要的options
const yearOptions = ref([])
const paperTypeOptions = ref([])
const authorTypeOptions = ref([])

// 选中的值
const selectYears = ref('')
const selectPaperTypes = ref('')
const selectAuthorTypes = ref('')

const generateOptions = () => {
    // 清理空值字段, 获得年份、作者类型、文章类型等字段
    const candYears = new Counter()
    const candAuthorTypes = new Counter()
    const candPaperTypes = new Counter()

    for (let paper of props.papersInfoList) {
        candYears.update(paper['year'] + '')
        for (let at of paper['authorType']) {
            candAuthorTypes.update(at + '')
        }
        candPaperTypes.update(paper['paperType'])
    }

    // 处理select选项
    const _yearOptions = candYears.entries().map(item => {
        return {
            label: `${item[0]} (${item[1]})`,
            value: item[0],
        }
    })
    _yearOptions.sort((a, b) => b.value - a.value)
    yearOptions.value = _yearOptions

    authorTypeOptions.value = candAuthorTypes.entries().map(item => {
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
    paperTypeOptions.value = candPaperTypes.entries().map(item => {
        return {
            label: `${item[0]} (${item[1]})`,
            value: item[0],
        }
    })
}


watch(() => props.papersInfoList, (newVal, oldVal) => {
    generateOptions()
}, {
    immediate: true,
    deep: true
})

const yearChangedHandle = (val) => {
    selectYears.value = val
}
const authorTypeChangedHandle = (val) => {
    selectAuthorTypes.value = val
}
const paperTypeChangedHandle = (val) => {
    selectPaperTypes.value = val
}
const filterHandle = () => {
    // 没有过滤条件, 显示所有
    if (selectYears.value.length === 0 &&
        selectPaperTypes.value.length === 0 && selectAuthorTypes.value.length === 0) {
        emit('filter', props.papersInfoList)
        return
    }

    emit('filter', props.papersInfoList.filter(item => {
        if (selectYears.value.length > 0 && selectYears.value.indexOf((item['year'] + '')) === -1) {
            return false
        }
        if (selectPaperTypes.value.length > 0 && selectPaperTypes.value.indexOf((item['paperType'] + '')) === -1) {
            return false
        }
        if (selectAuthorTypes.value.length > 0) {
            // 判断当前的paper作者类型列表 和 过滤项 是否有交集
            const set1 = new Set(selectAuthorTypes.value)
            const set2 = new Set(item['authorType'].map(item => item + ''))
            if ((set1.intersection(set2)).size === 0)
                return false
        }
        return true
    }))
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
