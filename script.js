const serviceName = "사내 Local AI 코딩";
let isSubscribed = false;
let submitCount = 0;

const subscribedForm = document.querySelector("#subscribe-form");
const emailInput = document.querySelector("#email");
const subscribeButton = document.querySelector("#subscribeButton");
const subscribeMessage = document.querySelector("#subscribeMessage");

function makeSubscribeMessage(email, subscribed) {
  if (subscribed == true) {
    return (
      email +
      "로 신청이 완료되었습니다. 바이브 코딩 안내를 메일로 받을 수 있습니다."
    );
  }
  return "이메일을 입력한 뒤 신청해주세요";
}

function handleSubscibe(event) {
  event.preventDefault();

  const subscribeEmail = emailInput.value.trim();

  if (subscribeEmail === "") {
    subscribeMessage.textContent = "이메일을 입력한 뒤 신청해주세요.";
    emailInput.focus();
    return;
  }

  isSubscribed = true;
  submitCount += 1;

  subscribeMessage.textContent = makeSubscribeMessage(
    subscribeEmail,
    isSubscribed,
  );

  subscribeMessage.classList.add("is-success");

  subscribeButton.textContent = "신청 완료";
  subscribeButton.disabled = true;
}

subscribedForm.addEventListener("submit", handleSubscibe);
