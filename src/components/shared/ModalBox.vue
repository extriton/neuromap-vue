<template>
<div class="modal-box"
    v-show="show"
    @click="onClose"
>
    <div class="modal-dialog" @click.stop>
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">{{ caption }}</h4>
                <button type="button"
                    class="close"
                    @click="onClose"
                >
                    &times;
                </button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
                <slot />
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'ModalBox',
    props: {
        caption: {
            type: String,
            required: true
        },
        show: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        onClose () {
            this.$emit('cancel')
        }
    }
}
</script>

<style lang="scss">
.modal-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    .modal-dialog {
        &:hover {
            cursor: default;
        }
    }
}
</style>
