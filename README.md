## 시연 페이지
[Live Demo](https://weather-kappa-gules.vercel.app/)

## 프로젝트 소개
<p>
    React, TypeScript 학습과 API 연동을 익히기 위해 OpenWeatherMap API를 사용하여 현재 위치의 날씨와 5일간의 날씨 예보를 제공하는 반응형 웹사이트를 구현했습니다.
</p>

<br>

## 기술 스택

| JavaScript | TypeScript |  React   |
| :--------: | :--------: | :------: |
|   ![js]    |   ![ts]    | ![react] |

<br>

## 주요 기능

### 기능 1
<p>React Query를 이용해 반복적인 데이터 요청을 방지하고, 데이터를 효율적으로 캐싱하여 관리했습니다.</p>

### 기능 2
<p>Web API의 Geolocation API를 사용해 위치 정보에 동의하면 사용자의 현재 위치에 맞는 날씨 정보를 표시하고, 동의하지 않을 경우 기본 위치로 서울 강남을 설정했습니다.</p>

### 기능 3
<p>useMutation을 사용하여 input의 change이벤트에 따라 원하는 장소를 검색하고, 해당 장소의 날씨 정보를 조회할 수 있습니다.</p>

### 기능 4
<p>검색 시 input의 change 이벤트를 통해 데이터를 요청하며, 무분별한 데이터 요청을 방지하기 위해 디바운스 기능을 적용했습니다.</p>


<br>

<!-- Stack Icon Refernces -->

[js]: /stacks/javascript.svg
[ts]: /stacks/typescript.svg
[react]: /stacks/react.svg
