<template>
    <el-menu
        :default-active="activeIndex"
        :ellipsis="false"
        router
        mode="horizontal"
        menu-trigger="click"
        unique-opened
        close-on-click-outside
    >
        <el-menu-item v-if="websiteConfig['hasLogo']" index="logoImg">
            <img
                :style="{
                    width: websiteConfig['logoInfo']['width'],
                    height: websiteConfig['logoInfo']['height']
                }"
                :src="websiteConfig['logoInfo']['path']"
                alt="website log"
            />
        </el-menu-item>

        <div class="flex-grow"/>

        <template v-if="isMobile">
            <el-sub-menu index="menu">
                <template #title>
                    <el-icon>
                        <Menu/>
                    </el-icon>
                    Menu
                </template>
                <el-menu-item
                    v-for="(v, k, index) in websiteConfig['navInfo']"
                    :route="v"
                    :index="v"
                    :key="k"
                >
                    {{ k.title() }}
                </el-menu-item>
            </el-sub-menu>
        </template>

        <template v-else>
            <el-menu-item
                v-for="(v, k, index) in websiteConfig['navInfo']"
                :route="v"
                :index="v"
                :key="k"
            >
                {{ k.title() }}
            </el-menu-item>
        </template>

    </el-menu>
</template>


<script setup>
import {Menu} from '@element-plus/icons-vue'
import {ref, inject, defineProps, onBeforeMount} from "vue";
import { useRouter } from "vue-router";
defineProps({
    'isMobile': false
})
const activeIndex = ref('/')
const websiteConfig = inject('websiteConfig')
onBeforeMount(() => {
    const router = useRouter()
    router.beforeEach((to, from, next) => {
        activeIndex.value = to.path
        next()
    })
})
</script>

<style scoped>
.flex-grow {
    flex-grow: 1;
}
</style>
