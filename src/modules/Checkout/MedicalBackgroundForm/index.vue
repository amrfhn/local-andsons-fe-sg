<template>
  <div class="kyc-wrapper">
    <div class="kyc-row">
      <div class="step-wrapper" :class="{ 'hide-step-wrapper': currentQuestion > 1 }">
        <h3 class="step-title">{{ title }}</h3>
        <p class="step-description">
          Now, we're going to ask you some questions about your health.
        </p>
        <p class="step-description">
          Our doctors will review this before your consultation to provide the best care for you.
        </p>
        <div v-if="questionSets.length > 1">
          <div
            v-for="({ set_name }, i) in questionSets"
            :key="i"
            class="step"
            :class="{
              active: currentSet - 1 === i
            }"
          >
            <div class="box">{{ i + 1 }}</div>
            <div class="title">{{ set_name }}</div>
          </div>
        </div>
      </div>
      <div v-if="loading" class="loading">
        <font-awesome-icon :icon="['fas', 'spinner']" />
      </div>

      <div v-else class="quiz">
        <div>{{ currentQuestion }} of {{ totalQuestions }}</div>
        <div class="quiz-form">
          <div v-if="displayingQuestion" class="questions">
            <div class="title" v-html="displayingQuestion.title" />
            <div class="title-desc" v-html="displayingQuestion.desc" />
            <QuizQuestion
              :key="displayingQuestion.id"
              :quiz-type="displayingQuestion.input_type.type_name"
              :question-options="displayingQuestion.question_options"
              :initial-answer="currentAnswer"
              @change="setAnswer"
            />
          </div>
          <p v-if="notAnswered" class="error-question">
            You’ll need to answer all questions before proceeding.
          </p>
        </div>
        <div class="button-wrapper">
          <button v-if="!(currentSet === 1 && currentQuestion === 1)" class="back" @click="onPrevQuestion">
            <font-awesome-icon :icon="['fas', 'arrow-left']" />
            Return
          </button>
          <!--<router-link
            v-else-if="fromProfilePage"
            class="back"
            to="/checkout"
          >
            <font-awesome-icon :icon="['fas', 'arrow-left']" />
            Return
          </router-link>-->
          <button class="submit-button" :disabled="submitting" @click="onNextQuestion">
            NEXT
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import classnames from "classnames";
// import Field from "@/components/Field";
import { submitQuestions, saveQuestionAnswer, getAnswersByQuestionSetId } from '@/api/questions'
import QuizQuestion from './Question.vue'
import { formatMetaTags } from '@/utils/prettify.js'

const title = ['Your Hair Loss Medical Evaluation', 'Your Sexual Health Medical Evaluation']

const metaDescription = [
  'This medical evaluation describes your hairloss condition. This pre-consultation helps our doctor to understand & provide you the best care. Fill in now.',
  'This sexual health medical evaluation allows doctor to understand your condition before consultation. Your responses are strictly confidential. Fill in now. '
]

