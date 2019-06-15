<template lang="pug">
el-form-item.m-editor(
:label='item.label'
)
  .m-editor__row
    template(v-if='!isEdit')
      | {{ item.value }}
      el-button.ml-10(
      icon='el-icon-edit'
      type='text'
      @click='isEdit=true'
      )
    template(v-else)
      .m-editor__input
        el-input(
        v-model='item.value'
        :disabled='isUpdating'
        )
      div
        el-button.ml-10(
        icon='el-icon-s-promotion'
        type='text'
        @click='update'
        :disabled='isUpdating'
        :loading='isUpdating'
        )

</template>
<script>
import { update } from '~/utils/firebase'
import { mapMutations } from 'vuex'
export default {
  props: {
    item: Object
  },
  data() {
    return {
      isEdit: false,
      isUpdating: false
    }
  },
  methods: {
    ...mapMutations(['setAlert']),
    async update() {
      this.isUpdating = true
      try {
        await update({
          collection: 'profiles',
          id: this.item.id,
          data: {
            value: this.item.value
          }
        })
        this.setAlert({
          title: '更新しました',
          type: 'success'
        })
        this.isUpdating = false
        this.isEdit = false
      } catch (e) {
        this.setAlert({
          title: '更新に失敗しました',
          description: e.toString(),
          type: 'error'
        })
        this.isUpdating = false
      }
    }
  }
}
</script>
