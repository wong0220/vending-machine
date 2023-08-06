# NETLIFY 배포

https://shimmering-croissant-e3d1dd.netlify.app

# 플로우차트

[자판기 순서도.pdf](https://github.com/wong0220/vending-machine/files/12266870/default.pdf)

# 경우의 수
### 음료 선택시
1.  투입된 금액보다 음료의 가격이 높을 때 -> "잔액이 부족합니다."
2.  선택한 음료의 재고가 없을 때 -> "남아있는 상품의 재고가 없습니다."
3.  음료의 재고가 남아있으며 잔액이 음료의 가격보다 같거나 클 때 -> "제품이 나왔습니다."
4.  음료를 선택함으로써 자판기 내 모든 음료의 재고가 없어지는 경우 -> 자판기에 투입된 금액을 전부 반환한다.

### 금액 투입시
1. 모든 상품의 재고가 없을 때 -> "음료수의 재고가 없습니다." (투입 불가)
2. 지불 방식이 정해져있지 않았을 때 -> "지불 방식을 선택해주세요."
3. 설정한 금액이 없을 때 -> "투입할 금액이 없습니다."
4. 사전 전제조건에 있는 투입할 수 있는 금액이 아닐 때 -> "투입이 불가합니다."
5. 소지하고 있는 금액보다 투입하려고 하는 금액이 클 때 -> "소지금액이 부족합니다."
6. 지불 형태가 정해진 상태에서 이미 투입된 지불형태와 다를 때 -> 금액을 반환한다.
7. 지불 형태가 이미 투입된 지불형태와 같을 때 ->
   a.

### 잔액 반환시
1. 투입되어있는 금액이 있는 경우 -> "금액이 반환되었습니다."
2. 투입되어있는 금액이 없을 경우 -> "반환할 금액이 없습니다."
   

# 추가한 전제 조건

1.  사옹자가 소지하고 있는 카도의 한도는 20,000원이다.
2.  사용자가 소지하고 있는 현금은 10,000원이다.
3.  콜라, 물, 커피의 재고는 각각 10개씩이다.
4.  카드와 현금은 독립적이며 자판기 내에서 합산될 수 없다.
5.  카드는 현금과 같이 원하는 금액만큼 투입하여 사용하는 충전식이 아니며 우리가 일상에서 사용하는 자판기 플로우처럼 정해진 카드 한도 내에서만 구입을 할 수 있다.
6.  자판기 내 모든 음료의 재고 소진 시 금액은 투입되지 않으며 자판기 내에 투입된 금액이 있을 경우 전부 반환시킨다.

# 기술 스택

1.  Vue3 (script setup)
2.  TypeScript
3.  SASS(SCSS)
4.  Vite