export default {
  components: {
    QuizQuestion
    // Field
  },
  props: ['questionSets'],
  metaInfo() {
    return formatMetaTags({
      title: title[this.$route.params.categorySlug == 'hair-loss' ? 0 : 1],
      urlPath: this.$route.path,
      description: metaDescription[this.$route.params.categorySlug == 'hair-loss' ? 0 : 1]
    })
  },
  data() {
    return {
      title: title[this.$route.params.categorySlug == 'hair-loss' ? 0 : 1],
      answerList: {},
      currentSet: 1,
      currentQuestion: 1,
      submitting: false,
      notAnswered: false,
      loading: true
    }
  },
  computed: {
    cartId() {
      const cart = this.$store.state.cart
      if (cart) {
        return cart.cart?.id
      }
      return undefined
    },
    // fromProfilePage() {
    //   return this.$route.params.fromProfilePage;
    // },
    totalSets() {
      return this.questionSets.length
    },
    totalQuestions() {
      return (this.questionSets[this.currentSet - 1] ?? [])?.questions?.length ?? 0
    },
    displayingQuestionSet() {
      return this.questionSets[this.currentSet - 1]
    },
    displayingQuestion() {
      return this.displayingQuestionSet?.questions[this.currentQuestion - 1]
    },
    currentAnswer() {
      return this.answerList && this.answerList[this.displayingQuestionSet.id][this.displayingQuestion.id]
    }
  },
  watch: {
    // Load answers from last attempt
    questionSets: async function(newQuestionSets) {
      this.loadAnswers(newQuestionSets)
    }
  },
  beforeMount() {
    this.loadAnswers(this.questionSets)
  },
  methods: {
    emptyAnswerList(questionSets) {
      return questionSets.reduce(
        (r1, { id: setId, questions }) => ({
          ...r1,
          [setId]: questions.reduce(
            (r2, { id: questionId }) => ({
              ...r2,
              [questionId]: undefined
            }),
            {}
          )
        }),
        {}
      )
    },
    async loadAnswers(questionSets) {
      if (questionSets.length === 0) {
        return
      }
      this.loading = true
      const answerList = this.emptyAnswerList(questionSets)
      if (this.$store.state.authenticated) {
        for (let { id } of questionSets) {
          const response = await getAnswersByQuestionSetId(id)
          const { answers } = response.data.response
          if (answers) {
            let currentQuestion = 0
            for (const { question_id, answer_text } of answers) {
              // Check whether answers is in array string or not
              answerList[id][question_id] = /^\[(.*)\]$/.test(answer_text)
                ? {
                    selected: JSON.parse(answer_text)
                  }
                : answer_text
              currentQuestion += 1
            }
            this.currentQuestion =
              Object.keys(answerList[id]).length === answers.length
                ? 1 // go through answers again
                : currentQuestion + 1 // continue from where they left off
          }
        }
      }
      this.answerList = answerList
      this.loading = false
      return answerList
    },
    setAnswer(answer) {
      this.answerList[this.displayingQuestionSet.id][this.displayingQuestion.id] = answer
    },
    async onNextQuestion() {
      this.notAnswered = false
      const questionId = this.displayingQuestion.id

      // Save question's answer
      if (questionId && this.$store.state.authenticated) {
        const answer = this?.answerList[this.displayingQuestionSet.id][questionId]
        let formattedAnswer

        if (answer && answer.selected && answer.selected.length > 0) {
          // Stringify answers if is array type
          formattedAnswer = JSON.stringify(answer.selected)
        } else if (typeof answer === 'string') {
          formattedAnswer = answer
        }

        // Only save if answer is not empty
        if (formattedAnswer) {
          saveQuestionAnswer(questionId, formattedAnswer)
        }
      }

      if (
        this.displayingQuestion.answer_required === 1 &&
        (typeof this.currentAnswer === 'undefined' ||
          (typeof this.currentAnswer === 'string' && this.currentAnswer.length === 0) ||
          (this.currentAnswer.selected && this.currentAnswer.selected.length === 0))
      ) {
        this.notAnswered = true
        return
      } else {
        window.scrollTo(0, 0)
      }
      const newQuestionStep = this.currentQuestion + 1
      if (this.totalQuestions >= newQuestionStep) {
        this.currentQuestion = newQuestionStep
        return
      }
      if (this.currentSet < this.totalSets) {
        this.currentSet += 1
        this.currentQuestion = 1
        return
      }
      this.submitting = true
      try {
        await submitQuestions({
          cart_id: this.cartId,
          question_set: Object.entries(this.answerList).map(([setId, questions]) => ({
            id: setId,
            question: Object.entries(questions).map(([questionId, answer]) => ({
              id: Number(questionId),
              ...(answer && answer.selected
                ? {
                    question_option: answer.selected.map((answerId) => ({
                      id: Number(answerId)
                    }))
                  }
                : { answer })
            }))
          }))
        })

        this.$emit('medicalQuestionUpdated', true)
        if (this.totalSets > 0 && !this.$store.state.authenticated) {
          this.$router.replace(`/user/register?fromEvaluation=${this.$route.params.categorySlug}`)
        } else if (this.totalSets > 0 && this.$store.state.authenticated) {
          if (this.$route.params.categorySlug) {
            this.$router.push(`/product/${this.$route.params.categorySlug}/select`)
          } else if (this.$store.state.addToCartItem[0]) {
            this.$router.push(`/product/${this.$store.state.addToCartItem[0].slug}/options`)
          } else {
            this.$router.push('/checkout')
          }
        }
      } catch (e) {
        this.submitting = false
      }
    },
    onPrevQuestion() {
      const newQuestionStep = this.currentQuestion - 1
      if (newQuestionStep > 0) {
        this.currentQuestion = newQuestionStep
        window.scrollTo(0, 0)
        return
      }
      this.currentSet -= 1
      this.currentQuestion = this.questionSets[this.currentSet - 1].questions.length
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.kyc-wrapper {
  background-color: $springwood-background;
  min-height: 100vh;
  //&:before {
  //  content: "";
  //  position: fixed;
  //  top: 0;
  //  left: 0;
  //  right: 0;
  //  height: 295px;
  //  background-color: #fff;
  //}
  .action-header-nav {
    top: 33px;
    left: 40px;
    @media screen and (max-width: 768px) {
      top: 20px;
      left: 5vw;
      padding-left: 0;
      width: calc(100% - 30px - 40px);
    }
  }
}
.kyc-row {
  padding: 0 calc(30px + 5vw);
  width: 100%;
  //display: grid;
  //grid-template-columns: minmax(auto, 1fr) minmax(auto, 3fr);
  //gap: 30px;
  display: flex;
  align-items: flex-start;
  @media screen and (max-width: 768px) {
    padding: 0;
    flex-direction: column;
  }
  .title {
    font-family: 'PublicSansExtraBold', sans-serif;
    font-size: 1.5rem;
    margin-top: 1rem;
    /deep/ p small {
      font-family: 'PublicSans', sans-serif !important;
      line-height: 20px;
    }
    /deep/ p br {
      margin-bottom: 10px;
      line-height: 20px;
    }
  }
  .title-desc {
    margin-top: 1rem;
    font-family: 'PublicSans', sans-serif;
    font-size: 1rem;
  }
  .quiz,
  .loading {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    margin-left: 30px;
    width: calc(100% - 30px - 30%);
    @media screen and (max-width: 768px) {
      margin-left: 0;
      width: 100%;
    }
    .submit-button {
      margin-left: auto;
    }
  }
  .loading {
    justify-content: center;
    align-items: center;
    min-height: 300px;
  }
  .button-wrapper {
    display: flex;
    align-items: center;
    margin-top: 40px;
    .back {
      display: flex;
      align-items: center;
      text-decoration: none;
      background-color: transparent;
      border: 0;
      outline: none;
      &:hover {
        text-decoration: underline;
      }
      svg {
        margin-right: 20px;
        @media screen and (max-width: 400px) {
          margin-right: 10px;
        }
      }
      @media screen and (max-width: 400px) {
        font-size: 90%;
      }
    }
    > button {
      margin-top: 0;
    }
  }
}
.step-wrapper {
  background-color: #f2f2ec;
  border-radius: 10px;
  width: 30%;
  padding: 20px;
  @include mediaSm {
    width: 100%;
    margin-bottom: 20px;

    &.hide-step-wrapper {
      display: none;
    }
  }
  .step-title {
    padding-bottom: 20px;
    font-family: PublicSansExtraBold, monospace;
    font-size: 2rem;
  }
  .step-description {
    padding-bottom: 20px;
    font-family: PublicSans, monospace;
    font-size: 18px;
    line-height: 1.4;
  }
}
.step {
  cursor: pointer;
  width: 100%;
  color: #f0d4cc;
  padding: 0 20px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  text-decoration: line-through;
  opacity: 0.5;
  &.active {
    //background: #ed9075;
    //color: #fff;
    opacity: 1;
    text-decoration: none;
    ~ * {
      text-decoration: none;
      color: #b7b7b7;
      .box {
        background-color: #b7b7b7;
      }
    }
  }
  .box {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ed9075;
    color: #fff;
    border-radius: 50%;
    font-size: 12px;
    font-family: PublicSansBold, sans-serif;
    margin-right: 20px;
  }
  .title {
    font-size: 18px;
    letter-spacing: 1.8px;
    font-family: PublicSansBold, sans-serif;
  }
}
.quiz-form {
  // .title {
  // }
  .error-question {
    font-family: PublicSans, monospace;
    color: #d34837;
    font-size: 1.1rem;
    margin-top: 1rem;
    @media screen and (max-width: 410px) {
      font-size: 0.8rem;
    }
  }
}
</style>
