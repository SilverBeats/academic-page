<template>
    <section class="drawer-button-area" @click="clickHandle">
        <!--<el-icon v-if="isShow">-->
        <!--    <Fold/>-->
        <!--</el-icon>-->
        <el-icon>
            <Expand/>
        </el-icon>
    </section>

    <el-drawer
        v-model="isShow"
        title="Information"
        lock-scroll
        close-on-click-modal
        close-on-press-escape
        show-close
        modal
        with-header
        :size="drawerWidth"
        direction="rtl"
    >
        <UserInfoComponent/>
    </el-drawer>
</template>

<script setup>
import {Expand} from "@element-plus/icons-vue"
import UserInfoComponent from "@/components/UserInfoComponent.vue"
import {inject, ref} from "vue"

const windowWidth = inject('windowWidth')
const isShow = ref(false);
const drawerWidth = ref(parseInt(windowWidth * 0.8));
const clickHandle = () => {
    isShow.value = !isShow.value;
}
</script>
<style scoped lang="less">
.drawer-button-area {
    position: absolute;
    bottom: 10%;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: right 0.3s cubic-bezier(0.55, 0, 0.1, 1) 0s;

    .el-icon {
        font-size: 25px;
    }
}

</style>
