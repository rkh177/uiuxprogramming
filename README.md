## 수정한 내용

이미지 크기를 card `.service-image`에
`width: 360px;`을 제거했습니다.

## 수정 이유

가로 크기를 고정된 상수로 고정하게 되면 상위 `content-section`의
크기에 맞게 확대하기 위해 수정하였습니다.
하단의 `max-width` 도 `width`로 변경을 고려하였으나,
강제 확대되면 화질 저하가 발생하므로 `max-width`로 유지 하였습니다.
