# 5주차 JavaScript 인터렉션 추가

## User
사용자는 바이브 코딩과 관련한 안내를 받기 위한 이메일을 등록하고 신청합니다.

## 안내문구
신청 한 후 아래와 같은 안내 문구를 subscribeMessage에 출력합니다.
"[이메일] + 로 신청이 완료되었습니다. 바이브 코딩 안내를 메일로 받을 수 있습니다."

## 상태 클래스
subscribeMessage에 is-success 클래스를 추가하여 글자 및 배경 색상 등을 변경합니다.

## 코드 설명
subscribedForm.addEventListener("submit", handleSubscibe);
subscribedForm의 submit 이벤트 발생 시 handleSubscibe 함수를 호출합니다.
