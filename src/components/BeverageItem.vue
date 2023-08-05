<template>
  <div class="beverage-box">
    <QuestionCircleTwoTone :style="{ fontSize: '50px' }" />
    <div>
      <strong>{{ name }}</strong>
    </div>
    <div>
      <strong>가격 :</strong>
      {{ info.price.toLocaleString() }}원
    </div>
    <div><strong>수량 :</strong> {{ info.stock }}</div>
    <a-button type="primary" size="small" @click="pickBeverage(name)"
      >click</a-button
    >
  </div>
</template>

<script setup lang="ts">
import { QuestionCircleTwoTone } from "@ant-design/icons-vue";
import { Beverage } from "@interface/vendingMachine";

defineProps<{
  info: { price: number; stock: number };
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
