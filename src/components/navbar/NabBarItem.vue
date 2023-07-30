<template>
    <div class="nav-bar-item" @click="itemClick">
        <div v-if="!isActive" class="icon">
            <slot name="icon"></slot>
            </div>
        <div v-else class="icon-active">
            <slot name="icon-active"></slot>
            </div>
        <div class="nav-bar-item-title">
            <slot name="nav-bar-item-title"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavBarItem',
    props: {
        path: String,

    },
    computed: {
        isActive() {
            return this.$route.path.indexOf(this.path) !== -1
        }
    },
    methods: {
        itemClick() {
            this.$router.replace(this.path);
        }
    }

}
</script>

<style lang="scss">
.nav-bar-item{
    
    display: flex;
    flex-direction: column;
    align-items: center;

    div{
        
        margin-right: 40px;
    }
    img{
        cursor: pointer;
        position: relative;
        top: 5px;
        height: 30px;
    }
    span{
        position: relative;
        top: 0px;
        cursor: pointer;
        color: #fff;
        font-size: 13px;
    }
}
</style>