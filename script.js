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

const themeButton = document.querySelector("#themeButton");
const userNameInput = document.querySelector("#userName");
const userNameCount = document.querySelector("#userNameCount");
const agreeCheck = document.querySelector("#agreeCheck");
const agreeMessage = document.querySelector("#agreeMessage");
const startButton = document.querySelector("#startButton");

function handleThemeClick() {
  const isDark = document.body.classList.toggle("dark");

  themeButton.textContent = isDark
    ? "밝은 테마로 바꾸기"
    : "어두운 테마로 바꾸기";
}

themeButton.addEventListener("click", handleThemeClick);

function handleUserNameInput() {
  const currentLength = userNameInput.value.length;
  userNameCount.textContent = currentLength + " / 10";
}

userNameInput.addEventListener("input", handleUserNameInput);

function handleAgreeChange() {
  const agreed = agreeCheck.checked;

  startButton.disabled = !agreed;
  agreeMessage.textContent = agreed
    ? "확인이 완료되었습니다. 서비스를 시작할 수 있습니다."
    : "동의 후 AI 리뷰 설정을 시작할 수 있습니다.";

  agreeMessage.classList.toggle("is-ready", agreed);
}

agreeCheck.addEventListener("change", handleAgreeChange);

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function resetTabsAndPanels() {
  tabs.forEach(function (tab) {
    tab.classList.remove("is-active");
    tab.setAttribute("aria-selected", "false");
  });

  panels.forEach(function (panel) {
    panel.classList.remove("is-active");
    panel.hidden = true;
  });
}

function activateTab(clickedTab) {
  const targetSelector = clickedTab.dataset.target;
  const targetPanel = document.querySelector(targetSelector);

  clickedTab.classList.add("is-active");
  clickedTab.setAttribute("aria-selected", "true");

  targetPanel.classList.add("is-active");
  targetPanel.hidden = false;
}

function handleTabClick(event) {
  resetTabsAndPanels();
  activateTab(event.currentTarget);
}

tabs.forEach(function (tab) {
  tab.addEventListener("click", handleTabClick);
});

const reviewFlow = document.querySelector("#review-flow");
const flowSteps = reviewFlow.querySelectorAll(".step");
const progressItems = reviewFlow.querySelectorAll(".progress_item");
const repoInput = document.querySelector("#repo-name");
const repoError = document.querySelector("#title-error");
const repoNext = document.querySelector("#title-next");
const durationRange = document.querySelector("#duration-range");
const durationValue = document.querySelector("#duration-value");
const qnaOption = document.querySelector("#qna-option");
const qnaOptions = document.querySelector("#qna-options");
const optionPrev = document.querySelector("#option-prev");
const optionNext = document.querySelector("#option-next");
const summaryPrev = document.querySelector("#summary-prev");
const finishButton = document.querySelector("#finish-button");
const restartButton = document.querySelector("#restart-button");
const summaryTitle = document.querySelector("#summary-title");
const summaryDuration = document.querySelector("#summary-duration");
const summaryQna = document.querySelector("#summary-qna");
const durationValues = ["1", "3", "5"];

const formData = {
  repoName: "",
  commitCount: "3",
  hasFocus: false,
  focusCount: 2,
};

function showStep(index) {
  flowSteps.forEach((step, i) => {
    step.hidden = i !== index;
  });
  progressItems.forEach((item, i) => {
    item.classList.toggle("is-active", i === index);
  });
}

const reviewDialog = document.querySelector("#review-dialog");
const reviewCancel = document.querySelector("#recording-cancel");
const reviewConfirm = document.querySelector("#recording-confirm");

function revokeReviewAgreement() {
  agreeCheck.checked = false;
  reviewFlow.hidden = true;
  handleAgreeChange();
  agreeCheck.focus();
}

startButton.addEventListener("click", () => {
  if (!agreeCheck.checked) return;
  reviewDialog.showModal();
});
reviewCancel.addEventListener("click", () => {
  reviewDialog.close();
  revokeReviewAgreement();
});
reviewDialog.addEventListener("cancel", revokeReviewAgreement);
reviewConfirm.addEventListener("click", () => {
  if (!agreeCheck.checked) return;
  reviewDialog.close();
  reviewFlow.hidden = false;
  showStep(0);
  reviewFlow.scrollIntoView({ behavior: "smooth" });
  repoInput.focus();
});

function validateRepo() {
  const value = repoInput.value.trim();
  if (!value) {
    repoError.textContent = "파일명을 입력해 주세요.";
    repoInput.classList.add("has-error");
    repoInput.focus();
    return false;
  }
  repoError.textContent = "";
  repoInput.classList.remove("has-error");
  formData.repoName = value;
  return true;
}

repoNext.addEventListener("click", () => {
  if (!validateRepo()) return;
  showStep(1);
});

durationRange.addEventListener("input", () => {
  durationValue.textContent = durationValues[durationRange.value] + "커밋";
});

qnaOption.addEventListener("change", () => {
  qnaOptions.hidden = !qnaOption.checked;
});

optionPrev.addEventListener("click", () => showStep(0));
optionNext.addEventListener("click", () => {
  formData.commitCount = durationValues[durationRange.value];
  formData.hasFocus = qnaOption.checked;
  const count = document.querySelector('input[name="qna-count"]:checked');
  formData.focusCount = count.value;
  summaryTitle.textContent = formData.repoName;
  summaryDuration.textContent = formData.commitCount + "커밋";
  summaryQna.textContent = formData.hasFocus
    ? formData.focusCount + "개 포함"
    : "미포함";
  showStep(2);
});

summaryPrev.addEventListener("click", () => {
  showStep(1);
});

finishButton.addEventListener("click", () => {
  showStep(3);
});

restartButton.addEventListener("click", () => {
  formData.repoName = "";
  formData.commitCount = "3";
  formData.hasFocus = false;
  formData.focusCount = "2";
  repoInput.value = "";
  repoError.textContent = "";
  repoInput.classList.remove("has-error");
  durationRange.value = "1";
  durationValue.textContent = "3커밋";
  qnaOption.checked = false;
  qnaOptions.hidden = true;
  document.querySelector('input[name="qna-count"][value="2"]').checked = true;
  summaryTitle.textContent = "";
  summaryDuration.textContent = "";
  summaryQna.textContent = "";
  showStep(0);
});
