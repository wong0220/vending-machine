<template>
  <div class="container">
    <div class="possession-status-box">
      <div>
        <strong>소유한 카드 한도 금액 :</strong>
        {{ possessionAmount.CARD.toLocaleString() }}원
      </div>
      <div>
        <strong>소지하고 있는 현금 :</strong>
        {{ possessionAmount.CASH.toLocaleString() }}원
      </div>
    </div>
    <div class="vending-machine-box">
      <div class="section">
        <div v-for="(value, key, idx) in beverageStock" :key="idx">
          <BeverageItem
            :info="value"
            :name="key"
            :pickBeverage="pickBeverage"
          />
        </div>
      </div>
      <div class="section small">
        <div class="input-amount-info-box">
          <div>
            <strong>지불 종류:</strong>
            {{ inputAmount.type }}
          </div>
          <div>
            <strong>잔액:</strong>
            {{ inputAmount.amount.toLocaleString() }}원
          </div>
        </div>

        <div class="input-amount-box">
          <div class="input-amount-wrapper">
            <a-radio-group
              v-model:value="configuredInfo.type"
              :options="paymentForm"
              class="type-box"
            />
            <input
              v-model="configuredInfo.amount"
              @input="onInput"
              @keyup.enter="
                setInputAmount(configuredInfo.type, configuredInfo.amount)
              "
              type="text"
              :disabled="configuredInfo.type === 'CARD'"
              :class="{ disabled: configuredInfo.type === 'CARD' }"
            />
          </div>
          <div class="btn-wrapper">
            <a-button
              @click="
                setInputAmount(configuredInfo.type, configuredInfo.amount)
              "
              type="primary"
              size="large"
            >
              투입하기
            </a-button>
            <a-button
              @click="returnChange()"
              type="primary"
              size="large"
              danger
            >
              반환하기
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import { notification } from "ant-design-vue";
import {
  PaymentInfo,
  NotificationMsg,
  PaymentType,
  Beverage,
} from "../interface/vendingMachine.ts";
import BeverageItem from "../components/BeverageItem.vue";
import { CONVERTED_TO_KOR } from "../constants/string";

const openNotificationWithIcon = (type: NotificationMsg, message: string) => {
  notification[type]({
    message,
  });
};

const paymentForm = ["CARD", "CASH"];
const configuredInfo = reactive<PaymentInfo>({
  type: "",
  amount: 0,
});
const initConfiguredInfo = () => {
  configuredInfo.type = "";
  configuredInfo.amount = 0;
};

const beverageStock = reactive({
  COKE: {
    stock: 10,
    price: 1100,
  },
  WATER: {
    stock: 10,
    price: 600,
  },
  COFFEE: {
    stock: 10,
    price: 700,
  },
});

const inputAmount = reactive<PaymentInfo>({
  type: "",
  amount: 0,
});
const possessionAmount = reactive({
  CARD: 20000,
  CASH: 10000,
});
const returnChange = () => {
  if (inputAmount.amount === 0 || inputAmount.type === "") {
    openNotificationWithIcon("error", "반환할 금액이 없습니다.");
    return;
  }
  possessionAmount[inputAmount.type] += inputAmount.amount;

  const change = inputAmount.amount;
  inputAmount.amount = 0;
  inputAmount.type = "";
  openNotificationWithIcon(
    "success",
    `${change.toLocaleString()}원이 반환되었습니다.`,
  );

  initConfiguredInfo();
};

const totalStock = computed(
  () =>
    beverageStock.COKE.stock +
    beverageStock.WATER.stock +
    beverageStock.COFFEE.stock,
);
// 투입금액 설정 시 결제수단의 'type'과 금액의 'amount'를 인자로 넘겨줘야 한다.
const setInputAmount = (type: PaymentType, amount: number) => {
  if (totalStock.value === 0) {
    openNotificationWithIcon("warning", "음료수 재고가 없습니다.");
    initConfiguredInfo();
    return;
  }

  if (type === "") {
    openNotificationWithIcon("warning", "지불 방식을 선택해주세요");
    return;
  }

  if (amount === 0) {
    openNotificationWithIcon("error", "투입할 금액이 없습니다.");
    return;
  }

  const availableMoney = [100, 500, 1000, 5000, 10000];

  if (type === "CASH" && !availableMoney.includes(amount)) {
    openNotificationWithIcon("error", `투입이 불가합니다.`);
    initConfiguredInfo();
    return;
  }

  if (possessionAmount[type] - amount < 0) {
    openNotificationWithIcon("error", "소지금액이 부족합니다.");
    return;
  }

  if (inputAmount.type !== "" && inputAmount.type !== type) {
    returnChange();
  }

  possessionAmount[type] -= amount;
  inputAmount.type = type;
  inputAmount.amount += amount;
  initConfiguredInfo();
};

const pickBeverage = (beverage: Beverage) => {
  if (beverageStock[beverage].price > inputAmount.amount) {
    openNotificationWithIcon("error", "잔액이 부족합니다");
    return;
  }

  if (beverageStock[beverage].stock === 0) {
    openNotificationWithIcon(
      "error",
      `남아있는 ${CONVERTED_TO_KOR[beverage]} 재고가 없습니다.`,
    );
    return;
  }

  inputAmount.amount -= beverageStock[beverage].price;
  beverageStock[beverage].stock -= 1;

  if (inputAmount.amount === 0) {
    inputAmount.type = "";
  }
  openNotificationWithIcon(
    "success",
    `${CONVERTED_TO_KOR[beverage]} 제품이 나왔습니다.`,
  );
  return;
};

const onInput = (event: Event) => {
  const { value } = event.currentTarget as HTMLInputElement;

  configuredInfo.amount = Number(value.replaceAll(/[^0-9.]/g, ""));
};

watch(
  () => configuredInfo.type,
  () => {
    if (configuredInfo.type === "CARD") {
      configuredInfo.amount = possessionAmount.CARD;
      return;
    }
    configuredInfo.amount = 0;
  },
);

watch(
  () => totalStock.value,
  () => {
    if (totalStock.value === 0) {
      openNotificationWithIcon(
        "warning",
        `자판기에 남아이있는 음료수 재고가 없습니다.`,
      );

      returnChange();
    }
  },
);
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .possession-status-box {
    position: absolute;
    top: 50px;
    left: 50px;
  }

  .vending-machine-box {
    width: 550px;
    height: 700px;
    border: 3px solid #000;
    border-radius: 5px;

    .section {
      width: 100%;
      height: 180px;
      border-bottom: 1px solid #000;
      padding: 20px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      gap: 20px;

      .input-amount-info-box {
        width: 100px;
      }

      .beverage-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
      }

      .input-amount-box {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        .input-amount-wrapper {
          display: flex;
          flex-direction: column;
          gap: 10px;

          .type-box {
            display: flex;
          }

          .disabled {
            cursor: not-allowed;
          }
        }

        .btn-wrapper {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
      }
    }

    .small {
      font-size: 13px;
    }
  }
}
</style>
