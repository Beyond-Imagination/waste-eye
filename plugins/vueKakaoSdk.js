//  main.js
import Vue from 'vue'
import VueKakaoSdk from 'vue-kakao-sdk'

const apiKey = '318af20a7053527c45e06cc36e01aac2'

// You have to pass your "Kakao SDK Javascript apiKey"
Vue.use(VueKakaoSdk, { apiKey })
