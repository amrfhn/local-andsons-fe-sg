<template>
  <div class="quiz-item">
    <template v-if="questionOptions.length > 0">
      <RadioCheckbox
        v-for="item in questionOptions"
        :key="item.id"
        class="quiz-item-option"
        :value="item.id"
        :model-value="answer.selected"
        :false-value="[]"
        :show-checkbox="quizType === 'MULTI_CHOICE'"
        :is-exclusive="item.is_exclusive || quizType === 'SINGLE_CHOICE'"
        group-name="quizQuestion"
        @change="
          (newAnswer) => {
            answer.selected = newAnswer
          }
        "
      >
        <div class="quiz-option-name" v-html="item.option_name" />
      </RadioCheckbox>
    </template>
    <textarea v-else v-model.lazy="answer" placeholder="" rows="6" style="font-size: 1rem"></textarea>
  </div>
</template>

<script>
import RadioCheckbox from '@/components/RadioCheckbox.vue'
export default {
  name: 'QuizQuestion',
  components: {
    RadioCheckbox
  },
  props: {
    quizType: {
      type: String,
      required: true
    },
    questionOptions: {
      type: Array,
      required: true
    },
    initialAnswer: {
      required: true
    }
  },
  data() {
    let answer =
      typeof this.initialAnswer === 'undefined'
        ? this.quizType === 'FREE_TEXT' && this.questionOptions.length === 0
          ? ''
          : { selected: [] }
        : this.initialAnswer

    return {
      answer: answer
    }
  },
  watch: {
    initialAnswer: {
      handler: function(newAnswer) {
        this.answer =
          typeof newAnswer === 'undefined'
            ? this.quizType === 'FREE_TEXT' && this.questionOptions.length === 0
              ? ''
              : { selected: [] }
            : newAnswer
      },
      deep: true,
      immediate: true
    },
    answer: {
      handler: function(answer) {
        this.$emit('change', answer)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.quiz-item {
  margin-top: 32px;
  font-family: PublicSans, monospace;
  .quiz-item-title {
    font-size: 1.125rem;
    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
  }

  ::v-deep .quiz-item-option {
    font-size: 1.125rem;
    background: #fff;
    border: 2px solid #b7b7b7;
    margin: 8px 0;
    max-height: 150px;
    transition: all 0.05s;
    &.selected {
      border: 2px solid #ed9075;
      .checkbox-icon {
        > svg {
          color: #ed9075;
          opacity: 1;
          animation: scaleIn 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      }
    }

    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
    @media screen and (max-width: 450px) {
      font-size: 0.9rem;
      padding: 20px;
    }
    /deep/ strong {
      font-family: 'PublicSansBold', sans-serif;
    }
    .quiz-option-name {
      display: flex;
      justify-content: center;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .quiz-item-option-extra {
      display: none;
      font-size: 1.125rem;
      font-family: PublicSans, monospace;
      margin-top: 16px;
      .quiz-item-option-extra-info {
        margin-top: 16px;
        display: flex;
        align-items: center;
        .field {
          height: 40px;
          line-height: 40px;
          border: none;
          margin: 0 14px 0 0;
          select {
            background: $springwood-background;
          }
        }
        .discount-tag {
          margin-left: auto;
          background: #d85639;
          color: #fff;
          padding: 4px 8px;
        }
      }
    }
  }
}

textarea {
  border: 1px solid #b7b7b7;
  outline: none;
  resize: none;
  padding: 16px;
  border-radius: 5px;
  width: 100%;
  font-family: PublicSans, monospace;
  font-size: 1.125rem;
}
</style>
