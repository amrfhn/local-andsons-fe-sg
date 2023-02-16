<template>
  <div class="container">
    <div class="uploader">
      <a v-if="imageUrl" :href="imageUrl" target="_blank">
        <img v-if="urlIsImage" :src="imageUrl" alt="Id Image" />
        <img v-else :src="require(`@/assets/images/pdf.png`)" alt="Id Image" class="pdf" />
      </a>
      <label v-else>No photo chosen.</label>

      <label v-if="imgState" :class="['image-state-label', imgState]">{{ imgStateText }}</label>
      <div v-else>
        <button @click="openFileSelector">
          {{ imageUrl ? 'Replace photo' : 'Choose photo' }}
        </button>
        <input
          ref="photoUploader"
          type="file"
          accept="image/jpeg,image/png,image/jpg,application/pdf"
          @change="uploadFile"
        />
      </div>
    </div>
    <label v-if="errorMsg" for="" class="error-msg">{{ errorMsg }}</label>
  </div>
</template>

<script>
import { uploadAttachments } from '../../../../../api/attachments'
export default {
  props: {
    imageUrl: {
      type: String,
      required: false,
      default: ''
    },
    // eslint-disable-next-line vue/require-default-prop
    handlePhotoChange: {
      type: Function
    }
  },
  data() {
    return {
      imgState: null,
      errorMsg: null
    }
  },
  computed: {
    imgStateText: function() {
      if (this.imgState === 'error') {
        return 'Error!'
      }

      if (this.imgState === 'processing') {
        return 'Processing...'
      }

      if (this.imgState === 'success') {
        return 'Success'
      }
      return 'N/A'
    },
    urlIsImage: function() {
      const regex = /(\.jpg|\.jpeg|\.png)$/i
      return regex.exec(this.imageUrl)
    }
  },
  methods: {
    openFileSelector: function() {
      this.errorMsg = null
      this.$refs.photoUploader.click()
    },
    uploadFile: async function(e) {
      this.changeImgState('processing')
      const file = e.target.files.item(0)
      if (!this.validateFileType(file)) {
        this.errorMsg = 'File type should be one of the following: image/jpg, image/jpeg, image/png, application/pdf'
        this.changeImgState(null)
        return
      }
      if (!this.validateFileSize(file)) {
        this.errorMsg = 'File size should be less than 5mb'
        this.changeImgState(null)
        return
      }
      const data = new FormData()
      data.append('attachment', file)
      try {
        const response = await uploadAttachments(data)
        if (response?.data?.response?.filename) {
          this.handlePhotoChange(response.data.response.filename)
        } else {
          this.changeImgState('error')
        }
      } catch {
        this.changeImgState('error')
      }
    },
    changeImgState: function(imgState) {
      this.imgState = imgState
      if (imgState !== null && imgState !== 'processing') {
        setTimeout(() => {
          this.imgState = null
        }, 4000)
      }
    },
    validateFileType: function(file) {
      const regex = /(\.jpg|\.jpeg|\.png|\.pdf)$/i
      return regex.exec(file.name)
    },
    validateFileSize: function(file) {
      const fileSizeInMB = file.size / 1024 ** 2
      return fileSizeInMB < 5
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  .uploader {
    border: 1px solid #e4e4e4;
    height: 80px;
    padding: 0px 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    img {
      width: 100px;
      height: 60px;
      object-fit: cover;
      border-radius: 10px;
      &.pdf {
        object-fit: contain;
        object-position: left center;
      }
    }
    button {
      border: 2px solid #000;
      border-radius: 5px;
      width: 12rem;
      height: 3rem;
      font-size: 0.9rem;
      font-weight: bolder;
      cursor: pointer;
      transition: all 0.5s ease-in-out;
      &:hover {
        border: 2px solid #e4e4e4;
        color: #e4e4e4;
        background-color: #000;
      }
    }
    label.image-state-label {
      padding-right: 1rem;
      &.success {
        color: #000;
      }
      &.error {
        color: #d34837;
      }
    }
    input[type='file'] {
      display: none;
    }
  }
  .error-msg {
    font-size: 0.8rem;
    color: #d34837;
    align-self: flex-end;
  }
}
</style>
