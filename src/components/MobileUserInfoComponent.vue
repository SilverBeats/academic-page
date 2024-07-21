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

<script>
import {Expand, Fold} from "@element-plus/icons-vue";
import UserInfoComponent from "@/components/UserInfoComponent.vue";

export default {
    name: "MobileUserInfoComponent",
    data() {
        return {
            isShow: false,
            drawerWidth: parseInt(this.windowWidth * 0.8)
        }
    },
    inject: ["windowWidth"],
    components: {
        Expand, Fold,
        UserInfoComponent,
    },
    methods: {
        clickHandle() {
            this.isShow = !this.isShow;
        }
    }
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
