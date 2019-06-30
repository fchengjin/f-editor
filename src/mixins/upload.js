import OSS from 'ali-oss'
import { createUniqueString } from '@/utils/index'
export default {
  methods: {
    async upload (files) {
      const token = await this.$axios.get('admin/ossToken')
      const uploadClient = await new OSS({
        region: token.region,
        accessKeyId: token.credentials.AccessKeyId,
        accessKeySecret: token.credentials.AccessKeySecret,
        stsToken: token.credentials.SecurityToken,
        bucket: token.bucket
      })
      if (typeof files === 'string') {
        return Promise.resolve(files)
      }

      if (files instanceof Array) {
        const promiseArr = []
        const len = files.length

        for (let i = 0; i < len; i++) {
          const blob = files[i]
          if (typeof blob === 'string') {
            promiseArr.push(Promise.resolve(blob))
          } else {
            const name = createUniqueString() + '.' + blob.name.split('.').pop()
            promiseArr.push(uploadClient.put(name, blob))
          }
        }
        return Promise.all(promiseArr)
      }
      const name = createUniqueString() + '.' + files.name.split('.').pop()
      return uploadClient.put(name, files)
    },

    // 在编辑器上传图片时使用
    async handleImgAdd (pos, file, vm) {
      vm.loading = true
      try {
        const res = await this.upload(file)
        vm.$img2Url(pos, this.$cfg.getImgPath(res.name))
      } catch (e) {
        console.log('上传失败', e)
      }
      vm.loading = false
    }
  }
}
