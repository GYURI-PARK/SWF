const backToTop = document.getElementById('backtotop');

function checkScroll(){
  let pageYOffset = window.pageYOffset;
  if (pageYOffset != 0) {
    backToTop.classList.add('show');
  }
  else {
    backToTop.classList.remove('show');
  }
}

function moveBackToTop(){
  if (window.pageYOffset > 0){
    window.scrollTo({
      top : 100,
      behavior:"smooth"
    });
  }
}

/*ES6스타일의 arrow함수로 구현
const moveBackToTop = () => {
  if (window.pageYOffset > 0){
    window.scrollTo({
      top : 100,
      behavior:"smooth"
    });
  }
}
  */

window.addEventListener('scroll', checkScroll);
backToTop.addEventListener('click', moveBackToTop);

// ==================================================================


/*
function transformNext(event) {
  const slideNext = event.target;
  const slidePrev = slideNext.previousElementSibling;

  const videoList = slideNext.parentElement.parentElement.nextElementSibling;
  let activeLi = videoList.getAttribute("data-position")
  const liList = videoList.getElementsByTagName('li');

  //카드들이 오른쪽으로 이동가능 한 경우
  if(Number(activeLi) < 0) {
    activeLi = Number(activeLi) + 260;
    //video-card width: 240px + margin: 20px
    
    // 왼쪽에 있던 카드가 오른쪽으로 이동했다면, 다시 왼쪽으로도 갈 수 있으니깐 prev버튼 활성화
    slidePrev.style.color = '#2f3059'; //활성화
    slidePrev.videoList.add('slide-prev-hover');
    slidePrev.addEventListener('click', transformPrev);
    
    // 맨 왼쪽에 보이는 카드가 첫번째 카드라면, next버튼은 비활성화 되어야 함
    if (Number(activeLi) === 0 ) {
      slideNext.style.color = '#cfd8dc';  //비활성화
      slideNext.videoList.remove('slide-next-hover');
      slideNext.removeEventListener('click', transformNext);
    }
  }

  videoList.style.transition = 'transform 1s';
  videoList.style.tranform = 'translateX(' + String(activeLi) + 'px)';
  videoList.setAttribute('data-position', activeLi)
}
*/
function transformNext(){}

function transformPrev(event) {
  const slidePrev = event.target;
  // 현재 클릭 이벤트를 받은 요소를 slidePrev로 정의
  const slideNext = slidePrev.nextElementSibling;

  // ul 태그 선택
  const videoList = slidePrev.parentElement.parentElement.nextElementSibling;
  let activeLi = videoList.getAttribute('data-position');
  // activeLi = data-position에 있는 현재 위치
  const liList = videoList.getElementsByTagName('li');

  // video card들이 오른쪽으로 넘친 경우 = 왼쪽 이동 가능 = slidePrev 활성화
  if(videoList.clientWidth < (liList.length * 260 + Number(activeLi))){
    activeLi = Number(activeLi) - 260;    // 현재 위치를 왼쪽으로 260px만큼 이동

    // 더이상 왼쪽으로 이동할 필요가 없는 경우 => slidePrev 비활성화
    if(videoList.clientWidth > (liList.length * 260 + Number(activeLi))) {
      slidePrev.style.color = '#c8c8c8';
      slidePrev.videoList.remove('slide-prev-hover');
      slidePrev.removeEventListener('click', transformPrev);
    } 

    slideNext.style.color = '#2f3059';
    slideNext.videoList.add('slide-next-hover');
    slideNext.addEventListener('click', transformNext);
  }
  videoList.style.transition = 'transform 1s';
  videoList.style.transform = 'translateX(' + String(activeLi) + 'px)';
  videoList.setAttribute('data-position', activeLi)
}

// ============================================================================


const slidePrevList = document.getElementsByClassName('slide-prev');


for(let i = 0; i < slidePrevList.length; i++) {
  // ul태그선택
  let videoList = slidePrevList[i].parentElement.parentElement.nextElementSibling;
  // li카드선택 
  let liList = videoList.getElementsByTagName('li');

  // 카드들이 ul태그보다 넘치면, 왼쪽(PREV)버튼 활성화 + 오른쪽(NEXT)버튼 비활성화
  if (videoList.clientWidth < (liList.length * 260)) {
    // clientwidth = padding 포함한 px단위의 요소 가시너비 반환. (※ border, scrollbar, margin 제외)
    slidePrevList[i].videoList.add('slide-prev-hover');
    slidePrevList[i].addEventListener('click', transformPrev);
    //transformPrev : 아직 정의하지 않은 함수
  } else {
    const arrowContainer = slidePrevList[i].parentElement;
    arrowContainer.removeChild(slidePrevList[i].nextElementSibling); // > 아이콘
    arrowContainer.removeChild(slidePrevList[i]); // < 아이콘 
  }
}


//clientWidth 는 브라우저 크기에 따라 변함