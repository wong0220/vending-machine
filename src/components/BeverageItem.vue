<template>
  <div class="beverage-box">
    <QuestionCircleTwoTone :style="{ fontSize: '50px' }" />
    <div>
      <strong>{{ CONVERTED_TO_KOR[name] }}</strong>
    </div>
    <div>
      <strong> 가격 : </strong>
      {{ info.price.toLocaleString() }}원
    </div>
    <div>
      <strong> 수량 : </strong>
      {{ info.stock }}
    </div>
    <a-button @click="pickBeverage(name)" type="primary" size="small">
      click
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { QuestionCircleTwoTone } from "@ant-design/icons-vue";
import { Beverage, ProductInfo } from "../interface/vendingMachine";
import { CONVERTED_TO_KOR } from "../constants/string";

defineProps<{
  info: ProductInfo;
  name: Beverage;
  pickBeverage: (beverage: Beverage) => void;
}>();
</script>

<style scoped lang="scss">
.beverage-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
</style>
